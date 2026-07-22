/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useInView, animate, useScroll, useSpring } from "motion/react";
import { 
  CheckCircle2, 
  Clock, 
  Award, 
  MapPin, 
  Phone, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Cpu, 
  Wrench,
  Users,
  Briefcase,
  Zap,
  Menu,
  X,
  ArrowUp,
  UserPlus,
  MousePointer2,
  FlaskConical,
  Smartphone,
  Download,
  LayoutGrid,
  Bell,
  Upload,
  Sliders,
  RotateCcw,
  ImagePlus
} from "lucide-react";
import React, { useState, useEffect } from "react";
import heroSlide01Img from "./assets/images/hero-slide-01.jpg";

const CTAButton = ({ className = "", children, variant = "primary" }: { className?: string, children: React.ReactNode, variant?: "primary" | "secondary" | "outline" }) => {
  const baseStyles = "px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 group";
  const variants = {
    primary: "bg-point-yellow text-navy-900 hover:bg-yellow-400 shadow-lg hover:shadow-yellow-400/20",
    secondary: "bg-white text-navy-900 hover:bg-gray-100 shadow-lg",
    outline: "border-2 border-white text-white hover:bg-white hover:text-navy-900"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </button>
  );
};

const SectionTitle = ({ title, subtitle, light = false }: { title: string, subtitle?: string, light?: boolean }) => (
  <div className="mb-8 text-center">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      className={`text-3xl md:text-5xl font-bold mb-4 whitespace-pre-line ${light ? 'text-white' : 'text-navy-900'}`}
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ delay: 0.1 }}
        className={`text-lg md:text-xl whitespace-pre-line ${light ? 'text-gray-300' : 'text-gray-600'}`}
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const Counter = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => setCount(Math.floor(latest)),
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Dynamic Logo State
  const [logoUrl, setLogoUrl] = useState<string>(() => {
    return localStorage.getItem('dalsu_custom_logo_url') || '/images/logo/dalsu-logo.jpg';
  });
  const [logoHeight, setLogoHeight] = useState<number>(() => {
    const saved = localStorage.getItem('dalsu_custom_logo_height');
    return saved ? parseInt(saved, 10) : 44;
  });
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) {
          setLogoUrl(dataUrl);
          localStorage.setItem('dalsu_custom_logo_url', dataUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoHeightChange = (newHeight: number) => {
    setLogoHeight(newHeight);
    localStorage.setItem('dalsu_custom_logo_height', newHeight.toString());
  };

  const handleResetLogo = () => {
    setLogoUrl('/images/logo/dalsu-logo.jpg');
    setLogoHeight(44);
    localStorage.removeItem('dalsu_custom_logo_url');
    localStorage.removeItem('dalsu_custom_logo_height');
  };

  // Check if running in development mode or explicitly enabled via URL param
  const isDevEnv = typeof window !== 'undefined' && (
    window.location.hostname.includes('ais-dev') || 
    window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1' ||
    window.location.search.includes('editLogo=true')
  );

  const curriculumRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: curriculumRef,
    offset: ["start center", "end center"]
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (id === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen font-sans scroll-smooth">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="flex items-center gap-2.5 cursor-pointer group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img 
                src={logoUrl} 
                alt="배관케어 마스터 교육원 로고" 
                style={{ height: `${logoHeight}px` }}
                className="w-auto object-contain rounded-lg transition-all"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col -space-y-0.5">
                <span className="text-lg md:text-xl font-black text-navy-900 tracking-tighter">배관케어 마스터</span>
                <span className="text-[10px] md:text-xs font-bold text-blue-600 tracking-wider">교육원</span>
              </div>
            </div>

            {isDevEnv && (
              <button
                onClick={() => setIsLogoModalOpen(true)}
                className="flex items-center gap-1.5 text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 px-2.5 py-1.5 rounded-lg font-bold transition-all border border-blue-200/80 shadow-sm ml-1"
                title="로고 직접 첨부 및 크기 조절 (개발 모드 전용)"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">로고 첨부/조절</span>
              </button>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <a href="#curriculum" onClick={(e) => handleNavClick(e, '#curriculum')} className="text-navy-900 font-bold hover:text-blue-600 transition-colors">커리큘럼</a>
            <a href="#support" onClick={(e) => handleNavClick(e, '#support')} className="text-navy-900 font-bold hover:text-blue-600 transition-colors">본사지원</a>
            <a href="#outlook" onClick={(e) => handleNavClick(e, '#outlook')} className="text-navy-900 font-bold hover:text-blue-600 transition-colors">비전</a>
            <button 
              onClick={() => document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-navy-900 text-white px-6 py-2.5 rounded-full font-bold hover:bg-blue-600 transition-all"
            >
              상담신청
            </button>
          </div>
          
          <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className="w-8 h-6 flex flex-col justify-between">
              <span className="w-full h-[3px] bg-navy-900 rounded-full" />
              <span className="w-2/3 h-[3px] bg-navy-900 rounded-full ml-auto" />
              <span className="w-full h-[3px] bg-navy-900 rounded-full" />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-[60] bg-navy-900 text-white p-8 flex flex-col"
          >
            <div className="flex justify-end mb-12">
              <button onClick={() => setIsMenuOpen(false)} className="p-2">
                <X className="w-10 h-10" />
              </button>
            </div>
            <div className="flex flex-col gap-8 text-3xl font-black">
              <a href="#curriculum" onClick={(e) => handleNavClick(e, '#curriculum')}>커리큘럼</a>
              <a href="#support" onClick={(e) => handleNavClick(e, '#support')}>본사지원</a>
              <a href="#outlook" onClick={(e) => handleNavClick(e, '#outlook')}>비전</a>
              <a href="#final-cta" onClick={(e) => handleNavClick(e, '#final-cta')} className="text-point-yellow">상담신청</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section - Fixed Single Hero Slide */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroSlide01Img} 
            alt="배관케어 마스터 교육원 대표 배경" 
            className="w-full h-full object-cover object-center brightness-100"
            referrerPolicy="no-referrer"
          />
          {/* Subtle dark gradient overlay to ensure text contrast while keeping background clear */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/75 via-navy-950/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-20 w-full flex justify-start">
          <div className="max-w-xl md:max-w-2xl text-left">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Badge highlighting key value */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/90 text-white border border-blue-400/50 text-xs md:text-sm font-bold shadow-xl backdrop-blur-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-point-yellow animate-pulse" />
                <span>AI · 로봇 대체 불가 | 평생 기술 독립</span>
              </div>

              {/* Main Headline with high contrast white & point yellow accents */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.25] drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                단 <span className="text-point-yellow text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black">5일</span>의 투자로{"\n"}
                월 <span className="text-point-yellow text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black">1,000만원</span> 수익의{"\n"}
                주인공이 되세요
              </h1>

              {/* Subheadline with clear text contrast */}
              <p className="text-base md:text-xl text-gray-100 font-bold leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                기술이 곧 자산이 되는 시대! 은퇴 걱정 없는 고수익 평생 기술.{"\n"}
                <span className="text-point-yellow font-black border-b-2 border-point-yellow pb-0.5">배관케어 마스터 교육원</span>에서 1:1 맞춤 실무 기술 교육으로 성공적인 창업을 완성해 드립니다.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button 
                  onClick={() => document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 rounded-2xl bg-point-yellow hover:bg-yellow-400 text-navy-900 font-black text-lg transition-all shadow-xl shadow-yellow-500/20 flex items-center gap-2 group"
                >
                  <span>수강 및 창업 상담</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-lg transition-all border border-white/30 backdrop-blur-sm"
                >
                  5일 커리큘럼 보기
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/80 z-20">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-1 bg-black/20 backdrop-blur-sm">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-white rounded-full"
            />
          </div>
          <span className="text-[10px] font-bold tracking-[0.2em] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">아래로 스크롤</span>
        </div>
      </section>

      {/* Floating Action Buttons */}
      <div className="fixed z-50 
        bottom-8 left-1/2 -translate-x-1/2 flex flex-row gap-4
        md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:left-8 md:right-auto md:flex-col md:translate-x-0"
      >
        <a href="tel:01044993866" className="w-14 h-14 bg-navy-900 text-white rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center justify-center hover:scale-110 transition-transform group relative border-2 border-white/10 backdrop-blur-sm">
          <motion.div whileHover={{ rotate: [0, -10, 10, -10, 0] }} transition={{ duration: 0.5 }}>
            <Phone className="w-6 h-6" />
          </motion.div>
          <span className="hidden md:block absolute left-full ml-4 px-3 py-1 bg-navy-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">전화상담</span>
        </a>
        <a href="https://pf.kakao.com/_xxxx" target="_blank" rel="noreferrer" className="w-14 h-14 bg-[#FEE500] text-[#3C1E1E] rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center justify-center hover:scale-110 transition-transform group relative border-2 border-white/10">
          <div className="flex flex-col items-center">
            <span className="text-[8px] font-black leading-none mb-0.5">카톡</span>
            <div className="w-4 h-4 bg-[#3C1E1E] rounded-sm flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-[#FEE500] rounded-full" />
            </div>
          </div>
          <span className="hidden md:block absolute left-full ml-4 px-3 py-1 bg-navy-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">카톡문의</span>
        </a>
        <button 
          onClick={() => document.getElementById('app-download')?.scrollIntoView({ behavior: 'smooth' })}
          className="w-14 h-14 bg-point-yellow text-navy-900 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center justify-center hover:scale-110 transition-transform group relative border-2 border-white/10"
        >
          <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 400 }}>
            <Download className="w-6 h-6" />
          </motion.div>
          <span className="hidden md:block absolute left-full ml-4 px-3 py-1 bg-navy-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">앱다운로드</span>
        </button>
      </div>

      {/* Problem Empathy - Updated to Full-width Image Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-navy-900 mb-6 leading-tight">
              기술이 없으면 <br />
              <span className="text-point-yellow">선택지가 없습니다</span>
            </h2>
            <p className="text-xl text-gray-500 font-medium">불안한 미래, 언제까지 고민만 하실 건가요?</p>
          </div>

          <div className="space-y-12">
            {[
              {
                badge: "미래 생존 전략",
                title: <>평생 직장이 <span className="text-point-yellow">사라진 시대</span></>,
                desc: <>회사가 나를 책임져주지 않는 시대,{"\n"}<span className="text-white font-bold">나만의 확실한 무기</span>가 필요합니다.</>,
                image: "/images/services/problem-job-security.jpg"
              },
              {
                badge: "대체 불가능한 가치",
                title: <><span className="text-point-yellow">AI가 대체할 수 없는</span> 기술</>,
                desc: <>현장 기반의 배관 기술은{"\n"}<span className="text-white font-bold">로봇이나 AI가 결코 흉내낼 수 없습니다.</span></>,
                image: "/images/services/problem-ai-proof.jpg"
              },
              {
                badge: "평생 자산 확보",
                title: <>자산이 되는 <span className="text-point-yellow">전문 기술</span></>,
                desc: <>한 번 배운 기술은 <span className="text-white font-bold">평생의 자산</span>이 되어{"\n"}당신의 안정적인 수익을 보장합니다.</>,
                image: "/images/services/problem-lifetime-skill.jpg"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="sticky top-32"
                style={{ zIndex: i + 1 }}
              >
                <div className="relative h-[350px] md:h-[450px] rounded-[2.5rem] overflow-hidden group shadow-2xl border border-white/10">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end">
                    <div className="mb-6">
                      <span className="inline-block px-5 py-2 bg-cyan-400 text-navy-900 text-sm font-black rounded-full">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight whitespace-pre-line">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-lg md:text-2xl max-w-2xl leading-relaxed whitespace-pre-line font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution - Updated to Centered Stats Layout */}
      <section className="py-20 relative overflow-hidden bg-[#0A192F] min-h-[90vh] flex items-center">
        {/* Radial Gradient Background */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-600/30 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mb-10"
          >
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
              배관 전문가를 위한 첫걸음, 지금 <span className="text-point-yellow">배관케어 마스터 교육원</span>에서
            </h2>
            <p className="text-lg md:text-2xl text-gray-300 mb-8 leading-relaxed">
              5일간의 압축 실무 교육으로{"\n"}
              당신의 인생을 바꿀 확실한 기술을 전수합니다.
            </p>
            <button 
              onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full text-lg font-bold transition-all shadow-xl hover:shadow-blue-600/20"
            >
              교육 과정 보러가기
            </button>
          </motion.div>

          {/* Stats Box */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2.5rem] p-6 md:p-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
              {[
                { value: 1200, suffix: "+", label: "누적 수강생" },
                { value: 500, suffix: "+", label: "창업 성공" },
                { value: 98, suffix: "%", label: "수강 만족도" },
                { value: 800, suffix: "만+", label: "평균 월 수익" }
              ].map((stat, i) => (
                <div key={i} className="text-center relative">
                  <div className="text-2xl md:text-4xl font-black text-white mb-1">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-gray-400 text-[10px] md:text-base font-medium uppercase tracking-wider">{stat.label}</div>
                  {i < 3 && (
                    <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-12 bg-white/10" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Curriculum - Updated to Vertical Timeline */}
      <section id="curriculum" ref={curriculumRef} className="py-20 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4">
          <SectionTitle 
            title="5일 완성 커리큘럼" 
            subtitle="이론부터 수익 창출까지,\n완벽한 프로세스를 경험하세요"
          />
          
          <div className="relative">
            {/* Background Track Line */}
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-1 bg-gray-100 rounded-full" />
            
            {/* Animated Progress Line */}
            <motion.div 
              style={{ scaleY }}
              className="absolute left-4 md:left-8 top-0 bottom-0 w-1 bg-navy-900 rounded-full origin-top z-10" 
            />
            
            <div className="space-y-12">
              {[
                { day: "01", title: <><span className="text-point-yellow">장비교육</span> 및 이해</>, desc: "전문 배관 장비의 구조와 원리 이해,\n장비 운용법 및 안전 교육", icon: <Wrench />, image: "/images/education/curriculum-day1-theory.jpg" },
                { day: "02", title: <><span className="text-point-yellow">기술</span> 훈련</>, desc: "상황별 배관케어 및 막힘 해결 실습,\n핵심 현장 기술 집중 훈련", icon: <Briefcase />, image: "/images/education/curriculum-day2-technique.jpg" },
                { day: "03", title: <><span className="text-point-yellow">현장기술</span> 실습</>, desc: "실제 현장 맞춤형 기술 실습 및\n실전 고압세척 노하우 습득", icon: <Zap />, image: "/images/education/curriculum-day3-leak-detection.jpg" },
                { day: "04", title: <><span className="text-point-yellow">홈페이지 / 블로그</span> 제작</>, desc: "신뢰감을 주는 홈페이지형 블로그 제작 및\n맞춤형 홈페이지 제작 지원", icon: <LayoutGrid />, image: "/images/education/curriculum-day4-jet-washing.jpg" },
                { day: "05", title: <><span className="text-point-yellow">AI 마케팅</span> & 블로그 자동화</>, desc: "AI를 활용한 실전 마케팅 기법 및\n블로그 자동화 관리 시스템 구축", icon: <Cpu />, image: "/images/education/curriculum-day5-marketing.jpg" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-12 md:pl-24"
                >
                  {/* Timeline Marker */}
                  <div className="absolute left-0 md:left-4 top-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-navy-900 border-4 border-white flex items-center justify-center z-10 shadow-lg">
                    <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.5 }}>
                      <CheckCircle2 className="text-point-yellow w-4 h-4 md:w-5 md:h-5" />
                    </motion.div>
                  </div>
                  
                  {/* Content Card */}
                  <div className="bg-navy-900 text-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden group hover:scale-[1.01] transition-transform duration-300">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      <div className="relative z-10 flex-1">
                        <div className="text-4xl md:text-5xl font-black text-point-yellow mb-6">
                          {item.day}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-6">{item.title}</h3>
                        <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-xl whitespace-pre-line">
                          {item.desc}
                        </p>
                      </div>
                      
                      {/* Animated Image */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (i * 0.1) + 0.2 }}
                        className="w-full md:w-48 h-48 rounded-2xl overflow-hidden flex-shrink-0 shadow-xl border border-white/10"
                      >
                        <img 
                          src={item.image} 
                          alt="Curriculum Step" 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </motion.div>
                    </div>
                    
                    {/* Background Number Accent */}
                    <div className="absolute -bottom-4 -right-4 text-9xl font-black text-white/5 select-none pointer-events-none">
                      {item.day}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certification */}
      <section className="py-12 bg-gray-50 min-h-[90vh] flex items-center">
        <div className="max-w-4xl mx-auto px-6 w-full">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="inline-block px-4 py-1.5 bg-navy-900 text-point-yellow rounded-full font-bold text-xs mb-3">
                자격 인증
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-navy-900 leading-tight">
                배관케어 마스터 <br />
                <span className="text-blue-600">자격증 발급</span>
              </h2>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="w-full max-w-[200px] md:max-w-sm aspect-[3/4] bg-navy-900 rounded-3xl p-6 flex flex-col items-center justify-center text-white relative overflow-hidden shadow-2xl mb-6 border-4 border-white cursor-pointer"
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Award className="w-16 h-16 md:w-24 md:h-24 text-point-yellow mb-6" />
              </motion.div>
              <div className="text-center">
                <p className="text-[8px] tracking-widest opacity-50 mb-1.5">교육 수료증</p>
                <p className="text-base md:text-xl font-black mb-3">배관케어 마스터 교육원</p>
                <div className="w-12 h-1 bg-point-yellow mx-auto" />
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-point-yellow/5 rounded-full -ml-10 -mb-10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-base md:text-xl text-gray-600 mb-4 leading-relaxed whitespace-pre-line font-medium">
                교육 이수 후 공신력 있는 자격증 수여를 통해{"\n"}
                고객에게 신뢰받는 전문가로서의 자격을 증명합니다.
              </p>
              <div className="flex items-center justify-center gap-2 text-navy-900 font-bold bg-white px-5 py-2.5 rounded-full shadow-md inline-flex group cursor-pointer">
                <motion.div whileHover={{ scale: 1.2, rotate: 15 }}>
                  <Award className="w-5 h-5 text-point-yellow" />
                </motion.div>
                <span className="text-base">국가 등록 민간자격증 연계</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HQ Support - Updated to Full-width Image Cards */}
      <section id="support" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <SectionTitle 
            title="교육이 끝이 아닙니다" 
            subtitle="본사의 전폭적인 지원으로 안정적인 수익을 보장합니다"
          />
          
          <div className="space-y-12">
            {[
              { 
                badge: "창업 실전 인프라 지원",
                title: <><span className="text-point-yellow">본사 오더</span> 배정 시스템</>, 
                desc: <>마케팅 걱정 마세요. 본사 콜센터에서 직접{"\n"}<span className="text-white font-bold">오더를 지역별로 매칭</span>하여 안정적인 일감을 제공합니다.</>,
                image: "/images/services/support-order-dispatch.jpg"
              },
              { 
                badge: "지역 상권 보호 지원",
                title: <><span className="text-point-yellow">지역 독점권</span> 및 상권 보호</>, 
                desc: <>활동 지역의 독점 권한을 부여하여 <span className="text-white font-bold">불필요한 경쟁 없이</span>{"\n"}오직 기술 서비스에만 집중할 수 있도록 돕습니다.</>,
                image: "/images/services/support-territory-protection.jpg"
              },
              { 
                badge: "실전 기술 멘토링 지원",
                title: <>24/7 <span className="text-point-yellow">실시간 기술 멘토링</span></>, 
                desc: <>현장에서 예기치 못한 난관에 부딪혔을 때,{"\n"}<span className="text-white font-bold">본사 베테랑 전문가</span>가 실시간 영상 가이드를 제공합니다.</>,
                image: "/images/services/support-technical-mentoring.jpg"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="sticky top-32"
                style={{ zIndex: i + 1 }}
              >
                <div className="relative h-[350px] md:h-[450px] rounded-[2.5rem] overflow-hidden group shadow-2xl border border-white/10">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end">
                    <div className="mb-6">
                      <span className="inline-block px-5 py-2 bg-cyan-400 text-navy-900 text-sm font-black rounded-full">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight whitespace-pre-line">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-lg md:text-2xl max-w-2xl leading-relaxed whitespace-pre-line font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Auto-scrolling Marquee */}
      <section className="py-20 bg-[#0A192F] overflow-hidden border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 mb-10 flex items-end justify-between">
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight whitespace-pre-line">
              성공은{"\n"}더 빠르게
            </h2>
            <p className="text-white/60 text-lg font-medium">배관케어 마스터 교육원과 함께한 선배들의 생생한 후기</p>
          </div>
          <div className="hidden md:flex gap-4">
            <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-point-yellow hover:text-navy-900 transition-all">
              <ArrowRight className="w-6 h-6 rotate-180" />
            </button>
            <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-point-yellow hover:text-navy-900 transition-all">
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Marquee Container */}
        <div className="relative">
          <motion.div 
            className="flex gap-6 px-6"
            animate={{ x: [0, -1920] }}
            transition={{ 
              duration: 30, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {[
              {
                image: "/images/gallery/testimonial-student-kim.jpg",
                title: "퇴사 후 5일 만에 첫 오더,\n이제는 월 1,000만원 찍습니다",
                name: "김OO 수강생 | 서울 강남점"
              },
              {
                image: "/images/gallery/testimonial-student-lee.jpg",
                title: "여성 창업자도 충분히 가능해요!\n본사의 꼼꼼한 케어 덕분입니다",
                name: "이OO 수강생 | 경기 수원점"
              },
              {
                image: "/images/gallery/testimonial-student-park.jpg",
                title: "기술 하나로 인생 역전,\nAI 시대에 가장 확실한 투자였습니다",
                name: "박OO 수강생 | 부산 해운대점"
              },
              {
                image: "/images/gallery/testimonial-student-choi.jpg",
                title: "막막했던 창업의 길,\n배관케어 마스터 교육원이 지름길이 되었네요",
                name: "최OO 수강생 | 인천 송도점"
              },
              // Duplicate for seamless loop
              {
                image: "/images/gallery/testimonial-student-kim.jpg",
                title: "퇴사 후 5일 만에 첫 오더,\n이제는 월 1,000만원 찍습니다",
                name: "김OO 수강생 | 서울 강남점"
              },
              {
                image: "/images/gallery/testimonial-student-lee.jpg",
                title: "여성 창업자도 충분히 가능해요!\n본사의 꼼꼼한 케어 덕분입니다",
                name: "이OO 수강생 | 경기 수원점"
              }
            ].map((item, i) => (
              <div key={i} className="flex-shrink-0 w-[300px] md:w-[400px]">
                <div className="rounded-2xl overflow-hidden mb-6 aspect-video">
                  <img 
                    src={item.image} 
                    alt="Student" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-3 leading-tight whitespace-pre-line">
                  {item.title}
                </h3>
                <p className="text-white/60 font-medium">{item.name}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Job Outlook */}
      <section id="outlook" className="py-20 bg-navy-900 text-white min-h-[80vh] flex items-center overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 w-full">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 font-bold mb-4">
                <Cpu className="w-4 h-4" />
                <span>미래 보장 기술</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
                AI도 로봇도 <br />
                <span className="text-point-yellow text-5xl md:text-6xl">대체할 수 없는</span> 기술
              </h2>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative w-full max-w-[320px] md:max-w-md aspect-video rounded-3xl overflow-hidden shadow-2xl mb-10 border-4 border-white/10"
            >
              <img 
                src="/images/services/outlook-ai-technology.jpg" 
                alt="AI vs Human" 
                className="w-full h-full object-cover grayscale"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent opacity-60" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl"
            >
              <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed whitespace-pre-line">
                현장의 변수는 무한합니다.{"\n"}
                <span className="text-white font-bold">사람의 손길과 판단</span>이 필요한 기술은 사라지지 않습니다.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-white font-bold mb-1">지속적인 수요</p>
                  <p className="text-xs md:text-sm text-gray-500">배관은 건물이 있는 한{"\n"}영원히 존재합니다.</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-white font-bold mb-1">고수익 전문직</p>
                  <p className="text-xs md:text-sm text-gray-500">기술의 희소성이{"\n"}당신의 가치를 만듭니다.</p>
                </div>
              </div>
              
              <p className="text-2xl font-bold text-white mt-8 italic">“배관은 사라지지 않습니다”</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* App Promotion Section */}
      <section id="app-download" className="py-8 bg-gray-50 overflow-hidden min-h-[80vh] flex items-center">
        <div className="max-w-4xl mx-auto px-6 w-full">
          <div className="bg-navy-900 rounded-[2rem] p-6 md:p-12 relative overflow-hidden flex flex-col items-center text-center gap-4">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 -skew-x-12 translate-x-1/4" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-point-yellow/10 rounded-full blur-3xl" />

            <div className="relative z-10 w-full">
              <div className="inline-flex items-center gap-2 px-2 py-0.5 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 font-bold mb-3 text-[9px]">
                <Smartphone className="w-2.5 h-2.5" />
                <span>앱 전용 혜택</span>
              </div>
              <h2 className="text-xl md:text-4xl font-black text-white mb-2 leading-tight">
                현장의 모든 것, <span className="text-point-yellow">배관케어 마스터</span> 앱
              </h2>
              <p className="text-[11px] md:text-lg text-gray-400 mb-4 leading-relaxed max-w-md mx-auto">
                실시간 오더부터 기술 지원까지. 성공 창업의 필수 파트너.
              </p>
            </div>

            <div className="relative w-full flex flex-row items-center justify-center gap-4 md:gap-8">
              {/* Smartphone Mockup - Extremely Small & Side-aligned */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative z-10 w-[80px] md:w-[140px] flex-shrink-0"
              >
                <div className="relative border-[3px] border-gray-800 rounded-[1.2rem] bg-gray-800 shadow-2xl overflow-hidden aspect-[9/19]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-1.5 bg-gray-800 rounded-b-md z-20" />
                  <div className="absolute inset-0 bg-navy-900 flex flex-col p-1.5 pt-3">
                    <div className="w-3 h-3 bg-point-yellow rounded-sm mb-1 flex items-center justify-center">
                      <FlaskConical className="w-2 h-2 text-navy-900" />
                    </div>
                    <div className="h-0.5 w-6 bg-white/20 rounded-full mb-0.5" />
                    <div className="h-0.5 w-4 bg-white/10 rounded-full mb-2" />
                    <div className="space-y-1">
                      {[1, 2].map(i => (
                        <div key={i} className="p-1 bg-white/5 rounded-sm border border-white/5">
                          <div className="h-0.5 w-full bg-white/10 rounded-full" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <img 
                    src="/images/services/app-screenshot.jpg" 
                    alt="App Screenshot" 
                    className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>

              <div className="flex flex-col gap-2 w-full max-w-[140px] md:max-w-[200px] relative z-10 text-left">
                <motion.div whileHover={{ x: 5 }} className="flex items-center gap-2 p-2 bg-white/5 rounded-lg border border-white/10 cursor-pointer">
                  <Bell className="w-3 h-3 text-point-yellow flex-shrink-0" />
                  <p className="text-white font-bold text-[9px] md:text-sm">실시간 오더</p>
                </motion.div>
                <motion.div whileHover={{ x: 5 }} className="flex items-center gap-2 p-2 bg-white/5 rounded-lg border border-white/10 cursor-pointer">
                  <LayoutGrid className="w-3 h-3 text-point-yellow flex-shrink-0" />
                  <p className="text-white font-bold text-[9px] md:text-sm">정산 관리</p>
                </motion.div>
                <motion.div whileHover={{ x: 5 }} className="flex items-center gap-2 p-2 bg-white/5 rounded-lg border border-white/10 cursor-pointer">
                  <Smartphone className="w-3 h-3 text-point-yellow flex-shrink-0" />
                  <p className="text-white font-bold text-[9px] md:text-sm">기술 지원</p>
                </motion.div>
              </div>
            </div>

            <div className="flex justify-center gap-2 relative z-10 w-full">
              <button className="flex-1 max-w-[110px] bg-white text-navy-900 py-2.5 rounded-lg font-black flex items-center justify-center gap-1.5 hover:bg-gray-100 transition-all shadow-lg text-[9px]">
                <Download className="w-2.5 h-2.5" /> 구글 플레이
              </button>
              <button className="flex-1 max-w-[110px] bg-white text-navy-900 py-2.5 rounded-lg font-black flex items-center justify-center gap-1.5 hover:bg-gray-100 transition-all shadow-lg text-[9px]">
                <Download className="w-2.5 h-2.5" /> 앱스토어
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="final-cta" className="py-20 relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/backgrounds/cta-counselor-bg.jpg" 
            alt="Counselor Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-navy-900/85 backdrop-blur-[2px]" />
        </div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-point-yellow text-navy-900 rounded-full font-black text-sm mb-8 shadow-xl">
              <Phone className="w-4 h-4" />
              <span>24시간 실시간 상담 대기 중</span>
            </div>
            
            <h2 className="text-3xl md:text-6xl font-black text-white mb-8 leading-tight whitespace-pre-line">
              지금 시작하면 <span className="text-point-yellow">5일 뒤</span>{"\n"}
              <span className="text-point-yellow underline decoration-point-yellow underline-offset-8">현장에서 일합니다</span>
            </h2>
            
            <p className="text-lg md:text-2xl text-gray-300 mb-12 font-bold whitespace-pre-line leading-relaxed">
              망설임은 수익만 늦출 뿐입니다.{"\n"}
              지금 바로 <span className="text-white">교육 신청</span>을 남겨주세요.
            </p>

            {/* Application Form */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 md:p-12 mb-10 shadow-2xl text-left">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const name = formData.get('name');
                  const phone = formData.get('phone');
                  const region = formData.get('region');
                  const message = `[배관케어 마스터 교육원 신청]\n성함: ${name}\n연락처: ${phone}\n지역: ${region}`;
                  window.location.href = `sms:01044993866?body=${encodeURIComponent(message)}`;
                }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-white font-bold text-sm ml-2">성함</label>
                    <input 
                      required
                      name="name"
                      type="text" 
                      placeholder="성함을 입력해주세요" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-point-yellow transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-white font-bold text-sm ml-2">연락처</label>
                    <input 
                      required
                      name="phone"
                      type="tel" 
                      placeholder="010-0000-0000" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-point-yellow transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-white font-bold text-sm ml-2">희망 지역</label>
                  <input 
                    required
                    name="region"
                    type="text" 
                    placeholder="예: 서울 강남구, 경기 수원시 등" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-point-yellow transition-colors"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-point-yellow text-navy-900 py-6 rounded-2xl text-xl font-black hover:bg-yellow-400 transition-all shadow-xl flex items-center justify-center gap-3 group mt-4"
                >
                  교육 신청하기 <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </button>
              </form>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="tel:01044993866"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-2xl text-xl font-black hover:bg-white/20 transition-all flex items-center justify-center gap-3"
              >
                직접 전화 상담 <Phone className="w-5 h-5" />
              </a>
            </div>
            
            <p className="mt-10 text-gray-400 font-medium text-sm">
              * 신청 시 담당자가 순차적으로 연락을 드립니다. (무료 상담)
            </p>
          </motion.div>
        </div>

        {/* Decorative Floating Elements */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-point-yellow/10 rounded-full blur-[120px]" />
      </section>

      {/* Footer */}
      <footer className="bg-navy-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-6 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <img 
                  src={logoUrl} 
                  alt="배관케어 마스터 교육원 로고" 
                  style={{ height: `${Math.max(logoHeight, 36)}px` }}
                  className="w-auto object-contain rounded-xl bg-white/10 p-1 transition-all"
                  referrerPolicy="no-referrer"
                />
                <span className="text-2xl font-black tracking-tighter">배관케어 마스터 교육원</span>
                {isDevEnv && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsLogoModalOpen(true);
                    }}
                    className="ml-2 text-xs bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-md border border-white/20 transition-all flex items-center gap-1"
                  >
                    <Sliders className="w-3 h-3" />
                    <span>로고 설정</span>
                  </button>
                )}
              </div>
              <p className="text-gray-400 max-w-md leading-relaxed">
                배관케어 마스터 교육원은 대한민국 최고의 배관 기술 전문가 양성 기관입니다. 
                단순한 기술 전수를 넘어, 성공적인 창업과 안정적인 수익 창출을 위한 
                완벽한 파트너가 되어 드립니다.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6">고객 센터</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-point-yellow" />
                  <a href="tel:01044993866" className="hover:text-white transition-colors">010-4499-3866 (상담시간: 09:00 - 18:00)</a>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-point-yellow" />
                  <span>경기도 김포시 김포한강10로133번길127 디원시티 507호</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6">바로가기</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">이용약관</a></li>
                <li><a href="#" className="hover:text-white transition-colors">개인정보처리방침</a></li>
                <li><a href="#" className="hover:text-white transition-colors">가맹문의</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
            © 2026 배관케어 마스터 교육원. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Logo Customizer Modal */}
      <AnimatePresence>
        {isLogoModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy-900/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 text-navy-900 relative overflow-hidden border border-gray-100"
            >
              <button
                onClick={() => setIsLogoModalOpen(false)}
                className="absolute top-5 right-5 text-gray-400 hover:text-navy-900 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold border border-blue-100">
                  <ImagePlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-navy-900">로고 이미지 첨부 &amp; 크기 설정</h3>
                  <p className="text-xs text-gray-500">원하는 로고 이미지 파일 등록 및 세밀한 높이 조절</p>
                </div>
              </div>

              {/* Live Preview Box */}
              <div className="mb-6 p-4 rounded-2xl bg-gray-50 border border-gray-200/80 flex flex-col items-center justify-center min-h-[130px] relative">
                <p className="text-[11px] font-bold text-gray-400 mb-2 tracking-wider uppercase">현재 로고 미리보기</p>
                <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center max-w-full overflow-hidden">
                  <img 
                    src={logoUrl} 
                    alt="미리보기 로고" 
                    style={{ height: `${logoHeight}px` }}
                    className="w-auto object-contain max-w-full transition-all"
                  />
                </div>
              </div>

              {/* File Upload Slot */}
              <div className="mb-6">
                <label className="block text-sm font-extrabold mb-2 text-navy-900">
                  1. 로고 이미지 파일 직접 첨부
                </label>
                <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-blue-200 hover:border-blue-600 rounded-2xl cursor-pointer bg-blue-50/30 hover:bg-blue-50/80 transition-all group p-3 text-center">
                  <Upload className="w-6 h-6 text-blue-500 group-hover:scale-110 mb-1.5 transition-transform" />
                  <span className="text-xs font-bold text-navy-900 group-hover:text-blue-600">
                    내 PC에서 이미지 파일 선택 (JPG, PNG, SVG, WebP)
                  </span>
                  <span className="text-[11px] text-gray-400 mt-1">
                    클릭하거나 파일 선택 시 바로 적용 및 저장됩니다.
                  </span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleLogoChange}
                    className="hidden" 
                  />
                </label>
              </div>

              {/* Height Slider */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-extrabold text-navy-900">
                    2. 로고 표시 크기 조절 (높이)
                  </label>
                  <span className="text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                    {logoHeight}px
                  </span>
                </div>
                <input 
                  type="range" 
                  min="20" 
                  max="120" 
                  value={logoHeight}
                  onChange={(e) => handleLogoHeightChange(Number(e.target.value))}
                  className="w-full accent-blue-600 h-2 bg-gray-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-semibold text-gray-400 mt-1.5">
                  <span>작게 (20px)</span>
                  <span>기본 (44px)</span>
                  <span>크게 (120px)</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 gap-3">
                <button
                  onClick={handleResetLogo}
                  className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-100 hover:text-navy-900 transition-colors border border-gray-200"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>초기화</span>
                </button>
                <button
                  onClick={() => setIsLogoModalOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-navy-900 text-white font-bold text-sm hover:bg-blue-600 transition-colors shadow-lg shadow-navy-900/10"
                >
                  설정 완료
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
