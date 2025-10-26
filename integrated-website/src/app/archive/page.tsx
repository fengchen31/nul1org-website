'use client';

import Link from 'next/link';

export default function ArchivePage() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-zinc-900">
      <iframe
        src="/draggable/index.html"
        className="w-full h-full border-0"
        title="Draggable Grid"
      />

      {/* Navigation links */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-3">
        <Link
          href="/"
          className="relative bg-white/5 backdrop-blur-[100px] text-white w-32 py-3 rounded-full hover:bg-white/10 transition-all duration-500 text-sm font-medium shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] hover:shadow-[0_8px_32px_0_rgba(255,255,255,0.2)] text-center"
          style={{
            border: '2px solid rgba(255, 255, 255, 0.18)',
            boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.1), 0 8px 32px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          home
        </Link>
        <Link
          href="/lookbook"
          className="relative bg-white/5 backdrop-blur-[100px] text-white w-32 py-3 rounded-full hover:bg-white/10 transition-all duration-500 text-sm font-medium shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] hover:shadow-[0_8px_32px_0_rgba(255,255,255,0.2)] text-center"
          style={{
            border: '2px solid rgba(255, 255, 255, 0.18)',
            boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.1), 0 8px 32px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          lookbook
        </Link>
      </div>
    </div>
  );
}
