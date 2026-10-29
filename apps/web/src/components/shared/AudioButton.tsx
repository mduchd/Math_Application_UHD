'use client';

import React, { useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { sound } from '@/lib/sound';
import { playfulSpring } from '@/lib/motion';

interface AudioButtonProps {
  textToRead: string;
}

export const AudioButton: React.FC<AudioButtonProps> = ({ textToRead }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleSpeak = () => {
    sound.playPop();

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Trình duyệt của bạn chưa hỗ trợ đọc giọng nói!');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'vi-VN';
    utterance.rate = 0.88; // Đọc chậm rãi, truyền cảm cho học sinh tiểu học nghe

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <m.button
      type="button"
      onClick={handleSpeak}
      whileHover={{ opacity: 0.82 }}
      whileTap={{ opacity: 0.7 }}
      transition={playfulSpring}
      aria-pressed={isPlaying}
      className={`inline-flex min-h-11 items-center gap-2 rounded-xl px-3.5 py-1.5 text-sm font-extrabold transition-colors select-none ${
        isPlaying
          ? 'bg-amber-200 text-amber-950'
          : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
      }`}
      title="Bấm để nghe đọc câu hỏi"
    >
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={isPlaying ? 'stop' : 'play'}
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.7, rotate: -12 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.7, rotate: 12 }}
          transition={{ duration: 0.14 }}
          className="inline-flex"
        >
          {isPlaying ? (
            <VolumeX className="w-4 h-4 text-amber-950" />
          ) : (
            <Volume2 className="w-4 h-4 text-amber-600" />
          )}
        </m.span>
      </AnimatePresence>
      <span>{isPlaying ? 'Đang đọc...' : 'Nghe câu hỏi'}</span>
    </m.button>
  );
};
