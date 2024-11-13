'use client';

import { FacebookPixel } from '@/components/FacebookPixel';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black">
      {children}
      <FacebookPixel pixelId="your-pixel-id" />
      
      {/* Add Wistia script */}
      <script src="//fast.wistia.com/embed/medias/xxptq67iw7.jsonp" async></script>
      <script src="//fast.wistia.com/assets/external/E-v1.js" async></script>
    </div>
  );
} 