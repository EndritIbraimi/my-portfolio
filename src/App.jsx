import { useState, useEffect, useRef } from "react";

const SKILLS = [
  { name: "PHP / Laravel", level: 70 },
  { name: "JavaScript / React", level: 85 },
  { name: "Python", level: 75 },
  { name: "C# / Entity Framework", level: 60 },
  { name: "C++", level: 90 },
  { name: "HTML5 / CSS3", level: 92 },
  { name: "MySQL / PostgreSQL", level: 68 },
];

const PROJECTS = [
  {
    title: "Football Prediction ML",
    desc: "A full-stack machine learning application that predicts football match outcomes (Win / Draw / Loss) using historical data, live API updates, and betting odds analysis.",
    stack: ["Python", "FastAPI", "React", "scikit-learn", "Typescript"],
    github: "https://github.com/EndritIbraimi/football-predictor",
    live: null,
  },
  {
    title: "Restaurant Ordering System",
    desc: "A complete ASP.NET Core Web API for managing restaurant orders with authentication, authorization, and complex business logic.",
    stack: ["C#", "PostgreSQL"],
    github: "https://github.com/EndritIbraimi/RestaurantOrderingSystem",
    live: null,
  },
  {
    title: "Social Media Platform",
    desc: "A social media web application built with Laravel, featuring user authentication, post creation, commenting, and liking functionality.",
    stack: ["Laravel", "HTML5", "CSS3", "MySQL"],
    github: "https://github.com/EndritIbraimi/SocialMedia/tree/main/SocialMedia",
    live: null,
  },
];

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function AnimatedBar({ level, delay = 0 }) {
  const [width, setWidth] = useState(0);
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setWidth(level), delay);
      return () => clearTimeout(t);
    }
  }, [inView, level, delay]);
  return (
    <div ref={ref} style={{ background: "#1a1a1a", borderRadius: 2, height: 3, overflow: "hidden" }}>
      <div style={{
        height: "100%",
        width: `${width}%`,
        background: "linear-gradient(90deg, #e8c97e, #f0e0a8)",
        transition: "width 1s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: "0 0 12px rgba(232,201,126,0.4)"
      }} />
    </div>
  );
}

function FadeIn({ children, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`
    }}>
      {children}
    </div>
  );
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState("idle"); // idle | sending | success | error
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [heroVisible, setHeroVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    const handleMouseMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener("scroll", close);
    return () => window.removeEventListener("scroll", close);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xkovboze", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ name: formData.name, email: formData.email, message: formData.message }),
      });
      if (res.ok) {
        setFormStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  const navItems = ["home", "about", "projects", "contact"];
  const gold = "#e8c97e";
  const goldFaint = "rgba(232,201,126,0.08)";
  const goldBorder = "rgba(232,201,126,0.15)";
  const textMuted = "rgba(232,226,217,0.55)";
  const accentLine = { width: 28, height: 1, background: gold, display: "inline-block", flexShrink: 0 };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #0a0a0a; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: rgba(232,201,126,0.25); border-radius: 2px; }
        ::selection { background: rgba(232,201,126,0.18); color: #e8e2d9; }

        @media (pointer: fine) { body { cursor: none; } }
        @media (pointer: coarse) { .cursor-dot, .cursor-ring { display: none !important; } }

        .mobile-drawer {
          position: fixed; top: 70px; left: 0; right: 0;
          background: rgba(10,10,10,0.97); backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(232,201,126,0.08);
          z-index: 99; padding: 20px 6%;
          display: flex; flex-direction: column;
          transform: translateY(-10px); opacity: 0; pointer-events: none;
          transition: transform 0.25s ease, opacity 0.25s ease;
        }
        .mobile-drawer.open { transform: translateY(0); opacity: 1; pointer-events: all; }
        .drawer-item {
          font-family: 'DM Sans', sans-serif; font-size: 13px;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(232,226,217,0.5); padding: 15px 0;
          border-bottom: 1px solid rgba(232,201,126,0.05);
          cursor: pointer; transition: color 0.2s;
        }
        .drawer-item:last-child { border-bottom: none; }
        .drawer-item.active, .drawer-item:active { color: #e8c97e; }

        .hamburger { display: flex; flex-direction: column; gap: 5px; cursor: pointer; padding: 6px; background: none; border: none; }
        .hamburger span { display: block; width: 22px; height: 1.5px; background: #e8c97e; transition: all 0.25s ease; transform-origin: center; }
        .hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        .section-pad { padding: 100px 8%; }
        @media (max-width: 767px) { .section-pad { padding: 70px 6%; } }
        @media (max-width: 479px) { .section-pad { padding: 56px 5%; } }

        .hero-wrap { min-height: 100svh; display: flex; align-items: center; padding: 100px 8% 64px; position: relative; overflow: hidden; }
        @media (max-width: 767px) { .hero-wrap { padding: 96px 6% 52px; } }
        @media (max-width: 479px) { .hero-wrap { padding: 88px 5% 44px; align-items: flex-start; padding-top: 100px; } }

        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: start; }
        @media (max-width: 767px) { .about-grid { grid-template-columns: 1fr; gap: 48px; } }

        .achieve-row { display: flex; gap: 14px; margin-top: 34px; }
        @media (max-width: 479px) { .achieve-row { flex-direction: column; gap: 10px; } }

        .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 18px; }
        @media (max-width: 479px) { .projects-grid { grid-template-columns: 1fr; } }

        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; }
        @media (max-width: 767px) { .contact-grid { grid-template-columns: 1fr; gap: 48px; } }

        .site-footer { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; }
        @media (max-width: 479px) { .site-footer { flex-direction: column; align-items: flex-start; } }

        .hero-stats-side { position: absolute; right: 8%; bottom: 12%; display: flex; flex-direction: column; gap: 28px; }
        @media (max-width: 767px) { .hero-stats-side { display: none !important; } }

        .hero-stats-inline { display: none; margin-top: 44px; flex-wrap: wrap; gap: 28px; }
        @media (max-width: 767px) { .hero-stats-inline { display: flex !important; } }

        .divider { height: 1px; background: rgba(232,201,126,0.06); margin: 0 5%; }

        @media (hover: hover) {
          .project-card:hover { border-color: rgba(232,201,126,0.28) !important; transform: translateY(-4px); }
          .proj-link:hover { color: #e8c97e !important; }
          .btn-gold:hover { background: #f0e0a8 !important; }
          .btn-outline:hover { background: rgba(232,201,126,0.06) !important; }
        }
        .gold-input:focus { border-color: rgba(232,201,126,0.45) !important; outline: none; }
        .project-card { transition: border-color 0.3s, transform 0.3s; }
      `}</style>

      {/* Cursor */}
      <div className="cursor-dot" style={{ position: "fixed", width: 10, height: 10, background: gold, borderRadius: "50%", pointerEvents: "none", zIndex: 9999, transform: "translate(-50%,-50%)", left: cursorPos.x, top: cursorPos.y, mixBlendMode: "difference" }} />
      <div className="cursor-ring" style={{ position: "fixed", width: 34, height: 34, border: "1px solid rgba(232,201,126,0.35)", borderRadius: "50%", pointerEvents: "none", zIndex: 9998, transform: "translate(-50%,-50%)", transition: "left 0.1s ease, top 0.1s ease", left: cursorPos.x, top: cursorPos.y }} />

      <div style={{ background: "#0a0a0a", color: "#e8e2d9", fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", overflowX: "hidden" }}>

        {/* NAV */}
        <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 5%", height: 70, display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(10,10,10,0.9)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(232,201,126,0.06)" }}>
          <div onClick={() => scrollTo("home")} style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: gold, cursor: "pointer" }}>EI.</div>

          {!isMobile && (
            <ul style={{ display: "flex", gap: 40, listStyle: "none" }}>
              {navItems.map(item => (
                <li key={item} onClick={() => scrollTo(item)} style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: activeSection === item ? gold : textMuted, cursor: "pointer", transition: "color 0.2s", position: "relative", padding: "4px 0" }}>
                  {item}
                  {activeSection === item && <div style={{ position: "absolute", bottom: -2, left: 0, right: 0, height: 1, background: gold }} />}
                </li>
              ))}
            </ul>
          )}

          {isMobile && (
            <button className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
              <span /><span /><span />
            </button>
          )}
        </nav>

        {/* Mobile Drawer */}
        {isMobile && (
          <div className={`mobile-drawer ${menuOpen ? "open" : ""}`}>
            {navItems.map(item => (
              <div key={item} className={`drawer-item ${activeSection === item ? "active" : ""}`} onClick={() => scrollTo(item)}>{item}</div>
            ))}
          </div>
        )}

        {/* HERO */}
        <section id="home" className="hero-wrap">
          <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(232,201,126,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(232,201,126,0.03) 1px,transparent 1px)`, backgroundSize: "56px 56px", pointerEvents: "none" }} />
          <div style={{ position: "absolute", width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,201,126,0.055) 0%, transparent 70%)", top: "50%", left: "22%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 2, maxWidth: 680, width: "100%" }}>
            <div style={{ fontSize: 11, letterSpacing: "0.26em", textTransform: "uppercase", color: gold, marginBottom: 20, display: "flex", alignItems: "center", gap: 12, opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(16px)", transition: "all 0.8s ease 0.1s" }}>
              <span style={accentLine} /> Software Engineer
            </div>

            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(50px, 11vw, 108px)", fontWeight: 700, lineHeight: 0.95, letterSpacing: "-0.02em", marginBottom: 20, opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(26px)", transition: "all 0.8s ease 0.25s" }}>
              Endrit<br /><span style={{ color: gold }}>Ibraimi.</span>
            </h1>

            <p style={{ fontSize: "clamp(14px, 2vw, 16px)", lineHeight: 1.75, color: textMuted, maxWidth: 450, marginBottom: 36, opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(16px)", transition: "all 0.8s ease 0.4s" }}>
              SEEU student building full-stack web applications with Laravel, React, and Python. Based in Gostivar, reaching the world.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(16px)", transition: "all 0.8s ease 0.55s" }}>
              <button className="btn-gold" onClick={() => scrollTo("projects")} style={{ padding: "13px 26px", background: gold, color: "#0a0a0a", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", border: "none", cursor: "pointer", transition: "background 0.2s", whiteSpace: "nowrap" }}>
                View Projects
              </button>
              <button className="btn-outline" onClick={() => scrollTo("contact")} style={{ padding: "13px 26px", background: "transparent", color: gold, fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", border: `1px solid ${goldBorder}`, cursor: "pointer", transition: "background 0.2s", whiteSpace: "nowrap" }}>
                Get In Touch
              </button>
            </div>

            {/* Stats mobile (below buttons) */}
            <div className="hero-stats-inline" style={{ opacity: heroVisible ? 1 : 0, transition: "opacity 0.8s ease 0.7s" }}>
              {[["8.90", "GPA"], ["2×", "Hackathons"], ["1st", "JAMacedonia"]].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: gold, lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(232,226,217,0.36)", marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats desktop right */}
          <div className="hero-stats-side" style={{ opacity: heroVisible ? 1 : 0, transition: "opacity 0.8s ease 0.7s" }}>
            {[["8.90", "University GPA"], ["2×", "Hackathons"], ["1st", "JAMacedonia"]].map(([n, l]) => (
              <div key={l} style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, color: gold, lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(232,226,217,0.36)", marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* ABOUT */}
        <section id="about" className="section-pad">
          <FadeIn>
            <div style={{ fontSize: 11, letterSpacing: "0.26em", textTransform: "uppercase", color: gold, marginBottom: 14, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={accentLine} /> About Me
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 5vw, 56px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 52 }}>Who I Am</h2>
          </FadeIn>

          <div className="about-grid">
            <FadeIn delay={0.1}>
              {[
                "I'm a motivated Computer Science student at SEEU University with a genuine passion for building software that matters. With a GPA of 8.90 and a background in full-stack development, I've been coding, competing, and shipping since high school.",
                "I won 1st place at Junior Achievement Macedonia for a business idea competition, represented my high school on Alsat M TV, and participated in SEEUHack 2024 and JunctionXTirana 2025. Fluent in Albanian and English, conversational in German and Macedonian.",
                "My goal is to build a remote-first software engineering career with international teams, while staying connected to my local tech community in Macedonia."
              ].map((text, i) => (
                <p key={i} style={{ fontSize: 15, lineHeight: 1.85, color: textMuted, marginBottom: 18 }}>{text}</p>
              ))}
              <div className="achieve-row">
                {[
                  { icon: "🏆", title: "JAMacedonia", desc: "1st place, business idea" },
                  { icon: "⚡", title: "SEEUHack 2024", desc: "Hackathon finalist" },
                  { icon: "🌍", title: "JunctionX Tirana", desc: "International, 2025" },
                ].map(a => (
                  <div key={a.title} style={{ flex: 1, padding: "16px 18px", border: "1px solid rgba(232,201,126,0.1)", background: "rgba(232,201,126,0.02)" }}>
                    <div style={{ fontSize: 20, marginBottom: 8 }}>{a.icon}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: gold, marginBottom: 4 }}>{a.title}</div>
                    <div style={{ fontSize: 11, color: "rgba(232,226,217,0.4)", lineHeight: 1.5 }}>{a.desc}</div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              {SKILLS.map((skill, i) => (
                <div key={skill.name} style={{ marginBottom: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 13 }}>
                    <span style={{ color: "rgba(232,226,217,0.78)" }}>{skill.name}</span>
                    <span style={{ color: gold, fontFamily: "'Playfair Display', serif" }}>{skill.level}%</span>
                  </div>
                  <AnimatedBar level={skill.level} delay={i * 90} />
                </div>
              ))}
            </FadeIn>
          </div>
        </section>

        <div className="divider" />

        {/* PROJECTS */}
        <section id="projects" className="section-pad">
          <FadeIn>
            <div style={{ fontSize: 11, letterSpacing: "0.26em", textTransform: "uppercase", color: gold, marginBottom: 14, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={accentLine} /> Work
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 5vw, 56px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 52 }}>Selected Projects</h2>
          </FadeIn>

          <div className="projects-grid">
            {PROJECTS.map((project, i) => (
              <FadeIn key={project.title} delay={i * 0.1}>
                <div className="project-card" style={{ padding: "28px 24px", border: `1px solid ${goldFaint}`, background: "rgba(255,255,255,0.012)", position: "relative", overflow: "hidden", height: "100%" }}>
                  <div style={{ position: "absolute", top: 14, right: 18, fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 700, color: "rgba(232,201,126,0.05)", lineHeight: 1, pointerEvents: "none" }}>0{i + 1}</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, fontWeight: 700, marginBottom: 10, color: "#e8e2d9" }}>{project.title}</h3>
                  <p style={{ fontSize: 13, lineHeight: 1.7, color: "rgba(232,226,217,0.48)", marginBottom: 20 }}>{project.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 22 }}>
                    {project.stack.map(s => (
                      <span key={s} style={{ padding: "3px 10px", background: "rgba(232,201,126,0.06)", border: `1px solid ${goldBorder}`, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: gold }}>{s}</span>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 16 }}>
                    <a href={project.github} target="_blank" rel="noreferrer" className="proj-link" style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(232,226,217,0.45)", textDecoration: "none", transition: "color 0.2s" }}>↗ GitHub</a>
                    {project.live && <a href={project.live} target="_blank" rel="noreferrer" className="proj-link" style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(232,226,217,0.45)", textDecoration: "none", transition: "color 0.2s" }}>↗ Live Demo</a>}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* CONTACT */}
        <section id="contact" className="section-pad">
          <FadeIn>
            <div style={{ fontSize: 11, letterSpacing: "0.26em", textTransform: "uppercase", color: gold, marginBottom: 14, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={accentLine} /> Contact
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 5vw, 56px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 52 }}>Let's Work Together</h2>
          </FadeIn>

          <div className="contact-grid">
            <FadeIn delay={0.1}>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: textMuted, marginBottom: 34 }}>
                I'm open to freelance projects, part-time remote work, and internship opportunities.
                Fill out the form — it will open your email app with everything pre-filled, then just hit send.
              </p>
              {[
                { icon: "✉", text: "endrit.ibraimi04@gmail.com" },
                { icon: "📍", text: "Gostivar, North Macedonia" },
                { icon: "📞", text: "+389 71 274 200" },
              ].map(d => (
                <div key={d.text} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 34, height: 34, flexShrink: 0, border: "1px solid rgba(232,201,126,0.18)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>{d.icon}</div>
                  <span style={{ fontSize: 14, color: "rgba(232,226,217,0.65)", wordBreak: "break-word" }}>{d.text}</span>
                </div>
              ))}
            </FadeIn>

            <FadeIn delay={0.15}>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { label: "Your Name", type: "text", key: "name" },
                  { label: "Email Address", type: "email", key: "email" },
                ].map(field => (
                  <div key={field.key} style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    <label style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(232,226,217,0.36)" }}>{field.label}</label>
                    <input
                      type={field.type}
                      className="gold-input"
                      value={formData[field.key]}
                      onChange={e => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                      required
                      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(232,201,126,0.1)", padding: "13px 15px", color: "#e8e2d9", fontFamily: "'DM Sans', sans-serif", fontSize: 15, width: "100%", transition: "border-color 0.2s" }}
                    />
                  </div>
                ))}
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  <label style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(232,226,217,0.36)" }}>Message</label>
                  <textarea
                    className="gold-input"
                    value={formData.message}
                    onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    required
                    rows={5}
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(232,201,126,0.1)", padding: "13px 15px", color: "#e8e2d9", fontFamily: "'DM Sans', sans-serif", fontSize: 15, width: "100%", resize: "vertical", transition: "border-color 0.2s" }}
                  />
                </div>
                <button type="submit" disabled={formStatus === "sending" || formStatus === "success"} className="btn-gold" style={{ padding: "14px 28px", background: formStatus === "success" ? "rgba(232,201,126,0.4)" : gold, color: "#0a0a0a", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", border: "none", cursor: formStatus === "sending" ? "wait" : "pointer", transition: "background 0.2s", alignSelf: "flex-start", opacity: formStatus === "sending" ? 0.7 : 1 }}>
                  {formStatus === "sending" ? "Sending..." : formStatus === "success" ? "✓ Message Sent" : "Send Message →"}
                </button>
                {formStatus === "success" && (
                  <div style={{ marginTop: 4, fontSize: 13, color: "rgba(232,201,126,0.8)", paddingLeft: 2 }}>
                    Got it! I'll get back to you soon.
                  </div>
                )}
                {formStatus === "error" && (
                  <div style={{ marginTop: 4, fontSize: 13, color: "rgba(255,100,100,0.8)", paddingLeft: 2 }}>
                    Something went wrong. Try emailing me directly at endrit.ibraimi04@gmail.com
                  </div>
                )}
              </form>
            </FadeIn>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="site-footer" style={{ padding: "30px 8%", borderTop: "1px solid rgba(232,201,126,0.06)" }}>
          <div style={{ fontSize: 12, color: "rgba(232,226,217,0.28)", letterSpacing: "0.04em" }}>© 2026 Endrit Ibraimi. All rights reserved.</div>
          <div style={{ fontSize: 12, color: "rgba(232,226,217,0.28)", letterSpacing: "0.04em" }}>Gostivar, North Macedonia</div>
        </footer>

      </div>
    </>
  );
}