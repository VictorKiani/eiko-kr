// Korean Numerology based on Hangul stroke count (획수)
// Simplified stroke count mapping for common Hangul characters

// Consonant stroke counts (초성/종성)
const CONSONANT_STROKES: Record<string, number> = {
  ㄱ: 2, ㄴ: 2, ㄷ: 3, ㄹ: 5, ㅁ: 4,
  ㅂ: 4, ㅅ: 2, ㅇ: 1, ㅈ: 3, ㅊ: 4,
  ㅋ: 3, ㅌ: 4, ㅍ: 4, ㅎ: 3,
  ㄲ: 4, ㄸ: 6, ㅃ: 8, ㅆ: 4, ㅉ: 6,
};

// Vowel stroke counts (중성)
const VOWEL_STROKES: Record<string, number> = {
  ㅏ: 2, ㅑ: 3, ㅓ: 2, ㅕ: 3, ㅗ: 2,
  ㅛ: 3, ㅜ: 2, ㅠ: 3, ㅡ: 1, ㅣ: 1,
  ㅐ: 3, ㅒ: 4, ㅔ: 3, ㅖ: 4, ㅘ: 4,
  ㅙ: 5, ㅚ: 3, ㅝ: 4, ㅞ: 5, ㅟ: 3, ㅢ: 2,
};

// Decompose a Hangul syllable into its components
function decomposeHangul(char: string): { cho: string; jung: string; jong: string } | null {
  const code = char.charCodeAt(0);

  // Check if it's a valid Hangul syllable (가-힣)
  if (code < 0xAC00 || code > 0xD7A3) {
    return null;
  }

  const syllableIndex = code - 0xAC00;

  const cho = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
  const jung = ["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"];
  const jong = ["", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];

  const choIndex = Math.floor(syllableIndex / 588);
  const jungIndex = Math.floor((syllableIndex % 588) / 28);
  const jongIndex = syllableIndex % 28;

  return {
    cho: cho[choIndex],
    jung: jung[jungIndex],
    jong: jong[jongIndex],
  };
}

// Calculate stroke count for a single character
function getCharacterStrokeCount(char: string): number {
  const decomposed = decomposeHangul(char);

  if (!decomposed) {
    // If not Hangul, return 0 or could map digits/letters
    if (/[0-9]/.test(char)) {
      return parseInt(char, 10);
    }
    return 0;
  }

  let strokes = 0;
  strokes += CONSONANT_STROKES[decomposed.cho] || 0;
  strokes += VOWEL_STROKES[decomposed.jung] || 0;

  if (decomposed.jong) {
    // Handle compound 종성 (ㄳ, ㄵ, etc.)
    if (decomposed.jong.length === 1) {
      strokes += CONSONANT_STROKES[decomposed.jong] || 0;
    } else {
      // Compound consonants
      const compoundStrokes: Record<string, number> = {
        ㄳ: 4, ㄵ: 5, ㄶ: 5, ㄺ: 7, ㄻ: 9,
        ㄼ: 9, ㄽ: 7, ㄾ: 9, ㄿ: 9, ㅀ: 8, ㅄ: 6,
      };
      strokes += compoundStrokes[decomposed.jong] || 0;
    }
  }

  return strokes;
}

// Calculate total stroke count for a Korean name
export function getNameStrokeCount(name: string): number {
  let totalStrokes = 0;
  for (const char of name) {
    totalStrokes += getCharacterStrokeCount(char);
  }
  return totalStrokes;
}

// Reduce a number to a single digit (numerology digit root)
export function reduceToDigit(num: number): number {
  while (num > 9) {
    num = num.toString().split("").reduce((a, b) => a + parseInt(b, 10), 0);
  }
  return num;
}

// Get lucky numbers based on name numerology
export function getNameLuckyNumbers(name: string): number[] {
  const strokeCount = getNameStrokeCount(name);
  const rootDigit = reduceToDigit(strokeCount);

  // Generate lucky numbers based on stroke count and root digit
  const luckyNumbers: number[] = [];

  // Add the root digit itself
  luckyNumbers.push(rootDigit);

  // Add multiples of the root digit (within lottery range)
  for (let i = 2; i <= 5; i++) {
    const multiple = rootDigit * i;
    if (multiple <= 45) {
      luckyNumbers.push(multiple);
    }
  }

  // Add numbers derived from stroke count
  if (strokeCount <= 45) {
    luckyNumbers.push(strokeCount);
  }

  // Add reverse of stroke count if valid
  const reversed = parseInt(strokeCount.toString().split("").reverse().join(""), 10);
  if (reversed <= 45 && reversed > 0) {
    luckyNumbers.push(reversed);
  }

  // Remove duplicates
  return Array.from(new Set(luckyNumbers)).slice(0, 6);
}

// Get the numerology meaning for a number
export function getNumerologyMeaning(num: number): string {
  const meanings: Record<number, string> = {
    1: "시작, 리더십, 독립",
    2: "조화, 협력, 균형",
    3: "창의성, 표현, 기쁨",
    4: "안정, 노력, 기초",
    5: "변화, 자유, 모험",
    6: "사랑, 가정, 책임",
    7: "지혜, 분석, 영성",
    8: "성공, 풍요, 권력",
    9: "완성, 인도주의, 지혜",
  };

  const digit = reduceToDigit(num);
  return meanings[digit] || "미지의 에너지";
}

// Calculate birth date lucky numbers
export function getBirthDateLuckyNumbers(year: number, month: number, day: number): number[] {
  const numbers: number[] = [];

  // Add the day
  if (day <= 45) numbers.push(day);

  // Add the month
  if (month <= 45) numbers.push(month);

  // Add reduced year
  const reducedYear = reduceToDigit(year);
  numbers.push(reducedYear);

  // Add sum combinations
  const dayMonthSum = reduceToDigit(day + month);
  numbers.push(dayMonthSum);

  const fullSum = reduceToDigit(year + month + day);
  numbers.push(fullSum);

  // Add year's last two digits if valid
  const lastTwoDigits = year % 100;
  if (lastTwoDigits <= 45) numbers.push(lastTwoDigits);

  // Remove duplicates and filter valid lottery numbers
  return Array.from(new Set(numbers)).filter(n => n >= 1 && n <= 45);
}
