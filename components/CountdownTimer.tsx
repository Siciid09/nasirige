'use client';

import { useState, useEffect } from 'react';

export default function CountdownTimer({ targetDate }: { targetDate: any }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // If no date from DB, default to Nov 24, 2026
    const target = targetDate 
      ? new Date(targetDate.seconds * 1000) 
      : new Date('2026-11-24');

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex gap-4 md:gap-8" data-aos="zoom-in">
      <div className="glass-card p-4 md:p-6 rounded-xl text-center w-20 md:w-32 bg-white/10 backdrop-blur-md border border-white/20">
        <span className="block text-3xl md:text-5xl font-bold text-white mb-1">{timeLeft.days}</span>
        <span className="text-[10px] md:text-xs text-blue-200 uppercase font-bold tracking-wider">Days</span>
      </div>
      <div className="glass-card p-4 md:p-6 rounded-xl text-center w-20 md:w-32 bg-white/10 backdrop-blur-md border border-white/20">
        <span className="block text-3xl md:text-5xl font-bold text-white mb-1">{timeLeft.hours}</span>
        <span className="text-[10px] md:text-xs text-blue-200 uppercase font-bold tracking-wider">Hrs</span>
      </div>
      <div className="glass-card p-4 md:p-6 rounded-xl text-center w-20 md:w-32 bg-white/10 backdrop-blur-md border border-white/20">
        <span className="block text-3xl md:text-5xl font-bold text-white mb-1">{timeLeft.minutes}</span>
        <span className="text-[10px] md:text-xs text-blue-200 uppercase font-bold tracking-wider">Mins</span>
      </div>
    </div>
  );
}