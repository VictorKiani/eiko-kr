import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { href: "/generate", label: "번호 생성" },
      { href: "/premium", label: "프리미엄" },
      { href: "/about", label: "소개" },
    ],
    lottery: [
      { href: "/generate?game=lotto645", label: "로또 6/45" },
      { href: "/generate?game=pension720", label: "연금복권 720+" },
      { href: "/generate?game=spitto", label: "스피또" },
      { href: "/generate?game=powerball", label: "파워볼" },
    ],
    legal: [
      { href: "/terms", label: "이용약관" },
      { href: "/privacy", label: "개인정보처리방침" },
    ],
  };

  return (
    <footer className="bg-primary text-neutral-cream/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-gold to-lucky-red flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="text-xl font-bold text-neutral-cream">
                EIKO<span className="text-accent-gold">.KR</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              당신만의 행운 번호를 찾아보세요.
              <br />
              생년월일, 이름, 띠, 꿈 해몽으로
              <br />
              맞춤형 행운 번호를 추천해 드립니다.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-accent-gold font-semibold mb-4">서비스</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-accent-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Lottery Games */}
          <div>
            <h4 className="text-accent-gold font-semibold mb-4">복권 종류</h4>
            <ul className="space-y-2">
              {footerLinks.lottery.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-accent-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-accent-gold font-semibold mb-4">법적 고지</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-accent-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-neutral-cream/60">
              본 서비스는 오락 목적으로만 제공되며,
              <br />
              당첨을 보장하지 않습니다.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-accent-gold/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-neutral-cream/60">
              &copy; {currentYear} EIKO.KR. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <span className="text-xs text-neutral-cream/40">
                Made with luck in Korea
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
