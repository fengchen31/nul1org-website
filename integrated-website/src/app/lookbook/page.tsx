'use client';

import Link from 'next/link';

export default function GridPage() {
  return (
    <div className="w-screen h-screen overflow-hidden relative">
      <iframe
        src="/infinite-grid/index.html"
        className="w-full h-full border-0"
        title="Infinite Layers Grid"
      />

      {/* Navigation links */}
      <div className="fixed bottom-8 left-8 z-50 flex gap-4">
        <Link
          href="/"
          className="relative text-white px-10 py-2 rounded-full hover:brightness-110 transition-all duration-300 uppercase text-center"
          style={{
            backgroundColor: '#FF6B35',
            border: '2px solid rgba(255, 255, 255, 0.9)',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 'bold',
            fontSize: '14px',
            letterSpacing: '0.15em',
            transform: 'scaleY(0.85)'
          }}
        >
          home
        </Link>
        <Link
          href="/archive"
          className="relative text-white px-10 py-2 rounded-full hover:brightness-110 transition-all duration-300 uppercase text-center"
          style={{
            backgroundColor: '#FF6B35',
            border: '2px solid rgba(255, 255, 255, 0.9)',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 'bold',
            fontSize: '14px',
            letterSpacing: '0.15em',
            transform: 'scaleY(0.85)'
          }}
        >
          archive
        </Link>
      </div>
    </div>
  );
}
