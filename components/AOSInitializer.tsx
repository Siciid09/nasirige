'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AOSInitializer() {
  useEffect(() => {
    AOS.init({ 
      once: true, 
      offset: 100, 
      duration: 800,
      easing: 'ease-out-cubic',
    });
  }, []);

  return null; // This component renders nothing, just runs logic
}