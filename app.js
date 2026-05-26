(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const themes = ["cyber", "midnight", "light"];
  let theme = localStorage.getItem("med-theme") || "cyber";

  function boot() {
    const loader = $("#loader");
    if (reduceMotion) {
      loader.classList.add("done");
      return;
    }
    const bar = $("#loader-bar");
    const value = $("#loader-value");
    let progress = 0;
    const timer = window.setInterval(() => {
      progress = Math.min(100, progress + Math.ceil(Math.random() * 15));
      bar.style.width = `${progress}%`;
      value.textContent = `${String(progress).padStart(2, "0")}%`;
      if (progress === 100) {
        clearInterval(timer);
        window.setTimeout(() => loader.classList.add("done"), 230);
      }
    }, 75);
  }

  function setTheme(nextTheme) {
    theme = nextTheme;
    localStorage.setItem("med-theme", theme);
    document.documentElement.dataset.theme = theme;
    $("#theme-toggle").textContent = theme.toUpperCase();
  }

  function createParticles() {
    const canvas = $("#particle-canvas");
    const context = canvas.getContext("2d");
    let particles = [];
    function resize() {
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
    }
    function draw() {
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
      requestAnimationFrame(draw);
    }
    resize();
    window.addEventListener("resize", resize);
    if (!reduceMotion) draw();
  }

  function revealContent() {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.13 });
    $$(".reveal").forEach((element) => revealObserver.observe(element));

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        $$(".dock a, .nav a").forEach((link) => {
          link.classList.toggle("active", link.hash === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: "-40% 0px -47%" });
    $$("main > section[id]").forEach((section) => sectionObserver.observe(section));
  }

  function pointerEffects() {
    const cursor = $("#cursor");
    const dot = $("#cursor-dot");
    document.addEventListener("mousemove", (event) => {
      document.body.classList.add("cursor-active");
      dot.style.left = `${event.clientX}px`;
      dot.style.top = `${event.clientY}px`;
      cursor.animate({ left: `${event.clientX}px`, top: `${event.clientY}px` }, { duration: 260, fill: "forwards" });
      $("#spotlight").style.setProperty("--x", `${event.clientX}px`);
      $("#spotlight").style.setProperty("--y", `${event.clientY}px`);
    });
    $$("a, button, input, textarea").forEach((element) => {
      element.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
      element.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
    });
    $$(".magnetic").forEach((button) => {
      button.addEventListener("mousemove", (event) => {
        const bounds = button.getBoundingClientRect();
        const x = (event.clientX - bounds.left - bounds.width / 2) * 0.1;
        const y = (event.clientY - bounds.top - bounds.height / 2) * 0.12;
        button.style.transform = `translate(${x}px, ${y}px)`;
      });
      button.addEventListener("mouseleave", () => { button.style.transform = ""; });
    });
  }

  const projectDetails = {
    gpec: {
      copy: "Application web de Gestion Prévisionnelle des Emplois et des Compétences réalisée pour la Coopérative Agricole COPAG.",
      tags: ["Application Web", "GPEC", "COPAG"]
    },
    employee: {
      copy: "Système de gestion d'employés organisé autour d'une interface React.js moderne et modulaire.",
      tags: ["React.js", "Frontend"]
    },
    devoirs: {
      copy: "Application permettant de structurer la gestion et le suivi des devoirs avec le framework Laravel.",
      tags: ["Laravel", "PHP"]
    },
    courses: {
      copy: "Plateforme de cours en ligne construite avec les technologies web fondamentales pour une navigation interactive.",
      tags: ["HTML", "CSS", "JavaScript"]
    },
    commerce: {
      copy: "Application e-commerce développée avec Next.js, orientée navigation produit et expérience utilisateur.",
      tags: ["Next.js", "Web"]
    },
    hotel: {
      copy: "Application de réservation d'hôtels réalisée avec React.js pour explorer les parcours de booking.",
      tags: ["React.js", "Reservation"]
    },
    rh: {
      copy: "Application de gestion des ressources humaines développée en Java.",
      tags: ["Java", "Gestion RH"]
    },
    conferences: {
      copy: "Système de gestion de conférences développé avec Django pour organiser les informations d'événements.",
      tags: ["Django", "Python"]
    }
  };

  function projects() {
    let activeFilter = "all";
    const updateCards = () => {
      const query = $("#project-search").value.toLowerCase().trim();
      $$(".project-card").forEach((card) => {
        const matchesFilter = activeFilter === "all" || card.dataset.category.includes(activeFilter);
        const matchesQuery = card.dataset.title.toLowerCase().includes(query);
        card.hidden = !(matchesFilter && matchesQuery);
      });
    };
    $$("#filters button").forEach((button) => {
      button.addEventListener("click", () => {
        $$("#filters button").forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
        activeFilter = button.dataset.filter;
        updateCards();
      });
    });
    $("#project-search").addEventListener("input", updateCards);
    $$(".open-project").forEach((button) => {
      button.addEventListener("click", () => {
        const project = projectDetails[button.dataset.project];
        $("#modal-title").textContent = button.closest(".project-card").dataset.title;
        $("#modal-copy").textContent = project.copy;
        const tags = $("#modal-tags");
        tags.replaceChildren(...project.tags.map((item) => {
          const tag = document.createElement("span");
          tag.textContent = item;
          return tag;
        }));
        $("#project-modal").showModal();
      });
    });
    $(".modal-close").addEventListener("click", () => $("#project-modal").close());
  }

  function openTerminal() {
    $("#terminal").hidden = false;
    $("#terminal-input").focus();
  }

  function commandPalette() {
    const palette = $("#command-palette");
    const query = $("#command-query");
    const open = () => {
      palette.showModal();
      query.value = "";
      $$("#commands button").forEach((button) => { button.hidden = false; });
      query.focus();
    };
    $("#command-open").addEventListener("click", open);
    document.addEventListener("keydown", (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        palette.open ? palette.close() : open();
      }
    });
    query.addEventListener("input", () => {
      const value = query.value.toLowerCase();
      $$("#commands button").forEach((button) => {
        button.hidden = !button.textContent.toLowerCase().includes(value);
      });
    });
    $$("#commands button").forEach((button) => {
      button.addEventListener("click", () => {
        palette.close();
        const action = button.dataset.action;
        if (action === "theme") $("#theme-toggle").click();
        else if (action === "terminal") openTerminal();
        else $(`#${action}`).scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  function terminal() {
    const panel = $("#terminal");
    const output = $("#terminal-output");
    const input = $("#terminal-input");
    const commands = {
      help: "Commandes : <b>about</b>, <b>skills</b>, <b>projects</b>, <b>education</b>, <b>contact</b>, <b>clear</b>",
      about: "MOHAMED EL-GHAZOUI - Étudiant ingénieur en Informatique et Réseaux à l'EMSI Rabat.",
      skills: "JavaScript / React.js / Laravel / Django / Java / Python / Bases de données / Linux",
      projects: "Ouverture de la section projets...",
      education: "Parcours EMSI Rabat : années préparatoires (2022-2024), cycle ingénieur (2024-2027).",
      contact: "elghazoui.md@gmail.com | +212 6 82 44 49 21"
    };
    panel.querySelector("header button").addEventListener("click", () => { panel.hidden = true; });
    $("#terminal-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const command = input.value.trim().toLowerCase();
      const line = document.createElement("p");
      const prompt = document.createElement("b");
      prompt.textContent = "visitor@med:~$ ";
      line.append(prompt, document.createTextNode(command));
      output.appendChild(line);
      if (command === "clear") {
        output.innerHTML = "";
      } else {
        const result = document.createElement("p");
        if (commands[command]) {
          result.innerHTML = commands[command];
        } else {
          result.append(document.createTextNode(`Commande inconnue : ${command}. Tapez `));
          const help = document.createElement("b");
          help.textContent = "help";
          result.append(help, document.createTextNode("."));
        }
        output.appendChild(result);
        if (["projects", "education", "contact"].includes(command)) {
          $(`#${command}`).scrollIntoView({ behavior: "smooth" });
        }
      }
      input.value = "";
      output.scrollTop = output.scrollHeight;
    });
  }

  let toastTimer;
  function toast(text) {
    const toastElement = $("#toast");
    toastElement.textContent = text;
    toastElement.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastElement.classList.remove("visible"), 2800);
  }

  function controlsAndForm() {
    $("#theme-toggle").addEventListener("click", () => {
      setTheme(themes[(themes.indexOf(theme) + 1) % themes.length]);
    });
    $("#contact-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const error = $("#form-error");
      const name = form.elements.name.value.trim();
      const email = form.elements.email.value.trim();
      const message = form.elements.message.value.trim();
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!name || !validEmail || message.length < 10) {
        error.textContent = "Veuillez saisir un nom, un email valide et un message d'au moins 10 caractères.";
        return;
      }
      error.textContent = "";
      form.reset();
      toast("Message valide. Vous pouvez également me joindre directement par email.");
    });
    window.addEventListener("scroll", () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      $("#progress").style.setProperty("--progress", `${height ? (window.scrollY / height) * 100 : 0}%`);
    }, { passive: true });
  }

  boot();
  setTheme(theme);
  createParticles();
  revealContent();
  if (!reduceMotion) pointerEffects();
  projects();
  commandPalette();
  terminal();
  controlsAndForm();
})();
