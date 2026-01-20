import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "프리미엄",
  description: "EIKO.KR 프리미엄 멤버십으로 무제한 행운 번호를 생성하세요.",
};

export default function PremiumPage() {
  const plans = [
    {
      name: "무료",
      nameEn: "Free",
      price: "0",
      period: "",
      description: "행운 번호 체험하기",
      features: [
        { text: "하루 3회 번호 생성", included: true },
        { text: "기본 개인화 (생년월일, 이름)", included: true },
        { text: "로또 6/45, 연금복권 지원", included: true },
        { text: "꿈 해몽 기능", included: false },
        { text: "생성 기록 저장", included: false },
        { text: "행운 시간 알림", included: false },
        { text: "프리미엄 테마", included: false },
      ],
      cta: "현재 이용 중",
      ctaStyle: "secondary",
      popular: false,
    },
    {
      name: "프리미엄",
      nameEn: "Premium",
      price: "4,900",
      period: "/월",
      description: "진정한 행운의 파트너",
      features: [
        { text: "무제한 번호 생성", included: true },
        { text: "전체 개인화 옵션", included: true },
        { text: "모든 복권 게임 지원", included: true },
        { text: "고급 꿈 해몽 분석", included: true },
        { text: "무제한 생성 기록 저장", included: true },
        { text: "행운 시간 알림", included: true },
        { text: "프리미엄 테마", included: true },
      ],
      cta: "시작하기",
      ctaStyle: "primary",
      popular: true,
    },
    {
      name: "후원자",
      nameEn: "Supporter",
      price: "9,900",
      period: "/월",
      description: "EIKO.KR을 응원해 주세요",
      features: [
        { text: "프리미엄 모든 기능", included: true },
        { text: "후원자 전용 배지", included: true },
        { text: "신규 기능 우선 체험", included: true },
        { text: "후원자 전용 테마", included: true },
        { text: "개발 로드맵 투표권", included: true },
        { text: "1:1 문의 우선 응답", included: true },
        { text: "연간 행운 리포트", included: true },
      ],
      cta: "후원하기",
      ctaStyle: "gold",
      popular: false,
    },
  ];

  const paymentMethods = [
    { name: "카카오페이", icon: "kakao" },
    { name: "네이버페이", icon: "naver" },
    { name: "신용카드", icon: "card" },
    { name: "토스", icon: "toss" },
  ];

  const faqs = [
    {
      question: "결제는 어떻게 이루어지나요?",
      answer:
        "카카오페이, 네이버페이, 토스, 신용카드 등 다양한 결제 수단을 지원합니다. 모든 결제는 토스페이먼츠를 통해 안전하게 처리됩니다.",
    },
    {
      question: "구독을 취소하면 어떻게 되나요?",
      answer:
        "언제든지 구독을 취소할 수 있으며, 이미 결제한 기간까지는 프리미엄 기능을 계속 이용하실 수 있습니다. 자동 갱신은 즉시 중단됩니다.",
    },
    {
      question: "환불이 가능한가요?",
      answer:
        "결제 후 7일 이내에 서비스를 이용하지 않으셨다면 전액 환불이 가능합니다. 그 이후에는 남은 기간에 대한 부분 환불을 제공합니다.",
    },
    {
      question: "연간 구독 할인이 있나요?",
      answer:
        "네, 연간 구독 시 2개월 무료 혜택을 제공합니다. 프리미엄 연간 구독은 49,000원, 후원자 연간 구독은 99,000원입니다.",
    },
  ];

  return (
    <div className="korean-clouds">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent-gold/20 border border-accent-gold/30 mb-6">
            <span className="text-accent-gold font-medium text-sm">
              첫 달 50% 할인 이벤트 진행 중
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-cream mb-6 korean-title">
            프리미엄 멤버십
          </h1>
          <p className="text-xl text-neutral-cream/80 max-w-2xl mx-auto">
            무제한 행운 번호와 고급 기능으로
            <br />
            더 특별한 행운을 경험하세요.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 -mt-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-6 ${
                  plan.popular
                    ? "bg-primary text-neutral-cream shadow-gold-lg scale-105 z-10"
                    : "glass-card"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent-gold text-primary text-sm font-bold rounded-full">
                    인기
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3
                    className={`text-2xl font-bold ${
                      plan.popular ? "text-accent-gold" : "text-primary"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`text-sm ${
                      plan.popular ? "text-neutral-cream/60" : "text-primary/60"
                    }`}
                  >
                    {plan.description}
                  </p>
                </div>

                <div className="text-center mb-6">
                  <span
                    className={`text-4xl font-bold ${
                      plan.popular ? "text-neutral-cream" : "text-primary"
                    }`}
                  >
                    {plan.price === "0" ? "무료" : `₩${plan.price}`}
                  </span>
                  {plan.period && (
                    <span
                      className={`text-sm ${
                        plan.popular ? "text-neutral-cream/60" : "text-primary/60"
                      }`}
                    >
                      {plan.period}
                    </span>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li
                      key={index}
                      className={`flex items-center text-sm ${
                        plan.popular
                          ? feature.included
                            ? "text-neutral-cream"
                            : "text-neutral-cream/40"
                          : feature.included
                          ? "text-primary"
                          : "text-primary/40"
                      }`}
                    >
                      {feature.included ? (
                        <svg
                          className={`w-5 h-5 mr-2 ${
                            plan.popular ? "text-accent-gold" : "text-tech-blue"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5 mr-2 opacity-40"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      )}
                      {feature.text}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                    plan.ctaStyle === "primary"
                      ? "bg-accent-gold text-primary hover:bg-accent-gold-light"
                      : plan.ctaStyle === "gold"
                      ? "bg-gradient-to-r from-accent-gold to-lucky-red text-white hover:shadow-gold"
                      : plan.popular
                      ? "bg-neutral-cream/10 text-neutral-cream border border-neutral-cream/30"
                      : "bg-primary/10 text-primary border border-primary/30"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-12 bg-white/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-primary/60 mb-6">지원하는 결제 수단</p>
          <div className="flex justify-center items-center gap-6 flex-wrap">
            {paymentMethods.map((method) => (
              <div
                key={method.name}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm"
              >
                <PaymentIcon name={method.icon} />
                <span className="text-sm font-medium text-primary/70">
                  {method.name}
                </span>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-primary/40 mt-4">
            모든 결제는 토스페이먼츠를 통해 안전하게 처리됩니다
          </p>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary text-center mb-12 korean-title">
            프리미엄만의 특별한 기능
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-gold/20 to-lucky-red/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">행운 시간 알림</h3>
              <p className="text-sm text-primary/60">
                당신의 운세가 가장 좋은 시간대를 분석하여 알림을 보내드립니다.
                최적의 타이밍에 복권을 구매하세요.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-gold/20 to-lucky-red/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">상세 통계 분석</h3>
              <p className="text-sm text-primary/60">
                생성된 번호의 패턴 분석, 당첨 번호와의 비교, 개인화된 운세 리포트를
                제공합니다.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-gold/20 to-lucky-red/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">고급 꿈 해몽</h3>
              <p className="text-sm text-primary/60">
                300가지 이상의 꿈 상징 데이터베이스와 AI 기반 해몽으로 더 정확한
                행운 번호를 제안합니다.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-gold/20 to-lucky-red/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">프리미엄 테마</h3>
              <p className="text-sm text-primary/60">
                황금, 행운의 빨강, 밤하늘 등 다양한 프리미엄 테마로 나만의 스타일을
                만들어 보세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary text-center mb-12 korean-title">
            자주 묻는 질문
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="glass-card rounded-2xl overflow-hidden group"
              >
                <summary className="p-6 cursor-pointer font-semibold text-primary flex justify-between items-center hover:bg-accent-gold/5 transition-colors">
                  {faq.question}
                  <span className="text-accent-gold group-open:rotate-180 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-primary/70 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary mb-4 korean-title">
            지금 프리미엄을 시작하세요
          </h2>
          <p className="text-primary/70 mb-8">
            첫 달 50% 할인 이벤트는 곧 종료됩니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-lucky text-lg">
              프리미엄 시작하기
            </button>
            <Link href="/generate" className="btn-secondary">
              무료로 체험하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function PaymentIcon({ name }: { name: string }) {
  const icons: Record<string, JSX.Element> = {
    kakao: (
      <div className="w-6 h-6 rounded bg-[#FEE500] flex items-center justify-center">
        <span className="text-[#3C1E1E] text-xs font-bold">K</span>
      </div>
    ),
    naver: (
      <div className="w-6 h-6 rounded bg-[#03C75A] flex items-center justify-center">
        <span className="text-white text-xs font-bold">N</span>
      </div>
    ),
    card: (
      <svg className="w-6 h-6 text-primary/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    toss: (
      <div className="w-6 h-6 rounded bg-[#0064FF] flex items-center justify-center">
        <span className="text-white text-xs font-bold">T</span>
      </div>
    ),
  };
  return icons[name] || null;
}
