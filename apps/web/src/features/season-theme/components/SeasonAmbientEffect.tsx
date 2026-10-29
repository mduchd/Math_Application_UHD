'use client';

import React, { useEffect, useRef } from 'react';
import { useSeasonStore } from '../stores/useSeasonStore';
import { SeasonId } from '../types';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  swingAngle: number;
  swingSpeed: number;
  color: string;
  shapeType: number;
}

export const SeasonAmbientEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const season = useSeasonStore((state) => state.season);
  const effectsEnabled = useSeasonStore((state) => state.effectsEnabled);
  const isHydrated = useSeasonStore((state) => state.isHydrated);

  useEffect(() => {
    if (!isHydrated || !effectsEnabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isPaused = false;

    // Responsive canvas dimensions
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Visibility change handler (battery saving)
    const handleVisibilityChange = () => {
      isPaused = document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Season color palettes for particles
    const springColors = ['#FBCFE8', '#F472B6', '#FDA4AF', '#FECDD3', '#FFFFFF'];
    const summerColors = [
      'rgba(56, 189, 248, 0.4)',
      'rgba(253, 224, 71, 0.45)',
      'rgba(147, 197, 253, 0.4)',
      'rgba(255, 255, 255, 0.55)',
    ];
    const autumnColors = ['#F59E0B', '#EA580C', '#D97706', '#F97316', '#DC2626'];
    const winterColors = [
      'rgba(255, 255, 255, 0.85)',
      'rgba(224, 242, 254, 0.9)',
      'rgba(199, 210, 254, 0.8)',
    ];

    const getColorsForSeason = (s: SeasonId) => {
      switch (s) {
        case 'spring':
          return springColors;
        case 'summer':
          return summerColors;
        case 'autumn':
          return autumnColors;
        case 'winter':
          return winterColors;
      }
    };

    const colors = getColorsForSeason(season);
    const particleCount = 22; // Low count: gentle aesthetic, near zero CPU load

    const createParticle = (initY?: number): Particle => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const size = season === 'winter' ? Math.random() * 4 + 2 : Math.random() * 8 + 6;

      return {
        x: Math.random() * width,
        y: initY !== undefined ? initY : Math.random() * height,
        size,
        speedY:
          season === 'summer'
            ? -(Math.random() * 0.4 + 0.2) // Summer bubbles drift upward
            : Math.random() * 0.7 + 0.35, // Petals / leaves / snowflakes drift downward
        speedX: (Math.random() - 0.5) * 0.4,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.45 + 0.35,
        swingAngle: Math.random() * Math.PI * 2,
        swingSpeed: Math.random() * 0.02 + 0.01,
        color: colors[Math.floor(Math.random() * colors.length)],
        shapeType: Math.floor(Math.random() * 2),
      };
    };

    const particles: Particle[] = Array.from({ length: particleCount }, () => createParticle());

    // Render loop
    const render = () => {
      if (!isPaused) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Movement
          p.swingAngle += p.swingSpeed;
          p.x += Math.sin(p.swingAngle) * 0.6 + p.speedX;
          p.y += p.speedY;
          p.rotation += p.rotationSpeed;

          // Wrap around boundaries
          if (season === 'summer') {
            if (p.y < -30) {
              p.y = height + 10;
              p.x = Math.random() * width;
            }
          } else {
            if (p.y > height + 30) {
              p.y = -20;
              p.x = Math.random() * width;
            }
          }

          if (p.x > width + 30) p.x = -20;
          if (p.x < -30) p.x = width + 20;

          // Drawing according to season
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.globalAlpha = p.opacity;

          if (season === 'spring') {
            // Sakura / Peach Blossom Petal (Cánh hoa đào)
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size, p.size * 1.5, 0, 0, Math.PI * 2);
            ctx.fill();

            // Tiny petal notch detail
            ctx.fillStyle = '#FB7185';
            ctx.beginPath();
            ctx.arc(0, -p.size * 0.7, p.size * 0.25, 0, Math.PI);
            ctx.fill();
          } else if (season === 'summer') {
            // Sun Bubble with iridescent shine
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(0, 0, p.size, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(-p.size * 0.3, -p.size * 0.3, p.size * 0.4, 0, Math.PI / 1.5);
            ctx.stroke();
          } else if (season === 'autumn') {
            // Autumn Leaf (Lá phong / Lá vàng)
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.moveTo(0, -p.size * 1.4);
            ctx.quadraticCurveTo(p.size, 0, 0, p.size * 1.4);
            ctx.quadraticCurveTo(-p.size, 0, 0, -p.size * 1.4);
            ctx.fill();

            // Leaf vein line
            ctx.strokeStyle = 'rgba(0,0,0,0.15)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, -p.size * 1.1);
            ctx.lineTo(0, p.size * 1.1);
            ctx.stroke();
          } else if (season === 'winter') {
            // Snowflake Crystal (Hoa tuyết lung linh)
            ctx.fillStyle = p.color;
            ctx.strokeStyle = p.color;
            ctx.lineWidth = 1.5;

            // 6-star branches
            for (let b = 0; b < 3; b++) {
              ctx.rotate(Math.PI / 3);
              ctx.beginPath();
              ctx.moveTo(-p.size, 0);
              ctx.lineTo(p.size, 0);
              ctx.stroke();
            }

            ctx.beginPath();
            ctx.arc(0, 0, p.size * 0.3, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [season, effectsEnabled, isHydrated]);

  if (!isHydrated || !effectsEnabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-20 h-full w-full select-none"
      aria-hidden="true"
    />
  );
};
