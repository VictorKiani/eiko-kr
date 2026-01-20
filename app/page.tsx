import Link from "next/link";
import NumberBall from "@/components/lottery/NumberBall";

export default function Home() {
  const sampleNumbers = [7, 14, 21, 28, 35, 42];

  const features = [
    {
      icon: "calendar",
      title: "생년월일 분석",
      description: "태어난 날의 에너지를 숫자로 변환하여 행운의 기운을 찾습니다.",
    },
    {
      icon: "star",
      title: "띠 & 별자리",
      description: "12지신과 별자리의 조합으로 당신만의 특별한 번호를 도출합니다.",
    },
    {
      icon: "pencil",
      title: "이름 수리",
      description: "한글 이름의 획수로 동양 수비학 기반의 행운 번호를 계산합니다.",
    },
    {
      icon: "moon",
      title: "꿈 해몽",
      description: "간밤의 꿈을 분석하여 숨겨진 행운의 숫자를 찾아드립니다.",
    },
  ];

  const games = [
    {
      name: "로또 6/45",
      description: "대한민국 대표 복권",
      format: "6개 숫자 선택",
      range: "1-45",
    },
    {
      name: "연금복권 720+",
      description: "매월 연금처럼 당첨금",
      format: "7자리 숫자",
      range: "0-9",
    },
    {
      name: "스피또",
      description: "즉석 당첨 확인",
      format: "다양한 게임",
      range: "다양",
    },
    {
      name: "파워볼",
      description: "미국 메가 잭팟",
      format: "5+1 숫자",
      range: "1-69, 1-26",
    },
  ];

  const testimonials = [
    {
      name: "김**",
      location: "서울",
      quote: "생년월일로 받은 번호로 4등 당첨! 정말 신기해요.",
      amount: "5만원",
    },
    {
      name: "이**",
      location: "부산",
      quote: "꿈 해몽 기능이 재미있어요. 친구들과 같이 써요.",
      amount: "3등",
    },
    {
      name: "박**",
      location: "대구",
      quote: "매주 이 사이트로 번호 뽑아요. 직관적이고 좋아요!",
      amount: "5등",
    },
  ];

  return (
    <div className="korean-clouds">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent-gold/5" />

        {/* Floating particles decoration */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-accent-gold/30 rounded-full animate-float" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-lucky-red/30 rounded-full animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-20 left-1/4 w-5 h-5 bg-tech-blue/30 rounded-full animate-float" style={{ animationDelay: "2s" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent-gold/10 border border-accent-gold/30 mb-8">
              <span className="text-accent-gold-dark font-medium text-sm">
                매일 무료 3회 생성 가능
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-6 korean-title">
              당신만의{" "}
              <span className="gradient-text">행운 번호</span>를
              <br />
              찾아보세요
            </h1>

            <p className="text-lg sm:text-xl text-primary/70 max-w-2xl mx-auto mb-8 korean-body">
              생년월일, 이름, 띠, 꿈 해몽을 기반으로
              <br className="hidden sm:block" />
              개인화된 행운의 숫자를 생성해 드립니다.
            </p>

            {/* Sample Numbers Animation */}
            <div className="flex justify-center gap-3 mb-10">
              {sampleNumbers.map((num, index) => (
                <NumberBall
                  key={num}
                  number={num}
                  variant={index === 5 ? "red" : "gold"}
                  animated
                  delay={index * 150}
                />
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/generate" className="btn-lucky text-lg">
                지금 번호 받기
              </Link>
              <Link href="/about" className="btn-secondary">
                어떻게 작동하나요?
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4 korean-title">
              개인화된 행운 분석
            </h2>
            <p className="text-primary/70 max-w-2xl mx-auto">
              동양의 전통 수비학과 현대적인 알고리즘을 결합하여
              당신에게 특별한 의미가 있는 숫자를 찾아드립니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="glass-card rounded-2xl p-6 hover:shadow-gold transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-gold/20 to-lucky-red/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FeatureIcon name={feature.icon} />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-primary/60 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4 korean-title">
              지원하는 복권 종류
            </h2>
            <p className="text-primary/70 max-w-2xl mx-auto">
              대한민국 인기 복권부터 해외 복권까지,
              다양한 게임에 맞는 행운 번호를 생성하세요.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {games.map((game) => (
              <Link
                key={game.name}
                href={`/generate?game=${game.name.toLowerCase().replace(/[^a-z0-9]/g, "")}`}
                className="block"
              >
                <div className="bg-primary rounded-2xl p-6 text-neutral-cream hover:shadow-gold-lg transition-all duration-300 hover:-translate-y-1 h-full">
                  <h3 className="text-xl font-bold text-accent-gold mb-2">
                    {game.name}
                  </h3>
                  <p className="text-neutral-cream/80 text-sm mb-4">
                    {game.description}
                  </p>
                  <div className="flex justify-between text-xs text-neutral-cream/60">
                    <span>{game.format}</span>
                    <span>{game.range}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-cream mb-4 korean-title">
              행운을 경험한 분들
            </h2>
            <p className="text-neutral-cream/70 max-w-2xl mx-auto">
              EIKO.KR을 이용한 실제 사용자들의 후기입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="glass-card-dark rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-gold to-lucky-red flex items-center justify-center">
                    <span className="text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-cream">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-neutral-cream/60">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <p className="text-neutral-cream/80 mb-4 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="inline-flex px-3 py-1 rounded-full bg-accent-gold/20 text-accent-gold text-sm">
                  {testimonial.amount} 당첨
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-accent-gold/10 to-lucky-red/10 rounded-3xl p-8 sm:p-12 border border-accent-gold/20">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4 korean-title">
              오늘의 행운을 시험해 보세요
            </h2>
            <p className="text-primary/70 mb-8 max-w-xl mx-auto">
              무료로 3회까지 번호를 생성할 수 있습니다.
              프리미엄 멤버십으로 무제한 이용하세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/generate" className="btn-lucky text-lg">
                무료로 시작하기
              </Link>
              <Link href="/premium" className="btn-secondary">
                프리미엄 보기
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureIcon({ name }: { name: string }) {
  const icons: Record<string, JSX.Element> = {
    calendar: (
      <svg className="w-6 h-6 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    star: (
      <svg className="w-6 h-6 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    pencil: (
      <svg className="w-6 h-6 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    moon: (
      <svg className="w-6 h-6 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
  };

  return icons[name] || null;
}
