import React, { useRef, useEffect } from 'react';

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function drawConstellations(ctx, width, height, stars, numbers) {
  ctx.clearRect(0, 0, width, height);
  // Draw stars
  for (const star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.shadowColor = '#fff';
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
  // Draw numbers
  ctx.font = 'bold 1.2rem Cinzel, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (const num of numbers) {
    ctx.save();
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = '#7fffd4';
    ctx.shadowColor = '#7fffd4';
    ctx.shadowBlur = 8;
    ctx.translate(num.x, num.y);
    ctx.rotate(num.angle);
    ctx.fillText(num.value, 0, 0);
    ctx.restore();
  }
}

const NUM_STARS = 88;
const NUM_NUMBERS = 40;
const NUMBER_VALUES = ['1','2','3','4','5','6','7','8','9','11','22','33'];

function NumerologyKidsBackground({ children }) {
  const canvasRef = useRef();
  const starsRef = useRef([]);
  const numbersRef = useRef([]);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    // Init stars
    starsRef.current = Array.from({ length: NUM_STARS }, () => ({
      x: randomBetween(0, width),
      y: randomBetween(0, height),
      r: randomBetween(0.7, 2.2),
      dx: randomBetween(-0.08, 0.08),
      dy: randomBetween(-0.08, 0.08)
    }));
    // Init numbers
    numbersRef.current = Array.from({ length: NUM_NUMBERS }, (_, i) => ({
      x: randomBetween(0, width),
      y: randomBetween(0, height),
      value: NUMBER_VALUES[i % NUMBER_VALUES.length],
      angle: randomBetween(0, Math.PI * 2),
      dAngle: randomBetween(-0.003, 0.003),
      dx: randomBetween(-0.12, 0.12),
      dy: randomBetween(-0.12, 0.12)
    }));

    function animate() {
      // Move stars
      for (const star of starsRef.current) {
        star.x += star.dx;
        star.y += star.dy;
        if (star.x < 0 || star.x > width) star.dx *= -1;
        if (star.y < 0 || star.y > height) star.dy *= -1;
      }
      // Move numbers
      for (const num of numbersRef.current) {
        num.x += num.dx;
        num.y += num.dy;
        num.angle += num.dAngle;
        if (num.x < 0 || num.x > width) num.dx *= -1;
        if (num.y < 0 || num.y > height) num.dy *= -1;
      }
      drawConstellations(ctx, width, height, starsRef.current, numbersRef.current);
      animationRef.current = requestAnimationFrame(animate);
    }
    animate();
    // Resize handler
    function handleResize() {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="kids-bg-wrapper kids-bg-canvas-wrapper">
      <canvas ref={canvasRef} className="kids-bg-canvas"></canvas>
      <div className="kids-bg-overlay"></div>
      <div className="kids-bg-content">
        {children}
      </div>
    </div>
  );
}

export default NumerologyKidsBackground; 