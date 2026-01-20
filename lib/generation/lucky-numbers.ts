import { getZodiacLuckyNumbers, getKoreanZodiac, getWesternZodiac } from "../zodiac";
import { getNameLuckyNumbers, getBirthDateLuckyNumbers, reduceToDigit, getNumerologyMeaning } from "../numerology";
import { DREAM_SYMBOLS } from "./dreams";

export type LotteryGame = "lotto645" | "pension720" | "spitto" | "powerball";

export interface PersonalInfo {
  name?: string;
  birthYear?: number;
  birthMonth?: number;
  birthDay?: number;
  mood?: string;
  dreamSymbol?: string;
  importantDates?: string[];
}

export interface GenerationResult {
  numbers: number[];
  bonusNumber?: number;
  explanation: string[];
  luckyFactors: {
    factor: string;
    numbers: number[];
    meaning?: string;
  }[];
  gameType: LotteryGame;
  generatedAt: string;
}

// Mood to number mapping
const MOOD_NUMBERS: Record<string, number[]> = {
  행복: [7, 14, 21, 28, 35],
  평온: [3, 6, 9, 12, 15],
  설레임: [1, 11, 22, 33, 44],
  기대: [5, 10, 15, 20, 25],
  희망: [8, 16, 24, 32, 40],
  감사: [2, 4, 6, 8, 10],
  열정: [9, 18, 27, 36, 45],
  침착: [4, 8, 12, 16, 20],
};

// Cryptographically-inspired seeded random number generator
function seededRandom(seed: number): () => number {
  return function () {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
}

// Create a seed from personal info
function createSeed(info: PersonalInfo): number {
  let seed = Date.now();

  if (info.name) {
    for (const char of info.name) {
      seed += char.charCodeAt(0) * 31;
    }
  }

  if (info.birthYear) seed += info.birthYear * 1000;
  if (info.birthMonth) seed += info.birthMonth * 100;
  if (info.birthDay) seed += info.birthDay * 10;

  if (info.mood) {
    for (const char of info.mood) {
      seed += char.charCodeAt(0) * 17;
    }
  }

  return seed;
}

// Generate weighted random numbers with preference for lucky numbers
function generateWeightedNumbers(
  luckyNumbers: number[],
  count: number,
  min: number,
  max: number,
  random: () => number
): number[] {
  const result: Set<number> = new Set();
  const maxAttempts = 1000;
  let attempts = 0;

  // First, try to include some lucky numbers (50% chance each)
  for (const lucky of luckyNumbers) {
    if (lucky >= min && lucky <= max && random() > 0.5 && result.size < count) {
      result.add(lucky);
    }
  }

  // Fill remaining slots with random numbers
  while (result.size < count && attempts < maxAttempts) {
    attempts++;
    const num = Math.floor(random() * (max - min + 1)) + min;

    // Give slight preference to lucky numbers
    if (luckyNumbers.includes(num) || random() > 0.3) {
      result.add(num);
    }
  }

  // If we still don't have enough, just add random numbers
  while (result.size < count) {
    const num = Math.floor(random() * (max - min + 1)) + min;
    result.add(num);
  }

  return Array.from(result).sort((a, b) => a - b);
}

// Generate Lotto 6/45 numbers
function generateLotto645(info: PersonalInfo, luckyNumbers: number[], random: () => number): number[] {
  return generateWeightedNumbers(luckyNumbers, 6, 1, 45, random);
}

// Generate Pension Lottery 720+ numbers
function generatePension720(info: PersonalInfo, luckyNumbers: number[], random: () => number): number[] {
  // Pension lottery is 7 digits, each 0-9
  const result: number[] = [];
  const luckyDigits = luckyNumbers.filter(n => n <= 9);

  for (let i = 0; i < 7; i++) {
    // Higher chance of using lucky digit in first positions
    if (luckyDigits.length > 0 && random() > 0.6) {
      result.push(luckyDigits[Math.floor(random() * luckyDigits.length)]);
    } else {
      result.push(Math.floor(random() * 10));
    }
  }

  return result;
}

// Generate Spitto numbers (similar to lotto for simplicity)
function generateSpitto(info: PersonalInfo, luckyNumbers: number[], random: () => number): number[] {
  // Spitto varies, using 5 numbers from 1-20 as a common format
  return generateWeightedNumbers(luckyNumbers.map(n => Math.min(n, 20)), 5, 1, 20, random);
}

// Generate Powerball numbers
function generatePowerball(info: PersonalInfo, luckyNumbers: number[], random: () => number): { main: number[]; powerball: number } {
  const main = generateWeightedNumbers(luckyNumbers, 5, 1, 69, random);
  const powerball = Math.floor(random() * 26) + 1;
  return { main, powerball };
}

export function generateLuckyNumbers(
  gameType: LotteryGame,
  personalInfo: PersonalInfo
): GenerationResult {
  const luckyFactors: GenerationResult["luckyFactors"] = [];
  let allLuckyNumbers: number[] = [];
  const explanation: string[] = [];

  // Create seeded random generator
  const seed = createSeed(personalInfo);
  const random = seededRandom(seed);

  // Gather lucky numbers from various sources
  if (personalInfo.birthYear && personalInfo.birthMonth && personalInfo.birthDay) {
    // Zodiac-based numbers
    const zodiacNumbers = getZodiacLuckyNumbers(
      personalInfo.birthYear,
      personalInfo.birthMonth,
      personalInfo.birthDay
    );
    allLuckyNumbers = [...allLuckyNumbers, ...zodiacNumbers];

    const koreanZodiac = getKoreanZodiac(personalInfo.birthYear);
    const westernZodiac = getWesternZodiac(personalInfo.birthMonth, personalInfo.birthDay);

    luckyFactors.push({
      factor: `${koreanZodiac.name} (띠)`,
      numbers: koreanZodiac.luckyNumbers,
      meaning: `${personalInfo.birthYear}년생 ${koreanZodiac.name}의 행운 숫자`,
    });

    luckyFactors.push({
      factor: `${westernZodiac.name} (별자리)`,
      numbers: westernZodiac.luckyNumbers,
      meaning: `${westernZodiac.element} 원소의 기운`,
    });

    // Birth date numbers
    const birthDateNumbers = getBirthDateLuckyNumbers(
      personalInfo.birthYear,
      personalInfo.birthMonth,
      personalInfo.birthDay
    );
    allLuckyNumbers = [...allLuckyNumbers, ...birthDateNumbers];

    luckyFactors.push({
      factor: "생년월일 수비학",
      numbers: birthDateNumbers,
      meaning: getNumerologyMeaning(reduceToDigit(personalInfo.birthYear + personalInfo.birthMonth + personalInfo.birthDay)),
    });

    explanation.push(`${personalInfo.birthYear}년 ${personalInfo.birthMonth}월 ${personalInfo.birthDay}일생의 기운을 분석했습니다.`);
  }

  // Name-based numbers
  if (personalInfo.name) {
    const nameNumbers = getNameLuckyNumbers(personalInfo.name);
    allLuckyNumbers = [...allLuckyNumbers, ...nameNumbers];

    luckyFactors.push({
      factor: "이름 획수",
      numbers: nameNumbers,
      meaning: `"${personalInfo.name}"의 필획에서 도출된 숫자`,
    });

    explanation.push(`이름 "${personalInfo.name}"의 획수를 분석했습니다.`);
  }

  // Mood-based numbers
  if (personalInfo.mood && MOOD_NUMBERS[personalInfo.mood]) {
    const moodNumbers = MOOD_NUMBERS[personalInfo.mood];
    allLuckyNumbers = [...allLuckyNumbers, ...moodNumbers];

    luckyFactors.push({
      factor: `오늘의 기분: ${personalInfo.mood}`,
      numbers: moodNumbers.slice(0, 3),
      meaning: `"${personalInfo.mood}" 에너지와 공명하는 숫자`,
    });

    explanation.push(`"${personalInfo.mood}"의 에너지를 반영했습니다.`);
  }

  // Dream symbol numbers
  if (personalInfo.dreamSymbol && DREAM_SYMBOLS[personalInfo.dreamSymbol]) {
    const dreamNumbers = DREAM_SYMBOLS[personalInfo.dreamSymbol].numbers;
    allLuckyNumbers = [...allLuckyNumbers, ...dreamNumbers];

    luckyFactors.push({
      factor: `꿈 해몽: ${personalInfo.dreamSymbol}`,
      numbers: dreamNumbers,
      meaning: DREAM_SYMBOLS[personalInfo.dreamSymbol].meaning,
    });

    explanation.push(`꿈에서 본 "${personalInfo.dreamSymbol}"을(를) 해몽했습니다.`);
  }

  // Important dates
  if (personalInfo.importantDates && personalInfo.importantDates.length > 0) {
    const dateNumbers: number[] = [];
    for (const dateStr of personalInfo.importantDates) {
      const date = new Date(dateStr);
      if (!isNaN(date.getTime())) {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        if (day <= 45) dateNumbers.push(day);
        if (month <= 45) dateNumbers.push(month);
      }
    }

    if (dateNumbers.length > 0) {
      allLuckyNumbers = [...allLuckyNumbers, ...dateNumbers];
      luckyFactors.push({
        factor: "중요한 날짜",
        numbers: Array.from(new Set(dateNumbers)),
        meaning: "소중한 순간들의 날짜",
      });
      explanation.push("중요한 날짜들의 숫자를 포함했습니다.");
    }
  }

  // Remove duplicates from lucky numbers
  allLuckyNumbers = Array.from(new Set(allLuckyNumbers));

  // Generate final numbers based on game type
  let numbers: number[] = [];
  let bonusNumber: number | undefined;

  switch (gameType) {
    case "lotto645":
      numbers = generateLotto645(personalInfo, allLuckyNumbers, random);
      // Generate bonus number
      let bonus = Math.floor(random() * 45) + 1;
      while (numbers.includes(bonus)) {
        bonus = Math.floor(random() * 45) + 1;
      }
      bonusNumber = bonus;
      break;

    case "pension720":
      numbers = generatePension720(personalInfo, allLuckyNumbers, random);
      break;

    case "spitto":
      numbers = generateSpitto(personalInfo, allLuckyNumbers, random);
      break;

    case "powerball":
      const pbResult = generatePowerball(personalInfo, allLuckyNumbers, random);
      numbers = pbResult.main;
      bonusNumber = pbResult.powerball;
      break;
  }

  return {
    numbers,
    bonusNumber,
    explanation,
    luckyFactors,
    gameType,
    generatedAt: new Date().toISOString(),
  };
}

// Get game information
export function getGameInfo(gameType: LotteryGame): {
  name: string;
  description: string;
  numberCount: number;
  range: string;
} {
  const games = {
    lotto645: {
      name: "로또 6/45",
      description: "1부터 45까지 숫자 중 6개를 선택",
      numberCount: 6,
      range: "1-45",
    },
    pension720: {
      name: "연금복권 720+",
      description: "7자리 숫자 조합",
      numberCount: 7,
      range: "0-9 (각 자리)",
    },
    spitto: {
      name: "스피또",
      description: "1부터 20까지 숫자 중 5개를 선택",
      numberCount: 5,
      range: "1-20",
    },
    powerball: {
      name: "파워볼",
      description: "1-69에서 5개 + 파워볼 1-26에서 1개",
      numberCount: 6,
      range: "1-69 + 1-26",
    },
  };

  return games[gameType];
}
