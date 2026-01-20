"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import NumberBall from "@/components/lottery/NumberBall";
import { generateLuckyNumbers, getGameInfo, LotteryGame, GenerationResult, PersonalInfo } from "@/lib/generation/lucky-numbers";
import { getDreamSymbolsByCategory } from "@/lib/generation/dreams";

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

  const dreamCategories = getDreamSymbolsByCategory();

  const handleGenerate = async () => {
    setIsGenerating(true);

    // Simulate a brief delay for dramatic effect
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const generatedResult = generateLuckyNumbers(gameType, personalInfo);
    setResult(generatedResult);
    setIsGenerating(false);
    setStep(3);
  };

  const resetGeneration = () => {
    setResult(null);
    setStep(1);
    setPersonalInfo({});
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

            {/* Generated Numbers */}
            <div className="glass-card rounded-2xl p-8 mb-8">
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                {result.numbers.map((num, index) => (
                  <NumberBall
                    key={index}
                    number={num}
                    size="lg"
                    variant={index === result.numbers.length - 1 && result.bonusNumber ? "blue" : "gold"}
                    animated
                    delay={index * 200}
                  />
                ))}
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
              <Link href="/premium" className="btn-secondary text-center">
                더 많은 번호 받기
              </Link>
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
