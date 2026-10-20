import React, { useEffect, useRef } from 'react';

interface Props {
  galaxyMode?: boolean;
}

export const CosmicBackground: React.FC<Props> = ({ galaxyMode = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate stars
    const starCount = galaxyMode ? 140 : 60;
    const stars: { x: number; y: number; radius: number; alpha: number; speed: number; color: string }[] = [];
    const colors = ['#ffffff', '#fde047', '#c084fc', '#93c5fd', '#f472b6'];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.6 + 0.4,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.02 + 0.005,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Shooting stars
    let shootingStar: { x: number; y: number; length: number; speed: number; alpha: number; active: boolean } = {
      x: 0,
      y: 0,
      length: 80,
      speed: 12,
      alpha: 0,
      active: false,
    };

    const triggerShootingStar = () => {
      shootingStar.x = Math.random() * width * 0.8;
      shootingStar.y = Math.random() * (height * 0.4);
      shootingStar.alpha = 1;
      shootingStar.active = true;
    };

    const shootingStarInterval = setInterval(() => {
      if (Math.random() > 0.4 && !shootingStar.active) {
        triggerShootingStar();
      }
    }, 6000);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep galactic background
      const grad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.3,
        10,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.8
      );
      if (galaxyMode) {
        grad.addColorStop(0, '#150c2e');
        grad.addColorStop(0.4, '#0d071e');
        grad.addColorStop(0.8, '#06040d');
        grad.addColorStop(1, '#040208');
      } else {
        grad.addColorStop(0, '#0f0a20');
        grad.addColorStop(0.6, '#07050e');
        grad.addColorStop(1, '#030206');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw subtle nebula clouds if galaxyMode is active
      if (galaxyMode) {
        const nebulaGrad = ctx.createRadialGradient(width * 0.75, height * 0.2, 5, width * 0.75, height * 0.2, 380);
        nebulaGrad.addColorStop(0, 'rgba(147, 51, 234, 0.12)');
        nebulaGrad.addColorStop(0.5, 'rgba(59, 130, 246, 0.06)');
        nebulaGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = nebulaGrad;
        ctx.fillRect(0, 0, width, height);

        const goldNebula = ctx.createRadialGradient(width * 0.2, height * 0.7, 5, width * 0.2, height * 0.7, 340);
        goldNebula.addColorStop(0, 'rgba(234, 179, 8, 0.08)');
        goldNebula.addColorStop(0.5, 'rgba(168, 85, 247, 0.04)');
        goldNebula.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = goldNebula;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw stars
      for (const star of stars) {
        star.alpha += star.speed;
        const currentAlpha = 0.3 + 0.7 * Math.abs(Math.sin(star.alpha));
        ctx.fillStyle = star.color;
        ctx.globalAlpha = currentAlpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Draw shooting star if active
      if (shootingStar.active) {
        ctx.save();
        ctx.strokeStyle = `rgba(253, 224, 71, ${shootingStar.alpha})`;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(shootingStar.x + shootingStar.length, shootingStar.y + shootingStar.length * 0.5);
        ctx.stroke();
        ctx.restore();

        shootingStar.x += shootingStar.speed;
        shootingStar.y += shootingStar.speed * 0.5;
        shootingStar.alpha -= 0.025;
        if (shootingStar.alpha <= 0) {
          shootingStar.active = false;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      clearInterval(shootingStarInterval);
    };
  }, [galaxyMode]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};
