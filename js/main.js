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
  "Space Shooter": "https://github.com/Fan-tome14/SpaceShooter",
  "Super Bonus IA": "https://github.com/Fan-tome14/SuperBonusIA",
  "AmongUS": "https://github.com/Fan-tome14/AmongUS",
  "Alone In Space": "https://github.com/Fan-tome14/AloneInSpace",
  "Pac Man": "https://github.com/Fan-tome14/PacMan",
  "Tower Defense": "https://github.com/Fan-tome14/TowerDefense",
  "Shooter IA": "https://github.com/DevShaD0ow/ShooterAI",
  "Battle Snakes": "https://github.com/Fan-tome14/BattleSnakes",
  "Snake": "https://github.com/Fan-tome14/Snake",
  "Relic Of The Past": "https://github.com/Fan-tome14/RelicOfThePast"
};

// --- Liens vers les pages de détails des projets ---
const projectDetailPages = {
  "Space Shooter": "projet1.html",
  "Super Bonus IA": "projet2.html",
  "AmongUS": "projet3.html",
  "Alone In Space": "projet4.html",
  "Pac Man": "projet5.html",
  "Tower Defense": "projet6.html",
  "Shooter IA": "projet7.html",
  "Battle Snakes": "projet8.html",
  "Snake" : "projet9.html",
  "Relic Of The Past" : "projet10.html"
};

// --- Animation d'apparition des cartes ---
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Lecture automatique des vidéos sur mobile
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
  { threshold: 0.5 } // au moins 50% visible
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

// --- Gestion des liens GitHub ET des pages de détails ---
document.querySelectorAll(".card").forEach((card) => {
  const title = card.querySelector("h4")?.innerText.trim();
  const githubLink = githubLinks[title];
  const detailPage = projectDetailPages[title];

  if (isMobile) {
    // Sur mobile : 2 boutons (GitHub + Détails)
    if (githubLink) {
      let githubBtn = document.createElement("a");
      githubBtn.href = githubLink;
      githubBtn.target = "_blank";
      githubBtn.innerText = "Voir sur GitHub";
      githubBtn.classList.add("github-btn");
      githubBtn.style.display = "inline-block";
      githubBtn.style.marginTop = "10px";
      githubBtn.style.marginRight = "10px";
      githubBtn.style.padding = "5px 10px";
      githubBtn.style.border = "1px solid rgba(236,72,153,0.3)";
      githubBtn.style.borderRadius = "5px";
      githubBtn.style.color = "#fff";
      githubBtn.style.textDecoration = "none";
      githubBtn.style.fontFamily = "'Orbitron', sans-serif";
      githubBtn.style.fontSize = "12px";
      githubBtn.style.boxShadow = "0 0 3px rgba(236,72,153,0.2)";
      githubBtn.style.transition = "0.3s";
      githubBtn.onmouseover = () => { githubBtn.style.boxShadow = "0 0 6px rgba(236,72,153,0.3)"; };
      githubBtn.onmouseout = () => { githubBtn.style.boxShadow = "0 0 3px rgba(236,72,153,0.2)"; };

      card.appendChild(githubBtn);
    }
    
    // Bouton Détails
    if (detailPage) {
      let detailBtn = document.createElement("a");
      detailBtn.href = detailPage;
      detailBtn.innerText = "Voir les détails";
      detailBtn.classList.add("detail-btn");
      detailBtn.style.display = "inline-block";
      detailBtn.style.marginTop = "10px";
      detailBtn.style.padding = "5px 10px";
      detailBtn.style.border = "1px solid rgba(236,72,153,0.5)";
      detailBtn.style.borderRadius = "5px";
      detailBtn.style.color = "#fff";
      detailBtn.style.textDecoration = "none";
      detailBtn.style.fontFamily = "'Orbitron', sans-serif";
      detailBtn.style.fontSize = "12px";
      detailBtn.style.backgroundColor = "rgba(236,72,153,0.1)";
      detailBtn.style.boxShadow = "0 0 3px rgba(236,72,153,0.3)";
      detailBtn.style.transition = "0.3s";
      detailBtn.onmouseover = () => { 
        detailBtn.style.backgroundColor = "rgba(236,72,153,0.2)";
        detailBtn.style.boxShadow = "0 0 6px rgba(236,72,153,0.4)"; 
      };
      detailBtn.onmouseout = () => { 
        detailBtn.style.backgroundColor = "rgba(236,72,153,0.1)";
        detailBtn.style.boxShadow = "0 0 3px rgba(236,72,153,0.3)"; 
      };

      card.appendChild(detailBtn);
    }
    
    card.style.cursor = "default";
    
  } else {
    // Sur desktop : clic sur la carte = page de détails, Ctrl+Clic = GitHub
    if (detailPage || githubLink) {
      card.style.cursor = "pointer";
      card.addEventListener("click", (e) => {
        // Si Ctrl+Clic et qu'il y a un lien GitHub, ouvrir GitHub
        if (e.ctrlKey && githubLink) {
          window.open(githubLink, "_blank");
        } 
        // Sinon, ouvrir la page de détails
        else if (detailPage) {
          window.location.href = detailPage;
        }
        // Si pas de page de détails mais qu'il y a GitHub, ouvrir GitHub
        else if (githubLink) {
          window.open(githubLink, "_blank");
        }
      });
    }
  }
});

// --- FILTRAGE + RECHERCHE ---
const filterButtons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".card");
const searchInput = document.getElementById("searchInput");

let activeFilters = new Set();
let searchText = "";

// Gestion des filtres
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const tech = btn.dataset.tech;

    if (tech === "all") {
      activeFilters.clear();
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      updateCards();
      return;
    }

    document.querySelector('[data-tech="all"]').classList.remove("active");

    if (activeFilters.has(tech)) {
      activeFilters.delete(tech);
      btn.classList.remove("active");
    } else {
      activeFilters.add(tech);
      btn.classList.add("active");
    }

    if (activeFilters.size === 0) {
      document.querySelector('[data-tech="all"]').classList.add("active");
    }

    updateCards();
  });
});

// Recherche
searchInput.addEventListener("input", function() {
  searchText = this.value.toLowerCase();
  updateCards();
});

// Fonction commune pour filtrage + recherche
function updateCards() {
  cards.forEach((card) => {
    const title = card.querySelector(".project-title").innerText.toLowerCase();
    const tags = Array.from(card.querySelectorAll(".tech-tags span")).map(
      (span) => span.innerText.trim()
    );

    const matchesSearch = title.includes(searchText);
    const matchesFilter =
      activeFilters.size === 0 ||
      [...activeFilters].some((filter) => tags.includes(filter));

    if (matchesSearch && matchesFilter) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}
