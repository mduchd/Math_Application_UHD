import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '../../database/prisma';
import { Prisma } from '@prisma/client';
import { ProficiencyLevel, AILearningPlan, WeeklyMilestone } from '@kid-elearning/types';

export interface QuestionReviewDetail {
  questionId: string;
  questionText: string;
  selectedOptionId?: string;
  correctOptionId: string;
  isCorrect: boolean;
  explanation: string;
}

@Injectable()
export class AIPlannerService {
  private readonly logger = new Logger(AIPlannerService.name);

  /**
   * Tạo kế hoạch học tập cá nhân hóa do DeepSeek AI lập ra cho học sinh dựa vào kết quả bài kiểm tra
   */
  async generateLearningPlan(
    studentId: string,
    submissionId: string,
    level: ProficiencyLevel,
    score: number,
    detailedReview?: QuestionReviewDetail[],
    studentInfo?: { fullName?: string; gradeLevel?: number; avatarMascot?: string },
  ): Promise<AILearningPlan> {
    const apiKey = process.env.DEEPSEEK_API_KEY?.trim();
    let planData: {
      summary: string;
      strengths: string[];
      areasToImprove: string[];
      weeklyMilestones: WeeklyMilestone[];
    } | null = null;

    if (apiKey && apiKey !== 'your-deepseek-api-key-here') {
      try {
        this.logger.log(`Connecting to DeepSeek AI to personalize learning plan for student ${studentId}...`);
        planData = await this.callDeepSeek(level, score, detailedReview, studentInfo);
      } catch (error) {
        this.logger.warn(`DeepSeek API call failed or timed out. Falling back to educational smart rules template: ${error}`);
      }
    } else {
      this.logger.log('DEEPSEEK_API_KEY not configured yet. Using pedagogical smart rules engine.');
    }

    // Nếu không gọi được DeepSeek hoặc chưa có KEY, dùng bộ quy tắc sư phạm tiểu học chuẩn xác
    if (!planData) {
      planData = this.createDefaultPlan(level, score);
    }

    // Lưu vào cơ sở dữ liệu qua Prisma
    const savedPlan = await prisma.learningPlan.upsert({
      where: { submissionId },
      create: {
        studentId,
        submissionId,
        level,
        weeklyMilestones: planData.weeklyMilestones as unknown as Prisma.InputJsonValue,
      },
      update: {
        level,
        weeklyMilestones: planData.weeklyMilestones as unknown as Prisma.InputJsonValue,
      },
    });

    return {
      id: savedPlan.id,
      studentId,
      submissionId,
      level,
      summary: planData.summary,
      strengths: planData.strengths,
      areasToImprove: planData.areasToImprove,
      weeklyMilestones: planData.weeklyMilestones,
      createdAt: savedPlan.createdAt.toISOString(),
    };
  }

  /**
   * Gửi prompt tới DeepSeek API (endpoint OpenAI compatible: https://api.deepseek.com/chat/completions)
   */
  private async callDeepSeek(
    level: ProficiencyLevel,
    score: number,
    detailedReview?: QuestionReviewDetail[],
    studentInfo?: { fullName?: string; gradeLevel?: number; avatarMascot?: string },
  ): Promise<{
    summary: string;
    strengths: string[];
    areasToImprove: string[];
    weeklyMilestones: WeeklyMilestone[];
  }> {
    const baseUrl = (process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com').replace(/\/+$/, '');
    const model = process.env.DEEPSEEK_MODEL || 'deepseek-chat';
    const apiKey = process.env.DEEPSEEK_API_KEY;

    const studentName = studentInfo?.fullName || 'Bé';
    const grade = studentInfo?.gradeLevel || 3;
    const mascot = studentInfo?.avatarMascot || 'Cú Bi';

    const systemPrompt = `Bạn là Cú Bi Thông Thái - linh vật thông minh và chuyên gia giáo dục tiểu học tại nền tảng Trường Học Vui Vẻ (kid-elearning).
Nhiệm vụ của bạn là phân tích bài kiểm tra năng lực của học sinh tiểu học (lớp ${grade}) và lập một kế hoạch học tập cá nhân hóa 3 tuần vô cùng vui vẻ, sinh động, dễ thương và bổ ích.

YÊU CẦU BẮT BUỘC:
1. Giọng văn: Thân thiện, khích lệ, dùng từ ngữ phù hợp với học sinh tiểu học (ví dụ: "chúng mình", "bé", "thám hiểm", "ngôi sao", "chinh phục").
2. Phân tích cụ thể những câu bé làm đúng (khen ngợi) và những câu bé làm sai (chỉ ra cách khắc phục nhẹ nhàng).
3. ĐẦU RA PHẢI LÀ MỘT OBJECT JSON HỢP LỆ THEO SCHEMA SAU (không chứa markdown backticks ngoài JSON):
{
  "summary": "Đoạn văn ngắn 2-3 câu nhận xét ấm áp, động viên bé",
  "strengths": ["Điểm mạnh 1", "Điểm mạnh 2"],
  "areasToImprove": ["Điểm cần rèn luyện 1", "Điểm cần rèn luyện 2"],
  "weeklyMilestones": [
    {
      "week": 1,
      "title": "Tên chặng tuần 1 (hấp dẫn)",
      "focusArea": "Chủ đề trọng tâm",
      "recommendedLessons": ["Tên bài học 1", "Tên bài học 2"],
      "recommendedGames": ["Tên trò chơi ôn tập 1", "Tên trò chơi ôn tập 2"],
      "dailyPracticeMinutes": 15
    },
    {
      "week": 2,
      "title": "Tên chặng tuần 2",
      "focusArea": "Chủ đề trọng tâm",
      "recommendedLessons": ["Tên bài học 3", "Tên bài học 4"],
      "recommendedGames": ["Tên trò chơi ôn tập 3"],
      "dailyPracticeMinutes": 15
    },
    {
      "week": 3,
      "title": "Tên chặng tuần 3 (về đích Trạng Nguyên)",
      "focusArea": "Chủ đề trọng tâm",
      "recommendedLessons": ["Tên bài học 5", "Tên bài học 6"],
      "recommendedGames": ["Tên trò chơi thử thách lớn"],
      "dailyPracticeMinutes": 20
    }
  ]
}`;

    const reviewSummary = detailedReview && detailedReview.length > 0
      ? detailedReview
          .map(
            (r, i) =>
              `Câu ${i + 1}: "${r.questionText}" -> Bé ${r.isCorrect ? 'LÀM ĐÚNG' : 'LÀM CHƯA ĐÚNG'}. Giải thích: ${r.explanation}`,
          )
          .join('\n')
      : 'Không có dữ liệu chi tiết từng câu hỏi.';

    const userPrompt = `Học sinh: ${studentName} (Lớp ${grade}).
Điểm đạt được: ${score}/100.
Xếp loại năng lực: ${level === 'BASIC' ? 'Cơ bản' : level === 'APPLIED' ? 'Vận dụng' : 'Vận dụng cao'}.
Chi tiết bài làm:
${reviewSummary}

Hãy tạo kế hoạch học tập 3 tuần cá nhân hóa dạng JSON cho bé:`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s timeout

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      throw new Error(`DeepSeek API responded with HTTP ${response.status}: ${errText}`);
    }

    const result = await response.json();
    const content = result.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error('DeepSeek returned empty content');
    }

    const parsed = JSON.parse(content);
    if (!parsed.summary || !Array.isArray(parsed.weeklyMilestones)) {
      throw new Error('DeepSeek response does not match expected schema');
    }

    return {
      summary: parsed.summary,
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths : ['Chăm chỉ làm bài kiểm tra'],
      areasToImprove: Array.isArray(parsed.areasToImprove) ? parsed.areasToImprove : ['Rèn luyện thêm bài tập tư duy'],
      weeklyMilestones: parsed.weeklyMilestones.map((m: any, idx: number) => ({
        week: m.week ?? idx + 1,
        title: m.title || `Tuần ${idx + 1}: Chinh phục kiến thức`,
        focusArea: m.focusArea || 'Ôn tập tổng hợp',
        recommendedLessons: Array.isArray(m.recommendedLessons) ? m.recommendedLessons : ['Bài học trọng tâm'],
        recommendedGames: Array.isArray(m.recommendedGames) ? m.recommendedGames : ['Đua xe toán học'],
        dailyPracticeMinutes: m.dailyPracticeMinutes || 15,
      })),
    };
  }

  /**
   * Bộ quy tắc thông minh dự phòng khi chưa cấu hình Key DeepSeek hoặc mạng gián đoạn
   */
  private createDefaultPlan(
    level: ProficiencyLevel,
    score: number,
  ): {
    summary: string;
    strengths: string[];
    areasToImprove: string[];
    weeklyMilestones: WeeklyMilestone[];
  } {
    const levelVietnamese = {
      BASIC: 'Cơ bản',
      APPLIED: 'Vận dụng',
      ADVANCED: 'Vận dụng cao',
    }[level];

    if (level === 'BASIC') {
      return {
        summary: `Bé đạt cấp độ ${levelVietnamese} (${score}/100 điểm). Bạn Cú Bi thấy bé rất cẩn thận! Chúng mình sẽ cùng nhau ôn lại các phép tính có nhớ và phân tích đề bài để tự tin bứt phá nhé! 🌟`,
        strengths: ['Có ý thức hoàn thành bài kiểm tra cẩn thận', 'Nhận diện tình huống kỹ năng sống rất tốt'],
        areasToImprove: ['Rèn luyện kỹ năng tính toán có nhớ phạm vi 100', 'Tập tóm tắt từ khóa trong đề toán có lời văn'],
        weeklyMilestones: [
          {
            week: 1,
            title: 'Tuần 1: Thám hiểm phép cộng, trừ có nhớ',
            focusArea: 'Tính toán cơ bản và số tròn chục',
            recommendedLessons: ['Bài 1: Phép cộng có nhớ trong phạm vi 100', 'Bài 2: Tính nhanh các số tròn chục'],
            recommendedGames: ['Ong vàng chăm chỉ nhặt chữ', 'Nối phép tính đúng'],
            dailyPracticeMinutes: 15,
          },
          {
            week: 2,
            title: 'Tuần 2: Thám tử nhí tóm tắt đề bài',
            focusArea: 'Đọc hiểu lời văn bài toán',
            recommendedLessons: ['Bài 3: Cách tìm từ khóa trong bài toán', 'Bài 4: Bài toán về nhiều hơn, ít hơn'],
            recommendedGames: ['Thám tử nhí tìm đáp án'],
            dailyPracticeMinutes: 15,
          },
          {
            week: 3,
            title: 'Tuần 3: Vượt chướng ngại vật & Lấy huy hiệu Sao',
            focusArea: 'Ôn tập có hướng dẫn và tự tin giải đố',
            recommendedLessons: ['Bài 5: Luyện tập tổng hợp cộng trừ', 'Bài 6: Thử thách tự kiểm tra'],
            recommendedGames: ['Bảo vệ nông trại vui vẻ', 'Đua xe tính nhanh'],
            dailyPracticeMinutes: 15,
          },
        ],
      };
    } else if (level === 'APPLIED') {
      return {
        summary: `Chúc mừng bé đạt cấp độ ${levelVietnamese} (${score}/100 điểm)! Nền tảng của bé rất vững vàng. Cú Bi sẽ cùng bé chinh phục các bài toán 2 bước tính và kỹ năng tư duy phản biện nhé! 🚀`,
        strengths: ['Khả năng tính toán nhanh và chuẩn xác', 'Nắm chắc kiến thức trọng tâm bài học'],
        areasToImprove: ['Giải toán đố logic nhiều bước', 'Ứng dụng tính toán vào tình huống đời sống'],
        weeklyMilestones: [
          {
            week: 1,
            title: 'Tuần 1: Chinh phục bài toán giải bằng hai phép tính',
            focusArea: 'Toán tư duy vận dụng',
            recommendedLessons: ['Bài 5: Tìm hai số khi biết tổng và hiệu', 'Bài 6: Quy tắc giải toán tình huống'],
            recommendedGames: ['Đua xe toán học cùng bạn bè', 'Bảo vệ nông trại'],
            dailyPracticeMinutes: 20,
          },
          {
            week: 2,
            title: 'Tuần 2: Ứng dụng toán vào đời sống & Kỹ năng chi tiêu',
            focusArea: 'Kỹ năng sống & Quản lý chi tiêu',
            recommendedLessons: ['Bài 7: Em làm quen với tiền Việt Nam', 'Bài 8: Xử lý tình huống khi gặp sự cố'],
            recommendedGames: ['Đi siêu thị thông thái'],
            dailyPracticeMinutes: 20,
          },
          {
            week: 3,
            title: 'Tuần 3: Luyện phản xạ nhanh & Mê cung logic',
            focusArea: 'Củng cố tư duy linh hoạt',
            recommendedLessons: ['Bài 9: Bài toán nhiều hơn, ít hơn nâng cao', 'Bài 10: Luyện giải toán có lời văn'],
            recommendedGames: ['Mê cung logic tí hon', 'Thử thách đố vui'],
            dailyPracticeMinutes: 20,
          },
        ],
      };
    } else {
      return {
        summary: `Quá xuất sắc! Bé đạt mức độ ${levelVietnamese} (${score}/100 điểm) - danh hiệu Trạng Nguyên Nhí! Cú Bi sẽ mở khóa các bài toán mở rộng quy luật và thử thách sáng tạo đỉnh cao cho bé! 👑`,
        strengths: ['Tư duy logic sắc bén vượt trội', 'Khả năng quan sát quy luật và hình học xuất sắc'],
        areasToImprove: ['Tối ưu hóa các cách giải ngắn gọn nhất', 'Học cách diễn đạt lập luận mạch lạc cho bạn bè'],
        weeklyMilestones: [
          {
            week: 1,
            title: 'Tuần 1: Khám phá quy luật dãy số bí ẩn & Hình học',
            focusArea: 'Tư duy trừu tượng và hình không gian',
            recommendedLessons: ['Bài 9: Các bài toán dãy số kỳ thú', 'Bài 10: Xếp hình và đếm hình thần tốc'],
            recommendedGames: ['Đấu trường Trạng Nguyên nhí', 'Mê cung logic'],
            dailyPracticeMinutes: 25,
          },
          {
            week: 2,
            title: 'Tuần 2: Rèn luyện kỹ năng lãnh đạo & Thuyết trình',
            focusArea: 'Kỹ năng sống lãnh đạo và làm việc nhóm',
            recommendedLessons: ['Bài 11: Kỹ năng thuyết trình trước đám đông', 'Bài 12: Giúp đỡ bạn bè cùng tiến bộ'],
            recommendedGames: ['Trọng tài tí hon'],
            dailyPracticeMinutes: 25,
          },
          {
            week: 3,
            title: 'Tuần 3: Dự án sáng tạo nhí & Vươn tới Trạng Nguyên',
            focusArea: 'Tư duy sáng tạo và giải quyết vấn đề',
            recommendedLessons: ['Bài 13: Lập luận cho đáp án sáng tạo', 'Bài 14: Chia sẻ bí kíp học vui'],
            recommendedGames: ['Đấu trường Trạng Nguyên nhí'],
            dailyPracticeMinutes: 25,
          },
        ],
      };
    }
  }
}
