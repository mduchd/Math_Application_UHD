'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { Users, KeyRound, CheckCircle2, Clock, AlertCircle, School, Loader2 } from 'lucide-react';
import { TactileButton } from '@/components/kid/TactileButton';
import { MotionDialog } from '@/components/motion/MotionDialog';
import { sound } from '@/lib/sound';
import { cardMotion, gentleSpring, listItemVariants, staggerContainerVariants } from '@/lib/motion';
import { getMyStudentClasses, studentJoinClass } from '@/lib/api';

interface StudentClassItem {
  id: string;
  name: string;
  teacherName: string;
  joinCode: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export default function StudentClassroomPage() {
  const [classes, setClasses] = useState<StudentClassItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [inputCode, setInputCode] = useState('');
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const fetchClasses = async () => {
    try {
      const data = await getMyStudentClasses();
      const mapped: StudentClassItem[] = data.map((item) => ({
        id: item.classroom.id,
        name: item.classroom.name,
        teacherName: item.classroom.teacherName || 'Giáo viên bộ môn',
        joinCode: item.classroom.joinCode,
        status: item.status,
      }));
      setClasses(mapped);
    } catch {
      // Fallback hiển thị nếu chưa có lớp
      setClasses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;

    const code = inputCode.trim().toUpperCase();
    setIsSubmitting(true);
    try {
      await studentJoinClass(code);
      sound.playSuccess();
      setInputCode('');
      setShowJoinModal(false);
      setMessage({
        text: `Đã gửi mã "${code}" thành công! Bé hãy chờ thầy cô phê duyệt nhé! 🎉`,
        type: 'success',
      });
      await fetchClasses();
    } catch (err: any) {
      sound.playPop();
      setMessage({
        text: err?.message || 'Không thể tham gia lớp học. Bé kiểm tra lại mã lớp nhé!',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Tiêu đề & Nút Nhập mã vào lớp */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 md:p-8 rounded-4xl border-2 border-kid-border shadow-xs">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-black">
            <School className="w-4 h-4 text-emerald-600" /> Không Gian Lớp Học
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-black text-slate-800">
            Lớp Học Của Bé 🏫
          </h1>
          <p className="text-slate-600 text-xs md:text-sm font-semibold">
            Nơi kết nối với Thầy Cô, bạn bè cùng lớp và hoàn thành các bài tập hàng tuần.
          </p>
        </div>

        <TactileButton
          variant="yellow"
          size="md"
          className="font-black shrink-0 font-display text-amber-950"
          onClick={() => {
            sound.playPop();
            setShowJoinModal(true);
            setMessage(null);
          }}
        >
          <KeyRound className="w-4 h-4" />
          <span>Nhập Mã Vào Lớp</span>
        </TactileButton>
      </div>

      {/* Thông báo kết quả thao tác */}
      <AnimatePresence>
        {message && (
          <m.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 rounded-3xl border-2 flex items-center gap-3 font-bold text-sm ${
              message.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            )}
            <span>{message.text}</span>
          </m.div>
        )}
      </AnimatePresence>

      {/* Danh sách lớp bé đang tham gia */}
      <div className="space-y-4">
        <h2 className="text-base font-black text-slate-700 flex items-center gap-2">
          <Users className="w-5 h-5 text-amber-500" /> Lớp học của em ({classes.length})
        </h2>

        {loading ? (
          <div className="p-12 text-center bg-white rounded-4xl border-2 border-kid-border">
            <Loader2 className="w-8 h-8 text-amber-500 animate-spin mx-auto mb-3" />
            <p className="text-sm font-bold text-slate-700">Đang tải danh sách lớp học của bé...</p>
          </div>
        ) : classes.length === 0 ? (
          <div className="p-10 text-center bg-white rounded-4xl border-2 border-dashed border-slate-200 space-y-3">
            <span className="text-4xl">🎒</span>
            <p className="font-extrabold text-slate-800 text-base">
              Bé chưa tham gia lớp học nào!
            </p>
            <p className="text-sm text-slate-700 font-semibold max-w-sm mx-auto">
              Bé hãy xin Thầy Cô mã tham gia (gồm 6 ký tự) và bấm &quot;Nhập Mã Vào Lớp&quot; ở trên nhé!
            </p>
          </div>
        ) : (
          <m.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {classes.map((c) => {
              const isApproved = c.status === 'APPROVED';
              const isPending = c.status === 'PENDING';
              return (
                <m.div
                  key={c.id}
                  variants={listItemVariants}
                  whileHover={cardMotion.whileHover}
                  whileTap={cardMotion.whileTap}
                  transition={cardMotion.transition}
                  className={`bg-white rounded-3xl p-6 border-2 flex flex-col justify-between gap-4 shadow-sm select-none ${
                    isApproved ? 'border-emerald-200' : isPending ? 'border-amber-200' : 'border-rose-200'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">🏫</span>
                      {isApproved ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-black rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Đã Vào Lớp
                        </span>
                      ) : isPending ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-amber-900 text-xs font-black rounded-full">
                          <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" /> Chờ Thầy Cô Duyệt
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-100 text-rose-800 text-xs font-black rounded-full">
                          Từ Chối
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="font-display font-black text-lg text-slate-800">
                        {c.name}
                      </h3>
                      <p className="text-sm font-bold text-slate-700 mt-0.5">
                        Giáo viên: <span className="text-slate-900 font-black">{c.teacherName}</span>
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-extrabold text-slate-700">Mã Lớp:</span>
                    <span className="font-mono font-black text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-200">
                      {c.joinCode}
                    </span>
                  </div>
                </m.div>
              );
            })}
          </m.div>
        )}
      </div>

      {/* Modal Nhập Mã Lớp Học */}
      <MotionDialog
        open={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        ariaLabel="Nhập mã tham gia lớp học"
        panelClassName="bg-white rounded-4xl max-w-md w-full p-6 md:p-8 space-y-6 border-2 border-kid-border shadow-2xl relative"
      >
        <button
          onClick={() => setShowJoinModal(false)}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-black flex items-center justify-center text-sm"
        >
          ✕
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto text-2xl">
            🔑
          </div>
          <h3 className="font-display text-2xl font-black text-slate-800">
            Tham Gia Lớp Mới
          </h3>
          <p className="text-xs text-slate-500 font-semibold leading-relaxed">
            Nhập mã xác nhận 6 ký tự do Thầy/Cô cung cấp (ví dụ: TOAN3A)
          </p>
        </div>

        <form onSubmit={handleJoinSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              required
              maxLength={8}
              placeholder="VD: TOAN3A"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value.toUpperCase())}
              className="w-full text-center font-display font-black text-2xl tracking-widest px-4 py-3 bg-amber-50/30 border-2 border-amber-200 rounded-2xl focus:border-amber-400 focus:outline-none placeholder:text-slate-300 uppercase"
            />
          </div>

          <TactileButton
            variant="green"
            size="lg"
            type="submit"
            disabled={isSubmitting}
            isLoading={isSubmitting}
            loadingText="Đang gửi yêu cầu..."
            className="w-full font-display font-black"
          >
            <span>Gửi Yêu Cầu Vào Lớp</span>
          </TactileButton>
        </form>
      </MotionDialog>
    </div>
  );
}
