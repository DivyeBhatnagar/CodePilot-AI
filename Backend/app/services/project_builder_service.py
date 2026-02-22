import httpx
import json
import re
from typing import Dict, Any
from app.config import settings
from app.schemas.ai_schema import ProjectResponse, FileModel

GITHUB_API_URL = "https://models.inference.ai.azure.com/chat/completions"

def extract_json_from_response(text: str) -> Dict[Any, Any]:
    """Extract JSON from AI response, handling markdown code blocks"""
    # Remove markdown code blocks
    text = re.sub(r'```json\s*', '', text)
    text = re.sub(r'```\s*', '', text)
    text = text.strip()
    
    # Find JSON object
    json_match = re.search(r'\{.*\}', text, re.DOTALL)
    if json_match:
        try:
            return json.loads(json_match.group())
        except json.JSONDecodeError:
            pass
    
    raise ValueError("No valid JSON found in AI response")

async def build_project_with_ai(prompt: str, language: str, project_type: str) -> ProjectResponse:
    """
    Generate a complete project structure using AI
    
    Args:
        prompt: Project description
        language: Programming language
        project_type: Type of project (backend, frontend, etc.)
        
    Returns:
        ProjectResponse with structured project data
    """
    
    system_prompt = """You are an expert software architect and code generator.
You MUST return ONLY valid JSON matching this exact schema. Do not include any explanations, markdown, or text outside the JSON.

REQUIRED JSON SCHEMA:
{
  "project_name": "string (snake_case or kebab-case)",
  "description": "string (brief project description)",
  "files": [
    {
      "path": "string (relative file path)",
      "content": "string (complete file content with proper formatting)",
      "language": "string (file language: python, javascript, typescript, html, css, json, etc.)"
    }
  ],
  "dependencies": ["string (package names)"],
  "run_commands": ["string (commands to run the project)"],
  "setup_instructions": ["string (step-by-step setup instructions)"]
}

RULES:
1. Return ONLY the JSON object, no markdown, no explanations
2. Include ALL necessary files for a working project
3. File content must be complete and production-ready
4. Include proper imports, error handling, and best practices
5. Add README.md, .gitignore, and configuration files
6. Ensure all code is properly formatted and indented
7. Use realistic project structure and naming conventions"""

    user_prompt = f"""Create a {project_type} project in {language}.

Project Requirements:
{prompt}

Generate a complete, production-ready project with all necessary files, proper structure, and best practices.
Return ONLY the JSON object matching the schema."""

    try:
        async with httpx.AsyncClient(timeout=120.0) as client:
            response = await client.post(
                GITHUB_API_URL,
                headers={
                    "Authorization": f"Bearer {settings.GITHUB_TOKEN}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "gpt-4o",
                    "messages": [
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": user_prompt}
                    ],
                    "temperature": 0.7,
                    "max_tokens": 4096,
                }
            )
            
            response.raise_for_status()
            data = response.json()
            
            if "choices" not in data or len(data["choices"]) == 0:
                raise Exception("No response from AI")
            
            ai_response = data["choices"][0]["message"]["content"]
            
            # Extract and parse JSON
            project_data = extract_json_from_response(ai_response)
            
            # Validate and return as Pydantic model
            return ProjectResponse(**project_data)
            
    except httpx.HTTPStatusError as e:
        error_detail = f"Status: {e.response.status_code}"
        try:
            error_body = e.response.json()
            error_detail += f", Error: {error_body}"
        except:
            error_detail += f", Response: {e.response.text}"
        raise Exception(f"AI API error: {error_detail}")
    except json.JSONDecodeError as e:
        raise Exception(f"Failed to parse AI response as JSON: {str(e)}")
    except Exception as e:
        raise Exception(f"Project generation failed: {str(e)}")

async def regenerate_file_with_ai(file_path: str, context: str, instruction: str) -> Dict[str, str]:
    """
    Regenerate a specific file with AI based on instruction
    
    Args:
        file_path: Path of file to regenerate
        context: Project context
        instruction: Specific instruction for changes
        
    Returns:
        Dict with file_path, content, and language
    """
    
    system_prompt = """You are an expert programmer. Generate ONLY the file content requested.
Return ONLY valid JSON in this format:
{
  "content": "string (complete updated file content)",
  "language": "string (programming language)"
}

Do not include explanations or markdown. Only the JSON object."""

    user_prompt = f"""File: {file_path}
Project Context: {context}

Instruction: {instruction}

Generate the complete updated file content. Return ONLY the JSON object."""

    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(
                GITHUB_API_URL,
                headers={
                    "Authorization": f"Bearer {settings.GITHUB_TOKEN}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "gpt-4o",
                    "messages": [
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": user_prompt}
                    ],
                    "temperature": 0.7,
                    "max_tokens": 2048,
                }
            )
            
            response.raise_for_status()
            data = response.json()
            
            ai_response = data["choices"][0]["message"]["content"]
            result = extract_json_from_response(ai_response)
            
            return {
                "file_path": file_path,
                "content": result["content"],
                "language": result.get("language")
            }
            
    except Exception as e:
        raise Exception(f"File regeneration failed: {str(e)}")
