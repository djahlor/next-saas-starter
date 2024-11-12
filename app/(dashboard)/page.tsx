'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Check } from 'lucide-react';

const images = {
  row1: [
    '/emails/1.png',
    '/emails/2.png',
    '/emails/3.png',
    '/emails/4.png',
    '/emails/5.png',
    '/emails/1.png',
    '/emails/2.png',
    '/emails/3.png',
  ],
  row2: [
    '/emails/6.png',
    '/emails/7.png',
    '/emails/8.png',
    '/emails/9.png',
    '/emails/10.png',
    '/emails/6.png',
    '/emails/7.png',
    '/emails/8.png',
  ],
};

export default function HomePage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  return (
    <main className="fixed inset-0 bg-black flex items-center justify-center">
      {/* Refined Radial Gradient - clearer center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_30%,rgba(0,0,0,0.95)_70%)] z-[1]" />

      {/* Background Slides - Adjusted positioning */}
      <div className="absolute inset-0 z-0 animate-fade-in scale-[0.85] perspective-[2000px]">
        {/* Top Row */}
        <div 
          className="absolute w-[150%] -left-[25%] top-[-20%] overflow-hidden flex items-center"
          style={{ 
            transform: 'rotate(15deg) rotateX(15deg) translateZ(-100px)',
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="flex animate-slide-in-left-slow" style={{ transform: 'translateX(-33.33%)' }}>
            {[...images.row1, ...images.row1, ...images.row1].map((src, i) => (
              <div key={i} className="w-[200px] h-[400px] flex-shrink-0 mx-6 transform hover:scale-105 transition-all duration-500">
                <div className="relative h-full overflow-hidden">
                  <img 
                    src={src} 
                    alt="" 
                    className="w-full h-full object-cover rounded-2xl"
                    style={{ 
                      boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                      filter: 'brightness(0.8) contrast(1.1)' 
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row - Moved up slightly */}
        <div 
          className="absolute w-[150%] -left-[25%] bottom-[-25%] overflow-hidden flex items-center"
          style={{ 
            transform: 'rotate(15deg) rotateX(15deg) translateZ(-200px)',
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="flex animate-slide-in-right-fast">
            {[...images.row2, ...images.row2, ...images.row2].map((src, i) => (
              <div key={i} className="w-[200px] h-[400px] flex-shrink-0 mx-6 transform hover:scale-105 transition-all duration-500">
                <div className="relative h-full overflow-hidden">
                  <img 
                    src={src} 
                    alt="" 
                    className="w-full h-full object-cover rounded-2xl"
                    style={{ 
                      boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                      filter: 'brightness(0.8) contrast(1.1)' 
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Center Content */}
      <div className="relative z-10 text-center w-full max-w-3xl mx-auto px-4">
        {!isSubmitted ? (
          <>
            <h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 opacity-0 animate-fade-in-up-1"
              style={{ animationDelay: '1000ms' }}
            >
              Generate Brand Perfect Emails
            </h1>
            <p 
              className="text-lg md:text-xl text-gray-200 mb-12 max-w-xl mx-auto opacity-0 animate-fade-in-up-2"
              style={{ animationDelay: '1200ms' }}
            >
              Your AI copilot for high-converting email campaigns and content
            </p>
            
            {/* Email Form */}
            <form 
              onSubmit={handleSubmit}
              className="relative max-w-xl mx-auto opacity-0 animate-fade-in-up-3"
              style={{ animationDelay: '1400ms' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-full blur-xl opacity-50" />
              <div className="relative flex gap-3 p-2 rounded-full bg-white/95 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl border border-white/20 transition-all duration-1000 hover:scale-[1.02]">
                <Input 
                  ref={inputRef}
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address" 
                  className="h-14 flex-1 bg-white/50 backdrop-blur-sm border-0 rounded-full text-black placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500/50 text-base px-6 shadow-inner transition-all duration-1000"
                />
                <Button 
                  type="submit"
                  className="h-14 px-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium text-base shadow-xl transition-all duration-1000 hover:shadow-2xl hover:scale-[1.02]"
                >
                  Join waitlist
                </Button>
              </div>
              <div 
                className="mt-4 text-sm text-gray-400 opacity-0 animate-fade-in-up-4"
                style={{ animationDelay: '1600ms' }}
              >
                Join 2,500+ marketers and creators
              </div>
            </form>
          </>
        ) : (
          // Updated Confirmation Screen with opacity-0 initial state
          <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
            <div className="mb-8 flex justify-center">
              <div className="h-20 w-20 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Check className="h-10 w-10 text-blue-500" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              You're on the list!
            </h2>
            <p className="text-lg text-gray-200 max-w-md mx-auto">
              We'll notify you when we launch. Meanwhile, check your inbox for a welcome surprise.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
