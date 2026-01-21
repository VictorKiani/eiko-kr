"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import NumberBall from "@/components/lottery/NumberBall";
import { generateLuckyNumbers, getGameInfo, LotteryGame, GenerationResult, PersonalInfo } from "@/lib/generation/lucky-numbers";
import { getDreamSymbolsByCategory } from "@/lib/generation/dreams";

// Pricing configuration (in KRW)
const PRICING = {
  perNumber: 1000,           // Base price per number
  allNumbersDiscount: 0.2,   // 20% discount for all numbers
  specificSelectPremium: 500, // Extra cost for specific selection (per number)
};

// Paywall Modal Component
function PaywallModal({
  isOpen,
  onClose,
  numbers,
  unlockedIndices,
  onPurchase,
}: {
  isOpen: boolean;
  onClose: () => void;
  numbers: number[];
  unlockedIndices: Set<number>;
  onPurchase: (indices: number[]) => void;
}) {
  const [selectionMode, setSelectionMode] = useState<"random" | "specific">("random");
  const [selectedCount, setSelectedCount] = useState(1);
  const [specificIndices, setSpecificIndices] = useState<Set<number>>(new Set());

  const lockedCount = numbers.length - unlockedIndices.size;

  // Calculate prices
  const calculatePrice = () => {
    const count = selectionMode === "specific" ? specificIndices.size : selectedCount;
    const isAllNumbers = count === lockedCount;

    let basePrice = count * PRICING.perNumber;

    if (selectionMode === "specific") {
      basePrice += count * PRICING.specificSelectPremium;
    }

    if (isAllNumbers && lockedCount > 1) {
      basePrice = basePrice * (1 - PRICING.allNumbersDiscount);
    }

    return Math.round(basePrice);
  };

  const handleSpecificToggle = (index: number) => {
    const newSet = new Set(specificIndices);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setSpecificIndices(newSet);
  };

  const handlePurchaseClick = () => {
    if (selectionMode === "random") {
      // Get random locked indices
      const lockedIndices = numbers
        .map((_, i) => i)
        .filter((i) => !unlockedIndices.has(i));

      // Shuffle and take selectedCount
      const shuffled = [...lockedIndices].sort(() => Math.random() - 0.5);
      const toUnlock = shuffled.slice(0, selectedCount);
      onPurchase(toUnlock);
    } else {
      onPurchase(Array.from(specificIndices));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-primary mb-2 korean-title">
          행운 번호 잠금 해제
        </h2>
        <p className="text-primary/60 mb-6">
          숨겨진 번호를 확인하세요
        </p>

        {/* Selection Mode */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-primary mb-3">
            선택 방식
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setSelectionMode("random")}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectionMode === "random"
                  ? "border-accent-gold bg-accent-gold/10"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <p className="font-semibold text-primary">랜덤 선택</p>
              <p className="text-xs text-primary/60 mt-1">저렴한 가격</p>
            </button>
            <button
              onClick={() => setSelectionMode("specific")}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectionMode === "specific"
                  ? "border-accent-gold bg-accent-gold/10"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <p className="font-semibold text-primary">직접 선택</p>
              <p className="text-xs text-primary/60 mt-1">+{PRICING.specificSelectPremium.toLocaleString()}원/개</p>
            </button>
          </div>
        </div>

        {/* Number Selection */}
        {selectionMode === "random" ? (
          <div className="mb-6">
            <label className="block text-sm font-semibold text-primary mb-3">
              해제할 번호 개수: {selectedCount}개
            </label>
            <input
              type="range"
              min="1"
              max={lockedCount}
              value={selectedCount}
              onChange={(e) => setSelectedCount(Number(e.target.value))}
              className="w-full accent-accent-gold"
            />
            <div className="flex justify-between text-xs text-primary/50 mt-1">
              <span>1개</span>
              <span>{lockedCount}개 (전체)</span>
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <label className="block text-sm font-semibold text-primary mb-3">
              해제할 번호 선택 ({specificIndices.size}개 선택됨)
            </label>
            <div className="flex flex-wrap gap-3 justify-center">
              {numbers.map((num, index) => {
                const isLocked = !unlockedIndices.has(index);
                if (!isLocked) return null;

                const isSelected = specificIndices.has(index);
                return (
                  <button
                    key={index}
                    onClick={() => handleSpecificToggle(index)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                      isSelected
                        ? "bg-accent-gold text-primary scale-110"
                        : "bg-gray-200 text-gray-500 hover:bg-gray-300"
                    }`}
                  >
                    {index + 1}번
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Pricing Summary */}
        <div className="bg-neutral-cream rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-primary/70">선택 개수</span>
            <span className="font-semibold text-primary">
              {selectionMode === "specific" ? specificIndices.size : selectedCount}개
            </span>
          </div>
          {selectedCount === lockedCount && lockedCount > 1 && selectionMode === "random" && (
            <div className="flex justify-between items-center mb-2 text-lucky-red">
              <span>전체 할인 (20%)</span>
              <span className="font-semibold">적용됨</span>
            </div>
          )}
          {selectionMode === "specific" && specificIndices.size > 0 && (
            <div className="flex justify-between items-center mb-2 text-primary/70">
              <span>직접 선택 추가 비용</span>
              <span>+{(specificIndices.size * PRICING.specificSelectPremium).toLocaleString()}원</span>
            </div>
          )}
          <div className="border-t border-gray-200 pt-2 mt-2">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-primary">총 금액</span>
              <span className="text-xl font-bold text-accent-gold">
                {calculatePrice().toLocaleString()}원
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handlePurchaseClick}
          disabled={(selectionMode === "specific" && specificIndices.size === 0)}
          className="w-full btn-lucky disabled:opacity-50 disabled:cursor-not-allowed"
        >
          결제하고 번호 확인하기
        </button>

        <p className="text-xs text-primary/40 text-center mt-4">
          테스트 모드: 실제 결제는 진행되지 않습니다
        </p>
      </div>
    </div>
  );
}

const MOODS = [
  { value: "행복", label: "행복", emoji: "happy" },
  { value: "평온", label: "평온", emoji: "calm" },
  { value: "설레임", label: "설레임", emoji: "excited" },
  { value: "기대", label: "기대", emoji: "hopeful" },
  { value: "희망", label: "희망", emoji: "optimistic" },
  { value: "감사", label: "감사", emoji: "grateful" },
  { value: "열정", label: "열정", emoji: "passionate" },
  { value: "침착", label: "침착", emoji: "composed" },
];

const GAMES: { value: LotteryGame; label: string; description: string }[] = [
  { value: "lotto645", label: "로또 6/45", description: "1-45에서 6개 선택" },
  { value: "pension720", label: "연금복권 720+", description: "7자리 숫자" },
  { value: "spitto", label: "스피또", description: "1-20에서 5개 선택" },
  { value: "powerball", label: "파워볼", description: "5+1 숫자" },
];

function GenerateContent() {
  const searchParams = useSearchParams();
  const initialGame = (searchParams.get("game") as LotteryGame) || "lotto645";

  const [step, setStep] = useState(1);
  const [gameType, setGameType] = useState<LotteryGame>(initialGame);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({});
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Paywall state
  const [unlockedIndices, setUnlockedIndices] = useState<Set<number>>(new Set());
  const [showPaywall, setShowPaywall] = useState(false);

  const dreamCategories = getDreamSymbolsByCategory();

  // Randomly determine which numbers to lock (always show at least 1-2 free)
  const initializeLockedNumbers = (numbersLength: number) => {
    // Show 1-2 numbers for free (randomized)
    const freeCount = Math.floor(Math.random() * 2) + 1;
    const allIndices = Array.from({ length: numbersLength }, (_, i) => i);

    // Shuffle and take freeCount as unlocked
    const shuffled = [...allIndices].sort(() => Math.random() - 0.5);
    const freeIndices = shuffled.slice(0, freeCount);

    setUnlockedIndices(new Set(freeIndices));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);

    // Simulate a brief delay for dramatic effect
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const generatedResult = generateLuckyNumbers(gameType, personalInfo);
    setResult(generatedResult);

    // Initialize which numbers are locked
    initializeLockedNumbers(generatedResult.numbers.length);

    setIsGenerating(false);
    setStep(3);
  };

  const handlePurchase = (indices: number[]) => {
    // Add purchased indices to unlocked set
    const newUnlocked = new Set(unlockedIndices);
    indices.forEach((i) => newUnlocked.add(i));
    setUnlockedIndices(newUnlocked);
    setShowPaywall(false);
  };

  const resetGeneration = () => {
    setResult(null);
    setStep(1);
    setPersonalInfo({});
    setUnlockedIndices(new Set());
  };

  return (
    <div className="min-h-screen py-12 korean-clouds">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                    step >= s
                      ? "bg-accent-gold text-primary"
                      : "bg-neutral-cream-dark text-primary/40"
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 transition-all duration-300 ${
                      step > s ? "bg-accent-gold" : "bg-neutral-cream-dark"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 text-sm text-primary/60">
            <span className={step === 1 ? "text-accent-gold font-semibold" : ""}>
              게임 선택
            </span>
            <span className="mx-8" />
            <span className={step === 2 ? "text-accent-gold font-semibold" : ""}>
              정보 입력
            </span>
            <span className="mx-8" />
            <span className={step === 3 ? "text-accent-gold font-semibold" : ""}>
              결과 확인
            </span>
          </div>
        </div>

        {/* Step 1: Game Selection */}
        {step === 1 && (
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-primary text-center mb-2 korean-title">
              복권 종류 선택
            </h1>
            <p className="text-primary/60 text-center mb-8">
              행운 번호를 받을 복권 종류를 선택하세요
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {GAMES.map((game) => (
                <button
                  key={game.value}
                  onClick={() => setGameType(game.value)}
                  className={`p-6 rounded-2xl text-left transition-all duration-300 ${
                    gameType === game.value
                      ? "bg-primary text-neutral-cream shadow-gold-lg scale-105"
                      : "glass-card hover:shadow-gold"
                  }`}
                >
                  <h3
                    className={`text-xl font-bold mb-1 ${
                      gameType === game.value ? "text-accent-gold" : "text-primary"
                    }`}
                  >
                    {game.label}
                  </h3>
                  <p
                    className={`text-sm ${
                      gameType === game.value
                        ? "text-neutral-cream/70"
                        : "text-primary/60"
                    }`}
                  >
                    {game.description}
                  </p>
                </button>
              ))}
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setStep(2)}
                className="btn-lucky"
              >
                다음 단계로
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Personal Info Form */}
        {step === 2 && (
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-primary text-center mb-2 korean-title">
              개인 정보 입력
            </h1>
            <p className="text-primary/60 text-center mb-8">
              더 정확한 행운 번호를 위해 정보를 입력하세요 (선택사항)
            </p>

            <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  이름 (한글)
                </label>
                <input
                  type="text"
                  placeholder="예: 홍길동"
                  className="input-korean"
                  value={personalInfo.name || ""}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, name: e.target.value })
                  }
                />
                <p className="text-xs text-primary/50 mt-1">
                  이름의 획수로 행운 번호를 계산합니다
                </p>
              </div>

              {/* Birth Date */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    출생연도
                  </label>
                  <input
                    type="number"
                    placeholder="1990"
                    min="1900"
                    max="2024"
                    className="input-korean"
                    value={personalInfo.birthYear || ""}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        birthYear: parseInt(e.target.value) || undefined,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    월
                  </label>
                  <select
                    className="select-korean"
                    value={personalInfo.birthMonth || ""}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        birthMonth: parseInt(e.target.value) || undefined,
                      })
                    }
                  >
                    <option value="">선택</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}월
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    일
                  </label>
                  <select
                    className="select-korean"
                    value={personalInfo.birthDay || ""}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        birthDay: parseInt(e.target.value) || undefined,
                      })
                    }
                  >
                    <option value="">선택</option>
                    {Array.from({ length: 31 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}일
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Mood */}
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  오늘의 기분
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {MOODS.map((mood) => (
                    <button
                      key={mood.value}
                      onClick={() =>
                        setPersonalInfo({
                          ...personalInfo,
                          mood: personalInfo.mood === mood.value ? undefined : mood.value,
                        })
                      }
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        personalInfo.mood === mood.value
                          ? "bg-accent-gold text-primary"
                          : "bg-neutral-cream-dark text-primary/70 hover:bg-accent-gold/20"
                      }`}
                    >
                      {mood.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dream Symbol */}
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  꿈 해몽 (최근에 꾼 꿈)
                </label>
                <select
                  className="select-korean"
                  value={personalInfo.dreamSymbol || ""}
                  onChange={(e) =>
                    setPersonalInfo({
                      ...personalInfo,
                      dreamSymbol: e.target.value || undefined,
                    })
                  }
                >
                  <option value="">꿈에서 본 것 선택...</option>
                  {Object.entries(dreamCategories).map(([category, symbols]) => (
                    <optgroup key={category} label={category}>
                      {symbols.map((symbol) => (
                        <option key={symbol.name} value={symbol.name}>
                          {symbol.name} - {symbol.meaning.slice(0, 20)}...
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep(1)}
                className="btn-secondary"
              >
                이전으로
              </button>
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="btn-lucky"
              >
                {isGenerating ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    생성 중...
                  </span>
                ) : (
                  "행운 번호 생성"
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Results */}
        {step === 3 && result && (
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-primary text-center mb-2 korean-title">
              당신의 행운 번호
            </h1>
            <p className="text-primary/60 text-center mb-8">
              {getGameInfo(result.gameType).name}
            </p>

            {/* Paywall Modal */}
            <PaywallModal
              isOpen={showPaywall}
              onClose={() => setShowPaywall(false)}
              numbers={result.numbers}
              unlockedIndices={unlockedIndices}
              onPurchase={handlePurchase}
            />

            {/* Generated Numbers */}
            <div className="glass-card rounded-2xl p-8 mb-8">
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                {result.numbers.map((num, index) => {
                  const isLocked = !unlockedIndices.has(index);
                  return (
                    <div key={index} className="relative">
                      {isLocked ? (
                        <div
                          className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl shadow-lg cursor-pointer transition-all hover:scale-105"
                          style={{
                            background: "linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)",
                            filter: "blur(0px)",
                          }}
                          onClick={() => setShowPaywall(true)}
                        >
                          <span className="text-white text-2xl blur-sm select-none">?</span>
                          <div className="absolute inset-0 rounded-full bg-gray-500/30 backdrop-blur-md flex items-center justify-center">
                            <svg className="w-6 h-6 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                        </div>
                      ) : (
                        <NumberBall
                          number={num}
                          size="lg"
                          variant={index === result.numbers.length - 1 && result.bonusNumber ? "blue" : "gold"}
                          animated
                          delay={index * 200}
                        />
                      )}
                    </div>
                  );
                })}
                {result.bonusNumber && (
                  <>
                    <span className="flex items-center text-primary/40 text-2xl mx-2">+</span>
                    <NumberBall
                      number={result.bonusNumber}
                      size="lg"
                      variant="red"
                      animated
                      delay={result.numbers.length * 200}
                    />
                  </>
                )}
              </div>

              {/* Unlock Prompt */}
              {unlockedIndices.size < result.numbers.length && (
                <div className="mb-6 p-4 bg-gradient-to-r from-accent-gold/10 to-lucky-red/10 rounded-xl border border-accent-gold/30">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-primary">
                        {result.numbers.length - unlockedIndices.size}개의 번호가 숨겨져 있습니다
                      </p>
                      <p className="text-sm text-primary/60">
                        잠금을 해제하고 모든 행운 번호를 확인하세요
                      </p>
                    </div>
                    <button
                      onClick={() => setShowPaywall(true)}
                      className="btn-lucky whitespace-nowrap text-sm py-2 px-4"
                    >
                      번호 잠금 해제
                    </button>
                  </div>
                </div>
              )}

              {/* Lucky Factors */}
              <div className="border-t border-neutral-cream-dark pt-6 mt-6">
                <h3 className="text-lg font-semibold text-primary mb-4 text-center">
                  행운 분석 요인
                </h3>
                <div className="space-y-3">
                  {result.luckyFactors.map((factor, index) => (
                    <div
                      key={index}
                      className="flex items-start bg-neutral-cream/50 rounded-lg p-3"
                    >
                      <div className="w-2 h-2 rounded-full bg-accent-gold mt-2 mr-3" />
                      <div>
                        <p className="font-medium text-primary">{factor.factor}</p>
                        <p className="text-sm text-primary/60">{factor.meaning}</p>
                        <div className="flex gap-2 mt-1">
                          {factor.numbers.slice(0, 5).map((n) => (
                            <span
                              key={n}
                              className="text-xs bg-accent-gold/20 text-accent-gold-dark px-2 py-0.5 rounded"
                            >
                              {n}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Explanation */}
              {result.explanation.length > 0 && (
                <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                  <p className="text-sm text-primary/70">
                    {result.explanation.join(" ")}
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetGeneration}
                className="btn-primary"
              >
                다시 생성하기
              </button>
              {unlockedIndices.size < result.numbers.length ? (
                <button
                  onClick={() => setShowPaywall(true)}
                  className="btn-secondary text-center"
                >
                  숨겨진 번호 보기
                </button>
              ) : (
                <Link href="/premium" className="btn-secondary text-center">
                  더 많은 번호 받기
                </Link>
              )}
            </div>

            {/* Share */}
            <div className="mt-8 text-center">
              <p className="text-sm text-primary/50 mb-2">친구에게 공유하기</p>
              <div className="flex justify-center gap-3">
                <button className="w-10 h-10 rounded-full bg-[#FEE500] flex items-center justify-center hover:opacity-80 transition-opacity">
                  <span className="text-[#3C1E1E] text-sm font-bold">K</span>
                </button>
                <button className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center hover:opacity-80 transition-opacity">
                  <span className="text-white text-sm font-bold">f</span>
                </button>
                <button className="w-10 h-10 rounded-full bg-[#1DA1F2] flex items-center justify-center hover:opacity-80 transition-opacity">
                  <span className="text-white text-sm font-bold">X</span>
                </button>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-primary/40 text-center mt-8">
              본 서비스는 오락 목적으로만 제공되며, 당첨을 보장하지 않습니다.
              책임감 있는 복권 구매를 권장합니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function GeneratePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-primary/60">로딩 중...</p>
        </div>
      </div>
    }>
      <GenerateContent />
    </Suspense>
  );
}
