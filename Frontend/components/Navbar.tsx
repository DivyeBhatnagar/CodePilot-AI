"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowDropdown(false);
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/80 backdrop-blur-md border-b" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center cursor-pointer">
            <Image src="/logo.png" alt="CodePilot AI" width={170} height={170} className="object-contain" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/#features" className="text-sm text-gray-600 hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="/about" className="text-sm text-gray-600 hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/pricing" className="text-sm text-gray-600 hover:text-primary transition-colors">
              Pricing
            </Link>
            
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-primary transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>{user.email?.split('@')[0]}</span>
                </button>
                
                {showDropdown && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setShowDropdown(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                      <Link 
                        href="/dashboard"
                        onClick={() => setShowDropdown(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link href="/login">
                <button className="text-sm text-gray-600 hover:text-primary transition-colors mr-4">
                  Login
                </button>
              </Link>
            )}
          </div>

          {!user && (
            <Link href="/register">
              <button className="px-5 py-2 bg-accent text-white text-sm font-medium rounded-full hover:bg-accent/90 transition-all hover:scale-105">
                Launch App
              </button>
            </Link>
          )}
          
          {user && (
            <Link href="/dashboard">
              <button className="px-5 py-2 bg-accent text-white text-sm font-medium rounded-full hover:bg-accent/90 transition-all hover:scale-105">
                Dashboard
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
