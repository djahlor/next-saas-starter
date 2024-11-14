'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ENABLE_CONVERTKIT = false; // Easy toggle for ConvertKit integration

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
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      try {
        // Start the transition animation
        setIsTransitioning(true);
        
        // Wait for fade out animation
        await new Promise(resolve => setTimeout(resolve, 600));

        if (ENABLE_CONVERTKIT) {
          const response = await fetch('/api/subscribe', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          });

          if (!response.ok) throw new Error('Subscription failed');
        }

        // Track with Facebook Pixel
        if (typeof window !== 'undefined' && window.fbq) {
          fbq('track', 'Lead', {
            content_name: 'Newsletter Signup',
            status: 'success'
          });
        }

        // Use startTransition for smooth navigation
        startTransition(() => {
          router.push('/success');
        });
      } catch (error) {
        console.error('Subscription error:', error);
        startTransition(() => {
          router.push('/success');
        });
      }
    }
  };

  const overlayClass = `fixed inset-0 bg-black transition-opacity duration-600 z-50 pointer-events-none ${
    isTransitioning ? 'opacity-100' : 'opacity-0'
  }`;

  return (
    <main className="fixed inset-0 bg-black flex items-center justify-center">
      {/* Add the transition overlay */}
      <div className={overlayClass} />

      {/* Refined Radial Gradient - clearer center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_30%,rgba(0,0,0,0.95)_70%)] z-[1]" />

      {/* Background Slides - Adjusted positioning */}
      <div className="absolute inset-0 z-0 animate-fade-in scale-100 perspective-[2000px]">
        {/* Top Row */}
        <div 
          className="absolute w-[180%] -left-[40%] top-[-25%] overflow-hidden flex items-center"
          style={{ 
            transform: 'rotate(15deg) rotateX(15deg) translateZ(-30px)',
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="flex animate-slide-in-left-slow" style={{ transform: 'translateX(-33.33%)' }}>
            {[...images.row1, ...images.row1, ...images.row1].map((src, i) => (
              <div key={i} className="w-[250px] h-[500px] flex-shrink-0 mx-4 transform hover:scale-105 transition-all duration-500">
                <div className="relative h-full overflow-hidden">
                  <img 
                    src={src} 
                    alt="" 
                    className="w-full h-full object-cover rounded-2xl"
                    style={{ 
                      boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                      filter: 'brightness(0.85) contrast(1.2)' 
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row */}
        <div 
          className="absolute w-[180%] -left-[40%] bottom-[-30%] overflow-hidden flex items-center"
          style={{ 
            transform: 'rotate(15deg) rotateX(15deg) translateZ(-80px)',
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="flex animate-slide-in-right-fast">
            {[...images.row2, ...images.row2, ...images.row2].map((src, i) => (
              <div key={i} className="w-[250px] h-[500px] flex-shrink-0 mx-4 transform hover:scale-105 transition-all duration-500">
                <div className="relative h-full overflow-hidden">
                  <img 
                    src={src} 
                    alt="" 
                    className="w-full h-full object-cover rounded-2xl"
                    style={{ 
                      boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                      filter: 'brightness(0.85) contrast(1.2)' 
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
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
              className="text-5xl md:text-5xl lg:text-7xl font-bold text-white mb-6 opacity-0 animate-fade-in-up-1"
              style={{ animationDelay: '1000ms' }}
            >
              Generate Brand Perfect Emails
            </h1>
            <p 
              className="text-lg md:text-xl text-gray-200 mb-12 max-w-xl mx-auto opacity-0 animate-fade-in-up-2"
              style={{ animationDelay: '1200ms' }}
            >
              Your AI copilot for high-converting email campaigns
            </p>
            
            {/* Email Form */}
            <form 
              onSubmit={handleSubmit}
              className="relative max-w-xl mx-auto opacity-0 animate-fade-in-up-3"
              style={{ animationDelay: '1400ms' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-full blur-xl opacity-20" />
              <div className="relative flex gap-3 p-2 rounded-full bg-[#191B20] shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/5 transition-all duration-1000 hover:scale-[1.02]">
                <Input 
                  ref={inputRef}
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address" 
                  className="h-14 flex-1 bg-[#16181B] border-0 rounded-full text-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500/50 text-base px-6 shadow-inner transition-all duration-1000"
                />
                <Button 
                  type="submit"
                  className="h-14 px-8 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-medium text-base shadow-xl transition-all duration-1000 hover:shadow-2xl hover:scale-[1.02]"
                >
                  Join waitlist
                </Button>
              </div>
              <div 
                className="mt-4 opacity-0 animate-fade-in-up-4"
                style={{ animationDelay: '1600ms' }}
              >
                <ul className="max-w-sm mx-auto space-y-2 text-sm text-gray-400">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-500 flex-shrink-0" />
                    <span>Join 2,500+ Shopify sellers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-500 flex-shrink-0" />
                    <span>Save 10+ hours per week on email marketing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-500 flex-shrink-0" />
                    <span>Generate on-brand emails in seconds</span>
                  </li>
                </ul>
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
