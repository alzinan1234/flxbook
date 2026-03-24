'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AOS from 'aos'
import 'aos/dist/aos.css'

// react-icons imports (beautiful icons)
import {
  FaWrench,
  FaBolt,
  FaCut,
  FaBroom,
  FaLeaf,
  FaLaptop,
  FaSearch,
  FaUserCircle,
  FaCalendarAlt,
  FaStar,
  FaCheck,
  FaArrowRight,
  FaTwitter,
  FaLinkedinIn,
  FaFacebookF,
  FaPlay,
  FaShieldAlt,
  FaClock,
  FaLock,
  FaTag,
  FaHeadset,
  FaSmile,
} from 'react-icons/fa'
import { MdElectricBolt } from 'react-icons/md'
import { GiHairStrands, GiFlowerPot } from 'react-icons/gi'

export default function Home() {
  const heroRef = useRef<HTMLElement>(null)
  const statsBarRef = useRef<HTMLDivElement>(null) // renamed to avoid conflict

  // Smooth scroll function
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // ---- ALL ANIMATIONS ----
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    AOS.init({ duration: 700, once: true, offset: 60, easing: 'ease-out-cubic' })

    // Hero animations
    const ctx = gsap.context(() => {
      gsap.from('.hero-badge', { y: 30, opacity: 0, duration: 0.8, delay: 0.1 })
      gsap.from('.hero-line', { y: 80, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.3 })
      gsap.from('.hero-desc', { y: 20, opacity: 0, duration: 0.8, delay: 0.8 })
      gsap.from('.hero-actions', { y: 20, opacity: 0, duration: 0.8, delay: 1 })
      gsap.from('.hero-stats > div', { y: 20, opacity: 0, duration: 0.8, stagger: 0.15, delay: 1.2 })
      gsap.from('.hero-visual', { x: 80, opacity: 0, duration: 1.2, delay: 0.5 })
      gsap.to('.hero-mockup', { y: -12, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.from('.booking-card', { x: 40, opacity: 0, stagger: 0.15, duration: 0.7, delay: 1 })
    }, heroRef)

    // Stats counter for HERO stats (already present)
    ScrollTrigger.create({
      trigger: '.hero-stats',
      start: 'top 80%',
      onEnter: () => {
        document.querySelectorAll('.hero-stats .stat-number').forEach((el) => {
          const target = el.getAttribute('data-target')
          if (target) {
            gsap.to(el, {
              innerHTML: target,
              duration: 2,
              snap: { innerHTML: 1 },
              ease: 'power2.out',
            })
          }
        })
      },
    })

    // Stats counter for STATS BAR (new)
    ScrollTrigger.create({
      trigger: statsBarRef.current,
      start: 'top 80%',
      onEnter: () => {
        document.querySelectorAll('.stat-number-bar').forEach((el) => {
          const target = el.getAttribute('data-target')
          if (target) {
            gsap.to(el, {
              innerHTML: target,
              duration: 2,
              snap: { innerHTML: 1 },
              ease: 'power2.out',
            })
          }
        })
      },
    })

    // Section reveal animations with ScrollTrigger
    const sections = ['#howitworks', '#services', '#about', '#why-choose', '#reviews']
    sections.forEach((selector) => {
      gsap.from(selector, {
        scrollTrigger: {
          trigger: selector,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out',
      })
    })

    // Tilt effect for cards
    const cards = document.querySelectorAll('.tilt-card')
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e: any) => {
        const rect = card.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        gsap.to(card, {
          rotateX: -y * 6,
          rotateY: x * 6,
          transformPerspective: 800,
          duration: 0.4,
          ease: 'power2.out',
        })
      })
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5 })
      })
    })

    // Floating decorative elements
    gsap.to('.floating-shape-1', {
      y: -20,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
    gsap.to('.floating-shape-2', {
      y: 30,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    return () => {             
      ctx.revert()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <main className="bg-[#0A0A0F] text-white font-dm antialiased overflow-x-hidden relative">
      {/* Fixed noise overlay */}
      <div className="fixed inset-0 pointer-events-none z-[1000] opacity-35" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
      }}></div>

      {/* Floating decorative shapes */}
      <div className="floating-shape-1 absolute top-40 left-10 w-64 h-64 rounded-full bg-[#00E5BE]/5 blur-3xl pointer-events-none"></div>
      <div className="floating-shape-2 absolute bottom-40 right-10 w-96 h-96 rounded-full bg-[#FF4D6D]/5 blur-3xl pointer-events-none"></div>

      {/* ---- NAVBAR ---- */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-4 backdrop-blur-xl bg-[#0A0A0F]/80 border-b border-white/5">
        <div className="font-syne font-extrabold text-2xl tracking-tight cursor-pointer" onClick={() => scrollToSection('home')}>
          Flx<span className="text-[#00E5BE]">Book</span>
        </div>
        <ul className="hidden md:flex gap-8 text-[#8A8A9A] text-sm font-medium">
          <li><button onClick={() => scrollToSection('howitworks')} className="hover:text-white transition-colors">How It Works</button></li>
          <li><button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">Services</button></li>
          <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">About</button></li>
          <li><button onClick={() => scrollToSection('reviews')} className="hover:text-white transition-colors">Reviews</button></li>
          <li><button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">Contact</button></li>
        </ul>
        <button className="bg-[#00E5BE] text-[#0A0A0F] font-syne font-bold text-sm px-5 py-2 rounded-full hover:shadow-lg hover:shadow-[#00E5BE]/30 transition-transform hover:-translate-y-0.5">
          Get Started <FaArrowRight className="inline ml-1 text-xs" />
        </button>
      </nav>
        
      {/* ---- HERO ---- */}
     
      <section id="home" ref={heroRef} className="relative min-h-screen flex items-center px-6 md:px-16 pt-32 pb-16 overflow-hidden">
       {/* background grid  */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)',
        }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#00E5BE]/5 to-transparent opacity-30"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="hero-badge inline-flex items-center gap-2 bg-[#00E5BE]/10 border border-[#00E5BE]/25 text-[#00E5BE] rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-wider mb-8">
            <span className="w-1.5 h-1.5 bg-[#00E5BE] rounded-full animate-pulse"></span>
            Now Available in Your City
          </div>
          <h1 className="font-syne font-extrabold text-5xl md:text-7xl leading-[1.05] tracking-tighter mb-6">
            <span className="hero-line block">Professional</span>
            <span className="hero-line block"><span className="text-[#00E5BE]">Service Booking</span></span>
            <span className="hero-line block">Made Simple.</span>
          </h1>
          <p className="hero-desc text-lg text-[#8A8A9A] leading-relaxed max-w-xl mb-8">
            Connect with trusted local professionals instantly. From home repairs to beauty services — find, book, and manage everything in one place.
          </p>
          <div className="hero-actions flex flex-wrap gap-4">
            <button className="bg-[#00E5BE] text-[#0A0A0F] font-syne font-bold px-8 py-3 rounded-full hover:shadow-xl hover:shadow-[#00E5BE]/40 transition-transform hover:-translate-y-1">
              Book a Service <FaArrowRight className="inline ml-1" />
            </button>
            <button className="border border-white/10 bg-transparent text-white font-syne font-semibold px-8 py-3 rounded-full hover:border-white/30 hover:bg-white/5 transition">
              List Your Business
            </button>
          </div>

          {/* Hero Stats */}
          <div className="hero-stats grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-white/5">
            {[
              { target: '500', label: 'Happy Customers', suffix: 'K+' },
              { target: '12', label: 'Professionals', suffix: 'K+' },
              { target: '98', label: 'Satisfaction Rate', suffix: '%' },
              { target: '50', label: 'Service Categories', suffix: '+' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <span className="stat-number font-syne text-3xl font-extrabold text-[#00E5BE] block" data-target={stat.target + stat.suffix}>0</span>
                <span className="text-xs text-[#8A8A9A] uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right mockup */}
        <div className="hero-visual hidden lg:block absolute right-16 top-1/2 -translate-y-1/2 w-2/5 max-w-lg">
          <div className="hero-mockup bg-[#12121A] border border-white/5 rounded-2xl p-6 shadow-2xl">
            <div className="flex gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]"></span>
            </div>
            <div className="text-xs text-[#8A8A9A] uppercase tracking-wide mb-3">Active Bookings</div>
            {[
              { icon: FaWrench, title: 'Plumbing Repair', time: 'Today · 2:00 PM', person: 'John D.', status: 'Confirmed', statusClass: 'bg-[#00E5BE]/15 text-[#00E5BE]' },
              { icon: FaCut, title: 'Hair Styling', time: 'Tomorrow · 10:00 AM', person: 'Sarah M.', status: 'Pending', statusClass: 'bg-yellow-500/15 text-yellow-500' },
              { icon: FaBolt, title: 'Electrical Work', time: 'Jan 20 · 9:00 AM', person: 'Mike R.', status: 'New', statusClass: 'bg-indigo-500/15 text-indigo-400' },
            ].map((booking, idx) => (
              <div key={idx} className="booking-card flex items-center gap-4 bg-white/5 border border-white/5 rounded-xl p-3 mb-3 hover:border-[#00E5BE]/20 transition-all">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-xl">
                  <booking.icon className="text-[#00E5BE]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">{booking.title}</h4>
                  <p className="text-xs text-[#8A8A9A]">{booking.time} · {booking.person}</p>
                </div>
                <span className={`ml-auto text-[0.6rem] font-bold px-2 py-1 rounded-full uppercase ${booking.statusClass}`}>
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- STATS BAR (scroll triggered count-up) ---- */}
      <div ref={statsBarRef} className="bg-[#12121A] border-y border-white/5 py-12 px-6 md:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { target: '500K+', label: 'Bookings Completed' },
            { target: '12K+', label: 'Verified Professionals' },
            { target: '50+', label: 'Service Categories' },
            { target: '4.9★', label: 'Average Rating' },
          ].map((item, i) => (
            <div key={i} data-aos="fade-up" data-aos-delay={i * 50} className="border-r border-white/5 last:border-0">
              <div className="stat-number-bar font-syne text-4xl md:text-5xl font-extrabold bg-gradient-to-br from-[#00E5BE] to-[#00B5F5] bg-clip-text text-transparent" data-target={item.target}>
                0
              </div>
              <div className="text-sm text-[#8A8A9A] mt-2">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ---- HOW IT WORKS ---- */}
      <section id="howitworks" className="py-20 px-6 md:px-16 relative">
        <div className="text-center max-w-2xl mx-auto" data-aos="fade-up">
          <span className="text-[#00E5BE] text-xs font-semibold tracking-widest uppercase">How It Works</span>
          <h2 className="font-syne font-extrabold text-3xl md:text-4xl mt-2 mb-4">Book in 4 Simple Steps</h2>
          <p className="text-[#8A8A9A]">Getting the help you need has never been easier. Find, book, and enjoy — all in minutes.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-16 relative">
          <div className="absolute top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#00E5BE] to-transparent hidden md:block"></div>
          {[
            { num: '1', icon: FaSearch, title: 'Search a Service', desc: 'Browse 50+ service categories from home repairs to personal care.' },
            { num: '2', icon: FaUserCircle, title: 'Choose a Professional', desc: 'View profiles, reviews, and compare pricing from verified experts.' },
            { num: '3', icon: FaCalendarAlt, title: 'Book Instantly', desc: 'Pick date & time, confirm, and receive instant confirmation.' },
            { num: '4', icon: FaStar, title: 'Rate & Review', desc: 'Share your experience to help the community grow.' },
          ].map((step) => (
            <div key={step.num} className="tilt-card bg-[#12121A] border border-white/5 rounded-2xl p-6 text-center relative hover:border-[#00E5BE]/30 transition-colors group" data-aos="fade-up">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 bg-[#00E5BE] text-[#0A0A0F] font-syne font-extrabold text-sm rounded-full flex items-center justify-center">
                {step.num}
              </div>
              <div className="text-3xl block mt-4 mb-3 flex justify-center text-[#00E5BE]">
                <step.icon />
              </div>
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-xs text-[#8A8A9A] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- SERVICES ---- */}
      <section id="services" className="py-20 px-6 md:px-16 bg-white/5">
        <div className="text-center max-w-2xl mx-auto" data-aos="fade-up">
          <span className="text-[#00E5BE] text-xs font-semibold tracking-widest uppercase">Our Services</span>
          <h2 className="font-syne font-extrabold text-3xl md:text-4xl mt-2 mb-4">Everything You Need, One Platform</h2>
          <p className="text-[#8A8A9A]">From quick fixes to full renovations — we connect you with the right professional every time.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {[
            { icon: FaWrench, title: 'Home Repairs & Plumbing', desc: 'Fast, reliable plumbing, carpentry, and general repairs.' },
            { icon: MdElectricBolt, title: 'Electrical Services', desc: 'Licensed electricians for installations, repairs, and inspections.' },
            { icon: GiHairStrands, title: 'Beauty & Personal Care', desc: 'Hair, skincare, massage — at home or in-salon.' },
            { icon: FaBroom, title: 'Cleaning Services', desc: 'Residential & commercial deep cleans and maintenance.' },
            { icon: GiFlowerPot, title: 'Landscaping & Garden', desc: 'Lawn care, tree trimming, garden design.' },
            { icon: FaLaptop, title: 'Tech & IT Support', desc: 'Computer repairs, network setup, smart home help.' },
          ].map((srv, i) => (
            <div key={i} className="tilt-card bg-[#12121A] border border-white/5 rounded-2xl p-6 hover:border-[#00E5BE]/25 transition-all group" data-aos="fade-up" data-aos-delay={i * 30}>
              <div className="w-12 h-12 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE]/20 flex items-center justify-center text-2xl mb-4 text-[#00E5BE]">
                <srv.icon />
              </div>
              <h3 className="font-semibold text-lg">{srv.title}</h3>
              <p className="text-sm text-[#8A8A9A] mt-1 leading-relaxed">{srv.desc}</p>
              <a href="#" className="inline-flex items-center gap-1 text-[#00E5BE] text-sm font-semibold mt-4 group-hover:gap-2 transition-all">
                Explore <FaArrowRight className="text-xs" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ---- FOR WHO (dual cards) ---- */}
      <section id="about" className="py-20 px-6 md:px-16">
        <div data-aos="fade-up" className="mb-12">
          <span className="text-[#00E5BE] text-xs font-semibold tracking-widest uppercase">Who It's For</span>
          <h2 className="font-syne font-extrabold text-3xl md:text-4xl mt-2">Built for Both Sides</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {/* customers */}
          <div className="bg-gradient-to-br from-[#00E5BE]/10 to-[#00B5F5]/5 border border-[#00E5BE]/20 rounded-3xl p-8" data-aos="fade-right">
            <span className="inline-block px-3 py-1 bg-[#00E5BE]/20 text-[#00E5BE] text-xs font-bold uppercase tracking-wider rounded-full mb-4">For Customers</span>
            <h3 className="font-syne font-bold text-2xl mb-4">Find Help in Minutes,<br/>Not Hours.</h3>
            <ul className="space-y-3 text-sm text-[#8A8A9A]">
              {['Search verified professionals', 'View real ratings & reviews', 'Book instantly with real-time availability', 'Pay securely', 'Track your provider', 'Instant support'].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <FaCheck className="text-[#00E5BE] mt-0.5 flex-shrink-0" /> {item}
                </li>
              ))}
            </ul>
            <button className="mt-6 bg-[#00E5BE] text-[#0A0A0F] font-syne font-bold px-6 py-3 rounded-full">
              Find a Professional <FaArrowRight className="inline ml-1" />
            </button>
          </div>
          {/* professionals */}
          <div className="bg-gradient-to-br from-[#FF4D6D]/10 to-[#FF8C00]/5 border border-[#FF4D6D]/20 rounded-3xl p-8" data-aos="fade-left">
            <span className="inline-block px-3 py-1 bg-[#FF4D6D]/20 text-[#FF4D6D] text-xs font-bold uppercase tracking-wider rounded-full mb-4">For Professionals</span>
            <h3 className="font-syne font-bold text-2xl mb-4">Grow Your Business,<br/>Your Way.</h3>
            <ul className="space-y-3 text-sm text-[#8A8A9A]">
              {['Create a professional profile', 'Receive booking requests', 'Set your own schedule', 'Get paid fast', 'Build reputation with reviews', 'Scale with tools'].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <FaCheck className="text-[#FF4D6D] mt-0.5 flex-shrink-0" /> {item}
                </li>
              ))}
            </ul>
            <button className="mt-6 bg-[#FF4D6D] text-white font-syne font-bold px-6 py-3 rounded-full">
              List Your Business <FaArrowRight className="inline ml-1" />
            </button>
          </div>
        </div>
      </section>

      {/* ---- WHY CHOOSE ---- */}
      <section id="why-choose" className="py-20 px-6 md:px-16 bg-white/5">
        <div className="text-center max-w-2xl mx-auto" data-aos="fade-up">
          <span className="text-[#00E5BE] text-xs font-semibold tracking-widest uppercase">Why FlxBook</span>
          <h2 className="font-syne font-extrabold text-3xl md:text-4xl mt-2 mb-4">The Smart Way to Book Services</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {[
            { icon: FaShieldAlt, title: 'Verified Professionals Only', desc: 'Background-checked, licensed, and reviewed.' },
            { icon: FaClock, title: 'Real-Time Availability', desc: 'See who’s free now and book instantly.' },
            { icon: FaLock, title: 'Secure Payments', desc: 'Funds held until job is done to your satisfaction.' },
            { icon: FaTag, title: 'Transparent Pricing', desc: 'Upfront costs, no hidden fees.' },
            { icon: FaHeadset, title: '24/7 Customer Support', desc: 'We’re here anytime, anywhere.' },
            { icon: FaSmile, title: 'Satisfaction Guarantee', desc: 'Not happy? We’ll make it right.' },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 items-start p-6 rounded-2xl bg-[#12121A] border border-white/5 hover:border-[#00E5BE]/30 transition-all" data-aos="fade-up" data-aos-delay={i * 30}>
              <div className="text-3xl text-[#00E5BE] flex-shrink-0">
                <item.icon />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm text-[#8A8A9A] mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- TESTIMONIALS ---- */}
      <section id="reviews" className="py-20 px-6 md:px-16">
        <div className="text-center max-w-2xl mx-auto" data-aos="fade-up">
          <span className="text-[#00E5BE] text-xs font-semibold tracking-widest uppercase">Testimonials</span>
          <h2 className="font-syne font-extrabold text-3xl md:text-4xl mt-2 mb-4">What Our Users Say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {[
            { stars: 5, text: 'I needed a plumber urgently and found someone in under 10 minutes. Perfect!', name: 'Amanda R.', role: 'Homeowner, LA', initial: 'A', color: 'accent' },
            { stars: 5, text: 'As an electrician, FlxBook transformed my business. Calendar always full!', name: 'Marcus T.', role: 'Licensed Electrician', initial: 'M', color: 'accent2' },
            { stars: 5, text: 'Booked a cleaning, tracked arrival in real-time, spotless result. Use it weekly!', name: 'Jessica L.', role: 'Business Owner', initial: 'J', color: 'indigo' },
          ].map((t, i) => (
            <div key={i} className="tilt-card bg-[#12121A] border border-white/5 rounded-2xl p-6 hover:border-[#00E5BE]/20" data-aos="fade-up" data-aos-delay={i * 50}>
              <div className="flex text-yellow-400 text-lg mb-2">
                {Array.from({ length: t.stars }).map((_, idx) => <FaStar key={idx} />)}
              </div>
              <p className="text-sm text-[#8A8A9A] italic leading-relaxed">{t.text}</p>
              <div className="flex items-center gap-3 mt-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  t.color === 'accent' ? 'bg-[#00E5BE]/20 text-[#00E5BE]' : t.color === 'accent2' ? 'bg-[#FF4D6D]/20 text-[#FF4D6D]' : 'bg-indigo-500/20 text-indigo-400'
                }`}>
                  {t.initial}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-[#8A8A9A]">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
  

      {/* ---- CTA BANNER ---- */}
      <div className="mx-6 md:mx-16 mb-20 bg-gradient-to-br from-[#00E5BE]/20 to-[#00B5F5]/10 border border-[#00E5BE]/30 rounded-3xl p-12 text-center relative overflow-hidden" data-aos="zoom-in">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzAgMTBhMjAgMjAgMCAwIDEgMjAgMjAgMjAgMjAgMCAwIDEtMjAgMjAgMjAgMjAgMCAwIDEtMjAtMjAgMjAgMjAgMCAwIDEgMjAtMjB6IiBmaWxsPSIjMDBFNUJFIiBmaWxsLW9wYWNpdHk9IjAuMTUiLz48L3N2Zz4=')] opacity-20"></div>
        <h2 className="font-syne font-extrabold text-3xl md:text-4xl mb-4 relative">Ready to Book Your First Service?</h2>
        <p className="text-[#8A8A9A] max-w-lg mx-auto mb-8 relative">Join 500,000+ customers who trust FlxBook to connect them with the best local professionals.</p>
        <div className="flex justify-center gap-4 relative">
          <button className="bg-[#00E5BE] text-[#0A0A0F] font-syne font-bold px-8 py-3 rounded-full text-lg hover:shadow-xl hover:shadow-[#00E5BE]/30 transition">
            Get Started Free <FaArrowRight className="inline ml-1" />
          </button>
          <button className="border border-white/10 bg-transparent text-white font-syne font-semibold px-8 py-3 rounded-full text-lg hover:border-white/30 transition">
            Learn More
          </button>
        </div>
      </div>

      {/* ---- FOOTER ---- */}
      <footer id="contact" className="border-t border-white/5 px-6 md:px-16 py-12">
        <div className="grid md:grid-cols-4 gap-8 pb-8">
          <div>
            <div className="font-syne font-extrabold text-xl mb-4">Flx<span className="text-[#00E5BE]">Book</span></div>
            <p className="text-sm text-[#8A8A9A] max-w-xs">Professional Service Booking Made Simple. Connecting customers with skilled local professionals.</p>
          </div>
          {[
            { title: 'Services', links: ['Home Repairs', 'Electrical', 'Beauty & Care', 'Cleaning', 'Landscaping'] },
            { title: 'Company', links: ['About Us', 'Careers', 'Blog', 'Press', 'Contact'] },
            { title: 'Support', links: ['Help Center', 'Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility'] },
          ].map((col) => (
            <div key={col.title}>
              <h5 className="text-[#8A8A9A] text-xs font-bold uppercase tracking-wider mb-4">{col.title}</h5>
              <ul className="space-y-2 text-sm">
                {col.links.map((link) => (
                  <li key={link}><a href="#" className="text-[#8A8A9A] hover:text-white transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-white/5 text-xs text-[#8A8A9A]">
          <div>© 2025 FlxBook Inc. All rights reserved.</div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-[#00E5BE] hover:text-[#00E5BE] transition-colors">
              <FaTwitter />
            </a>
            <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-[#00E5BE] hover:text-[#00E5BE] transition-colors">
              <FaLinkedinIn />
            </a>
            <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-[#00E5BE] hover:text-[#00E5BE] transition-colors">
              <FaFacebookF />
            </a>
            <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-[#00E5BE] hover:text-[#00E5BE] transition-colors">
              <FaPlay />
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}