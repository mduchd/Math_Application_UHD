'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  RotateCcw,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Sparkles,
  HelpCircle,
  Calculator,
  Compass,
  Lightbulb,
} from 'lucide-react';
import { MascotOwl } from '@/components/kid/MascotOwl';
import { sound } from '@/lib/sound';
import { playfulSpring } from '@/lib/motion';
import { useAppStore } from '@/stores/useAppStore';
import { AIMessage, OwlMood } from '../types';

const INITIAL_MESSAGES = (studentName?: string, gradeLevel?: string | number): AIMessage[] => [
  {
    id: 'intro-student',
    role: 'assistant',
    content: `Chào ${studentName ? studentName : 'bạn nhỏ'}! 🦉 Mình là **Gia Sư Cú Vàng** của lớp Toán Vui.\n\nBé có bài toán nào chưa hiểu, cần gợi ý cách giải hay muốn đố vui toán học thì cứ nhắn cho mình nhé! ⭐`,
    time: 'Vừa xong',
  },
];

const MATH_SUGGESTIONS = [
  { label: '🧮 56 : 8 = ?', prompt: '56 chia 8 bằng mấy hả Cú Vàng?' },
  { label: '📐 Chu vi chữ nhật', prompt: 'Công thức tính chu vi hình chữ nhật là gì?' },
  { label: '⚡ Mẹo tính nhẩm', prompt: 'Chỉ cho em mẹo tính nhẩm nhanh với số 11!' },
  { label: '🎲 Đố vui toán học', prompt: 'Đố em một câu đố toán học vui đi Cú Vàng!' },
];

export const StudentAIAssistant: React.FC = () => {
  const currentUser = useAppStore((state) => state.currentUser);
  const addStars = useAppStore((state) => state.addStars);

  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [messages, setMessages] = useState<AIMessage[]>(() =>
    INITIAL_MESSAGES(currentUser?.fullName, currentUser?.gradeLevel)
  );
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [owlMood, setOwlMood] = useState<OwlMood>('waving');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showBubble, setShowBubble] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Tự ẩn bong bóng nhắc nhở sau 8 giây
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBubble(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  // Cuộn xuống tin nhắn mới nhất
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Focus ô input khi mở
  useEffect(() => {
    if (isOpen) {
      setShowBubble(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [isOpen]);

  const toggleChat = () => {
    sound.playPop();
    setIsOpen((prev) => !prev);
    if (isOpen) {
      setIsFullscreen(false);
      stopSpeech();
    }
  };

  const toggleFullscreen = () => {
    sound.playPop();
    setIsFullscreen((prev) => !prev);
  };

  const handleReset = () => {
    sound.playPop();
    stopSpeech();
    setMessages(INITIAL_MESSAGES(currentUser?.fullName, currentUser?.gradeLevel));
  };

  // Web Speech API đọc to tin nhắn cho học sinh nhỏ tuổi
  const stopSpeech = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const speakText = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      stopSpeech();
      return;
    }

    stopSpeech();
    // Loại bỏ markdown format để đọc tự nhiên
    const cleanText = text
      .replace(/[*_#`~]/g, '')
      .replace(/🦉|✨|⭐|🎉|📐|🧮|💡|👉|👏/g, '')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'vi-VN';
    utterance.rate = 0.95; // Tốc độ vừa phải cho trẻ em
    utterance.pitch = 1.1; // Giọng hơi trong trẻo vui tươi

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (customPrompt?: string) => {
    const messageText = (customPrompt || input).trim();
    if (!messageText || isLoading) return;

    sound.playPop();
    setInput('');
    stopSpeech();

    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const userMessage: AIMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageText,
      time: timeString,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);
    setOwlMood('thinking');

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          studentContext: {
            gradeLevel: currentUser?.gradeLevel || 3,
            name: currentUser?.fullName || '',
          },
        }),
      });

      if (!response.ok) throw new Error('API error');

      const data = await response.json();
      const botMessage: AIMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'Cú Vàng đang lắng nghe! Bé có câu hỏi nào nữa không?',
        time: timeString,
      };

      setMessages((prev) => [...prev, botMessage]);
      setOwlMood('celebrating');
      sound.playSuccess();

      // Thưởng 1 Sao Vàng ảo khích lệ tinh thần học hỏi nếu bé hỏi 2 câu trở lên
      if (newMessages.filter((m) => m.role === 'user').length % 2 === 0) {
        addStars(1);
      }
    } catch {
      const errorMessage: AIMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content:
          '🦉 Cú Vàng đang suy nghĩ thêm một chút, bé thử bấm lại hoặc chọn các câu hỏi gợi ý bên dưới nhé!',
        time: timeString,
      };
      setMessages((prev) => [...prev, errorMessage]);
      setOwlMood('happy');
    } finally {
      setIsLoading(false);
      setTimeout(() => setOwlMood('waving'), 3500);
    }
  };

  const gradeDisplay = currentUser?.gradeLevel ? `Lớp ${currentUser.gradeLevel}` : 'Lớp 1 - 5';

  return (
    <>
      {/* 1. NÚT KÍCH HOẠT NỔI (FLOATING TRIGGER) Ở GÓC DƯỚI BÊN PHẢI */}
      <AnimatePresence>
        {!isOpen && (
          <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 select-none flex flex-col items-end">
            {/* Bong bóng chào hỏi nhỏ xinh */}
            {showBubble && (
              <m.div
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                className="mb-2 bg-white text-slate-800 font-extrabold text-xs px-3.5 py-2 rounded-2xl border-2 border-amber-300 shadow-lg flex items-center gap-1.5 cursor-pointer relative"
                onClick={toggleChat}
              >
                <span>🦉 Có bài khó? Hỏi Cú Vàng nhé!</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-b-2 border-r-2 border-amber-300 rotate-45" />
              </m.div>
            )}

            {/* Nút bấm tròn hình Mascot Cú Vàng */}
            <m.button
              type="button"
              onClick={toggleChat}
              aria-label="Mở Gia Sư Cú Vàng AI"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95, y: 1 }}
              transition={playfulSpring}
              className="group relative flex items-center gap-2.5 px-3.5 py-2 md:px-4 md:py-2.5 rounded-full bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 text-amber-950 border-2 border-amber-600 shadow-tactile-yellow hover:brightness-105 active:shadow-none transition-all cursor-pointer"
            >
              <div className="w-9 h-9 md:w-10 md:h-10 shrink-0 relative">
                <MascotOwl size="sm" mood="waving" className="w-full h-full" />
              </div>
              <div className="flex flex-col text-left pr-1">
                <span className="font-display font-black text-xs md:text-sm text-amber-950 leading-tight flex items-center gap-1">
                  Gia Sư AI
                  <Sparkles className="w-3.5 h-3.5 text-amber-900 fill-amber-300 inline animate-spin-slow" />
                </span>
                <span className="text-[10px] font-extrabold text-amber-900/90 leading-none">
                  Hỏi Toán Vui
                </span>
              </div>
            </m.button>
          </div>
        )}
      </AnimatePresence>

      {/* 2. CỬA SỔ TRÒ CHUYỆN GIA SƯ AI TRONG APP */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={playfulSpring}
            className={`fixed z-50 flex flex-col bg-white rounded-3xl md:rounded-[2rem] border-3 border-amber-400 shadow-2xl overflow-hidden ${
              isFullscreen
                ? 'inset-3 sm:inset-6 md:inset-10'
                : 'bottom-20 md:bottom-6 right-3 md:right-6 w-[94vw] sm:w-[420px] h-[580px] max-h-[82vh]'
            }`}
          >
            {/* Header: Gia sư Cú Vàng + Tiện ích */}
            <header className="px-4 py-3 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 border-b-2 border-amber-500 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 shrink-0 bg-white/70 rounded-2xl p-1 border border-amber-600/30 flex items-center justify-center shadow-xs">
                  <MascotOwl size="sm" mood={owlMood} className="w-full h-full" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h2 className="font-display font-black text-sm md:text-base text-amber-950 leading-tight">
                      Gia Sư Cú Vàng AI
                    </h2>
                    <span className="px-1.5 py-0.5 rounded-full bg-amber-100 border border-amber-600/30 text-[9px] font-black text-amber-900">
                      Toán Vui
                    </span>
                  </div>
                  <p className="text-[11px] font-extrabold text-amber-900 flex items-center gap-1 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                    Đồng hành cùng bé ({gradeDisplay})
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleReset}
                  title="Bắt đầu cuộc trò chuyện mới"
                  className="p-1.5 rounded-xl hover:bg-white/40 text-amber-950 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  title={isFullscreen ? 'Thu nhỏ' : 'Phóng to'}
                  className="hidden sm:inline-flex p-1.5 rounded-xl hover:bg-white/40 text-amber-950 transition-colors"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={toggleChat}
                  title="Đóng trợ lý"
                  className="p-1.5 rounded-xl hover:bg-white/40 text-amber-950 transition-colors"
                >
                  <X className="w-5 h-5 font-black" />
                </button>
              </div>
            </header>

            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-kid-cream/40">
              {messages.map((message) => {
                const isBot = message.role === 'assistant';
                return (
                  <div
                    key={message.id}
                    className={`flex gap-2.5 ${isBot ? 'items-start' : 'items-end justify-end'}`}
                  >
                    {isBot && (
                      <div className="w-8 h-8 rounded-full bg-amber-200 border border-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-sm">🦉</span>
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] rounded-2.5xl px-4 py-3 text-sm font-bold shadow-xs relative group ${
                        isBot
                          ? 'bg-white text-slate-800 border-2 border-amber-200 rounded-tl-sm'
                          : 'bg-emerald-500 text-white border-2 border-emerald-600 rounded-br-sm'
                      }`}
                    >
                      <div className="whitespace-pre-line leading-relaxed font-body">
                        {message.content}
                      </div>

                      <div className="flex items-center justify-between gap-2 mt-2 pt-1 border-t border-slate-100/60">
                        <span
                          className={`text-[10px] font-semibold ${
                            isBot ? 'text-slate-600' : 'text-emerald-100'
                          }`}
                        >
                          {message.time}
                        </span>

                        {/* Nút bấm nghe giọng đọc cho tin nhắn của Cú Vàng */}
                        {isBot && (
                          <button
                            type="button"
                            onClick={() => speakText(message.content)}
                            title="Nghe Cú Vàng đọc lời giải"
                            className="inline-flex items-center gap-1 text-[10px] font-black text-amber-800 hover:text-amber-950 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200 transition-colors"
                          >
                            {isSpeaking ? (
                              <>
                                <VolumeX className="w-3 h-3 text-rose-600" />
                                <span>Dừng</span>
                              </>
                            ) : (
                              <>
                                <Volume2 className="w-3 h-3 text-amber-600" />
                                <span>Đọc</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex items-center gap-2 text-slate-700 text-xs font-black">
                  <div className="w-8 h-8 rounded-full bg-amber-200 border border-amber-400 flex items-center justify-center shrink-0 animate-bounce">
                    🦉
                  </div>
                  <div className="bg-white border-2 border-amber-200 px-4 py-2.5 rounded-2xl flex items-center gap-1.5 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse delay-150" />
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse delay-300" />
                    <span className="ml-1 text-slate-800 font-extrabold">Cú Vàng đang tính toán...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Math Suggestions */}
            <div className="px-3 py-2 bg-white border-t border-amber-200 shrink-0">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-[11px] font-black text-slate-800 uppercase tracking-wider">
                  Gợi ý nhanh cho bé:
                </span>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {MATH_SUGGESTIONS.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSend(item.prompt)}
                    className="shrink-0 px-2.5 py-1 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-950 font-black text-xs transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-white border-t-2 border-amber-200 flex items-center gap-2 shrink-0"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Nhập bài toán hoặc câu hỏi cho Cú Vàng..."
                className="flex-1 bg-slate-50 border-2 border-slate-200 focus:border-amber-400 focus:bg-white rounded-2xl px-3.5 py-2.5 text-sm font-bold text-slate-900 placeholder:text-slate-400 outline-none transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Gửi câu hỏi"
                className="px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-amber-950 font-black text-sm border-2 border-amber-600 shadow-tactile-yellow active:translate-y-0.5 active:shadow-none transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer shrink-0"
              >
                <span>Gửi</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};
