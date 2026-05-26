"use client";

import Image from "next/image";
import { FormEvent, MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import ContactForm from "./ContactForm";

type Theme = "cyber" | "midnight" | "light";
type Filter = "all" | "frontend" | "backend" | "java";

type Skill = {
  icon: string;
  title: string;
  values: string[];
};

type Project = {
  id: string;
  title: string;
  category: string;
  techLabel: string;
  techClass?: string;
  description: string;
  detail: string;
  tags: string[];
  featured?: boolean;
};

const themes: Theme[] = ["cyber", "midnight", "light"];

const skills: Skill[] = [
  { icon: "</>", title: "Frontend", values: ["JavaScript", "TypeScript", "Bootstrap", "Tailwind CSS", "React.js", "Angular.js"] },
  { icon: "{ }", title: "Backend", values: ["PHP", "Laravel", "Node.js", "Express.js", "Django", "Nest.js", "ASP.NET Core", "Java EE"] },
  { icon: "DB", title: "Bases de données", values: ["MySQL", "PL/SQL", "SQL Server", "Oracle", "MongoDB"] },
  { icon: "OS", title: "Systèmes", values: ["Linux", "RedHat"] },
  { icon: "++", title: "Programmation avancée", values: ["C++", "Java", "Python"] }
];

const projects: Project[] = [
  {
    id: "gpec",
    title: "Application Web pour la GPEC",
    category: "backend web",
    techLabel: "GPEC",
    description: "Solution de gestion prévisionnelle des emplois et des compétences pour la Coopérative Agricole COPAG.",
    detail: "Application web de Gestion Prévisionnelle des Emplois et des Compétences réalisée pour la Coopérative Agricole COPAG.",
    tags: ["Application Web", "GPEC", "COPAG"],
    featured: true
  },
  {
    id: "employee",
    title: "Employee Management System",
    category: "frontend web",
    techLabel: "REACT",
    techClass: "react",
    description: "Interface de gestion des employés réalisée avec React.js.",
    detail: "Système de gestion d'employés organisé autour d'une interface React.js moderne et modulaire.",
    tags: ["React.js", "Frontend"]
  },
  {
    id: "devoirs",
    title: "Gestion des devoirs",
    category: "backend web",
    techLabel: "LARAVEL",
    techClass: "laravel",
    description: "Application web pour organiser et suivre les devoirs.",
    detail: "Application permettant de structurer la gestion et le suivi des devoirs avec le framework Laravel.",
    tags: ["Laravel", "PHP"]
  },
  {
    id: "courses",
    title: "Plateforme de cours en ligne",
    category: "frontend web",
    techLabel: "WEB",
    techClass: "web",
    description: "Plateforme pédagogique interactive accessible via navigateur.",
    detail: "Plateforme de cours en ligne construite avec les technologies web fondamentales pour une navigation interactive.",
    tags: ["HTML", "CSS", "JavaScript"]
  },
  {
    id: "commerce",
    title: "Application E-Commerce",
    category: "frontend web",
    techLabel: "NEXT",
    techClass: "next",
    description: "Expérience d'achat web construite avec Next.js.",
    detail: "Application e-commerce développée avec Next.js, orientée navigation produit et expérience utilisateur.",
    tags: ["Next.js", "Web"]
  },
  {
    id: "hotel",
    title: "Hotel Booking",
    category: "frontend web",
    techLabel: "REACT",
    techClass: "react",
    description: "Application de réservation hôtelière moderne et réactive.",
    detail: "Application de réservation d'hôtels réalisée avec React.js pour explorer les parcours de booking.",
    tags: ["React.js", "Réservation"]
  },
  {
    id: "rh",
    title: "Gestion des ressources humaines",
    category: "java",
    techLabel: "JAVA",
    techClass: "java",
    description: "Application de gestion RH développée en Java.",
    detail: "Application de gestion des ressources humaines développée en Java.",
    tags: ["Java", "Gestion RH"]
  },
  {
    id: "conferences",
    title: "Gestion des conférences",
    category: "backend web",
    techLabel: "DJANGO",
    techClass: "django",
    description: "Système web d'organisation et de suivi des conférences.",
    detail: "Système de gestion de conférences développé avec Django pour organiser les informations d'événements.",
    tags: ["Django", "Python"]
  }
];

const formations = [
  { period: "2024 - 2027", title: "Ingénierie Informatique et Réseaux", institution: "EMSI Rabat - Rabat" },
  { period: "2022 - 2024", title: "Années préparatoires en ingénierie", institution: "Informatique, industrielle et automatisme - EMSI Rabat" },
  { period: "2021 - 2022", title: "Baccalauréat en Sciences Physiques et Chimiques", institution: "Lycée Missour Mixte - Missour" }
];

const certifications = [
  { date: "16 AVRIL 2025", title: "Software Engineering: Software Design and Project Management", issuer: "The Hong Kong University of Science and Technology" },
  { date: "16 AVRIL 2025", title: "Python for Data Science, AI & Development", issuer: "IBM" },
  { date: "01 DÉCEMBRE 2024", title: "Interactivity with JavaScript", issuer: "University of Michigan" },
  { date: "09 DÉCEMBRE 2024", title: "Introduction à la programmation orientée objet en C++", issuer: "École Polytechnique Fédérale de Lausanne" },
  { date: "06 DÉCEMBRE 2024", title: "The Unix Workbench", issuer: "Johns Hopkins University" }
];

const sectionLinks = [
  { id: "home", label: "Accueil" },
  { id: "about", label: "Profil" },
  { id: "skills", label: "Compétences" },
  { id: "projects", label: "Projets" },
  { id: "education", label: "Formations" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" }
];

function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }
    const interval = window.setInterval(() => {
      setProgress((value) => {
        const next = Math.min(100, value + Math.ceil(Math.random() * 15));
        if (next === 100) {
          window.clearInterval(interval);
          window.setTimeout(() => setDone(true), 230);
        }
        return next;
      });
    }, 75);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section id="loader" className={`loader${done ? " done" : ""}`} aria-label="Chargement de l'interface">
      <div className="loader-core">
        <div className="boot-lines" aria-live="polite">
          <span>&gt; INITIALIZING PORTFOLIO</span>
          <span>&gt; LOADING EMSI PROFILE</span>
          <span>&gt; READY TO CONNECT</span>
        </div>
        <div className="loader-brand"><span>M</span> MED//PORTFOLIO</div>
        <div className="loader-track"><i style={{ width: `${progress}%` }} /></div>
        <div className="loader-meta"><span>BOOT SEQUENCE</span><output>{String(progress).padStart(2, "0")}%</output></div>
      </div>
    </section>
  );
}

function useVisualEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, { threshold: 0.13 });
    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        document.querySelectorAll(".dock a, .nav a").forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: "-40% 0px -47%" });
    document.querySelectorAll("main > section[id]").forEach((section) => sectionObserver.observe(section));

    const updateProgress = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const value = height ? (window.scrollY / height) * 100 : 0;
      document.documentElement.style.setProperty("--progress", `${value}%`);
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    type Particle = { x: number; y: number; size: number; speed: number };
    let particles: Particle[] = [];
    let frame = 0;

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles = Array.from({ length: Math.min(58, Math.floor(window.innerWidth / 23)) }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 1.5 + 0.4,
        speed: Math.random() * 0.2 + 0.05
      }));
    };
    const draw = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      context.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--cyan");
      particles.forEach((particle) => {
        particle.y -= particle.speed;
        if (particle.y < -4) particle.y = window.innerHeight + 4;
        context.globalAlpha = 0.15 + particle.size / 5;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
      });
      frame = window.requestAnimationFrame(draw);
    };
    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const cursor = document.getElementById("cursor");
    const dot = document.getElementById("cursor-dot");
    const spotlight = document.getElementById("spotlight");
    const handleMove = (event: globalThis.MouseEvent) => {
      document.body.classList.add("cursor-active");
      if (dot) {
        dot.style.left = `${event.clientX}px`;
        dot.style.top = `${event.clientY}px`;
      }
      cursor?.animate({ left: `${event.clientX}px`, top: `${event.clientY}px` }, { duration: 260, fill: "forwards" });
      spotlight?.style.setProperty("--x", `${event.clientX}px`);
      spotlight?.style.setProperty("--y", `${event.clientY}px`);
    };
    document.addEventListener("mousemove", handleMove);
    return () => document.removeEventListener("mousemove", handleMove);
  }, []);

  return canvasRef;
}

function Header({ theme, cycleTheme, setPaletteOpen }: { theme: Theme; cycleTheme: () => void; setPaletteOpen: (value: boolean) => void }) {
  return (
    <header className="header glass">
      <a className="brand" href="#home" aria-label="Mohamed El-Ghazoui, retour accueil">
        <span className="brand-mark">M</span><span>MED.DEV</span>
      </a>
      <nav className="nav" aria-label="Navigation principale">
        {sectionLinks.slice(1).filter((link) => link.id !== "certifications").map((link) => (
          <a key={link.id} href={`#${link.id}`}>{link.label}</a>
        ))}
      </nav>
      <div className="controls">
        <button id="theme-toggle" className="pill-button" aria-label="Changer le thème" onClick={cycleTheme}>{theme.toUpperCase()}</button>
        <button id="command-open" className="command-button" aria-label="Ouvrir la palette de commandes" onClick={() => setPaletteOpen(true)}>
          <span>Ctrl</span>K
        </button>
      </div>
    </header>
  );
}

export default function Portfolio() {
  const [theme, setTheme] = useState<Theme>("cyber");
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState("");
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLines, setTerminalLines] = useState<string[]>(["Portfolio CLI - tapez help pour découvrir les commandes."]);
  const canvasRef = useVisualEffects();

  useEffect(() => {
    const saved = window.localStorage.getItem("med-theme") as Theme | null;
    if (saved && themes.includes(saved)) setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("med-theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((value) => !value);
      }
      if (event.key === "Escape") {
        setPaletteOpen(false);
        setActiveProject(null);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const visibleProjects = useMemo(() => projects.filter((project) => {
    const matchesFilter = filter === "all" || project.category.includes(filter);
    const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase().trim());
    return matchesFilter && matchesSearch;
  }), [filter, search]);

  const commandItems = [
    { action: "projects", title: "Voir les projets", key: "P" },
    { action: "education", title: "Voir les formations", key: "F" },
    { action: "certifications", title: "Voir les certifications", key: "C" },
    { action: "contact", title: "Me contacter", key: "M" },
    { action: "theme", title: "Changer de thème", key: "T" },
    { action: "terminal", title: "Ouvrir le terminal", key: ">_" }
  ].filter((command) => command.title.toLowerCase().includes(commandQuery.toLowerCase()));

  function cycleTheme() {
    setTheme(themes[(themes.indexOf(theme) + 1) % themes.length]);
  }

  function runCommand(action: string) {
    setPaletteOpen(false);
    setCommandQuery("");
    if (action === "theme") cycleTheme();
    else if (action === "terminal") setTerminalOpen(true);
    else document.getElementById(action)?.scrollIntoView({ behavior: "smooth" });
  }

  function submitTerminal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const command = terminalInput.trim().toLowerCase();
    const results: Record<string, string> = {
      help: "Commandes : about, skills, projects, education, contact, clear",
      about: "MOHAMED EL-GHAZOUI - Étudiant ingénieur en Informatique et Réseaux à l'EMSI Rabat.",
      skills: "JavaScript / React.js / Laravel / Django / Java / Python / Bases de données / Linux",
      projects: "Ouverture de la section projets...",
      education: "Parcours EMSI Rabat : années préparatoires (2022-2024), cycle ingénieur (2024-2027).",
      contact: "elghazoui.md@gmail.com | +212 6 82 44 49 21"
    };
    if (command === "clear") setTerminalLines([]);
    else setTerminalLines((lines) => [...lines, `visitor@med:~$ ${command}`, results[command] ?? `Commande inconnue : ${command}. Tapez help.`]);
    if (["projects", "education", "contact"].includes(command)) document.getElementById(command)?.scrollIntoView({ behavior: "smooth" });
    setTerminalInput("");
  }

  return (
    <>
      <Loader />
      <div className="noise" aria-hidden="true" />
      <canvas ref={canvasRef} id="particle-canvas" aria-hidden="true" />
      <div className="grid-floor" aria-hidden="true" />
      <div className="orb orb-one" aria-hidden="true" />
      <div className="orb orb-two" aria-hidden="true" />
      <div id="spotlight" className="spotlight" aria-hidden="true" />
      <div id="cursor" className="cursor" aria-hidden="true" />
      <div id="cursor-dot" className="cursor-dot" aria-hidden="true" />
      <div id="progress" className="scroll-progress" aria-hidden="true" />
      <a className="skip-link" href="#main">Aller au contenu</a>

      <Header theme={theme} cycleTheme={cycleTheme} setPaletteOpen={setPaletteOpen} />
      <aside className="dock glass" aria-label="Sections rapides">
        {sectionLinks.map((link, index) => (
          <a key={link.id} href={`#${link.id}`} className={index === 0 ? "active" : ""} aria-label={link.label}><span /></a>
        ))}
      </aside>

      <main id="main">
        <section id="home" className="hero section">
          <div className="hero-content reveal">
            <div className="availability"><i /><span>Étudiant ingénieur à l&apos;EMSI Rabat</span></div>
            <p className="eyebrow">INFORMATIQUE / RÉSEAUX / DÉVELOPPEMENT WEB</p>
            <h1 className="profile-name">MOHAMED<br /><span className="gradient-text">EL-GHAZOUI</span></h1>
            <p className="hero-role">Étudiant ingénieur en Informatique et Réseaux</p>
            <p className="hero-copy">
              Passionné par les sciences et les technologies, je développe des solutions web et logicielles
              en mobilisant mes compétences en informatique, réseaux et résolution de problèmes complexes.
            </p>
            <div className="hero-actions">
              <a className="cta magnetic" href="#projects">Voir mes projets</a>
              <a className="cta secondary magnetic" href="#contact">Me contacter</a>
              <a className="cta secondary magnetic" href="/assets/CV-EL-GHAZOUI-Mohamed.pdf" download>Télécharger CV</a>
            </div>
            <div className="socials" aria-label="Contacts professionnels">
              <a href="mailto:elghazoui.md@gmail.com">Email</a>
              <a href="https://www.linkedin.com/in/mohamed-el-ghazoui" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://github.com/Med-EL-GHAZOUI" target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </div>
          <div className="hero-visual reveal">
            <div className="avatar-shell portrait-shell glass">
              <div className="scanline" />
              <Image className="profile-photo" src="/assets/mohamed-el-ghazoui.jpeg" alt="Portrait de Mohamed El-Ghazoui" fill priority sizes="(max-width: 720px) 90vw, 390px" />
              <div className="identity"><strong>MOHAMED EL-GHAZOUI</strong><span>EMSI Rabat / Maroc</span></div>
            </div>
            <div className="hud-card glass hud-top"><span>PARCOURS</span><strong>INGÉNIEUR</strong></div>
            <div className="hud-card glass hud-bottom"><span>PROMOTION</span><strong>2027</strong><div className="mini-wave" /></div>
          </div>
          <div className="scroll-hint"><span>DÉCOUVRIR LE PROFIL</span><i /></div>
        </section>

        <section id="about" className="section">
          <div className="section-heading reveal">
            <p className="eyebrow">01 / À PROPOS</p>
            <h2>Un parcours d&apos;ingénieur tourné vers les technologies.</h2>
            <p>Étudiant en deuxième année du cycle ingénieur à l&apos;École Marocaine des Sciences de l&apos;Ingénieur, EMSI Rabat, je consolide un profil polyvalent en informatique, réseaux et développement web.</p>
          </div>
          <div className="profile-grid">
            <article className="profile-card glass reveal">
              <span className="label">PROFIL ACADÉMIQUE</span>
              <h3>EMSI Rabat</h3><p>Ingénierie Informatique et Réseaux</p>
              <div className="profile-lines">
                <span><small>Niveau</small>2e année du cycle ingénieur</span>
                <span><small>Parcours</small>2024 - 2027</span>
                <span><small>Localisation</small>Rabat, Maroc</span>
              </div>
            </article>
            <article className="profile-card glass reveal">
              <span className="label">OBJECTIF</span>
              <h3>Construire, apprendre, résoudre</h3>
              <p>Mettre en pratique mes connaissances sur des projets informatiques concrets, utiles et techniquement exigeants.</p>
              <div className="tags"><span>Réseaux</span><span>Web</span><span>Logiciel</span><span>Problem Solving</span></div>
            </article>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="section-heading reveal compact">
            <p className="eyebrow">02 / COMPÉTENCES</p><h2>Technologies et environnements pratiqués.</h2>
          </div>
          <div className="skills-grid five">
            {skills.map((skill) => (
              <article key={skill.title} className="skill-card glass reveal">
                <span className="skill-icon">{skill.icon}</span><h3>{skill.title}</h3>
                <div className="skill-badges">{skill.values.map((value) => <span key={value}>{value}</span>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section projects">
          <div className="section-heading reveal">
            <p className="eyebrow">03 / PROJETS RÉALISÉS</p><h2>Applications et solutions développées.</h2>
          </div>
          <div className="project-tools reveal">
            <label className="search glass"><span aria-hidden="true">⌕</span><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Rechercher un projet..." /></label>
            <div id="filters" className="filters" aria-label="Filtrer les projets">
              {([["all", "Tous"], ["frontend", "Frontend"], ["backend", "Backend"], ["java", "Java"]] as [Filter, string][]).map(([value, label]) => (
                <button key={value} className={filter === value ? "active" : ""} onClick={() => setFilter(value)}>{label}</button>
              ))}
            </div>
          </div>
          <div className="project-grid portfolio-projects">
            {visibleProjects.map((project) => (
              <article key={project.id} className={`project-card glass reveal visible${project.featured ? " featured" : ""}`} data-title={project.title}>
                {project.featured ? (
                  <div className="preview preview-featured"><span className="pulse" /><strong>{project.techLabel}</strong><i /></div>
                ) : (
                  <div className={`preview tech-preview ${project.techClass}`}>{project.techLabel}</div>
                )}
                <div className="project-content">
                  {project.featured && <span className="label">PROJET PHARE / COPAG</span>}
                  <h3>{project.title}</h3><p>{project.description}</p>
                  <div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <div className="project-links"><button onClick={() => setActiveProject(project)}>Voir détails</button></div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="section">
          <div className="section-heading reveal compact"><p className="eyebrow">04 / FORMATIONS</p><h2>Parcours académique.</h2></div>
          <div className="timeline">
            {formations.map((formation) => (
              <article key={formation.period} className="timeline-item reveal">
                <time>{formation.period}</time><div className="glass"><h3>{formation.title}</h3><p>{formation.institution}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section id="certifications" className="section">
          <div className="section-heading reveal compact"><p className="eyebrow">05 / CERTIFICATIONS</p><h2>Apprentissage certifié.</h2></div>
          <div className="cert-grid">
            {certifications.map((certification) => (
              <article key={certification.title} className="cert-card glass reveal">
                <time>{certification.date}</time><h3>{certification.title}</h3><p>{certification.issuer}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="personal" className="section">
          <div className="section-heading reveal compact"><p className="eyebrow">06 / PROFIL PERSONNEL</p><h2>Langues, qualités et intérêts.</h2></div>
          <div className="personal-grid">
            <article className="glass reveal"><span className="label">LANGUES</span><div className="large-badges"><span>Arabe</span><span>Français</span><span>Anglais</span></div></article>
            <article className="glass reveal"><span className="label">QUALITÉS HUMAINES</span><div className="large-badges"><span>Travail d&apos;équipe</span><span>Adaptabilité</span><span>Rigueur</span><span>Autonomie</span><span>Persévérance</span></div></article>
            <article className="glass reveal"><span className="label">CENTRES D&apos;INTÉRÊT</span><div className="interest-list"><strong>Bénévolat</strong><strong>Sports collectifs</strong></div></article>
          </div>
        </section>

        <section id="contact" className="section contact">
          <div className="section-heading reveal">
            <p className="eyebrow">07 / CONTACT</p><h2>Échangeons autour d&apos;une opportunité.</h2>
            <p>Disponible pour discuter de projets, stages et opportunités dans l&apos;informatique et les réseaux.</p>
            <div className="contact-list">
              <a href="tel:+212682444921"><small>Téléphone</small>+212 6 82 44 49 21</a>
              <a href="mailto:elghazoui.md@gmail.com"><small>Email</small>elghazoui.md@gmail.com</a>
              <span><small>Adresse</small>1 Rue Mohammadia Appt 20, 5 Etg, Hassan Rt, 10000 Rabat, Maroc</span>
              <a href="https://www.linkedin.com/in/mohamed-el-ghazoui" target="_blank" rel="noreferrer"><small>LinkedIn</small>mohamed-el-ghazoui</a>
              <a href="https://github.com/Med-EL-GHAZOUI" target="_blank" rel="noreferrer"><small>GitHub</small>Med-EL-GHAZOUI</a>
            </div>
          </div>
          <ContactForm />
        </section>
      </main>

      <footer className="footer">
        <div className="brand"><span className="brand-mark">M</span><span>MED.DEV</span></div>
        <p>&copy; 2026 Mohamed El-Ghazoui. Portfolio personnel.</p>
        <div><a href="mailto:elghazoui.md@gmail.com">Email</a><a href="https://github.com/Med-EL-GHAZOUI" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/mohamed-el-ghazoui" target="_blank" rel="noreferrer">LinkedIn</a></div>
      </footer>

      {activeProject && (
        <div className="project-modal-overlay" role="presentation" onMouseDown={() => setActiveProject(null)}>
          <section className="modal glass" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(event: MouseEvent) => event.stopPropagation()}>
            <button className="modal-close" aria-label="Fermer" onClick={() => setActiveProject(null)}>x</button>
            <p className="eyebrow">PROJET RÉALISÉ</p><h2 id="modal-title">{activeProject.title}</h2><p>{activeProject.detail}</p>
            <div className="tags">{activeProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </section>
        </div>
      )}

      {paletteOpen && (
        <div className="palette-overlay" role="presentation" onMouseDown={() => setPaletteOpen(false)}>
          <section className="palette glass" role="dialog" aria-modal="true" aria-label="Palette de commandes" onMouseDown={(event: MouseEvent) => event.stopPropagation()}>
            <div className="palette-search"><span>⌕</span><input autoFocus value={commandQuery} onChange={(event) => setCommandQuery(event.target.value)} placeholder="Naviguer vers une section..." /></div>
            <div className="commands">{commandItems.map((command) => <button key={command.action} onClick={() => runCommand(command.action)}><span>{command.title}</span><kbd>{command.key}</kbd></button>)}</div>
          </section>
        </div>
      )}

      {terminalOpen && (
        <section className="terminal glass" aria-label="Terminal interactif">
          <header><span /><span /><span /><strong>mohamed-portfolio</strong><button aria-label="Fermer" onClick={() => setTerminalOpen(false)}>x</button></header>
          <div id="terminal-output">{terminalLines.map((line, index) => <p key={`${index}-${line}`}>{line}</p>)}</div>
          <form onSubmit={submitTerminal}><label>visitor@med:~$</label><input value={terminalInput} onChange={(event) => setTerminalInput(event.target.value)} autoFocus autoComplete="off" spellCheck={false} /></form>
        </section>
      )}
    </>
  );
}
