'use client';

import { motion } from 'framer-motion';
import { Target, Lightbulb, Users, Heart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: 'Mission-Driven',
      description: 'Empowering hackers to focus on innovation, not logistics. We automate the boring parts so you can build what matters.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation First',
      description: 'Built by hackers who understand the pain points. Every feature solves a real problem we faced in hackathons.'
    },
    {
      icon: Users,
      title: 'Community Focused',
      description: 'We grow with the hackathon community. Your feedback shapes our roadmap and drives our development.'
    },
    {
      icon: Heart,
      title: 'Passion for Building',
      description: 'We love hackathons as much as you do. CodePilot AI is our way of giving back to the community that inspired us.'
    }
  ];

  const team = [
    {
      name: 'The Builders',
      role: 'Founded by Hackathon Veterans',
      description: 'We\'ve been in your shoes - pulling all-nighters, debugging at 3 AM, and racing against the clock. CodePilot AI was born from our own hackathon experiences.',
      emoji: '👥'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Built by Hackers,
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              For Hackers
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We&apos;ve automated the parts of hackathons that slow you down, 
            so you can focus on what matters - building amazing things.
          </p>
        </motion.div>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-12 shadow-xl mb-20"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                CodePilot AI was born in a hackathon. Not as a project, but as a necessity.
              </p>
              <p>
                After countless hackathons, we noticed a pattern: teams spent hours planning, 
                debating tech stacks, setting up boilerplate code, and coordinating tasks. 
                By the time they started building, half the hackathon was over.
              </p>
              <p>
                We thought: <span className="font-semibold text-blue-600">What if AI could handle all of that?</span>
              </p>
              <p>
                So we built CodePilot AI - an intelligent platform that generates execution plans, 
                creates project structures, writes boilerplate code, and guides teams through the 
                entire hackathon journey. Now, teams can focus on innovation instead of logistics.
              </p>
              <p className="text-xl font-semibold text-gray-900">
                We&apos;re not just building a tool. We&apos;re building the future of hackathons.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">What We Stand For</h2>
          <p className="text-xl text-gray-600 text-center mb-12">
            The principles that guide everything we build
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="inline-flex p-3 bg-blue-100 rounded-xl mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-700">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">The Team</h2>
          
          <div className="max-w-2xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl p-12 shadow-lg text-center">
                <div className="text-7xl mb-6">{member.emoji}</div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-4">{member.role}</p>
                <p className="text-lg text-gray-700">{member.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Join the Movement</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Be part of the community that&apos;s redefining how hackathons are won. 
            Start building faster, smarter, and better.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-blue-500/50 transition-all hover:scale-105">
                Get Started Free
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
