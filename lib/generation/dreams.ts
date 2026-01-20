// Korean Dream Interpretation (꿈해몽) - Dream symbols to lucky numbers

export interface DreamSymbol {
  name: string;
  category: string;
  numbers: number[];
  meaning: string;
  icon: string;
}

export const DREAM_SYMBOLS: Record<string, DreamSymbol> = {
  // Animals (동물)
  돼지: {
    name: "돼지",
    category: "동물",
    numbers: [4, 14, 24, 34, 44],
    meaning: "재물운, 풍요와 행운의 상징",
    icon: "pig",
  },
  용: {
    name: "용",
    category: "동물",
    numbers: [1, 11, 21, 31, 41],
    meaning: "대박, 큰 성공과 출세의 상징",
    icon: "dragon",
  },
  호랑이: {
    name: "호랑이",
    category: "동물",
    numbers: [3, 13, 23, 33, 43],
    meaning: "권력, 용기와 성공의 상징",
    icon: "tiger",
  },
  뱀: {
    name: "뱀",
    category: "동물",
    numbers: [2, 12, 22, 32, 42],
    meaning: "재물, 지혜와 변화의 상징",
    icon: "snake",
  },
  물고기: {
    name: "물고기",
    category: "동물",
    numbers: [7, 17, 27, 37],
    meaning: "재물운, 풍요와 다산의 상징",
    icon: "fish",
  },
  새: {
    name: "새",
    category: "동물",
    numbers: [9, 19, 29, 39],
    meaning: "자유, 희망과 좋은 소식의 상징",
    icon: "bird",
  },
  강아지: {
    name: "강아지",
    category: "동물",
    numbers: [6, 16, 26, 36],
    meaning: "충성, 우정과 행운의 상징",
    icon: "dog",
  },
  고양이: {
    name: "고양이",
    category: "동물",
    numbers: [5, 15, 25, 35, 45],
    meaning: "직감, 신비로운 행운의 상징",
    icon: "cat",
  },
  말: {
    name: "말",
    category: "동물",
    numbers: [8, 18, 28, 38],
    meaning: "성공, 빠른 진전과 승진의 상징",
    icon: "horse",
  },
  거북이: {
    name: "거북이",
    category: "동물",
    numbers: [10, 20, 30, 40],
    meaning: "장수, 안정과 꾸준한 행운",
    icon: "turtle",
  },

  // Nature (자연)
  물: {
    name: "물",
    category: "자연",
    numbers: [6, 12, 18, 36],
    meaning: "재물, 흐르는 돈과 기회",
    icon: "water",
  },
  불: {
    name: "불",
    category: "자연",
    numbers: [3, 9, 27, 33],
    meaning: "열정, 성공과 정화의 상징",
    icon: "fire",
  },
  산: {
    name: "산",
    category: "자연",
    numbers: [1, 7, 21, 35],
    meaning: "안정, 성취와 높은 목표",
    icon: "mountain",
  },
  바다: {
    name: "바다",
    category: "자연",
    numbers: [4, 8, 16, 44],
    meaning: "무한한 가능성, 큰 재물",
    icon: "ocean",
  },
  하늘: {
    name: "하늘",
    category: "자연",
    numbers: [1, 11, 22, 33],
    meaning: "희망, 높은 이상과 축복",
    icon: "sky",
  },
  달: {
    name: "달",
    category: "자연",
    numbers: [2, 14, 28, 42],
    meaning: "여성적 에너지, 직관과 변화",
    icon: "moon",
  },
  해: {
    name: "해 (태양)",
    category: "자연",
    numbers: [1, 10, 19, 37],
    meaning: "성공, 명예와 밝은 미래",
    icon: "sun",
  },
  비: {
    name: "비",
    category: "자연",
    numbers: [6, 15, 24, 39],
    meaning: "축복, 정화와 새로운 시작",
    icon: "rain",
  },
  눈: {
    name: "눈",
    category: "자연",
    numbers: [7, 17, 27, 37],
    meaning: "순수, 새로운 시작과 기회",
    icon: "snow",
  },
  무지개: {
    name: "무지개",
    category: "자연",
    numbers: [7, 14, 21, 42],
    meaning: "희망, 행운과 꿈의 실현",
    icon: "rainbow",
  },

  // Objects (사물)
  돈: {
    name: "돈",
    category: "사물",
    numbers: [8, 18, 28, 38],
    meaning: "재물운, 직접적인 금전 획득",
    icon: "money",
  },
  금: {
    name: "금",
    category: "사물",
    numbers: [1, 8, 16, 24, 45],
    meaning: "큰 재물, 성공과 풍요",
    icon: "gold",
  },
  집: {
    name: "집",
    category: "사물",
    numbers: [4, 14, 24, 34],
    meaning: "안정, 가정의 행복",
    icon: "house",
  },
  차: {
    name: "차",
    category: "사물",
    numbers: [5, 15, 25, 35],
    meaning: "진전, 목표 달성",
    icon: "car",
  },
  꽃: {
    name: "꽃",
    category: "사물",
    numbers: [3, 12, 21, 30],
    meaning: "아름다움, 사랑과 기쁨",
    icon: "flower",
  },
  열쇠: {
    name: "열쇠",
    category: "사물",
    numbers: [1, 9, 19, 27],
    meaning: "기회, 새로운 문의 열림",
    icon: "key",
  },
  거울: {
    name: "거울",
    category: "사물",
    numbers: [2, 11, 22, 33],
    meaning: "자아 발견, 진실의 발견",
    icon: "mirror",
  },

  // Actions/Situations (상황)
  비행: {
    name: "하늘을 나는 꿈",
    category: "상황",
    numbers: [9, 19, 29, 39],
    meaning: "자유, 목표 달성과 성공",
    icon: "flying",
  },
  낙하: {
    name: "떨어지는 꿈",
    category: "상황",
    numbers: [4, 13, 22, 31],
    meaning: "변화, 새로운 시작 전의 불안",
    icon: "falling",
  },
  결혼: {
    name: "결혼",
    category: "상황",
    numbers: [2, 12, 22, 32],
    meaning: "결합, 새로운 시작과 행복",
    icon: "wedding",
  },
  시험: {
    name: "시험",
    category: "상황",
    numbers: [1, 5, 15, 25],
    meaning: "도전, 능력의 시험과 성공",
    icon: "exam",
  },
  죽음: {
    name: "죽음",
    category: "상황",
    numbers: [4, 14, 24, 44],
    meaning: "변화, 새로운 시작 (역설적 행운)",
    icon: "death",
  },
  임신: {
    name: "임신",
    category: "상황",
    numbers: [3, 9, 12, 27],
    meaning: "창조, 새로운 시작과 풍요",
    icon: "pregnancy",
  },

  // People (사람)
  아기: {
    name: "아기",
    category: "사람",
    numbers: [1, 10, 19, 28],
    meaning: "새로운 시작, 순수와 희망",
    icon: "baby",
  },
  조상: {
    name: "조상/돌아가신 분",
    category: "사람",
    numbers: [7, 17, 27, 37],
    meaning: "보호, 조상의 축복과 안내",
    icon: "ancestor",
  },
  유명인: {
    name: "유명인",
    category: "사람",
    numbers: [5, 15, 25, 35],
    meaning: "성공, 명성과 인정",
    icon: "celebrity",
  },
};

// Get dream symbols by category
export function getDreamSymbolsByCategory(): Record<string, DreamSymbol[]> {
  const categories: Record<string, DreamSymbol[]> = {};

  for (const symbol of Object.values(DREAM_SYMBOLS)) {
    if (!categories[symbol.category]) {
      categories[symbol.category] = [];
    }
    categories[symbol.category].push(symbol);
  }

  return categories;
}

// Get all dream symbol names
export function getDreamSymbolNames(): string[] {
  return Object.keys(DREAM_SYMBOLS);
}

// Search dream symbols
export function searchDreamSymbols(query: string): DreamSymbol[] {
  const lowerQuery = query.toLowerCase();
  return Object.values(DREAM_SYMBOLS).filter(
    (symbol) =>
      symbol.name.toLowerCase().includes(lowerQuery) ||
      symbol.meaning.toLowerCase().includes(lowerQuery) ||
      symbol.category.toLowerCase().includes(lowerQuery)
  );
}
