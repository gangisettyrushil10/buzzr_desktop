'use client';

import { useEffect, useState } from 'react';
import { Activity, Trophy, Snowflake, Flag, Swords, Target, Flame, Dribbble, Dumbbell } from 'lucide-react';
import { cn } from './utils';

const ICONS = [Activity, Trophy, Snowflake, Flag, Swords, Target, Flame, Dribbble, Dumbbell];

interface FloatingIcon {
  id: number;
  Icon: React.ElementType;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  speedX: number;
  speedY: number;
  rotSpeed: number;
  opacity: number;
}

export function FloatingIconsBackground() {
  const [icons, setIcons] = useState<FloatingIcon[]>([]);

  useEffect(() => {
    // Initialize icons
    const initialIcons: FloatingIcon[] = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      Icon: ICONS[Math.floor(Math.random() * ICONS.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: 0.5 + Math.random() * 1.5,
      rotation: Math.random() * 360,
      speedX: (Math.random() - 0.5) * 0.1,
      speedY: (Math.random() - 0.5) * 0.1,
      rotSpeed: (Math.random() - 0.5) * 0.5,
      opacity: 0.05 + Math.random() * 0.1,
    }));

    setIcons(initialIcons);

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 100;
      mouseY = (e.clientY / window.innerHeight) * 100;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;

      setIcons(prev => prev.map(icon => {
        let newX = icon.x + icon.speedX * (deltaTime / 16);
        let newY = icon.y + icon.speedY * (deltaTime / 16);
        let newRot = icon.rotation + icon.rotSpeed * (deltaTime / 16);

        // Repel physics
        const dx = newX - mouseX;
        const dy = newY - mouseY;
        const distSq = dx * dx + dy * dy;
        const repelRadius = 225; // squared radius (~15% of screen)
        
        if (distSq < repelRadius) {
          const force = (repelRadius - distSq) / repelRadius;
          // Apply a gentle push away from the mouse
          icon.speedX += (dx > 0 ? 1 : -1) * force * 0.05;
          icon.speedY += (dy > 0 ? 1 : -1) * force * 0.05;
        }

        // Friction to slowly return to base speed
        icon.speedX *= 0.99;
        icon.speedY *= 0.99;

        // Base velocity drift if too slow
        if (Math.abs(icon.speedX) < 0.02) icon.speedX += (Math.random() - 0.5) * 0.01;
        if (Math.abs(icon.speedY) < 0.02) icon.speedY += (Math.random() - 0.5) * 0.01;

        // Wrap around edges instead of bouncing
        if (newX < -20) newX = 120;
        if (newX > 120) newX = -20;
        if (newY < -20) newY = 120;
        if (newY > 120) newY = -20;

        return { ...icon, x: newX, y: newY, rotation: newRot };
      }));

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {icons.map(icon => (
        <div
          key={icon.id}
          className="absolute text-buzzr-accent"
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
            opacity: icon.opacity,
            transform: `translate(-50%, -50%) scale(${icon.scale}) rotate(${icon.rotation}deg)`,
            transition: 'opacity 1s ease-in-out'
          }}
        >
          <icon.Icon size={48} strokeWidth={1.5} />
        </div>
      ))}
    </div>
  );
}
