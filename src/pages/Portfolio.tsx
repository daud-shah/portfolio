import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// --- DATA ---
const personalInfo = {
  name: "Daud Shah",
  tagline: "Transforming Visual Data into Intelligent Decisions with Computer Vision AI",
  email: "sdaud4214@gmail.com",
  github: "https://github.com/daud-shah",
  linkedin: "https://www.linkedin.com/in/daud-shah40",
  location: "Islamabad, Pakistan",
};

const stats = [
  { value: 2, suffix: "+", label: "Years Experience" },
  { value: 3, suffix: "", label: "Companies" },
  { value: 15, suffix: "+", label: "Projects Built" },
  { value: 2, suffix: "", label: "Freelance Platforms" },
];

const skills = {
  "Computer Vision": ["Object Detection", "Object Segmentation", "Object Tracking", "YOLO Models", "OpenCV", "MediaPipe", "Roboflow", "PaddleOCR", "Tumor Segmentation", "Multimodal Diagnosis", "X-ray Analysis", "ByteTrack", "Motion Analysis"],
  "Deep Learning": ["PyTorch", "CNNs", "Vision Transformers (ViT)", "Bio_ClinicalBERT"],
  "NLP / LLM": ["RAG Pipelines", "Ollama", "Fake News Detection"],
  "Languages & Tools": ["Python", "C++", "JavaScript", "Kaggle (P100/T4)", "RunPod (RTX 4090)"],
};

const experiences = [
  {
    role: "Computer Vision Engineer",
    company: "CCRIPT Agency",
    location: "Islamabad, Pakistan",
    period: "Jan 2026 – Present",
    description: "Developing advanced computer vision models and pipelines for various client projects, focusing on robust object detection and custom AI solutions.",
  },
  {
    role: "Computer Vision Engineer",
    company: "Neuralogic",
    location: "Texas, USA (Remote)",
    period: "Jan 2026 – Present",
    description: "Working remotely to architect and deploy state-of-the-art vision models. Integrating deep learning features into scalable remote infrastructure.",
  },
  {
    role: "AI & Computer Vision Engineer Intern",
    company: "NCAI UET Peshawar",
    location: "Peshawar, Pakistan",
    period: "Nov 2024 – Jan 2026",
    description: "Contributed to object detection, segmentation, and Roboflow-based pipelines. Gained hands-on experience training large-scale vision models on high-performance compute clusters.",
  },
];

const education = [
  {
    degree: "BS Computer Science",
    school: "University of Agriculture, Peshawar",
    period: "Nov 2022 – Nov 2026 (Final Year)",
  }
];

const projects = [
  {
    title: "Explainable Multimodal Medical Diagnosis",
    category: "Medical AI",
    description: "Research-level multimodal AI system combining vision transformers and BERT for explainable X-ray diagnosis with Grad-CAM visualizations.",
    tags: ["ViT", "BERT", "Grad-CAM", "PyTorch"],
    link: "https://github.com/daud-shah/Explainable-Multimodal-Medical-Diagnosis-using-IU-X-Ray-",
  },
  {
    title: "Breast Ultrasound Tumor Segmentation",
    category: "Medical AI",
    description: "Full pipeline for automated tumor segmentation in breast ultrasound images using YOLOv8 with a large clinical dataset.",
    tags: ["YOLOv8", "Jupyter", "Segmentation"],
    link: "https://github.com/daud-shah/Breast_Ultrasound_Tumor_Segmentation_yolov8-model-full-project",
  },
  {
    title: "Construction Safety Monitoring",
    category: "Safety & Surveillance",
    description: "Real-world safety monitoring system detecting PPE compliance (helmets, vests) and safety violations on construction sites in real-time.",
    tags: ["YOLOv8", "Real-time Detection", "Computer Vision"],
    link: "https://github.com/daud-shah/construction-safety-monitoring-using-yolov8",
  },
  {
    title: "Aircraft Detection & Tracking",
    category: "Detection & Tracking",
    description: "Aerial object detection and real-time tracking system for aircraft using advanced computer vision techniques.",
    tags: ["Python", "Object Tracking", "ByteTrack"],
    link: "https://github.com/daud-shah/Aircraft-detection-and-tracking",
  },
  {
    title: "Pakistani License Plate Detection",
    category: "Detection & Tracking",
    description: "License plate detection specifically trained on Pakistani plates with a custom annotated dataset for real-world use.",
    tags: ["YOLO", "Custom Dataset", "OpenCV"],
    link: "https://github.com/daud-shah/pakistani-license-plate-detection",
  },
  {
    title: "Padel Match Player Tracking",
    category: "Detection & Tracking",
    description: "Real-time player detection, tracking, and motion analysis for Padel matches — extracting performance metrics and heatmaps from live video.",
    tags: ["YOLO", "ByteTrack", "Motion Analysis", "Jupyter"],
    link: "https://github.com/daud-shah/Padel-Match-Player-Detection-Tracking-Motion-Analysis",
  },
];

const navLinks = ["About", "Experience", "Skills", "Projects", "Contact"];

// --- CUSTOM HOOKS ---

// Typewriter effect
function useTypewriter(words: string[], typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000) {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % words.length;
      const fullText = words[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, words, typingSpeed, deletingSpeed, pauseTime]);

  return text;
}

// Number Counter effect
function AnimatedCounter({ end, duration = 2000 }: { end: number, duration?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count}</span>;
}

// Fade in section
function FadeInSection({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`${className} transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// --- MAIN COMPONENT ---
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const lastScrollY = useRef(0);
  
  const typewriterText = useTypewriter(["Computer Vision Engineer", "AI/ML Developer", "Active Freelancer"]);

  // Scroll logic for navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      setShowScrollTop(currentScrollY > 400);
      
      if (currentScrollY > lastScrollY.current + 10) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY.current - 10) {
        setScrollDirection("up");
      }
      lastScrollY.current = currentScrollY;

      // Update active section
      const sections = navLinks.map((n) => document.getElementById(n.toLowerCase()));
      const scrollPos = currentScrollY + 150;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(navLinks[i]);
          break;
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden dark">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] animate-float"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-[120px] animate-float-delayed"></div>
      </div>

      {/* Navbar */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-border/50
        ${scrolled ? "bg-background/80 backdrop-blur-xl shadow-lg" : "bg-transparent border-transparent"}
        ${scrollDirection === "down" && scrolled ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          <span className="font-bold text-2xl tracking-tighter cursor-pointer" onClick={() => scrollTo("About")}>
            <span className="text-foreground">Daud</span><span className="text-primary">.</span>
          </span>
          <nav className="hidden md:flex items-center gap-2 bg-card/50 backdrop-blur-md px-2 py-1.5 rounded-full border border-border/50">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeSection === link
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {link}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Open menu"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-[300px] border-b border-border/50 bg-background/95 backdrop-blur-xl" : "max-h-0"}`}>
          <div className="px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className={`px-4 py-3 rounded-xl text-base font-medium text-left transition-colors ${
                  activeSection === link
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section id="about" className="min-h-screen flex items-center pt-24 pb-12 relative overflow-hidden">
          {/* Animated dot grid */}
          <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none"></div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
            <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
              
              {/* Text Content */}
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 fade-in-up delay-100">
                  Hi, I'm <br className="hidden lg:block"/>
                  <span className="gradient-text">{personalInfo.name}</span>
                </h1>
                
                <div className="h-10 sm:h-12 mb-6 fade-in-up delay-200">
                  <p className="text-xl sm:text-2xl lg:text-3xl text-foreground font-semibold flex items-center justify-center lg:justify-start">
                    I am a <span className="text-secondary ml-2">{typewriterText}</span>
                    <span className="w-1 bg-secondary h-8 ml-1 cursor-blink inline-block"></span>
                  </p>
                </div>
                
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-10 fade-in-up delay-300">
                  {personalInfo.tagline}. Specializing in deep learning, object detection, and multimodal AI systems.
                </p>
                
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 fade-in-up delay-400">
                  <Button onClick={() => scrollTo("Projects")} size="lg" className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-base shadow-lg shadow-primary/20 transition-all hover:-translate-y-1">
                    View Projects
                  </Button>
                  <Button onClick={() => window.open(personalInfo.github, '_blank')} variant="outline" size="lg" className="h-14 px-8 rounded-full border-border/60 hover:bg-muted text-base transition-all hover:-translate-y-1 bg-card/50 backdrop-blur-sm">
                    GitHub
                  </Button>
                </div>

                {/* Social Links */}
                <div className="mt-12 flex items-center justify-center lg:justify-start gap-5 fade-in-up delay-400">
                  {[
                    { url: personalInfo.github, icon: "M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" },
                    { url: personalInfo.linkedin, icon: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" },
                    { url: `mailto:${personalInfo.email}`, icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" }
                  ].map((link, idx) => (
                    <a key={idx} href={link.url} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-border/60 bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={link.icon} /></svg>
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Profile Image with Animations */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 flex-shrink-0 fade-in-up">
                {/* Outer pulsing ping ring */}
                <div className="absolute inset-[-15%] rounded-full border border-primary/30 animate-ping-slow pointer-events-none"></div>
                {/* Ambient glow */}
                <div className="absolute inset-[-10%] rounded-full bg-gradient-to-tr from-primary/30 to-secondary/30 blur-2xl animate-spin-slow"></div>
                {/* Spinning arc border */}
                <div className="absolute inset-0 rounded-full border-2 border-primary/20 border-t-primary/80 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '20s' }}></div>
                {/* 2nd counter-ring */}
                <div className="absolute inset-[-5%] rounded-full border border-dashed border-secondary/20 animate-spin-slow" style={{ animationDuration: '30s' }}></div>
                {/* Photo */}
                <div className="absolute inset-2 rounded-full overflow-hidden bg-card border border-border">
                  <img src="/profile2.png" alt="Daud Shah" className="w-full h-full object-cover object-center scale-105" />
                </div>
                {/* Floating badges — 4 around the circle */}
                <div className="absolute top-10 -left-6 bg-card border border-border p-3 rounded-2xl shadow-xl animate-float">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 font-mono">CV / AI</Badge>
                </div>
                <div className="absolute bottom-10 -right-6 bg-card border border-border p-3 rounded-2xl shadow-xl animate-float-delayed">
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20 font-mono">PyTorch</Badge>
                </div>
                <div className="absolute top-10 -right-8 bg-card border border-border p-3 rounded-2xl shadow-xl animate-float-slow">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 font-mono">YOLO</Badge>
                </div>
                <div className="absolute bottom-10 -left-8 bg-card border border-border p-3 rounded-2xl shadow-xl animate-float-slower">
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20 font-mono">OpenCV</Badge>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Section divider */}
        <div className="relative flex items-center justify-center py-0">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
          <div className="absolute w-2.5 h-2.5 rotate-45 bg-primary/60 shadow-[0_0_8px_rgba(249,115,22,0.6)]"></div>
        </div>

        {/* Stats Section */}
        <section className="py-12 border-y border-border/50 bg-card/20 relative z-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10">
              {[
                { ...stats[0], icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
                { ...stats[1], icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
                { ...stats[2], icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" },
                { ...stats[3], icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
              ].map((stat, idx) => (
                <FadeInSection key={idx} delay={idx * 100} className="text-center group">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                    </svg>
                  </div>
                  <h3 className="text-4xl sm:text-5xl font-bold text-foreground mb-2 flex items-center justify-center">
                    <AnimatedCounter end={stat.value} />
                    <span className="text-primary">{stat.suffix}</span>
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</p>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>

        {/* Section divider */}
        <div className="relative flex items-center justify-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent"></div>
          <div className="absolute w-2.5 h-2.5 rotate-45 bg-secondary/60 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
        </div>

        {/* Experience Section */}
        <section id="experience" className="py-24 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInSection>
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4 text-primary border-primary/30">Career Journey</Badge>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Work & Education</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
              </div>
            </FadeInSection>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[15px] sm:left-[27px] top-4 bottom-4 w-px bg-gradient-to-b from-primary via-secondary/50 to-transparent"></div>

              <div className="space-y-12">
                {experiences.map((exp, idx) => (
                  <FadeInSection key={idx} delay={idx * 150} className="relative pl-12 sm:pl-20">
                    {/* Timeline dot */}
                    <div className="absolute left-0 sm:left-3 top-1.5 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.4)]">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                    </div>
                    
                    <Card className="bg-card/40 border-border/50 hover:border-primary/30 transition-colors backdrop-blur-sm overflow-hidden group">
                      <div className="absolute top-0 left-0 w-1 h-full bg-primary/50 group-hover:bg-primary transition-colors"></div>
                      <CardContent className="p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-foreground mb-1">{exp.role}</h3>
                            <div className="flex flex-wrap items-center gap-2 text-primary font-medium">
                              <span>{exp.company}</span>
                              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 hidden sm:block"></span>
                              <span className="text-muted-foreground text-sm font-normal">{exp.location}</span>
                            </div>
                          </div>
                          <Badge variant="secondary" className="w-fit bg-secondary/10 text-secondary hover:bg-secondary/20 border-0">
                            {exp.period}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                      </CardContent>
                    </Card>
                  </FadeInSection>
                ))}

                {/* Education */}
                {education.map((edu, idx) => (
                  <FadeInSection key={`edu-${idx}`} delay={100} className="relative pl-12 sm:pl-20">
                    <div className="absolute left-0 sm:left-3 top-1.5 w-8 h-8 rounded-full bg-background border-2 border-secondary flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-secondary">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
                      </svg>
                    </div>
                    
                    <Card className="bg-card/40 border-border/50 hover:border-secondary/30 transition-colors backdrop-blur-sm overflow-hidden group">
                      <div className="absolute top-0 left-0 w-1 h-full bg-secondary/50 group-hover:bg-secondary transition-colors"></div>
                      <CardContent className="p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div>
                            <h3 className="text-xl font-bold text-foreground mb-1">{edu.degree}</h3>
                            <p className="text-secondary font-medium text-sm">{edu.school}</p>
                          </div>
                          <Badge variant="outline" className="w-fit border-border/80 text-muted-foreground">
                            {edu.period}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </FadeInSection>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section divider */}
        <div className="relative flex items-center justify-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
          <div className="absolute w-2.5 h-2.5 rotate-45 bg-primary/60 shadow-[0_0_8px_rgba(249,115,22,0.6)]"></div>
        </div>

        {/* Skills Section */}
        <section id="skills" className="py-24 bg-card/20 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background/0 to-background/0 pointer-events-none"></div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <FadeInSection>
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4 text-primary border-primary/30">My Arsenal</Badge>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Technical Skills</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
              </div>
            </FadeInSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(skills).map(([category, items], idx) => (
                <FadeInSection key={category} delay={idx * 100}>
                  <Card className="h-full bg-background border-border/50 hover:border-primary/40 transition-colors duration-300">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        {category}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {items.map((skill) => (
                          <Badge key={skill} variant="secondary" className="px-3 py-1.5 bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors text-xs font-medium border border-border/50">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>

        {/* Section divider */}
        <div className="relative flex items-center justify-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent"></div>
          <div className="absolute w-2.5 h-2.5 rotate-45 bg-secondary/60 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
        </div>

        {/* Projects Section */}
        <section id="projects" className="py-24 relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInSection>
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4 text-primary border-primary/30">Portfolio</Badge>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Featured Projects</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6"></div>
                <p className="text-muted-foreground max-w-2xl mx-auto">A selection of my best work in Computer Vision, Medical AI, and Deep Learning.</p>
              </div>
            </FadeInSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {projects.map((project, idx) => (
                <FadeInSection key={project.title} delay={idx * 100}>
                  <Card className="group h-full bg-card/30 border-border/50 overflow-hidden glow-on-hover flex flex-col relative">
                    {/* Faded project number */}
                    <span className="absolute top-3 right-4 text-7xl font-black text-foreground/[0.04] select-none pointer-events-none leading-none z-0">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="p-6 flex-1 flex flex-col relative z-10">
                      <div className="flex justify-between items-start mb-6">
                        <Badge variant="outline" className="bg-secondary/5 text-secondary border-secondary/20">
                          {project.category}
                        </Badge>
                        <a href={project.link} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors z-20">
                          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">{project.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.tags.map((tag) => (
                          <span key={tag} className="text-xs font-medium text-foreground/70 bg-background px-2.5 py-1 rounded-md border border-border/50">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    {/* Hover gradient background effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Card>
                </FadeInSection>
              ))}
            </div>
            
            <FadeInSection delay={400} className="mt-16 text-center">
              <Button onClick={() => window.open(personalInfo.github, '_blank')} variant="outline" size="lg" className="rounded-full border-border/80 hover:bg-card px-8 group">
                View more on GitHub
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="ml-2 group-hover:translate-x-1 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </FadeInSection>
          </div>
        </section>

        {/* Section divider */}
        <div className="relative flex items-center justify-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
          <div className="absolute w-2.5 h-2.5 rotate-45 bg-primary/60 shadow-[0_0_8px_rgba(249,115,22,0.6)]"></div>
        </div>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-card/20 relative overflow-hidden">
          {/* Animated sweep lines */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="sweep-line-1 absolute top-1/4 left-0 w-full h-px bg-primary/5 -translate-x-full"></div>
            <div className="sweep-line-2 absolute top-1/2 left-0 w-full h-px bg-secondary/5 -translate-x-full"></div>
            <div className="sweep-line-3 absolute top-3/4 left-0 w-full h-px bg-primary/5 -translate-x-full"></div>
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <FadeInSection>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">Let's <span className="gradient-text">Connect</span></h2>
              <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                Have a project in mind or want to collaborate on AI research? Let's connect and build something incredible.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
                <a href={`mailto:${personalInfo.email}`} className="w-full sm:w-auto flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full font-medium transition-all hover:-translate-y-1 shadow-lg shadow-primary/20">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Say Hello
                </a>
                <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-3 bg-card hover:bg-muted text-foreground border border-border/80 px-8 py-4 rounded-full font-medium transition-all hover:-translate-y-1">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                  </svg>
                  Connect on LinkedIn
                </a>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
                {[
                  { label: "Location", value: personalInfo.location, icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" },
                  { label: "Email", value: personalInfo.email, icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
                ].map((item, idx) => (
                  <div key={idx} className="bg-background border border-border/50 rounded-2xl p-6 flex flex-col items-center gap-3 hover:border-primary/30 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2">
                      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
                    <span className="font-semibold text-foreground text-center break-all">{item.value}</span>
                  </div>
                ))}
              </div>
            </FadeInSection>
          </div>
        </section>
      </main>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-primary shadow-lg shadow-primary/40 text-white flex items-center justify-center hover:bg-primary/90 hover:-translate-y-1 transition-all duration-300 fade-in-btn"
          aria-label="Back to top"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}

      {/* Footer */}
      <footer className="py-8 border-t border-border/50 bg-background relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <button onClick={() => scrollTo("About")} className="hover:text-primary transition-colors">Home</button>
            <button onClick={() => scrollTo("Projects")} className="hover:text-primary transition-colors">Projects</button>
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
