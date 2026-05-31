"use client";
import { useState, useEffect, useRef } from "react";

// ============================================================
// DESIGN SYSTEM — STAR Tecnologia
// Paleta: Preto obsidiana, grafite, prata, azul industrial
// Tipografia: Bebas Neue (display) + DM Sans (corpo)
// Estética: Industrial futurista, metalúrgica premium
// ============================================================

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&family=Share+Tech+Mono&display=swap');
`;

const STYLES = `
  :root {
    --obsidian: #080A0E;
    --graphite-deep: #0D1117;
    --graphite: #161B22;
    --graphite-mid: #21262D;
    --graphite-light: #30363D;
    --steel: #484F58;
    --silver: #8B949E;
    --silver-light: #B1BAC4;
    --platinum: #E6EDF3;
    --white: #F0F6FC;
    --blue-industrial: #1F6FEB;
    --blue-bright: #388BFD;
    --blue-glow: #58A6FF;
    --blue-subtle: #0D419D;
    --amber-warn: #D29922;
    --red-alert: #DA3633;
    --gradient-steel: linear-gradient(135deg, #1C2128 0%, #0D1117 50%, #080A0E 100%);
    --gradient-blue: linear-gradient(135deg, #1F6FEB 0%, #0D419D 100%);
    --gradient-metal: linear-gradient(180deg, #484F58 0%, #21262D 50%, #0D1117 100%);
    --shadow-blue: 0 0 40px rgba(31, 111, 235, 0.25);
    --shadow-blue-sm: 0 0 15px rgba(31, 111, 235, 0.15);
    --shadow-deep: 0 20px 60px rgba(0,0,0,0.8);
    --border-subtle: 1px solid rgba(48, 54, 61, 0.8);
    --border-blue: 1px solid rgba(31, 111, 235, 0.3);
    --font-display: 'Bebas Neue', sans-serif;
    --font-body: 'DM Sans', sans-serif;
    --font-mono: 'Share Tech Mono', monospace;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  html { scroll-behavior: smooth; }

  body {
    background: var(--obsidian);
    color: var(--platinum);
    font-family: var(--font-body);
    overflow-x: hidden;
    cursor: default;
  }

  /* ---- SCROLLBAR ---- */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--graphite-deep); }
  ::-webkit-scrollbar-thumb { background: var(--blue-industrial); border-radius: 3px; }

  /* ---- NOISE TEXTURE OVERLAY ---- */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 9999;
    opacity: 0.5;
  }

  /* ---- GRID PATTERN ---- */
  .grid-bg {
    background-image:
      linear-gradient(rgba(31,111,235,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(31,111,235,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  /* ---- SECTION BASE ---- */
  section { position: relative; overflow: hidden; }

  /* ---- TYPOGRAPHY ---- */
  .display-xl { font-family: var(--font-display); font-size: clamp(56px, 9vw, 130px); line-height: 0.92; letter-spacing: 2px; }
  .display-lg { font-family: var(--font-display); font-size: clamp(42px, 6vw, 90px); line-height: 0.95; letter-spacing: 1px; }
  .display-md { font-family: var(--font-display); font-size: clamp(32px, 4vw, 60px); line-height: 1; }
  .mono { font-family: var(--font-mono); font-size: 12px; letter-spacing: 2px; }
  .section-tag { font-family: var(--font-mono); font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: var(--blue-glow); }

  /* ---- BUTTONS ---- */
  .btn-primary {
    display: inline-flex; align-items: center; gap: 10px;
    background: var(--blue-industrial);
    color: white; border: none; cursor: pointer;
    padding: 14px 32px; font-family: var(--font-body);
    font-weight: 600; font-size: 14px; letter-spacing: 1px;
    text-transform: uppercase; text-decoration: none;
    clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
    transition: all 0.3s ease; position: relative; overflow: hidden;
  }
  .btn-primary::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
    opacity: 0; transition: opacity 0.3s;
  }
  .btn-primary:hover { background: var(--blue-bright); transform: translateY(-2px); box-shadow: var(--shadow-blue); }
  .btn-primary:hover::before { opacity: 1; }

  .btn-outline {
    display: inline-flex; align-items: center; gap: 10px;
    background: transparent; color: var(--silver-light);
    border: 1px solid var(--graphite-light); cursor: pointer;
    padding: 13px 30px; font-family: var(--font-body);
    font-weight: 500; font-size: 14px; letter-spacing: 1px;
    text-transform: uppercase; text-decoration: none;
    transition: all 0.3s ease;
  }
  .btn-outline:hover { border-color: var(--blue-industrial); color: var(--blue-glow); transform: translateY(-2px); }

  /* ---- CARDS ---- */
  .glass-card {
    background: rgba(22, 27, 34, 0.7);
    backdrop-filter: blur(20px);
    border: var(--border-subtle);
    position: relative; overflow: hidden;
  }
  .glass-card::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(31,111,235,0.03), transparent 60%);
    pointer-events: none;
  }

  /* ---- METAL DIVIDER ---- */
  .metal-line {
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--blue-industrial), var(--silver), var(--blue-industrial), transparent);
    opacity: 0.4;
  }

  /* ---- ANIMATIONS ---- */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; } to { opacity: 1; }
  }
  @keyframes slideLeft {
    from { opacity: 0; transform: translateX(-40px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes pulse-blue {
    0%, 100% { box-shadow: 0 0 0 0 rgba(31,111,235,0.4); }
    50% { box-shadow: 0 0 0 15px rgba(31,111,235,0); }
  }
  @keyframes scanline {
    from { transform: translateY(-100%); }
    to { transform: translateY(100vh); }
  }
  @keyframes counter {
    from { opacity: 0; transform: scale(0.5); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes glow-pulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }
  @keyframes rotate-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-12px); }
  }
  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  .animate-fade-up { animation: fadeUp 0.8s ease forwards; }
  .animate-fade-in { animation: fadeIn 0.6s ease forwards; }
  .animate-slide-left { animation: slideLeft 0.8s ease forwards; }

  .delay-1 { animation-delay: 0.1s; }
  .delay-2 { animation-delay: 0.2s; }
  .delay-3 { animation-delay: 0.3s; }
  .delay-4 { animation-delay: 0.4s; }
  .delay-5 { animation-delay: 0.5s; }
  .delay-6 { animation-delay: 0.6s; }

  /* ---- NAVBAR ---- */
  .navbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    transition: all 0.4s ease;
  }
  .navbar.scrolled {
    background: rgba(8, 10, 14, 0.92);
    backdrop-filter: blur(24px);
    border-bottom: 1px solid rgba(31,111,235,0.15);
    box-shadow: 0 4px 30px rgba(0,0,0,0.5);
  }
  .nav-link {
    color: var(--silver-light); text-decoration: none;
    font-size: 13px; font-weight: 500; letter-spacing: 1.5px;
    text-transform: uppercase; cursor: pointer;
    transition: color 0.3s;
    position: relative; padding-bottom: 4px;
  }
  .nav-link::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0;
    height: 1px; background: var(--blue-industrial);
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.3s ease;
  }
  .nav-link:hover { color: var(--white); }
  .nav-link:hover::after { transform: scaleX(1); }

  /* ---- HERO ---- */
  .hero-bg {
    background:
      radial-gradient(ellipse 80% 60% at 50% 0%, rgba(31,111,235,0.12) 0%, transparent 70%),
      radial-gradient(ellipse 60% 40% at 80% 80%, rgba(31,111,235,0.06) 0%, transparent 60%),
      var(--graphite-deep);
  }

  /* ---- PRODUCT CARD ---- */
  .product-card {
    background: var(--graphite);
    border: 1px solid var(--graphite-light);
    position: relative; overflow: hidden;
    transition: all 0.4s ease; cursor: pointer;
  }
  .product-card::after {
    content: ''; position: absolute;
    bottom: 0; left: 0; right: 0; height: 2px;
    background: var(--gradient-blue);
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.4s ease;
  }
  .product-card:hover {
    border-color: rgba(31,111,235,0.4);
    transform: translateY(-6px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.6), var(--shadow-blue-sm);
  }
  .product-card:hover::after { transform: scaleX(1); }

  /* ---- STAT CARD ---- */
  .stat-card {
    border: 1px solid var(--graphite-light);
    padding: 32px 24px;
    position: relative; overflow: hidden;
    transition: border-color 0.3s;
  }
  .stat-card:hover { border-color: var(--blue-industrial); }
  .stat-card::before {
    content: ''; position: absolute;
    top: 0; left: 0; right: 0; height: 1px;
    background: var(--gradient-blue);
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.4s ease;
  }
  .stat-card:hover::before { transform: scaleX(1); }

  /* ---- CONTACT FORM ---- */
  .form-group { position: relative; }
  .form-input {
    width: 100%; background: var(--graphite);
    border: 1px solid var(--graphite-light);
    color: var(--platinum); font-family: var(--font-body);
    font-size: 15px; padding: 16px 20px;
    outline: none; transition: all 0.3s ease;
    -webkit-appearance: none;
  }
  .form-input::placeholder { color: var(--steel); }
  .form-input:focus { border-color: var(--blue-industrial); box-shadow: 0 0 0 3px rgba(31,111,235,0.1); }
  .form-label {
    display: block; margin-bottom: 8px;
    font-size: 12px; font-weight: 600;
    letter-spacing: 2px; text-transform: uppercase;
    color: var(--silver);
  }

  /* ---- MOBILE MENU ---- */
  .mobile-menu {
    position: fixed; inset: 0; z-index: 999;
    background: rgba(8,10,14,0.98);
    backdrop-filter: blur(30px);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 40px; transition: all 0.4s ease;
  }
  .mobile-nav-link {
    font-family: var(--font-display); font-size: 48px;
    color: var(--silver-light); text-decoration: none;
    cursor: pointer; transition: color 0.3s;
    letter-spacing: 2px;
  }
  .mobile-nav-link:hover { color: var(--blue-glow); }

  /* ---- MARQUEE ---- */
  .marquee-track {
    display: flex; width: max-content;
    animation: marquee 25s linear infinite;
  }
  .marquee-item {
    font-family: var(--font-display); font-size: 72px;
    color: transparent;
    -webkit-text-stroke: 1px rgba(72,79,88,0.4);
    white-space: nowrap; padding: 0 40px;
    letter-spacing: 4px;
    transition: all 0.3s;
  }
  .marquee-item:hover {
    -webkit-text-stroke: 1px var(--blue-industrial);
    color: rgba(31,111,235,0.1);
  }

  /* ---- FLOATING BUTTONS ---- */
  .floating-btn {
    position: fixed; right: 24px; z-index: 998;
    width: 52px; height: 52px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.3s ease;
    border: none;
  }
  .whatsapp-btn {
    bottom: 90px; background: #25D366;
    border-radius: 50%; box-shadow: 0 4px 20px rgba(37,211,102,0.4);
    animation: pulse-blue 2s infinite;
  }
  .whatsapp-btn:hover { transform: scale(1.1); box-shadow: 0 6px 30px rgba(37,211,102,0.6); }
  .top-btn {
    bottom: 24px; background: var(--blue-industrial);
    clip-path: polygon(50% 0%, 100% 40%, 80% 40%, 80% 100%, 20% 100%, 20% 40%, 0% 40%);
    opacity: 0; transform: translateY(20px); transition: all 0.3s;
  }
  .top-btn.visible { opacity: 1; transform: translateY(0); }
  .top-btn:hover { background: var(--blue-bright); transform: translateY(-4px) scale(1.05); }

  /* ---- GALLERY ---- */
  .gallery-item {
    position: relative; overflow: hidden;
    cursor: pointer;
  }
  .gallery-item::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(8,10,14,0.9) 0%, transparent 60%);
    opacity: 0; transition: opacity 0.4s;
  }
  .gallery-item:hover::after { opacity: 1; }
  .gallery-item img { transition: transform 0.6s ease; display: block; width: 100%; }
  .gallery-item:hover img { transform: scale(1.08); }

  /* ---- DIFF ICON ---- */
  .diff-icon {
    width: 56px; height: 56px;
    background: rgba(31,111,235,0.1);
    border: 1px solid rgba(31,111,235,0.3);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; transition: all 0.3s;
  }
  .diff-card:hover .diff-icon {
    background: var(--blue-industrial);
    box-shadow: var(--shadow-blue);
  }
  .diff-card {
    display: flex; gap: 20px; padding: 28px;
    border: 1px solid var(--graphite-light);
    transition: all 0.3s ease;
  }
  .diff-card:hover { border-color: rgba(31,111,235,0.4); background: rgba(31,111,235,0.03); }

  /* ---- SECTION TITLES ---- */
  .section-title-wrap { position: relative; display: inline-block; }
  .section-title-wrap::before {
    content: attr(data-text);
    position: absolute; top: -30px; left: -10px;
    font-family: var(--font-display);
    font-size: 140px; color: transparent;
    -webkit-text-stroke: 1px rgba(31,111,235,0.06);
    white-space: nowrap; pointer-events: none;
    z-index: 0; line-height: 1;
  }

  /* ---- RESPONSIVE ---- */
  @media (max-width: 768px) {
    .display-xl { font-size: 52px; }
    .display-lg { font-size: 38px; }
    .marquee-item { font-size: 48px; }
    .section-title-wrap::before { font-size: 80px; top: -20px; }
    .mobile-nav-link { font-size: 36px; }
  }
  @media (max-width: 480px) {
    .display-xl { font-size: 40px; }
  }
`;

// ============================================================
// SVG ICONS
// ============================================================
const Icon = ({ name, size = 20, color = "currentColor", strokeWidth = 1.5 }: { name: string; size?: number; color?: string; strokeWidth?: number }) => {
  const icons = {
    menu: <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    arrow_right: <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    arrow_up: <><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></>,
    check: <><polyline points="20 6 9 17 4 12"/></>,
    zap: <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    star: <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>,
    award: <><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></>,
    cog: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
    phone: <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.67a16 16 0 0 0 6.29 6.29l1.03-1.03a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></>,
    mail: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
    map_pin: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,
    whatsapp: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" fill="white"/>,
    linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></>,
    instagram: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></>,
    send: <><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>,
    loader: <><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></>,
    blade: <><path d="M2 20L12 4l10 16"/><path d="M12 4v16"/><path d="M6 14h12"/></>,
    cylinder: <><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></>,
    layers: <><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,
    tool: <><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></>,
    cpu: <><rect x="9" y="9" width="6" height="6"/><rect x="2" y="2" width="20" height="20" rx="2" ry="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/></>,
    target: <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {(icons as any)[name] || null}
    </svg>
  );
};

// ============================================================
// USEANIMATION HOOK — Intersection Observer
// ============================================================
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

// ============================================================
// COUNTER COMPONENT
// ============================================================
function Counter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView();
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      setCount(Math.floor(start));
      if (start >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ============================================================
// NAVBAR
// ============================================================
function Navbar({ onNavClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [
    { label: "Sobre", id: "about" },
    { label: "Produtos", id: "products" },
    { label: "Diferenciais", id: "diferenciais" },
    { label: "Galeria", id: "gallery" },
    { label: "Contato", id: "contact" },
  ];
  const nav = (id) => { onNavClick(id); setMobileOpen(false); };

  return (
    <>
      <style>{`
        .nav-inner {
          max-width: 1280px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 32px; height: 72px;
        }
        @media (max-width: 768px) { .nav-inner { padding: 0 20px; } .nav-links { display: none !important; } .nav-cta { display: none !important; } }
        @media (min-width: 769px) { .nav-hamburger { display: none !important; } }
      `}</style>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          {/* LOGO */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
            onClick={() => onNavClick("hero")}>
            <div style={{
              width: 40, height: 40, background: "var(--gradient-blue)",
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "var(--shadow-blue-sm)"
            }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 16, color: "white", letterSpacing: 1 }}>ST</span>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--white)", letterSpacing: 3, lineHeight: 1 }}>STAR</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--blue-glow)", letterSpacing: 3 }}>TECNOLOGIA</div>
            </div>
          </div>

          {/* DESKTOP LINKS */}
          <div className="nav-links" style={{ display: "flex", gap: 36 }}>
            {links.map(l => (
              <span key={l.id} className="nav-link" onClick={() => nav(l.id)}>{l.label}</span>
            ))}
          </div>

          {/* CTA */}
          <div className="nav-cta">
            <button className="btn-primary" style={{ padding: "10px 24px", fontSize: 12 }}
              onClick={() => nav("contact")}>
              Solicitar Orçamento
              <Icon name="arrow_right" size={14} />
            </button>
          </div>

          {/* HAMBURGER */}
          <button className="nav-hamburger" onClick={() => setMobileOpen(true)}
            style={{ background: "none", border: "none", color: "var(--platinum)", cursor: "pointer", padding: 8 }}>
            <Icon name="menu" size={24} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="mobile-menu" onClick={() => setMobileOpen(false)}>
          <button onClick={() => setMobileOpen(false)}
            style={{ position: "absolute", top: 24, right: 24, background: "none", border: "none", color: "var(--silver)", cursor: "pointer" }}>
            <Icon name="x" size={28} />
          </button>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--blue-glow)", letterSpacing: 4, marginBottom: -20 }}>STAR TECNOLOGIA</div>
          {links.map((l, i) => (
            <span key={l.id} className="mobile-nav-link"
              style={{ animationDelay: `${i * 0.08}s`, opacity: 0, animation: "fadeUp 0.5s ease forwards" }}
              onClick={(e) => { e.stopPropagation(); nav(l.id); }}>
              {l.label}
            </span>
          ))}
          <button className="btn-primary" onClick={(e) => { e.stopPropagation(); nav("contact"); }}>
            Solicitar Orçamento <Icon name="arrow_right" size={14} />
          </button>
        </div>
      )}
    </>
  );
}

// ============================================================
// HERO SECTION
// ============================================================
function HeroSection({ onNavClick }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section id="hero" className="hero-bg grid-bg" style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 72 }}>
      {/* SCANLINE EFFECT */}
      <div style={{
        position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none",
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)"
      }} />

      {/* GEOMETRIC DECORATIONS */}
      <div style={{
        position: "absolute", top: "15%", right: "8%", width: 300, height: 300,
        border: "1px solid rgba(31,111,235,0.12)",
        transform: "rotate(45deg)", animation: "rotate-slow 30s linear infinite"
      }} />
      <div style={{
        position: "absolute", top: "20%", right: "11%", width: 200, height: 200,
        border: "1px solid rgba(31,111,235,0.08)",
        transform: "rotate(45deg)", animation: "rotate-slow 20s linear infinite reverse"
      }} />
      <div style={{
        position: "absolute", bottom: "10%", left: "5%", width: 150, height: 150,
        border: "1px solid rgba(72,79,88,0.2)", borderRadius: "50%",
        animation: "float 6s ease-in-out infinite"
      }} />

      {/* BLUE GLOW */}
      <div style={{
        position: "absolute", top: "30%", right: "15%", width: 400, height: 400,
        background: "radial-gradient(circle, rgba(31,111,235,0.15) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none", animation: "glow-pulse 4s ease-in-out infinite"
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 32px", width: "100%", position: "relative", zIndex: 1 }}>
        {/* TAG */}
        <div className={`section-tag ${loaded ? "animate-fade-in" : ""}`} style={{ marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 1, background: "var(--blue-industrial)" }} />
          SOLUÇÕES INDUSTRIAIS METÁLICAS
          <div style={{ width: 40, height: 1, background: "var(--blue-industrial)" }} />
        </div>

        {/* HEADLINE */}
        <div style={{ maxWidth: 800 }}>
          <h1 className={`display-xl ${loaded ? "animate-fade-up" : ""}`} style={{ opacity: 0, marginBottom: 8 }}>
            <span style={{ color: "var(--white)" }}>PRECISÃO</span>
          </h1>
          <h1 className={`display-xl delay-1 ${loaded ? "animate-fade-up" : ""}`}
            style={{ opacity: 0, color: "transparent", WebkitTextStroke: "2px var(--blue-industrial)", marginBottom: 8 }}>
            EM CADA
          </h1>
          <h1 className={`display-xl delay-2 ${loaded ? "animate-fade-up" : ""}`} style={{ opacity: 0, marginBottom: 32 }}>
            <span style={{ color: "var(--blue-glow)" }}>CORTE</span>
            <span style={{ color: "var(--silver)" }}> & AÇO</span>
          </h1>

          {/* SUBTITLE */}
          <p className={`delay-3 ${loaded ? "animate-fade-up" : ""}`} style={{
            opacity: 0, fontSize: "clamp(15px, 2vw, 18px)", color: "var(--silver-light)",
            lineHeight: 1.7, maxWidth: 580, marginBottom: 48, fontWeight: 300
          }}>
            Fabricamos facas industriais, circulares e perfis de aço com tecnologia de ponta e
            acabamento premium. <strong style={{ color: "var(--platinum)", fontWeight: 600 }}>25 anos</strong> transformando metal em precisão para a indústria brasileira.
          </p>

          {/* CTAS */}
          <div className={`delay-4 ${loaded ? "animate-fade-up" : ""}`}
            style={{ opacity: 0, display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => onNavClick("products")}>
              Ver Produtos <Icon name="arrow_right" size={16} />
            </button>
            <button className="btn-outline" onClick={() => onNavClick("contact")}>
              Solicitar Orçamento
            </button>
          </div>
        </div>

        {/* STATS BAR */}
        <div className={`delay-6 ${loaded ? "animate-fade-up" : ""}`} style={{
          opacity: 0, marginTop: 80,
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: 0, borderTop: "1px solid var(--graphite-light)",
          borderLeft: "1px solid var(--graphite-light)"
        }}>
          {[
            { num: 25, suffix: "+", label: "Anos de Experiência" },
            { num: 500, suffix: "+", label: "Clientes Ativos" },
            { num: 3000, suffix: "+", label: "Projetos Entregues" },
            { num: 99, suffix: "%", label: "Satisfação" },
          ].map((s, i) => (
            <div key={i} style={{
              padding: "28px 24px", borderRight: "1px solid var(--graphite-light)",
              borderBottom: "1px solid var(--graphite-light)"
            }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 44, color: "var(--blue-glow)", lineHeight: 1 }}>
                <Counter target={s.num} suffix={s.suffix} />
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--silver)", letterSpacing: 2, marginTop: 6 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM FADE */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 120,
        background: "linear-gradient(to bottom, transparent, var(--obsidian))", pointerEvents: "none"
      }} />
    </section>
  );
}

// ============================================================
// MARQUEE SECTION
// ============================================================
function MarqueeSection() {
  const items = ["FACAS INDUSTRIAIS", "TUBOS DE AÇO", "PERFIS METÁLICOS", "FACAS CIRCULARES", "SOLUÇÕES SOB MEDIDA", "PRECISÃO TOTAL"];
  return (
    <div style={{ padding: "40px 0", overflow: "hidden", borderTop: "var(--border-subtle)", borderBottom: "var(--border-subtle)", background: "var(--graphite-deep)" }}>
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="marquee-item">{item} <span style={{ color: "var(--blue-industrial)", WebkitTextStroke: "0" }}>★</span> </span>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// ABOUT SECTION
// ============================================================
function AboutSection() {
  const [ref, inView] = useInView();
  return (
    <section id="about" style={{ padding: "120px 0", background: "var(--obsidian)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>

          {/* LEFT */}
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(-40px)", transition: "all 0.8s ease" }}>
            <p className="section-tag" style={{ marginBottom: 20 }}>// QUEM SOMOS</p>
            <div className="section-title-wrap" data-text="SOBRE">
              <h2 className="display-lg" style={{ marginBottom: 28, position: "relative", zIndex: 1 }}>
                <span style={{ color: "var(--white)" }}>ENGENHARIA</span><br />
                <span style={{ color: "var(--blue-glow)" }}>METÁLICA</span><br />
                <span style={{ color: "var(--silver)" }}>PREMIUM</span>
              </h2>
            </div>
            <p style={{ color: "var(--silver-light)", lineHeight: 1.8, marginBottom: 20, fontWeight: 300, fontSize: 16 }}>
              Fundada em 1999, a <strong style={{ color: "var(--platinum)" }}>STAR Tecnologia</strong> é referência nacional
              na fabricação de facas industriais, circulares e soluções em aço. Nossa planta industrial de última
              geração combina tecnologia CNC com expertise de décadas para entregar peças de alta precisão.
            </p>
            <p style={{ color: "var(--silver-light)", lineHeight: 1.8, marginBottom: 36, fontWeight: 300, fontSize: 16 }}>
              Atendemos indústrias de papel, embalagem, alimentos, têxtil e metal-mecânica em todo o Brasil,
              com soluções padrão e sob medida que maximizam a produtividade e reduzem custos operacionais.
            </p>

            {/* TIMELINE */}
            {[
              { year: "1999", event: "Fundação em São Paulo, SP" },
              { year: "2008", event: "Expansão da linha de tubos industriais" },
              { year: "2015", event: "Certificação ISO 9001 e novo parque de máquinas CNC" },
              { year: "2024", event: "+500 clientes e presença nacional consolidada" },
            ].map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 16, marginBottom: 16, alignItems: "flex-start" }}>
                <div style={{ minWidth: 60, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--blue-glow)", paddingTop: 2 }}>{t.year}</div>
                <div style={{ flex: 1, borderLeft: "1px solid var(--graphite-light)", paddingLeft: 16 }}>
                  <p style={{ fontSize: 14, color: "var(--silver-light)" }}>{t.event}</p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT — Visual */}
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(40px)", transition: "all 0.8s ease 0.2s" }}>
            <div style={{ position: "relative" }}>
              {/* Main visual block */}
              <div style={{
                background: "var(--graphite)", border: "var(--border-subtle)",
                padding: 48, position: "relative", overflow: "hidden"
              }}>
                {/* Metal texture lines */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} style={{
                    position: "absolute", left: 0, right: 0, height: 1,
                    top: `${12 + i * 12}%`,
                    background: `linear-gradient(90deg, transparent, rgba(72,79,88,${0.05 + i * 0.02}), transparent)`
                  }} />
                ))}
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--blue-glow)", letterSpacing: 3, marginBottom: 32 }}>
                    // ESPECIFICAÇÕES TÉCNICAS
                  </div>
                  {[
                    { label: "Tolerância de Corte", value: "±0.01mm", pct: 95 },
                    { label: "Dureza Rockwell", value: "HRC 58-62", pct: 85 },
                    { label: "Aço Inox D2 / HSS", value: "Certificado", pct: 100 },
                    { label: "Tempo de Entrega", value: "5-15 dias", pct: 80 },
                  ].map((spec, i) => (
                    <div key={i} style={{ marginBottom: 24 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <span style={{ fontSize: 12, color: "var(--silver)", fontWeight: 500 }}>{spec.label}</span>
                        <span style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--blue-glow)" }}>{spec.value}</span>
                      </div>
                      <div style={{ height: 3, background: "var(--graphite-light)", borderRadius: 2 }}>
                        <div style={{
                          height: "100%", width: inView ? `${spec.pct}%` : "0%",
                          background: "var(--gradient-blue)", borderRadius: 2,
                          transition: `width 1.2s ease ${i * 0.15}s`
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge */}
              <div style={{
                position: "absolute", bottom: -20, right: -20,
                background: "var(--blue-industrial)", padding: "20px 24px",
                boxShadow: "var(--shadow-blue)"
              }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 36, color: "white", lineHeight: 1 }}>ISO</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(255,255,255,0.7)", letterSpacing: 2 }}>9001:2015</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #about .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// PRODUCTS SECTION
// ============================================================
const PRODUCTS = [
  {
    icon: "blade",
    tag: "CORTE DE PRECISÃO",
    name: "Facas Circulares",
    desc: "Facas circulares em aço D2, HSS e inox para aplicações industriais de alta exigência. Diâmetros de 50mm a 800mm com acabamento rectificado.",
    specs: ["Aço D2 / HSS / Inox", "Ø 50mm–800mm", "HRC 58-62", "Rectificação de precisão"],
    color: "#1F6FEB"
  },
  {
    icon: "cylinder",
    tag: "ESTRUTURA INDUSTRIAL",
    name: "Tubos de Aço",
    desc: "Tubos industriais em aço carbono, inox e galvanizado para aplicações estruturais, hidráulicas e mecânicas com certificação de qualidade.",
    specs: ["Aço Carbono / Inox", "Galvanizado a fogo", "NBR/ASTM certificado", "Corte e dobra CNC"],
    color: "#388BFD"
  },
  {
    icon: "layers",
    tag: "ENGENHARIA ESTRUTURAL",
    name: "Perfis de Aço",
    desc: "Perfis laminados e dobrados em diversas bitolas: U, L, T, I e Z. Corte, furação e tratamento superficial inclusos.",
    specs: ["Perfis U, L, T, I, Z", "Laminado e dobrado", "Tratamento anticorrosivo", "Entrega em todo o Brasil"],
    color: "#58A6FF"
  },
  {
    icon: "blade",
    tag: "FABRICAÇÃO SOB ENCOMENDA",
    name: "Facas Especiais",
    desc: "Desenvolvimento de facas especiais e geometrias exclusivas para processos específicos. Do projeto à entrega com engenharia dedicada.",
    specs: ["Geometrias exclusivas", "Projeto 3D incluso", "Materiais especiais", "Suporte técnico vitalício"],
    color: "#1F6FEB"
  },
  {
    icon: "tool",
    tag: "ENGENHARIA DE APLICAÇÃO",
    name: "Soluções Sob Medida",
    desc: "Consultoria técnica e desenvolvimento de soluções metálicas para processos industriais específicos. Análise, projeto e execução.",
    specs: ["Consultoria gratuita", "Engenheiros dedicados", "Prototipagem rápida", "Teste em campo"],
    color: "#388BFD"
  },
  {
    icon: "cpu",
    tag: "TECNOLOGIA CNC",
    name: "Usinagem CNC",
    desc: "Usinagem de precisão em torno e fresamento CNC para peças mecânicas complexas. Tolerâncias apertadas e acabamento superficial premium.",
    specs: ["Tolerância ±0.01mm", "CNC 5 eixos", "Ra 0.4 µm", "Certificado dimensional"],
    color: "#58A6FF"
  },
];

function ProductsSection({ onNavClick }) {
  const [ref, inView] = useInView();
  const [hover, setHover] = useState(null);

  return (
    <section id="products" style={{ padding: "120px 0", background: "var(--graphite-deep)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        {/* HEADER */}
        <div ref={ref} style={{ textAlign: "center", marginBottom: 72 }}>
          <p className="section-tag" style={{ marginBottom: 16 }}>// LINHA DE PRODUTOS</p>
          <h2 className="display-lg" style={{
            opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)",
            transition: "all 0.8s ease"
          }}>
            <span style={{ color: "var(--white)" }}>NOSSOS</span>{" "}
            <span style={{ color: "var(--blue-glow)" }}>PRODUTOS</span>
          </h2>
          <p style={{
            color: "var(--silver)", maxWidth: 560, margin: "20px auto 0",
            lineHeight: 1.7, fontSize: 16, fontWeight: 300,
            opacity: inView ? 1 : 0, transition: "all 0.8s ease 0.2s"
          }}>
            Fabricação própria com controle total do processo produtivo, da matéria-prima ao produto final.
          </p>
        </div>

        {/* GRID */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24
        }}>
          {PRODUCTS.map((p, i) => (
            <div key={i} className="product-card"
              onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
              style={{
                opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(40px)",
                transition: `all 0.6s ease ${i * 0.08}s`, padding: 32
              }}>
              {/* TOP */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <div style={{
                  width: 52, height: 52,
                  background: hover === i ? p.color : "rgba(31,111,235,0.08)",
                  border: `1px solid ${hover === i ? p.color : "rgba(31,111,235,0.2)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.3s ease",
                  boxShadow: hover === i ? `0 0 20px ${p.color}40` : "none"
                }}>
                  <Icon name={p.icon} size={22} color={hover === i ? "white" : p.color} />
                </div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--steel)", letterSpacing: 2 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--blue-glow)", letterSpacing: 2, marginBottom: 10 }}>
                {p.tag}
              </p>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "var(--white)", marginBottom: 14, letterSpacing: 1 }}>
                {p.name}
              </h3>
              <p style={{ color: "var(--silver)", lineHeight: 1.7, fontSize: 14, marginBottom: 24, fontWeight: 300 }}>
                {p.desc}
              </p>

              {/* SPECS */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                {p.specs.map((s, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 16, height: 16, background: "rgba(31,111,235,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon name="check" size={10} color="var(--blue-glow)" />
                    </div>
                    <span style={{ fontSize: 13, color: "var(--silver-light)" }}>{s}</span>
                  </div>
                ))}
              </div>

              <button className="btn-outline" style={{ width: "100%", justifyContent: "center", fontSize: 12 }}
                onClick={() => onNavClick("contact")}>
                Solicitar Cotação <Icon name="arrow_right" size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// DIFERENCIAIS SECTION
// ============================================================
const DIFERENCIAIS = [
  { icon: "target", title: "Precisão Extrema", desc: "Tolerâncias de ±0.01mm em todos os produtos. Tecnologia CNC de última geração com calibração diária e certificação metrológica." },
  { icon: "shield", title: "Alta Durabilidade", desc: "Materiais certificados e tratamentos térmicos controlados garantem vida útil superior. Garantia estendida em todos os produtos." },
  { icon: "cpu", title: "Tecnologia CNC", desc: "Parque industrial com centros de usinagem de 5 eixos, torno CNC e retificadoras de última geração para máxima precisão." },
  { icon: "cog", title: "Fabricação Especializada", desc: "Domínio completo do processo produtivo, do aço bruto ao produto final. Controle dimensional em 100% das peças produzidas." },
  { icon: "star", title: "Suporte Técnico", desc: "Equipe de engenheiros mecânicos dedicados ao suporte pós-venda. Consultoria gratuita e visitas técnicas para aplicações críticas." },
  { icon: "zap", title: "Entrega Rápida", desc: "Estoque de matéria-prima sempre disponível. Prazo de entrega expresso para peças padrão e cronograma definido para especiais." },
  { icon: "award", title: "ISO 9001:2015", desc: "Sistema de gestão da qualidade certificado. Rastreabilidade total, documentação completa e relatórios de inspeção para cada lote." },
  { icon: "layers", title: "Variedade de Materiais", desc: "Aço D2, HSS, inox 420/440, aço carbono, aço ferramenta e ligas especiais. O material certo para cada aplicação industrial." },
];

function DiferenciaisSection() {
  const [ref, inView] = useInView();
  return (
    <section id="diferenciais" style={{ padding: "120px 0", background: "var(--obsidian)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }} ref={ref}>
          <p className="section-tag" style={{ marginBottom: 16 }}>// POR QUE A STAR?</p>
          <h2 className="display-lg">
            <span style={{ color: "var(--white)", opacity: inView ? 1 : 0, display: "inline-block", transition: "all 0.8s ease" }}>NOSSOS </span>
            <span style={{ color: "var(--blue-glow)", opacity: inView ? 1 : 0, display: "inline-block", transition: "all 0.8s ease 0.1s" }}>DIFERENCIAIS</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 2 }}>
          {DIFERENCIAIS.map((d, i) => (
            <div key={i} className="diff-card"
              style={{
                background: "var(--graphite-deep)",
                opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)",
                transition: `all 0.5s ease ${i * 0.06}s`
              }}>
              <div className="diff-icon">
                <Icon name={d.icon} size={22} color="var(--blue-glow)" />
              </div>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--white)", marginBottom: 8, letterSpacing: 0.5 }}>{d.title}</h3>
                <p style={{ fontSize: 13, color: "var(--silver)", lineHeight: 1.7, fontWeight: 300 }}>{d.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA BAND */}
        <div style={{
          marginTop: 80, padding: "48px 56px",
          background: "var(--graphite)",
          border: "1px solid rgba(31,111,235,0.2)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 32, position: "relative", overflow: "hidden"
        }}>
          <div style={{
            position: "absolute", right: -60, top: -60, width: 300, height: 300,
            background: "radial-gradient(circle, rgba(31,111,235,0.08) 0%, transparent 70%)",
            borderRadius: "50%"
          }} />
          <div>
            <h3 className="display-md" style={{ color: "var(--white)", marginBottom: 8 }}>PRONTO PARA COMEÇAR?</h3>
            <p style={{ color: "var(--silver)", fontSize: 15 }}>Fale com nossos engenheiros e receba uma proposta personalizada.</p>
          </div>
          <button className="btn-primary" style={{ fontSize: 13, padding: "16px 36px", flexShrink: 0 }}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
            Solicitar Orçamento Agora <Icon name="arrow_right" size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// GALLERY SECTION — Industrial SVG Visuals
// ============================================================
function GallerySection() {
  const [ref, inView] = useInView();
  const items = [
    { label: "Facas Circulares", tag: "LINHA PREMIUM", w: 2, h: 1 },
    { label: "Tubos Industriais", tag: "ESTRUTURAL", w: 1, h: 1 },
    { label: "Usinagem CNC", tag: "TECNOLOGIA", w: 1, h: 1 },
    { label: "Perfis de Aço", tag: "ENGENHARIA", w: 1, h: 2 },
    { label: "Facas Especiais", tag: "SOB MEDIDA", w: 1, h: 1 },
    { label: "Controle de Qualidade", tag: "ISO 9001", w: 1, h: 1 },
  ];
  // Industrial SVG patterns per item
  const patterns = [
    // Circular blades
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <defs><radialGradient id="rg1" cx="50%" cy="50%"><stop offset="0%" stopColor="#1F6FEB" stopOpacity="0.3"/><stop offset="100%" stopColor="#080A0E" stopOpacity="0"/></radialGradient></defs>
      <rect fill="#0D1117" width="400" height="300"/>
      <ellipse cx="200" cy="150" rx="120" ry="120" fill="none" stroke="#21262D" strokeWidth="40"/>
      <ellipse cx="200" cy="150" rx="120" ry="120" fill="none" stroke="#1F6FEB" strokeWidth="1" strokeDasharray="10 5"/>
      <ellipse cx="200" cy="150" rx="80" ry="80" fill="none" stroke="#30363D" strokeWidth="2"/>
      <ellipse cx="200" cy="150" rx="20" ry="20" fill="#1F6FEB" fillOpacity="0.5"/>
      {Array.from({length:16}).map((_,i)=>{
        const a = (i/16)*Math.PI*2;
        return <line key={i} x1={200+80*Math.cos(a)} y1={150+80*Math.sin(a)} x2={200+120*Math.cos(a)} y2={150+120*Math.sin(a)} stroke="#388BFD" strokeWidth="3" strokeLinecap="round"/>
      })}
      <circle cx="200" cy="150" r="6" fill="white" fillOpacity="0.3"/>
      <ellipse cx="200" cy="150" rx="120" ry="120" fill="url(#rg1)"/>
    </svg>,
    // Tubes
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <rect fill="#0D1117" width="200" height="200"/>
      {[30,70,110,150].map((x,i)=>(
        <g key={i}>
          <ellipse cx={x} cy="40" rx="15" ry="8" fill="#21262D" stroke="#30363D" strokeWidth="1"/>
          <rect x={x-15} y="40" width="30" height="120" fill="#161B22" stroke="#21262D" strokeWidth="1"/>
          <ellipse cx={x} cy="160" rx="15" ry="8" fill="#1F6FEB" fillOpacity={0.1+i*0.05} stroke="#1F6FEB" strokeWidth="1" strokeOpacity="0.4"/>
          <rect x={x-15} y="40" width="30" height="120" fill="url(#tg)" opacity="0.3"/>
        </g>
      ))}
      <defs><linearGradient id="tg" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#388BFD" stopOpacity="0.4"/><stop offset="100%" stopColor="transparent"/></linearGradient></defs>
    </svg>,
    // CNC Machine
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <rect fill="#080A0E" width="200" height="200"/>
      <rect x="20" y="140" width="160" height="40" fill="#161B22" rx="2"/>
      <rect x="80" y="60" width="40" height="80" fill="#21262D" rx="2"/>
      <rect x="90" y="40" width="20" height="20" fill="#30363D"/>
      <rect x="95" y="30" width="10" height="10" fill="#1F6FEB" fillOpacity="0.6"/>
      <rect x="20" y="140" width="160" height="4" fill="#1F6FEB" fillOpacity="0.3"/>
      <circle cx="100" cy="140" r="8" fill="#0D1117" stroke="#1F6FEB" strokeWidth="2"/>
      {Array.from({length:8}).map((_,i)=>(
        <line key={i} x1="100" y1="140" x2={100+8*Math.cos(i/8*Math.PI*2)} y2={140+8*Math.sin(i/8*Math.PI*2)} stroke="#1F6FEB" strokeWidth="1.5"/>
      ))}
      <rect x="30" y="60" width="40" height="8" fill="#1F6FEB" fillOpacity="0.2" rx="1"/>
      <rect x="130" y="60" width="40" height="8" fill="#1F6FEB" fillOpacity="0.2" rx="1"/>
      <text x="100" y="170" textAnchor="middle" fill="#8B949E" fontSize="8" fontFamily="monospace">CNC ±0.01mm</text>
    </svg>,
    // Profiles
    <svg viewBox="0 0 200 400" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <rect fill="#0D1117" width="200" height="400"/>
      {[40,110,180,250,320].map((y,i)=>(
        <g key={i} transform={`translate(20,${y})`}>
          <rect x="0" y="0" width="160" height="8" fill="#21262D" stroke="#30363D" strokeWidth="0.5"/>
          <rect x="0" y="0" width="8" height="40" fill="#21262D" stroke="#30363D" strokeWidth="0.5"/>
          <rect x="152" y="0" width="8" height="40" fill="#21262D" stroke="#30363D" strokeWidth="0.5"/>
          <rect x="0" y="0" width="160" height="1" fill="#1F6FEB" fillOpacity={0.2+i*0.1}/>
        </g>
      ))}
    </svg>,
    // Special blades
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <rect fill="#0D1117" width="200" height="200"/>
      <defs><linearGradient id="bg1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#1F6FEB" stopOpacity="0.1"/><stop offset="100%" stopColor="transparent"/></linearGradient></defs>
      <polygon points="20,180 100,20 180,180" fill="#161B22" stroke="#30363D" strokeWidth="1"/>
      <polygon points="20,180 100,20 180,180" fill="url(#bg1)"/>
      <line x1="100" y1="20" x2="100" y2="180" stroke="#1F6FEB" strokeWidth="1" strokeOpacity="0.4"/>
      <line x1="60" y1="100" x2="140" y2="100" stroke="#1F6FEB" strokeWidth="1" strokeOpacity="0.2"/>
      <circle cx="100" cy="100" r="4" fill="#1F6FEB"/>
      <text x="100" y="190" textAnchor="middle" fill="#484F58" fontSize="9" fontFamily="monospace">GEOMETRIA CUSTOM</text>
    </svg>,
    // Quality
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <rect fill="#0D1117" width="200" height="200"/>
      <circle cx="100" cy="100" r="70" fill="none" stroke="#21262D" strokeWidth="2"/>
      <circle cx="100" cy="100" r="50" fill="none" stroke="#30363D" strokeWidth="1"/>
      <circle cx="100" cy="100" r="70" fill="none" stroke="#1F6FEB" strokeWidth="1" strokeDasharray="4 8" strokeOpacity="0.5"/>
      <polyline points="70,100 90,120 130,80" fill="none" stroke="#1F6FEB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      {Array.from({length:12}).map((_,i)=>{
        const a = (i/12)*Math.PI*2 - Math.PI/2;
        return <line key={i} x1={100+62*Math.cos(a)} y1={100+62*Math.sin(a)} x2={100+70*Math.cos(a)} y2={100+70*Math.sin(a)} stroke="#388BFD" strokeWidth={i%3===0?2:1}/>
      })}
      <text x="100" y="170" textAnchor="middle" fill="#1F6FEB" fontSize="9" fontFamily="monospace">ISO 9001:2015</text>
    </svg>,
  ];

  return (
    <section id="gallery" style={{ padding: "120px 0", background: "var(--graphite-deep)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }} ref={ref}>
          <p className="section-tag" style={{ marginBottom: 16 }}>// NOSSO PROCESSO</p>
          <h2 className="display-lg">
            <span style={{ color: "var(--white)" }}>EXCELÊNCIA </span>
            <span style={{ color: "var(--blue-glow)" }}>TÉCNICA</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "280px 280px", gap: 16 }}>
          {items.map((item, i) => {
            const spans = [
              { col: "1", row: "1" },
              { col: "2", row: "1" },
              { col: "3", row: "1" },
              { col: "3", row: "1 / span 2" },
              { col: "1", row: "2" },
              { col: "2", row: "2" },
            ];
            const s = spans[i];
            return (
              <div key={i} className="gallery-item" style={{
                gridColumn: s.col, gridRow: s.row,
                background: "var(--graphite)",
                border: "var(--border-subtle)",
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "scale(0.95)",
                transition: `all 0.7s ease ${i * 0.1}s`,
                position: "relative", overflow: "hidden"
              }}>
                {patterns[i]}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  padding: "20px 24px",
                  background: "linear-gradient(to top, rgba(8,10,14,0.9) 0%, transparent)",
                  opacity: 0, transition: "opacity 0.3s"
                }} className="gallery-overlay">
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--blue-glow)", letterSpacing: 3 }}>{item.tag}</p>
                  <h4 style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "var(--white)", letterSpacing: 1 }}>{item.label}</h4>
                </div>
                {/* Always visible label at bottom */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  padding: "16px 20px",
                  background: "linear-gradient(to top, rgba(8,10,14,0.8) 0%, transparent 100%)"
                }}>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--blue-glow)", letterSpacing: 3 }}>{item.tag}</p>
                  <h4 style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "var(--white)", letterSpacing: 1 }}>{item.label}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          #gallery .gallery-grid { grid-template-columns: 1fr 1fr !important; grid-template-rows: auto !important; }
        }
        @media (max-width: 600px) {
          #gallery .gallery-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// CONTACT SECTION
// ============================================================
function ContactSection() {
  const [ref, inView] = useInView();
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Nome é obrigatório";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "E-mail inválido";
    if (!form.message.trim()) e.message = "Mensagem é obrigatória";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({}); setStatus("sending");
    // Simulate Supabase call
    await new Promise(r => setTimeout(r, 1800));
    setStatus("success");
    setForm({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
    setTimeout(() => setStatus("idle"), 5000);
  };

  const Field = ({ label, id, type = "text", rows, placeholder }) => (
    <div className="form-group">
      <label className="form-label" htmlFor={id}>{label}</label>
      {rows ? (
        <textarea id={id} className="form-input" rows={rows} placeholder={placeholder}
          style={{ resize: "vertical", minHeight: 120 }}
          value={form[id]} onChange={e => setForm({ ...form, [id]: e.target.value })} />
      ) : (
        <input id={id} type={type} className="form-input" placeholder={placeholder}
          value={form[id]} onChange={e => setForm({ ...form, [id]: e.target.value })} />
      )}
      {errors[id] && <p style={{ fontSize: 12, color: "var(--red-alert)", marginTop: 6 }}>{errors[id]}</p>}
    </div>
  );

  return (
    <section id="contact" style={{ padding: "120px 0", background: "var(--obsidian)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "start" }} ref={ref}>

          {/* LEFT INFO */}
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(-30px)", transition: "all 0.8s ease" }}>
            <p className="section-tag" style={{ marginBottom: 16 }}>// FALE CONOSCO</p>
            <h2 className="display-lg" style={{ marginBottom: 24 }}>
              <span style={{ color: "var(--white)" }}>SOLICITE</span><br />
              <span style={{ color: "var(--blue-glow)" }}>ORÇAMENTO</span>
            </h2>
            <p style={{ color: "var(--silver-light)", lineHeight: 1.8, marginBottom: 48, fontWeight: 300 }}>
              Nossa equipe técnica responde em até <strong style={{ color: "var(--platinum)" }}>2 horas úteis</strong>.
              Descreva sua necessidade e enviaremos uma proposta personalizada.
            </p>

            {[
              { icon: "phone", label: "Telefone / WhatsApp", value: "(11) 9 9999-9999" },
              { icon: "mail", label: "E-mail Comercial", value: "contato@startecnologia.com.br" },
              { icon: "map_pin", label: "Localização", value: "Guarulhos – São Paulo, SP" },
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", gap: 16, marginBottom: 28, alignItems: "flex-start" }}>
                <div style={{
                  width: 44, height: 44, background: "rgba(31,111,235,0.1)",
                  border: "1px solid rgba(31,111,235,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                }}>
                  <Icon name={c.icon} size={18} color="var(--blue-glow)" />
                </div>
                <div>
                  <p style={{ fontSize: 11, color: "var(--steel)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "var(--font-mono)", marginBottom: 4 }}>{c.label}</p>
                  <p style={{ fontSize: 15, color: "var(--platinum)" }}>{c.value}</p>
                </div>
              </div>
            ))}

            {/* SOCIAL */}
            <div className="metal-line" style={{ margin: "32px 0" }} />
            <div style={{ display: "flex", gap: 12 }}>
              {["linkedin", "instagram", "whatsapp"].map((s, i) => (
                <button key={i} style={{
                  width: 44, height: 44, background: "var(--graphite)",
                  border: "1px solid var(--graphite-light)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", transition: "all 0.3s",
                  color: "var(--silver)"
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--blue-industrial)"; e.currentTarget.style.color = "var(--blue-glow)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--graphite-light)"; e.currentTarget.style.color = "var(--silver)"; }}>
                  <Icon name={s} size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* FORM */}
          <div style={{
            opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(30px)",
            transition: "all 0.8s ease 0.2s",
            background: "var(--graphite)", border: "var(--border-subtle)", padding: 48
          }}>
            {status === "success" ? (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <div style={{ width: 72, height: 72, background: "rgba(31,111,235,0.15)", border: "1px solid var(--blue-industrial)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                  <Icon name="check" size={32} color="var(--blue-glow)" />
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 32, color: "var(--white)", marginBottom: 12 }}>MENSAGEM ENVIADA!</h3>
                <p style={{ color: "var(--silver-light)", lineHeight: 1.7 }}>Nossa equipe entrará em contato em até 2 horas úteis.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--blue-glow)", letterSpacing: 3, marginBottom: -8 }}>// FORMULÁRIO DE CONTATO</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  <Field label="Nome Completo *" id="name" placeholder="Seu nome" />
                  <Field label="E-mail *" id="email" type="email" placeholder="seu@email.com" />
                  <Field label="Telefone / WhatsApp" id="phone" placeholder="(11) 9 9999-9999" />
                  <Field label="Empresa" id="company" placeholder="Nome da empresa" />
                </div>
                <Field label="Assunto" id="subject" placeholder="Ex: Cotação de facas circulares" />
                <Field label="Mensagem *" id="message" rows={5} placeholder="Descreva sua necessidade com detalhes: dimensões, quantidade, material, aplicação..." />

                <button className="btn-primary" style={{ justifyContent: "center", padding: "16px 32px" }}
                  onClick={handleSubmit} disabled={status === "sending"}>
                  {status === "sending" ? (
                    <><span style={{ display: "inline-block", animation: "rotate-slow 1s linear infinite" }}><Icon name="loader" size={16} /></span> Enviando...</>
                  ) : (
                    <>Enviar Mensagem <Icon name="send" size={16} /></>
                  )}
                </button>

                <p style={{ fontSize: 11, color: "var(--steel)", textAlign: "center", fontFamily: "var(--font-mono)" }}>
                  * Integrado com Supabase — dados protegidos e seguros
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          #contact > div > div { grid-template-columns: 1fr !important; gap: 48px !important; }
          #contact .form-inner-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer({ onNavClick }) {
  return (
    <footer style={{ background: "var(--graphite-deep)", borderTop: "var(--border-subtle)", padding: "64px 0 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 64 }}>
          {/* BRAND */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, cursor: "pointer" }} onClick={() => onNavClick("hero")}>
              <div style={{ width: 36, height: 36, background: "var(--gradient-blue)", clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 13, color: "white" }}>ST</span>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "var(--white)", letterSpacing: 3 }}>STAR TECNOLOGIA</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--blue-glow)", letterSpacing: 2 }}>SOLUÇÕES INDUSTRIAIS</div>
              </div>
            </div>
            <p style={{ color: "var(--silver)", fontSize: 14, lineHeight: 1.8, marginBottom: 24, fontWeight: 300 }}>
              Fabricante especializado em facas industriais, tubos e perfis de aço com mais de 25 anos de excelência técnica.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {["linkedin", "instagram", "whatsapp"].map((s, i) => (
                <button key={i} style={{ width: 36, height: 36, background: "var(--graphite)", border: "1px solid var(--graphite-light)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.3s", color: "var(--silver)" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--blue-industrial)"; e.currentTarget.style.color = "var(--blue-glow)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--graphite-light)"; e.currentTarget.style.color = "var(--silver)"; }}>
                  <Icon name={s} size={15} />
                </button>
              ))}
            </div>
          </div>

          {/* PRODUTOS */}
          <div>
            <h4 style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--blue-glow)", letterSpacing: 3, marginBottom: 20 }}>PRODUTOS</h4>
            {["Facas Circulares", "Tubos Industriais", "Perfis de Aço", "Facas Especiais", "Usinagem CNC"].map((l, i) => (
              <div key={i} onClick={() => onNavClick("products")} style={{ fontSize: 14, color: "var(--silver)", marginBottom: 12, cursor: "pointer", transition: "color 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--platinum)"}
                onMouseLeave={e => e.currentTarget.style.color = "var(--silver)"}>
                {l}
              </div>
            ))}
          </div>

          {/* EMPRESA */}
          <div>
            <h4 style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--blue-glow)", letterSpacing: 3, marginBottom: 20 }}>EMPRESA</h4>
            {["Sobre Nós", "Diferenciais", "Galeria", "Contato", "Política de Qualidade"].map((l, i) => (
              <div key={i} style={{ fontSize: 14, color: "var(--silver)", marginBottom: 12, cursor: "pointer", transition: "color 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--platinum)"}
                onMouseLeave={e => e.currentTarget.style.color = "var(--silver)"}>
                {l}
              </div>
            ))}
          </div>

          {/* CONTATO */}
          <div>
            <h4 style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--blue-glow)", letterSpacing: 3, marginBottom: 20 }}>CONTATO</h4>
            <div style={{ fontSize: 13, color: "var(--silver)", marginBottom: 12, lineHeight: 1.6 }}>
              <span style={{ color: "var(--steel)" }}>WhatsApp</span><br />
              (11) 9 9999-9999
            </div>
            <div style={{ fontSize: 13, color: "var(--silver)", marginBottom: 12, lineHeight: 1.6 }}>
              <span style={{ color: "var(--steel)" }}>E-mail</span><br />
              contato@startecnologia.com.br
            </div>
            <div style={{ fontSize: 13, color: "var(--silver)", marginBottom: 24, lineHeight: 1.6 }}>
              <span style={{ color: "var(--steel)" }}>Endereço</span><br />
              Guarulhos – São Paulo, SP
            </div>
            <div style={{ padding: "10px 14px", background: "rgba(31,111,235,0.1)", border: "1px solid rgba(31,111,235,0.2)", display: "inline-block" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--blue-glow)", letterSpacing: 2 }}>ISO 9001:2015</span>
            </div>
          </div>
        </div>

        <div className="metal-line" style={{ marginBottom: 28 }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--steel)" }}>
            © 2024 STAR TECNOLOGIA LTDA. TODOS OS DIREITOS RESERVADOS.
          </p>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacidade", "Termos de Uso", "Cookies"].map((l, i) => (
              <span key={i} style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--steel)", cursor: "pointer", letterSpacing: 1, transition: "color 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--silver)"}
                onMouseLeave={e => e.currentTarget.style.color = "var(--steel)"}>
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          footer > div > div:first-child { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          footer > div > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

// ============================================================
// FLOATING BUTTONS
// ============================================================
function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const fn = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <>
      {/* WHATSAPP */}
      <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer"
        className="floating-btn whatsapp-btn" style={{ textDecoration: "none" }}>
        <Icon name="whatsapp" size={26} color="white" />
      </a>
      {/* TOP */}
      <button className={`floating-btn top-btn ${showTop ? "visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{ bottom: 24, background: "var(--blue-industrial)" }}>
        <Icon name="arrow_up" size={18} color="white" />
      </button>
    </>
  );
}

// ============================================================
// APP ROOT
// ============================================================
export default function StarTecnologiaApp() {
  const scrollTo = (id) => {
    if (id === "hero") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{FONTS}{STYLES}</style>
      <Navbar onNavClick={scrollTo} />
      <main>
        <HeroSection onNavClick={scrollTo} />
        <MarqueeSection />
        <AboutSection />
        <ProductsSection onNavClick={scrollTo} />
        <DiferenciaisSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer onNavClick={scrollTo} />
      <FloatingButtons />
    </>
  );
}
