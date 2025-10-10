// --- Détecte si on est sur mobile ---
const isMobile = window.innerWidth <= 768;

// --- Animation subtile du header au scroll ---
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 30) {
    header.style.background = "rgba(0,0,0,0.6)";
    header.style.boxShadow = "0 0 20px rgba(236,72,153,0.15)";
  } else {
    header.style.background = "transparent";
    header.style.boxShadow = "none";
  }
});

// --- Liens GitHub ---
const githubLinks = {
  "SpaceShooter": "https://github.com/Fan-tome14/SpaceShooter",
  "SuperBonusIA": "https://github.com/Fan-tome14/SuperBonusIA",
  "Travelling-Replication": "https://github.com/Fan-tome14/Travelling-Replication",
  "AloneInSpace": "https://github.com/Fan-tome14/AloneInSpace",
  "PacMan": "https://github.com/Fan-tome14/PacMan",
  "TowerDefense": "https://github.com/Fan-tome14/TowerDefense"
};

// --- Animation d'apparition des cartes ---
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // --- Lecture automatique des vidéos sur mobile ---
        if (isMobile) {
          const video = entry.target.querySelector("video");
          if (video) {
            video.style.display = "block";
            requestAnimationFrame(() => {
              video.play().catch(() => {});
            });
          }
        }
      }
    });
  },
  { threshold: 0.5 } // au moins 50% visible avant lecture
);

document.querySelectorAll(".card").forEach((card) => {
  card.classList.add("hidden");
  observer.observe(card);
});

// --- Vidéos des projets ---
document.querySelectorAll(".card video").forEach((video) => {
  video.removeAttribute("controls");
  video.muted = true;
  video.preload = "metadata";
  video.playsInline = true; // essentiel sur iOS mobile

  if (!isMobile) {
    // Sur desktop : lecture au hover
    const card = video.closest(".card");
    card.addEventListener("mouseenter", () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    });
    card.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
    });
  }
});

// --- Gestion des liens GitHub ---
document.querySelectorAll(".card").forEach((card) => {
  const title = card.querySelector("h4")?.innerText.trim();
  const githubLink = githubLinks[title];

  if (githubLink) {
    if (isMobile) {
      // --- Sur mobile : bouton GitHub ---
      let btn = document.createElement("a");
      btn.href = githubLink;
      btn.target = "_blank";
      btn.innerText = "Voir sur GitHub";
      btn.classList.add("github-btn");
      btn.style.display = "inline-block";
      btn.style.marginTop = "10px";
      btn.style.padding = "5px 10px";
      btn.style.border = "1px solid rgba(236,72,153,0.3)";
      btn.style.borderRadius = "5px";
      btn.style.color = "#fff";
      btn.style.textDecoration = "none";
      btn.style.fontFamily = "'Orbitron', sans-serif";
      btn.style.fontSize = "12px";
      btn.style.boxShadow = "0 0 3px rgba(236,72,153,0.2)";
      btn.style.transition = "0.3s";
      btn.onmouseover = () => { btn.style.boxShadow = "0 0 6px rgba(236,72,153,0.3)"; };
      btn.onmouseout = () => { btn.style.boxShadow = "0 0 3px rgba(236,72,153,0.2)"; };

      card.appendChild(btn);
      card.style.cursor = "default"; // désactive le clic sur la carte
    } else {
      // --- Sur desktop : clic sur toute la carte ---
      card.style.cursor = "pointer";
      card.addEventListener("click", () => {
        window.open(githubLink, "_blank");
      });
    }
  }
});
// --- FILTRAGE DES PROJETS ---
const filterButtons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".card");

let activeFilters = new Set(); // Liste des filtres actifs

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const tech = btn.dataset.tech;

    // --- Si "Tous" est cliqué : on réinitialise tout ---
    if (tech === "all") {
      activeFilters.clear();
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      updateCards();
      return;
    }

    // --- Désactive le bouton "Tous" ---
    document.querySelector('[data-tech="all"]').classList.remove("active");

    // --- Si déjà actif, on le retire ---
    if (activeFilters.has(tech)) {
      activeFilters.delete(tech);
      btn.classList.remove("active");
    } 
    // --- Sinon, on l’ajoute ---
    else {
      activeFilters.add(tech);
      btn.classList.add("active");
    }

    // --- Si plus aucun filtre sélectionné : "Tous" redevient actif ---
    if (activeFilters.size === 0) {
      document.querySelector('[data-tech="all"]').classList.add("active");
    }

    updateCards();
  });
});

function updateCards() {
  cards.forEach((card) => {
    const tags = Array.from(card.querySelectorAll(".tech-tags span")).map(
      (span) => span.innerText.trim()
    );

    // Si aucun filtre ou "Tous" -> tout afficher
    if (activeFilters.size === 0) {
      card.classList.remove("hidden-filter");
      return;
    }

    // Sinon, afficher si AU MOINS une correspondance
    const hasMatch = [...activeFilters].some((filter) => tags.includes(filter));
    if (hasMatch) {
      card.classList.remove("hidden-filter");
    } else {
      card.classList.add("hidden-filter");
    }
  });
}
