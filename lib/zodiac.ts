// Korean Zodiac (띠) - 12-year cycle
export const KOREAN_ZODIAC = [
  { name: "쥐띠", animal: "rat", years: [1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020], luckyNumbers: [2, 3], color: "blue" },
  { name: "소띠", animal: "ox", years: [1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021], luckyNumbers: [1, 4], color: "green" },
  { name: "호랑이띠", animal: "tiger", years: [1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022], luckyNumbers: [1, 3, 4], color: "orange" },
  { name: "토끼띠", animal: "rabbit", years: [1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023], luckyNumbers: [3, 4, 6], color: "pink" },
  { name: "용띠", animal: "dragon", years: [1928, 1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024], luckyNumbers: [1, 6, 7], color: "gold" },
  { name: "뱀띠", animal: "snake", years: [1929, 1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025], luckyNumbers: [2, 8, 9], color: "red" },
  { name: "말띠", animal: "horse", years: [1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026], luckyNumbers: [2, 3, 7], color: "brown" },
  { name: "양띠", animal: "sheep", years: [1931, 1943, 1955, 1967, 1979, 1991, 2003, 2015], luckyNumbers: [2, 7], color: "gray" },
  { name: "원숭이띠", animal: "monkey", years: [1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016], luckyNumbers: [4, 9], color: "white" },
  { name: "닭띠", animal: "rooster", years: [1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017], luckyNumbers: [5, 7, 8], color: "gold" },
  { name: "개띠", animal: "dog", years: [1934, 1946, 1958, 1970, 1982, 1994, 2006, 2018], luckyNumbers: [3, 4, 9], color: "green" },
  { name: "돼지띠", animal: "pig", years: [1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019], luckyNumbers: [2, 5, 8], color: "yellow" },
];

// Western Zodiac (별자리)
export const WESTERN_ZODIAC = [
  { name: "양자리", sign: "aries", startDate: [3, 21], endDate: [4, 19], luckyNumbers: [1, 8, 17], element: "fire" },
  { name: "황소자리", sign: "taurus", startDate: [4, 20], endDate: [5, 20], luckyNumbers: [2, 6, 9, 12, 24], element: "earth" },
  { name: "쌍둥이자리", sign: "gemini", startDate: [5, 21], endDate: [6, 20], luckyNumbers: [3, 5, 7, 12, 23], element: "air" },
  { name: "게자리", sign: "cancer", startDate: [6, 21], endDate: [7, 22], luckyNumbers: [2, 3, 15, 20], element: "water" },
  { name: "사자자리", sign: "leo", startDate: [7, 23], endDate: [8, 22], luckyNumbers: [1, 3, 10, 19], element: "fire" },
  { name: "처녀자리", sign: "virgo", startDate: [8, 23], endDate: [9, 22], luckyNumbers: [5, 14, 15, 23, 32], element: "earth" },
  { name: "천칭자리", sign: "libra", startDate: [9, 23], endDate: [10, 22], luckyNumbers: [4, 6, 13, 15, 24], element: "air" },
  { name: "전갈자리", sign: "scorpio", startDate: [10, 23], endDate: [11, 21], luckyNumbers: [8, 11, 18, 22], element: "water" },
  { name: "사수자리", sign: "sagittarius", startDate: [11, 22], endDate: [12, 21], luckyNumbers: [3, 7, 9, 12, 21], element: "fire" },
  { name: "염소자리", sign: "capricorn", startDate: [12, 22], endDate: [1, 19], luckyNumbers: [1, 4, 8, 10, 22], element: "earth" },
  { name: "물병자리", sign: "aquarius", startDate: [1, 20], endDate: [2, 18], luckyNumbers: [4, 7, 11, 22, 29], element: "air" },
  { name: "물고기자리", sign: "pisces", startDate: [2, 19], endDate: [3, 20], luckyNumbers: [3, 9, 12, 15, 18, 24], element: "water" },
];

export function getKoreanZodiac(birthYear: number): typeof KOREAN_ZODIAC[0] {
  const index = (birthYear - 4) % 12;
  return KOREAN_ZODIAC[index];
}

export function getWesternZodiac(month: number, day: number): typeof WESTERN_ZODIAC[0] {
  for (const sign of WESTERN_ZODIAC) {
    const [startMonth, startDay] = sign.startDate;
    const [endMonth, endDay] = sign.endDate;

    // Handle Capricorn which spans December-January
    if (sign.sign === "capricorn") {
      if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
        return sign;
      }
    } else if (
      (month === startMonth && day >= startDay) ||
      (month === endMonth && day <= endDay)
    ) {
      return sign;
    }
  }

  // Default to Capricorn if not found
  return WESTERN_ZODIAC[9];
}

export function getZodiacLuckyNumbers(birthYear: number, birthMonth: number, birthDay: number): number[] {
  const koreanZodiac = getKoreanZodiac(birthYear);
  const westernZodiac = getWesternZodiac(birthMonth, birthDay);

  // Combine lucky numbers from both zodiacs
  const combined = [...koreanZodiac.luckyNumbers, ...westernZodiac.luckyNumbers];

  // Remove duplicates and return
  return Array.from(new Set(combined));
}
