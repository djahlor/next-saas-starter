'use client';

import { useEffect } from 'react';
import { Check } from 'lucide-react';
import { Suspense } from 'react';

// Separate video component for better code splitting
const WistiaVideo = () => (
  <div className="relative rounded-2xl overflow-hidden shadow-2xl opacity-0 animate-fade-in-up-2" 
       style={{ animationDelay: '400ms' }}>
    <div className="wistia_responsive_padding" style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
      <div className="wistia_responsive_wrapper" style={{ height: '100%', left: 0, position: 'absolute', top: 0, width: '100%' }}>
        <div className="wistia_embed wistia_async_xxptq67iw7 videoFoam=true" 
             style={{ height: '100%', position: 'relative', width: '100%' }}>
        </div>
      </div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/60 pointer-events-none" />
  </div>
);

// Separate list component
const BenefitsList = () => (
  <ul className="text-gray-300 space-y-3 max-w-md mx-auto text-left px-4 md:px-0">
    {[
      'Exclusive early access invitation',
      'Special launch discount',
      'Email marketing best practices guide'
    ].map((benefit, index) => (
      <li key={index} className="flex items-center gap-3">
        <Check className="h-5 w-5 text-blue-500 flex-shrink-0" />
        <span>{benefit}</span>
      </li>
    ))}
  </ul>
);

export default function SuccessPage() {
  useEffect(() => {
    // Track success page view
    if (typeof window !== 'undefined' && window.fbq) {
      fbq('track', 'CompleteRegistration', {
        content_name: 'Waitlist Signup',
        status: 'success'
      });
    }

    // Suppress Wistia's console errors
    const originalError = console.error;
    console.error = (...args) => {
      if (args[0]?.toString().includes('TypeError: Failed to fetch')) return;
      originalError.apply(console, args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  return (
    <main className="min-h-screen bg-black flex items-center justify-center py-12 md:py-16 lg:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_30%,rgba(0,0,0,0.95)_70%)] z-[1]" />

      <div className="relative z-10 text-center w-full max-w-4xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="opacity-0 animate-fade-in-up space-y-8 md:space-y-10" style={{ animationDelay: '200ms' }}>
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="h-20 w-20 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Check className="h-10 w-10 text-blue-500" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Welcome to the Future of Email Marketing!
          </h1>

          {/* Lazy load video */}
          <Suspense fallback={
            <div className="animate-pulse bg-gray-800 rounded-2xl aspect-video"></div>
          }>
            <WistiaVideo />
          </Suspense>

          <div className="space-y-4 md:space-y-6 opacity-0 animate-fade-in-up-3"
               style={{ animationDelay: '400ms' }}>
            <h2 className="text-2xl md:text-3xl font-bold text-white">What's Next?</h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              We're preparing something special for you. Check your inbox for:
            </p>
            <BenefitsList />
          </div>

          <div className="text-sm text-gray-400 opacity-0 animate-fade-in-up-4 mt-8 md:mt-12"
               style={{ animationDelay: '600ms' }}>
            Joining 2,500+ marketers and creators who are revolutionizing email marketing
          </div>
        </div>
      </div>
    </main>
  );
} 