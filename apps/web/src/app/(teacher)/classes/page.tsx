'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { MotionDialog } from '@/components/motion/MotionDialog';
import { cardMotion, gentleSpring, listItemVariants, staggerContainerVariants } from '@/lib/motion';
import {
  Users,
  Plus,
  KeyRound,
  Link as LinkIcon,
  Check,
  X,
  Copy,
  Clock,
  CheckCircle2,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { Classroom, ClassroomMember } from '@kid-elearning/types';
import {
  createTeacherClass,
  getClassMembers,
  getMyTeacherClasses,
  reviewClassMember,
  seedDemoClass,
} from '@/lib/api';
import { sound } from '@/lib/sound';

interface PendingRequestItem {
  id: string; // member id
  studentName: string;
  className: string;
  avatar: string;
  time: string;
}

export default function TeacherClassesPage() {
  const [classes, setClasses] = useState<Classroom[]>([]);
  const [pendingRequests, setPendingRequests] = useState<PendingRequestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [newGradeLevel, setNewGradeLevel] = useState(3);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const fetchClassesAndRequests = async () => {
    try {
      const classList = await getMyTeacherClasses();
      setClasses(classList);

      // Thu thập các yêu cầu PENDING từ các lớp
      const requestsList: PendingRequestItem[] = [];
      for (const cls of classList) {
        try {
          const members = await getClassMembers(cls.id);
          const pending = members.filter((m) => m.status === 'PENDING');
          for (const p of pending) {
            requestsList.push({
              id: p.id,
              studentName: p.studentName,
              className: cls.name,
              avatar: p.studentAvatar || '🦉',
              time: new Date(p.requestedAt).toLocaleTimeString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit',
              }),
            });
          }
        } catch {
          // Bỏ qua lỗi từng lớp
        }
      }
      setPendingRequests(requestsList);
    } catch {
      setClasses([]);
      setPendingRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClassesAndRequests();
  }, []);

  const handleSeedDemo = async () => {
    sound.playPop();
    try {
      setLoading(true);
      await seedDemoClass();
      sound.playSuccess();
      await fetchClassesAndRequests();
      alert('Đã nạp thành công Lớp 3A mẫu cùng 3 học sinh và bài thi thực tế!');
    } catch (err: any) {
      alert(err?.message || 'Không thể nạp dữ liệu mẫu.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim()) return;

    setIsCreating(true);
    try {
      await createTeacherClass(newClassName.trim(), newGradeLevel);
      sound.playSuccess();
      setNewClassName('');
      setShowModal(false);
      await fetchClassesAndRequests();
    } catch (err: any) {
      alert(err?.message || 'Không thể tạo lớp học. Vui lòng thử lại!');
    } finally {
      setIsCreating(false);
    }
  };

  const handleCopy = (code: string) => {
    sound.playPop();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleApprove = async (memberId: string) => {
    sound.playSuccess();
    try {
      await reviewClassMember(memberId, 'APPROVE');
      setPendingRequests((prev) => prev.filter((r) => r.id !== memberId));
      await fetchClassesAndRequests();
    } catch (err: any) {
      alert(err?.message || 'Lỗi khi duyệt học sinh.');
    }
  };

  const handleReject = async (memberId: string) => {
    sound.playPop();
    try {
      await reviewClassMember(memberId, 'REJECT');
      setPendingRequests((prev) => prev.filter((r) => r.id !== memberId));
      await fetchClassesAndRequests();
    } catch (err: any) {
      alert(err?.message || 'Lỗi khi từ chối học sinh.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Tiêu đề & Nút Mở lớp */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Quản Lý Lớp Học & Duyệt Học Sinh
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Tạo lớp, cấp mã PIN xác nhận cho học sinh và phê duyệt yêu cầu vào lớp theo thời gian thực.
          </p>
        </div>

        <m.button
          onClick={() => {
            sound.playPop();
            setShowModal(true);
          }}
          whileHover={{ y: -1, scale: 1.015 }}
          whileTap={{ scale: 0.98 }}
          transition={gentleSpring}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Mở Lớp Học Mới</span>
        </m.button>
      </div>

      {/* DANH SÁCH HỌC SINH ĐANG CHỜ PHÊ DUYỆT */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-bold text-slate-800">
              Yêu Cầu Tham Gia Chờ Duyệt ({pendingRequests.length})
            </h2>
          </div>
          <span className="text-xs font-bold text-slate-600">
            Học sinh nhập đúng mã PIN lớp mới được gửi yêu cầu
          </span>
        </div>

        {loading ? (
          <div className="p-8 text-center bg-slate-50 rounded-xl text-slate-700 text-sm font-semibold">
            <Loader2 className="w-6 h-6 animate-spin text-emerald-600 mx-auto mb-2" />
            Đang tải dữ liệu lớp học...
          </div>
        ) : pendingRequests.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-xl text-slate-700 text-sm font-bold border border-dashed border-slate-200">
            ✨ Không có học sinh nào đang chờ duyệt. Lớp học đang ổn định!
          </div>
        ) : (
          <m.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {pendingRequests.map((req) => (
                <m.div
                  key={req.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, x: 12 }}
                  transition={gentleSpring}
                  className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center text-2xl shadow-xs border border-amber-200">
                      {req.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{req.studentName}</h3>
                      <p className="text-xs text-slate-700 font-semibold">{req.className}</p>
                      <span className="text-xs text-amber-800 font-bold">{req.time}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <m.button
                      onClick={() => handleApprove(req.id)}
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.96 }}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-xs transition-colors flex items-center gap-1 text-xs font-bold"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Duyệt</span>
                    </m.button>
                    <button
                      onClick={() => handleReject(req.id)}
                      className="p-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors active:scale-95"
                      title="Từ chối"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </m.div>
              ))}
            </AnimatePresence>
          </m.div>
        )}
      </div>

      {/* DANH SÁCH CÁC LỚP HỌC HIỆN CÓ CỦA GIÁO VIÊN */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-800">Danh Sách Lớp Đang Giảng Dạy ({classes.length})</h2>

        {classes.length === 0 && !loading ? (
          <div className="p-10 text-center bg-white rounded-2xl border border-dashed border-slate-200 space-y-3">
            <span className="text-4xl">🏫</span>
            <p className="text-sm font-bold text-slate-700">Thầy/Cô chưa mở lớp học nào!</p>
            <p className="text-sm text-slate-700 font-semibold max-w-sm mx-auto">
              Bấm nút &quot;Mở Lớp Học Mới&quot; ở góc phải để tạo lớp và chia sẻ mã PIN cho học sinh.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleSeedDemo}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-black shadow-xs transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                <span>Nạp Thử Lớp Học Mẫu Có Học Sinh Sẵn (1-Click)</span>
              </button>
            </div>
          </div>
        ) : (
          <m.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {classes.map((c) => (
              <m.div
                key={c.id}
                layout
                variants={listItemVariants}
                whileHover={cardMotion.whileHover}
                transition={gentleSpring}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-emerald-300 hover:shadow-sm transition-colors space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                      Khối Lớp {c.gradeLevel}
                    </span>
                    <div className="w-auto px-2.5 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-700 font-bold text-xs border border-slate-200">
                      {c.memberCount} Học sinh
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">{c.name}</h3>
                </div>

                {/* Hộp mã xác nhận PIN */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 flex items-center gap-1 font-semibold">
                      <KeyRound className="w-3.5 h-3.5 text-emerald-600" /> Mã PIN vào lớp:
                    </span>
                    <button
                      onClick={() => handleCopy(c.joinCode)}
                      className="font-mono font-black text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200 hover:border-emerald-500 flex items-center gap-1.5 transition-colors"
                    >
                      <span>{c.joinCode}</span>
                      <Copy className="w-3.5 h-3.5 text-slate-600" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/60">
                    <span className="text-slate-700 flex items-center gap-1 font-bold">
                      <LinkIcon className="w-3.5 h-3.5 text-emerald-600" /> Link mời:
                    </span>
                    <button
                      onClick={() => handleCopy(c.inviteLink)}
                      className="text-emerald-700 hover:text-emerald-800 font-bold text-xs"
                    >
                      {copiedCode === c.inviteLink ? '✓ Đã sao chép' : 'Sao chép link'}
                    </button>
                  </div>
                </div>
              </m.div>
            ))}
          </m.div>
        )}
      </div>

      {/* MODAL MỞ LỚP HỌC MỚI */}
      <MotionDialog
        open={showModal}
        onClose={() => setShowModal(false)}
        ariaLabel="Mở lớp học mới"
        panelClassName="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-5 border border-slate-200"
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-900">Mở Lớp Học Mới</h3>
          <button
            onClick={() => setShowModal(false)}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center text-xs font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleCreateClass} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Tên Lớp Học
            </label>
            <input
              type="text"
              required
              placeholder="Ví dụ: Lớp 3B - Chuyên đề Toán Vui"
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Khối Lớp</label>
            <select
              value={newGradeLevel}
              onChange={(e) => setNewGradeLevel(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
            >
              <option value={1}>Khối 1</option>
              <option value={2}>Khối 2</option>
              <option value={3}>Khối 3</option>
              <option value={4}>Khối 4</option>
              <option value={5}>Khối 5</option>
            </select>
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-900 border border-emerald-200">
            ℹ️ Sau khi tạo lớp, hệ thống sẽ tự sinh <strong>Mã PIN 6 ký tự</strong> để học sinh nhập từ máy tính bảng xin vào lớp.
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isCreating}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs disabled:opacity-60"
            >
              {isCreating ? 'Đang tạo...' : 'Xác Nhận Mở Lớp'}
            </button>
          </div>
        </form>
      </MotionDialog>
    </div>
  );
}
