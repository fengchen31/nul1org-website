'use client';

import { useEffect, useRef } from 'react';
import './vortex-gallery/style.css';

const VortexGallery = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const appInstanceRef = useRef<any>(null);

  useEffect(() => {
    let Canvas: any;

    const initCanvas = async () => {
      // Dynamically import the Canvas class
      const module = await import('./vortex-gallery/canvas');
      Canvas = module.default;

      if (canvasRef.current && !appInstanceRef.current) {
        // Create a mock for document.getElementById to return our canvas ref
        const originalGetElementById = document.getElementById;
        document.getElementById = (id: string) => {
          if (id === 'webgl') {
            return canvasRef.current;
          }
          return originalGetElementById.call(document, id);
        };

        try {
          const canvasInstance = new Canvas();
          appInstanceRef.current = canvasInstance;

          // Start render loop
          const animate = () => {
            if (appInstanceRef.current) {
              canvasInstance.render();
              requestAnimationFrame(animate);
            }
          };
          animate();
        } catch (error) {
          console.error('Error initializing canvas:', error);
        }

        // Restore original getElementById
        document.getElementById = originalGetElementById;
      }
    };

    initCanvas();

    return () => {
      // Cleanup
      if (appInstanceRef.current) {
        // Remove event listeners if needed
        appInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <div ref={containerRef} id="app"></div>
      <canvas ref={canvasRef} id="webgl" style={{ display: 'block' }}></canvas>

      {/* Fluid Glass Logo */}
      <div className="logo-container">
        <iframe
          src="/vortex-gallery/fluidglass/index.html"
          className="fluidglass-logo"
          style={{ border: 0 }}
        />
      </div>
    </>
  );
};

export default VortexGallery;
