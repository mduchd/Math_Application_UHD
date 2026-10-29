'use client';

import React, { useState, useRef, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  RotateCcw,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { MascotOwl } from '@/components/kid/MascotOwl';
import { sound } from '@/lib/sound';
import { playfulSpring, gentleSpring } from '@/lib/motion';

interface Message {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  time: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'intro-1',
    role: 'assistant',
    content:
      'Xin chào! Mình là Cú Vàng AI 🦉. Bé hoặc Ba Mẹ cần hỏi toán hay thông tin gì cứ nhắn cho mình nhé!',
    time: 'Vừa xong',
  },
];

const SUGGESTIONS = [
  { label: '25 + 38 = ?', prompt: '25 + 38 bằng mấy hả Cú Vàng?' },
  { label: 'Gặp người lạ cho kẹo', prompt: 'Khi gặp người lạ cho kẹo thì bé nên làm gì để an toàn?' },
  { label: 'Nhận 50 Sao Vàng', prompt: 'Làm thế nào để bé nhận được 50 Sao Vàng đổi trang phục?' },
  { label: 'Mã PIN lớp học', prompt: 'Mã PIN lớp học của học sinh là gì và lấy ở đâu?' },
];

export const LandingAIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [owlMood, setOwlMood] = useState<'waving' | 'happy' | 'thinking' | 'celebrating'>('waving');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  const toggleChat = () => {
    sound.playPop();
    setIsOpen((prev) => !prev);
    if (isOpen) {
      setIsFullscreen(false);
    }
  };

  const toggleFullscreen = () => {
    sound.playPop();
    setIsFullscreen((prev) => !prev);
  };

  const handleReset = () => {
    sound.playPop();
    setMessages(INITIAL_MESSAGES);
  };

  const handleSend = async (customPrompt?: string) => {
    const messageText = (customPrompt || input).trim();
    if (!messageText || isLoading) return;

    sound.playPop();
    setInput('');

    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const userMessage: Message = {
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
        }),
      });

      if (!response.ok) throw new Error('API error');

      const data = await response.json();
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'Cú Vàng đang lắng nghe! Bạn có câu hỏi nào nữa không?',
        time: timeString,
      };

      setMessages((prev) => [...prev, botMessage]);
      setOwlMood('celebrating');
      sound.playSuccess();
    } catch {
      const errorMessage: Message = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: '🦉 Cú Vàng đang suy nghĩ thêm một chút, bạn thử bấm lại hoặc chọn các câu hỏi gợi ý bên dưới nhé!',
        time: timeString,
      };
      setMessages((prev) => [...prev, errorMessage]);
      setOwlMood('happy');
    } finally {
      setIsLoading(false);
      setTimeout(() => setOwlMood('waving'), 3500);
    }
  };

  return (
    <>
      {/* 1. Floating Launcher Button (Ẩn khi đang mở chat để không đè) */}
      <AnimatePresence>
        {!isOpen && (
          <div className="fixed bottom-6 left-6 sm:bottom-8 sm:left-8 z-40 select-none">
            <m.button
              type="button"
              onClick={toggleChat}
              aria-label="Mở chat Cú Vàng AI"
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ y: 2, scale: 0.95 }}
              transition={playfulSpring}
              className="group flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full sm:rounded-2xl bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 text-amber-950 border-2 border-amber-600 shadow-tactile-yellow hover:brightness-105 active:shadow-none transition-all cursor-pointer"
            >
              <span className="text-xl sm:text-2xl">🦉</span>
              <span className="font-display font-black text-xs sm:text-sm text-amber-950 tracking-tight">
                Hỏi Cú Vàng AI
              </span>
            </m.button>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Chat Window (Gọn gàng, không text thừa) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop khi phóng to toàn màn hình */}
            {isFullscreen && (
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={toggleFullscreen}
                className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs"
              />
            )}

            <m.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={gentleSpring}
              className={`fixed z-50 bg-white border-3 border-amber-400 shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ease-out ${
                isFullscreen
                  ? 'inset-3 sm:inset-6 md:inset-10 max-w-4xl mx-auto rounded-3xl'
                  : 'bottom-6 left-4 sm:left-8 w-[calc(100vw-2rem)] sm:w-[390px] h-[520px] max-h-[82vh] rounded-3xl'
              }`}
            >
              {/* Header Tối Giản: 1 Dòng, Không Text Thừa */}
              <div className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 px-3.5 py-2.5 border-b-2 border-amber-400/80 flex items-center justify-between shadow-xs shrink-0 select-none">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xl shrink-0">🦉</span>
                  <h3 className="font-display font-black text-sm text-amber-950 truncate">
                    Cú Vàng AI
                  </h3>
                </div>

                <div className="flex items-center gap-0.5 shrink-0">
                  {/* Nút Phóng to / Thu nhỏ */}
                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    className="p-1.5 text-amber-950 hover:bg-amber-500/25 rounded-lg transition-colors cursor-pointer"
                    title={isFullscreen ? 'Thu nhỏ' : 'Phóng to'}
                    aria-label={isFullscreen ? 'Thu nhỏ' : 'Phóng to'}
                  >
                    {isFullscreen ? (
                      <Minimize2 className="w-4 h-4 stroke-[2.5]" />
                    ) : (
                      <Maximize2 className="w-4 h-4 stroke-[2.5]" />
                    )}
                  </button>

                  {/* Nút Xóa lịch sử */}
                  <button
                    type="button"
                    onClick={handleReset}
                    className="p-1.5 text-amber-950 hover:bg-amber-500/25 rounded-lg transition-colors cursor-pointer"
                    title="Xóa đoạn chat"
                    aria-label="Xóa đoạn chat"
                  >
                    <RotateCcw className="w-4 h-4 stroke-[2]" />
                  </button>

                  {/* Nút Đóng */}
                  <button
                    type="button"
                    onClick={toggleChat}
                    className="p-1.5 text-amber-950 hover:bg-amber-500/25 rounded-lg transition-colors cursor-pointer"
                    title="Đóng"
                    aria-label="Đóng"
                  >
                    <X className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* Chat Body & Fullscreen Companion Owl */}
              <div className="flex-1 flex overflow-hidden">
                {/* Con Cú Vàng ở bên cạnh khi phóng to toàn màn hình */}
                {isFullscreen && (
                  <div className="hidden md:flex w-64 bg-gradient-to-b from-amber-100/70 via-amber-50 to-white border-r-2 border-amber-200/80 p-5 flex-col items-center justify-center text-center select-none shrink-0">
                    <div
                      onClick={() => {
                        sound.playPop();
                        setOwlMood((prev) =>
                          prev === 'waving' ? 'happy' : prev === 'happy' ? 'celebrating' : 'waving'
                        );
                      }}
                      className="flex flex-col items-center gap-3 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                      title="Bấm vào Cú Vàng để tương tác"
                    >
                      <MascotOwl size="lg" mood={owlMood} className="drop-shadow-md" />
                      <span className="font-display font-black text-xs text-amber-950 bg-white border-2 border-amber-300 rounded-full px-3 py-1 shadow-xs">
                        Cú Vàng AI 🦉
                      </span>
                    </div>
                  </div>
                )}

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-3.5 sm:p-5 space-y-3 bg-gradient-to-b from-amber-50/20 to-white text-slate-800">
                  {messages.map((msg) => {
                    const isBot = msg.role === 'assistant';
                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-2 ${isBot ? 'justify-start' : 'justify-end'}`}
                      >
                        {isBot && (
                          <div className="w-6 h-6 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-xs shrink-0 mt-0.5">
                            🦉
                          </div>
                        )}
                        <div
                          className={`max-w-[85%] rounded-2xl px-3.5 py-2 shadow-xs ${
                            isBot
                              ? 'bg-white border-2 border-amber-200/80 rounded-tl-xs text-slate-800 font-semibold'
                              : 'bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-tr-xs font-bold'
                          }`}
                        >
                          <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                            {msg.content}
                          </div>
                          <div
                            className={`text-[9px] mt-1 font-bold ${
                              isBot ? 'text-slate-400 text-left' : 'text-sky-100 text-right'
                            }`}
                          >
                            {msg.time}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Loading indicator */}
                  {isLoading && (
                    <div className="flex gap-2 justify-start items-center">
                      <div className="w-6 h-6 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-xs shrink-0">
                        🦉
                      </div>
                      <div className="bg-white border-2 border-amber-200/80 rounded-2xl rounded-tl-xs px-3 py-1.5 shadow-xs flex items-center gap-1.5 text-xs font-bold text-amber-950">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce" />
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce"
                          style={{ animationDelay: '0.15s' }}
                        />
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce"
                          style={{ animationDelay: '0.3s' }}
                        />
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Suggestions Chips (Ngắn gọn) */}
              <div className="px-3 py-1.5 bg-amber-50/60 border-t border-amber-200/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 select-none">
                {SUGGESTIONS.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSend(item.prompt)}
                    disabled={isLoading}
                    className="px-2.5 py-1 rounded-lg bg-white hover:bg-amber-100 border border-amber-300/80 text-[11px] font-extrabold text-amber-950 whitespace-nowrap shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Input Bar */}
              <div className="p-2.5 bg-white border-t-2 border-amber-200/80 shrink-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Nhập câu hỏi..."
                    disabled={isLoading}
                    className="flex-1 bg-slate-50 border-2 border-amber-200/90 focus:border-amber-500 focus:bg-white rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-slate-800 placeholder:text-slate-400 !outline-none focus:!outline-none focus-visible:!outline-none ring-0 focus:ring-0 transition-colors"
                    style={{ outline: 'none' }}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    aria-label="Gửi tin nhắn"
                    className="p-2 sm:px-2.5 sm:py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 border-2 border-amber-600 shadow-tactile-yellow active:shadow-none active:translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shrink-0"
                  >
                    <Send className="w-3.5 h-3.5 text-amber-950 stroke-[2.5]" />
                  </button>
                </form>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
