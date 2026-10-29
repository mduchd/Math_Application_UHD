import { SeasonId, SeasonInfo } from '../types';

export const SEASONS: Record<SeasonId, SeasonInfo> = {
  spring: {
    id: 'spring',
    name: 'Mùa Xuân',
    englishName: 'Spring',
    emoji: '🌸',
    secondaryEmoji: '🌱',
    tagline: 'Trăm hoa đua nở • Vạn điều tươi vui',
    description: 'Bầu trời ấm áp, chồi non đâm chồi xanh biếc và muôn hoa rực rỡ chào đón bé!',
    monthsText: 'Tháng 2 – Tháng 4',
    months: [2, 3, 4],
    colors: {
      primary: '#10B981',
      primaryDeep: '#059669',
      accent: '#F472B6',
      accentDeep: '#DB2777',
      badgeBg: '#D1FAE5',
      badgeText: '#065F46',
      badgeBorder: '#A7F3D0',
      bg: '#F7FAF5',
      surface: '#ECFDF5',
      border: '#D1FAE5',
      glow: 'rgba(16, 185, 129, 0.25)',
    },
    mascotAccessory: {
      name: 'Hoa đào may mắn',
      icon: '🌸',
      description: 'Cài hoa đào thắm tươi đón xuân rộn rã',
    },
    greeting: 'Chào mùa xuân mới! Chúc bạn nhỏ học tập thật vui và ngập tràn niềm phấn khởi! 🌸',
  },
  summer: {
    id: 'summer',
    name: 'Mùa Hạ',
    englishName: 'Summer',
    emoji: '☀️',
    secondaryEmoji: '🌊',
    tagline: 'Nắng vàng rực rỡ • Sôi động ngày hè',
    description: 'Biển xanh mát rượi, ánh nắng lung linh và những chuyến phiêu lưu kiến thức bất tận!',
    monthsText: 'Tháng 5 – Tháng 7',
    months: [5, 6, 7],
    colors: {
      primary: '#0284C7',
      primaryDeep: '#0369A1',
      accent: '#F59E0B',
      accentDeep: '#D97706',
      badgeBg: '#E0F2FE',
      badgeText: '#075985',
      badgeBorder: '#7DD3FC',
      bg: '#F0F9FF',
      surface: '#E0F2FE',
      border: '#BAE6FD',
      glow: 'rgba(2, 132, 199, 0.25)',
    },
    mascotAccessory: {
      name: 'Kính râm phiêu lưu',
      icon: '🕶️',
      description: 'Kính râm cá tính sẵn sàng thám hiểm thế giới',
    },
    greeting: 'Mùa hè tràn đầy năng lượng! Cùng Cú Bi khám phá muôn vàn bí ẩn khoa học nào! ☀️',
  },
  autumn: {
    id: 'autumn',
    name: 'Mùa Thu',
    englishName: 'Autumn',
    emoji: '🍂',
    secondaryEmoji: '🏮',
    tagline: 'Lá vàng êm dịu • Rước đèn trăng rằm',
    description: 'Không khí dịu êm, rước đèn ông sao đón Tết Trung Thu và tựu trường rộn ràng cùng bạn bè!',
    monthsText: 'Tháng 8 – Tháng 10',
    months: [8, 9, 10],
    colors: {
      primary: '#EA580C',
      primaryDeep: '#C2410C',
      accent: '#EAB308',
      accentDeep: '#CA8A04',
      badgeBg: '#FFEDD5',
      badgeText: '#9A3412',
      badgeBorder: '#FDBA74',
      bg: '#FDF8F0',
      surface: '#FFF7ED',
      border: '#FED7AA',
      glow: 'rgba(234, 88, 12, 0.25)',
    },
    mascotAccessory: {
      name: 'Lồng đèn ông sao',
      icon: '🏮',
      description: 'Lồng đèn đón trăng rằm trung thu ấm cúng',
    },
    greeting: 'Mùa thu tựu trường thân thương! Cùng nhau rinh thật nhiều điểm 10 rực rỡ nhé! 🍂',
  },
  winter: {
    id: 'winter',
    name: 'Mùa Đông',
    englishName: 'Winter',
    emoji: '❄️',
    secondaryEmoji: '⛄',
    tagline: 'Tuyết trắng diệu kỳ • Giáng sinh ấm áp',
    description: 'Bông tuyết trắng lung linh, lò sưởi ấm áp và chuông ngân vang đón mùa giáng sinh diệu kỳ!',
    monthsText: 'Tháng 11 – Tháng 1',
    months: [11, 12, 1],
    colors: {
      primary: '#6366F1',
      primaryDeep: '#4F46E5',
      accent: '#06B6D4',
      accentDeep: '#0891B2',
      badgeBg: '#E0E7FF',
      badgeText: '#3730A3',
      badgeBorder: '#C7D2FE',
      bg: '#F8FAFC',
      surface: '#EEF2FF',
      border: '#E2E8F0',
      glow: 'rgba(99, 102, 241, 0.25)',
    },
    mascotAccessory: {
      name: 'Khăn len cổ tích',
      icon: '🧣',
      description: 'Khăn len ấm áp vượt qua mùa đông giá lạnh',
    },
    greeting: 'Mùa đông cổ tích diệu kỳ! Khoác áo ấm vào và cùng Cú Bi luyện trí thông minh nhé! ❄️',
  },
};

export const SEASON_ORDER: SeasonId[] = ['spring', 'summer', 'autumn', 'winter'];

export const getSeasonByMonth = (month: number): SeasonId => {
  // month: 1 to 12
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'autumn';
  return 'winter'; // 11, 12, 1
};
