import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "소개",
  description: "EIKO.KR의 행운 번호 생성 알고리즘과 신뢰성에 대해 알아보세요.",
};

export default function AboutPage() {
  const algorithmSteps = [
    {
      step: 1,
      title: "개인 정보 수집",
      description:
        "생년월일, 이름, 기분, 꿈 등 당신만의 고유한 정보를 수집합니다.",
      icon: "user",
    },
    {
      step: 2,
      title: "전통 수비학 분석",
      description:
        "한국 전통 띠와 서양 별자리의 행운 숫자를 분석하고, 이름의 획수를 계산합니다.",
      icon: "book",
    },
    {
      step: 3,
      title: "암호학적 무작위화",
      description:
        "개인 정보를 시드로 사용하여 암호학적으로 안전한 난수를 생성합니다.",
      icon: "lock",
    },
    {
      step: 4,
      title: "가중치 적용",
      description:
        "행운 숫자에 가중치를 부여하면서도 무작위성을 유지하여 최종 번호를 선정합니다.",
      icon: "scale",
    },
  ];

  const trustFactors = [
    {
      title: "투명한 알고리즘",
      description: "저희의 번호 생성 과정은 완전히 투명합니다. 어떤 숫자가 왜 선택되었는지 상세히 설명해 드립니다.",
      icon: "eye",
    },
    {
      title: "개인정보 보호",
      description: "입력하신 모든 개인정보는 서버에 저장되지 않습니다. 브라우저에서만 처리되며 즉시 삭제됩니다.",
      icon: "shield",
    },
    {
      title: "공정한 무작위성",
      description: "개인 정보가 행운의 요소를 더하지만, 최종 결과는 수학적으로 공정한 무작위성을 보장합니다.",
      icon: "dice",
    },
    {
      title: "책임감 있는 서비스",
      description: "저희는 복권은 오락이라는 것을 명확히 합니다. 당첨 보장은 없으며, 책임감 있는 구매를 권장합니다.",
      icon: "heart",
    },
  ];

  const faqs = [
    {
      question: "생성된 번호가 정말 행운을 가져다 주나요?",
      answer:
        "저희 서비스는 동양과 서양의 전통 수비학을 현대적인 알고리즘과 결합합니다. 이것이 실제로 당첨 확률을 높이지는 않지만, 개인적으로 의미 있는 번호를 제공함으로써 복권 구매를 더 즐겁게 만들어 드립니다.",
    },
    {
      question: "왜 개인 정보를 물어보나요?",
      answer:
        "개인 정보는 행운 번호 생성의 시드로 사용됩니다. 이를 통해 매번 같은 조건에서 동일한 번호를 생성할 수 있고, 개인적으로 의미 있는 숫자를 포함시킬 수 있습니다.",
    },
    {
      question: "하루에 몇 번 생성할 수 있나요?",
      answer:
        "무료 사용자는 하루에 3번까지 생성할 수 있습니다. 프리미엄 멤버십에 가입하시면 무제한으로 생성하실 수 있습니다.",
    },
    {
      question: "생성된 번호를 저장할 수 있나요?",
      answer:
        "현재 무료 버전에서는 화면 캡처나 메모로 저장하셔야 합니다. 프리미엄 멤버십에서는 히스토리 기능을 통해 자동으로 저장됩니다.",
    },
    {
      question: "개인정보는 어떻게 처리되나요?",
      answer:
        "모든 계산은 브라우저에서 이루어지며, 서버로 전송되거나 저장되지 않습니다. 페이지를 닫으면 모든 데이터가 삭제됩니다.",
    },
  ];

  return (
    <div className="korean-clouds">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-cream mb-6 korean-title">
            EIKO.KR 소개
          </h1>
          <p className="text-xl text-neutral-cream/80 max-w-2xl mx-auto">
            동양의 지혜와 현대 기술의 만남.
            <br />
            당신만의 특별한 행운 번호를 찾아드립니다.
          </p>
        </div>
      </section>

      {/* Algorithm Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4 korean-title">
              어떻게 작동하나요?
            </h2>
            <p className="text-primary/70 max-w-2xl mx-auto">
              투명하고 신뢰할 수 있는 4단계 번호 생성 과정
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {algorithmSteps.map((item) => (
              <div
                key={item.step}
                className="glass-card rounded-2xl p-6 text-center relative"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-accent-gold text-primary font-bold flex items-center justify-center">
                  {item.step}
                </div>
                <div className="w-16 h-16 mx-auto mb-4 mt-4 rounded-xl bg-gradient-to-br from-accent-gold/20 to-lucky-red/20 flex items-center justify-center">
                  <AlgorithmIcon name={item.icon} />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-primary/60 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4 korean-title">
              신뢰할 수 있는 이유
            </h2>
            <p className="text-primary/70 max-w-2xl mx-auto">
              사용자의 신뢰를 최우선으로 생각합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trustFactors.map((factor) => (
              <div
                key={factor.title}
                className="glass-card rounded-2xl p-6 flex gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-tech-blue/20 to-accent-gold/20 flex items-center justify-center flex-shrink-0">
                  <TrustIcon name={factor.icon} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-2">
                    {factor.title}
                  </h3>
                  <p className="text-sm text-primary/60 leading-relaxed">
                    {factor.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4 korean-title">
              자주 묻는 질문
            </h2>
          </div>

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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-accent-gold/10 to-lucky-red/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4 korean-title">
            지금 바로 시작하세요
          </h2>
          <p className="text-primary/70 mb-8">
            무료로 당신만의 행운 번호를 받아보세요
          </p>
          <Link href="/generate" className="btn-lucky text-lg">
            행운 번호 생성하기
          </Link>
        </div>
      </section>
    </div>
  );
}

function AlgorithmIcon({ name }: { name: string }) {
  const icons: Record<string, JSX.Element> = {
    user: (
      <svg className="w-8 h-8 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    book: (
      <svg className="w-8 h-8 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    lock: (
      <svg className="w-8 h-8 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    scale: (
      <svg className="w-8 h-8 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
  };
  return icons[name] || null;
}

function TrustIcon({ name }: { name: string }) {
  const icons: Record<string, JSX.Element> = {
    eye: (
      <svg className="w-6 h-6 text-tech-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    shield: (
      <svg className="w-6 h-6 text-tech-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    dice: (
      <svg className="w-6 h-6 text-tech-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    heart: (
      <svg className="w-6 h-6 text-tech-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  };
  return icons[name] || null;
}
