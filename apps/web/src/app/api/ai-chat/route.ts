import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Built-in intelligent pedagogical response generator when DeepSeek API is unconfigured or unavailable
function getPedagogicalResponse(userText: string): string {
  const text = userText.toLowerCase().trim();

  // 1. Math calculation & problem solving
  if (
    text.includes('toán') ||
    text.includes('+') ||
    text.includes('-') ||
    text.includes('x') ||
    text.includes('*') ||
    text.includes(':') ||
    text.includes('/') ||
    text.includes('phép tính') ||
    text.includes('phân số') ||
    text.includes('hình học') ||
    text.includes('diện tích') ||
    text.includes('chu vi')
  ) {
    // Check if there is an addition query like "15 + 28" or "25 + 37"
    const addMatch = text.match(/(\d+)\s*\+\s*(\d+)/);
    if (addMatch) {
      const a = parseInt(addMatch[1], 10);
      const b = parseInt(addMatch[2], 10);
      const sum = a + b;
      return `🦉 **Cú Vàng hướng dẫn bé tính nhé:**\n\nPhép tính: **${a} + ${b} = ${sum}** ✨\n\n💡 *Mẹo tính nhanh của Cú Vàng:* Hãy tách hàng chục và hàng đơn vị ra cộng riêng, bé sẽ thấy toán học cực kỳ đơn giản và thú vị! Bé muốn Cú Vàng đố thêm câu nào nữa không?`;
    }

    // Multiplication match like "7 x 8" or "6 * 9"
    const mulMatch = text.match(/(\d+)\s*[\*xX]\s*(\d+)/);
    if (mulMatch) {
      const a = parseInt(mulMatch[1], 10);
      const b = parseInt(mulMatch[2], 10);
      const product = a * b;
      return `🦉 **Lời giải từ Cú Vàng nè:**\n\nPhép nhân: **${a} × ${b} = ${product}** 🎉\n\n⭐ Bé hãy nhớ học thuộc bảng cửu chương để tính nhẩm như chớp nhé! Bạn muốn thử sức với bài toán đố vui tiếp theo không?`;
    }

    // Subtraction match
    const subMatch = text.match(/(\d+)\s*-\s*(\d+)/);
    if (subMatch) {
      const a = parseInt(subMatch[1], 10);
      const b = parseInt(subMatch[2], 10);
      return `🦉 **Cú Vàng bật mí kết quả nè:**\n\nPhép trừ: **${a} - ${b} = ${a - b}** 🌟\n\n💡 *Cách tính nhẩm dễ nhớ:* Bé trừ tròn chục trước, sau đó trừ tiếp hàng đơn vị nhé! Bé làm bài rất chăm chỉ, thưởng bé 1 Sao Vàng ảo ⭐!`;
    }

    // Division match like "56 : 8" or "72 / 9"
    const divMatch = text.match(/(\d+)\s*[:/]\s*(\d+)/);
    if (divMatch) {
      const a = parseInt(divMatch[1], 10);
      const b = parseInt(divMatch[2], 10);
      if (b === 0) {
        return `🦉 **Ối! Bé lưu ý nhé:** Trong toán học, chúng mình **không thể chia cho số 0** đâu nè! Thử một số khác lớn hơn 0 nhé! 😊`;
      }
      const quotient = Math.floor(a / b);
      const remainder = a % b;
      if (remainder === 0) {
        return `🦉 **Kết quả phép chia chuẩn xác:**\n\n**${a} : ${b} = ${quotient}** 🎉\n\n⭐ Phép chia hết không có dư! Bé thuộc bảng chia rất cừ khôi đấy!`;
      }
      return `🦉 **Kết quả phép chia có dư nè:**\n\n**${a} : ${b} = ${quotient} (dư ${remainder})** ✨\n\n💡 *Cách thử lại:* (${b} × ${quotient}) + ${remainder} = ${a}. Bé thử tính lại xem đúng chưa nhé!`;
    }

    // Chu vi / diện tích hình học
    if (text.includes('chu vi') && (text.includes('chữ nhật') || text.includes('hcn'))) {
      return `📐 **Công thức tính Chu Vi Hình Chữ Nhật (Lớp 3 - 5):**\n\n**Chu vi = (Chiều dài + Chiều rộng) × 2** *(cùng đơn vị đo)*\n\nVí dụ: Chiều dài là 8cm, chiều rộng là 5cm:\n👉 Chu vi = (8 + 5) × 2 = **26 cm** ⭐`;
    }

    if (text.includes('diện tích') && (text.includes('chữ nhật') || text.includes('hcn'))) {
      return `📐 **Công thức tính Diện Tích Hình Chữ Nhật (Lớp 3 - 5):**\n\n**Diện tích = Chiều dài × Chiều rộng** *(cùng đơn vị đo)*\n\nVí dụ: Chiều dài 6cm, chiều rộng 4cm:\n👉 Diện tích = 6 × 4 = **24 cm²** (xăng-ti-mét vuông) 🌟`;
    }

    if (text.includes('chu vi') && text.includes('vuông')) {
      return `🟦 **Công thức tính Chu Vi Hình Vuông (Lớp 3 - 5):**\n\n**Chu vi = Độ dài một cạnh × 4**\n\nVí dụ: Hình vuông có cạnh 5cm:\n👉 Chu vi = 5 × 4 = **20 cm** 👏`;
    }

    if (text.includes('diện tích') && text.includes('vuông')) {
      return `🟦 **Công thức tính Diện Tích Hình Vuông (Lớp 3 - 5):**\n\n**Diện tích = Cạnh × Cạnh**\n\nVí dụ: Hình vuông có cạnh 6cm:\n👉 Diện tích = 6 × 6 = **36 cm²** 🌟`;
    }

    // Mẹo tính nhẩm
    if (text.includes('tính nhẩm') || text.includes('mẹo') || text.includes('nhanh')) {
      return `⚡ **Bí Quyết Tính Nhẩm Siêu Tốc Của Cú Vàng:**\n\n1. **Nhân một số với 11:**\n- Ví dụ: 25 × 11\n- Lấy 2 + 5 = 7, chèn số 7 vào giữa 2 và 5 👉 Kết quả là **275**! Siêu nhanh đúng không nào!\n\n2. **Cộng nhẩm bằng cách làm tròn chục:**\n- Ví dụ: 48 + 35 = (48 + 2) + 33 = 50 + 33 = **83**!`;
    }

    // Đố vui toán học
    if (text.includes('đố') || text.includes('câu đố') || text.includes('thử tài')) {
      const riddles = [
        `🎲 **Cú Vàng đố bé nhé:**\n\n"Bác thợ mộc cưa một khúc gỗ dài 6 mét thành các đoạn dài 2 mét. Mỗi lần cưa mất 5 phút. Hỏi bác thợ mộc cưa xong khúc gỗ trong bao nhiêu phút?"\n\n*(Gợi ý: Cắt được mấy đoạn thì cần mấy lần cưa nhỉ? Hãy nhắn câu trả lời cho Cú Vàng nhé!)* 🦉`,
        `🎲 **Thử tài toán học tí hon:**\n\n"Một đàn vịt đi qua cầu. 1 con đi trước 2 con, 1 con đi giữa 2 con, 1 con đi sau 2 con. Hỏi đàn vịt có tất cả bao nhiêu con?"\n\n*(Nhắn đáp án cho Cú Vàng nào!)* ✨`,
      ];
      return riddles[Math.floor(Math.random() * riddles.length)];
    }

    return `🦉 **Cú Vàng rất sẵn lòng cùng bé chinh phục môn Toán!**\n\nTại Toán Vui, các bài toán từ Lớp 1 đến Lớp 5 đều được minh họa bằng hình ảnh que tính, bánh pizza phân số và sơ đồ đoạn thẳng sinh động:\n- **Lớp 1 - 2:** Phép cộng trừ trong phạm vi 100, bảng cửu chương trực quan.\n- **Lớp 3:** Phép nhân chia 3 chữ số, hình học & tính chu vi.\n- **Lớp 4 - 5:** Phân số, số thập phân, tỉ số phần trăm và toán chuyển động.\n\n👉 Bé có thể thử làm bài khảo sát 3 phút tại mục **"Khảo Sát Khởi Động"** để Cú Vàng tặng bé ngay 50 Sao Vàng đầu tiên nhé!`;
  }

  // 2. Life Skills & Safety for Kids
  if (
    text.includes('người lạ') ||
    text.includes('kỹ năng') ||
    text.includes('đuối nước') ||
    text.includes('cháy') ||
    text.includes('đi lạc') ||
    text.includes('an toàn') ||
    text.includes('cho kẹo') ||
    text.includes('xâm hại')
  ) {
    if (text.includes('người lạ') || text.includes('cho kẹo') || text.includes('rủ')) {
      return `🛡️ **Quy tắc Vàng ứng phó người lạ từ Cú Vàng:**\n\n1. **Khoanh tay từ chối lễ phép:** "Dạ cháu cảm ơn nhưng ba mẹ cháu dặn không được nhận quà của người lạ ạ!" 🙅‍♂️\n2. **Giữ khoảng cách an toàn:** Lùi xa ít nhất 2 bước chân (khoảng 1.5 mét) khỏi tầm tay người lạ.\n3. **Không bao giờ đi theo:** Dù người lạ nói là "bạn của bố mẹ" hay "nhờ tìm thú cưng".\n4. **Kêu cứu hoặc chạy về phía người lớn tin cậy:** Chạy nhanh vào cửa hàng, bảo vệ trường, hoặc nơi có chú công an!\n\n🌟 Bé nhớ thật kỹ để luôn an toàn nhé! Cú Vàng luôn tự hào về sự thông minh của bé!`;
    }

    if (text.includes('đuối nước') || text.includes('nước') || text.includes('bơi')) {
      return `🌊 **4 Nguyên Tắc Phòng Tránh Đuối Nước:**\n\n1. Tuyệt đối không đến gần ao, hồ, sông, suối khi không có người lớn đi kèm.\n2. Khi đi thuyền, cano hoặc tắm biển bắt buộc phải mặc áo phao cài dây chuẩn chỉnh.\n3. Nếu thấy bạn bị ngã xuống nước: **CẤM NHẢY XUỐNG CỨU**, hãy hô to cầu cứu và ném cành cây, can nhựa hoặc phao cho bạn bám.\n4. Khởi động kỹ và tuân thủ nội quy trước khi xuống hồ bơi.`;
    }

    return `🛡️ **Chuyên đề Kỹ Năng Sống Tiểu Học:**\n\nCú Vàng có cả một kho tàng các tình huống mô phỏng 3D giúp bé luyện phản xạ:\n- **Quy tắc 5 ngón tay** bảo vệ thân thể an toàn.\n- **Kỹ năng thoát hiểm** khi có báo cháy hoặc chập điện.\n- **An toàn giao thông:** Đội mũ bảo hiểm chuẩn và sang đường đúng vạch.\n\nBé hãy vào mục **Kỹ Năng Sống** để cùng Cú Vàng chơi thử thách tình huống nhé!`;
  }

  // 3. Platform Guide, PIN code, Test, Teachers
  if (
    text.includes('mã pin') ||
    text.includes('pin') ||
    text.includes('lớp') ||
    text.includes('thầy cô') ||
    text.includes('giáo viên') ||
    text.includes('đăng nhập') ||
    text.includes('tài khoản')
  ) {
    return `🎒 **Hướng dẫn đăng nhập & mã PIN lớp học:**\n\n- **Học sinh tiểu học:** Không cần email phức tạp! Chỉ cần nhập **Tên đăng nhập** và **Mã PIN 4-6 số** (hoặc Mã PIN lớp do Thầy Cô cấp, ví dụ: \`L3A-8899\`) là vào học được ngay.\n- **Thầy Cô giáo:** Bấm vào nút **"Dành Cho Thầy Cô"** hoặc chọn đăng nhập bằng Google/Email để tạo lớp học, hệ thống sẽ tự động cấp mã PIN lớp để mời các em học sinh vào lớp.\n\n👉 Thầy Cô còn được xem báo cáo phổ điểm tự động chuẩn Thông tư 27 của Bộ GD&ĐT nữa đấy!`;
  }

  if (
    text.includes('khảo sát') ||
    text.includes('học thử') ||
    text.includes('test') ||
    text.includes('bắt đầu') ||
    text.includes('miễn phí') ||
    text.includes('0đ') ||
    text.includes('giá') ||
    text.includes('sao')
  ) {
    return `⭐ **Tham Gia Học Thử & Nhận Sao Vàng:**\n\n- Nền tảng mở **học thử 100% miễn phí (0đ)** cho tất cả học sinh tiểu học.\n- Làm bài khảo sát đánh giá năng lực chỉ mất 3 phút với âm thanh vui tươi, đồ họa bắt mắt.\n- Hoàn thành bài là nhận ngay **50 Sao Vàng** để mở khóa mũ nón, cánh bay và kính thần đồng cho Cú Vàng!\n\nBé bấm vào nút **"Bé Khám Phá Ngay (0đ)"** trên màn hình để bắt đầu chuyến phiêu lưu ngay nhé! 🚀`;
  }

  // 4. Friendly Greetings
  if (
    text.includes('chào') ||
    text.includes('hi') ||
    text.includes('hello') ||
    text.includes('ơi') ||
    text.includes('bạn là ai') ||
    text.includes('cú vàng')
  ) {
    return `🦉 **Xin chào bạn nhỏ và quý phụ huynh!**\n\nMình là **Cú Vàng Thông Thái** - gia sư AI đồng hành cùng học sinh tiểu học Việt Nam. Mình có thể giúp bạn:\n\n1. 🧮 **Giải đáp và gợi ý toán tiểu học** (Lớp 1 đến Lớp 5)\n2. 🛡️ **Tư vấn kỹ năng sống & an toàn cho trẻ**\n3. 🎒 **Hướng dẫn tham gia khảo sát nhận Sao Vàng**\n4. 👩‍🏫 **Hỗ trợ Thầy Cô tạo lớp học và cấp mã PIN**\n\nBạn muốn Cú Vàng giúp điều gì hôm nay nào? 😊`;
  }

  // 5. Default Encouraging AI Response
  return `🦉 **Cú Vàng đã lắng nghe câu hỏi của bạn!**\n\n"${userText}" là một câu hỏi rất hay. Để Cú Vàng hỗ trợ tốt nhất, bạn có thể:\n- Hỏi Cú Vàng một bài toán cụ thể (Ví dụ: *"15 + 28 bằng mấy?"* hoặc *"Cách tính chu vi hình chữ nhật"*)\n- Hỏi về mẹo an toàn (Ví dụ: *"Làm gì khi gặp người lạ cho quà?"*)\n- Hoặc trải nghiệm trực tiếp bài khảo sát tương tác ở ngay mục **"Học Thử AI"** trên trang này nhé!\n\nCú Vàng luôn sẵn sàng đồng hành cùng bạn! ⭐`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages: ChatMessage[] = body.messages || [];
    const studentContext = body.studentContext || {};
    const gradeLevel = studentContext.gradeLevel ? `Lớp ${studentContext.gradeLevel}` : 'Tiểu học (Lớp 1 - 5)';
    const studentName = studentContext.name ? `Bạn nhỏ "${studentContext.name}"` : 'bé';

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Vui lòng cung cấp nội dung tin nhắn hợp lệ.' },
        { status: 400 }
      );
    }

    const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
    const userQuery = lastUserMessage?.content || '';

    const apiKey = process.env.DEEPSEEK_API_KEY?.trim();
    const baseURL = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com';
    const model = process.env.DEEPSEEK_MODEL || 'deepseek-chat';

    // If DeepSeek API key is configured, call DeepSeek Live AI
    if (apiKey && apiKey !== 'your-deepseek-api-key-here' && apiKey.length > 5) {
      try {
        const systemPrompt = {
          role: 'system',
          content: `Bạn là "Cú Vàng Thông Thái" 🦉✨ - Gia sư AI dạy Toán tiểu học đồng hành cùng học sinh trên ứng dụng "Toán Vui".
Hiện tại bạn đang trò chuyện và hướng dẫn học tập cho ${studentName}, học sinh trình độ ${gradeLevel}.
Quy tắc ứng xử và phong cách sư phạm:
- Luôn xưng "Cú Vàng" và xưng hô thân mật với bé: "bé", "bạn nhỏ", hoặc tên của bé.
- Giọng văn trong sáng, vui tươi, động viên khích lệ, dùng các emoji sinh động (🌟, 🦉, 🧮, ✨, 👏).
- Hướng dẫn giải toán theo từng bước trực quan (vẽ que tính, đoạn thẳng, chia bánh, chia kẹo).
- Khi bé hỏi bài, hãy gợi ý cách tư duy từng bước trước hoặc giải thích dễ hiểu, không đưa ra đáp án cụt lủn.
- Kiến thức chuẩn Chương trình Giáo dục Phổ thông mới môn Toán Lớp 1 - 5.
- Tuyệt đối an toàn cho trẻ em, không đề cập nội dung người lớn hay bạo lực.`,
        };

        const apiResponse = await fetch(`${baseURL}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model,
            messages: [systemPrompt, ...messages.slice(-6)],
            temperature: 0.7,
            max_tokens: 500,
          }),
        });

        if (apiResponse.ok) {
          const data = await apiResponse.json();
          const aiReply = data.choices?.[0]?.message?.content;
          if (aiReply) {
            return NextResponse.json({
              reply: aiReply,
              source: 'deepseek-ai',
            });
          }
        }
      } catch (err) {
        // Fallback gracefully to smart pedagogical engine if API call fails
        console.warn('DeepSeek AI request failed, using pedagogical smart engine fallback:', err);
      }
    }

    // Default pedagogical fallback response
    const fallbackReply = getPedagogicalResponse(userQuery);
    return NextResponse.json({
      reply: fallbackReply,
      source: 'pedagogical-engine',
    });
  } catch (error) {
    console.error('AI Chat Error:', error);
    return NextResponse.json(
      { error: 'Đã có lỗi xảy ra trong quá trình kết nối với Cú Vàng.' },
      { status: 500 }
    );
  }
}
