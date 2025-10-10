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
            video.play().catch(() => {});
          }
        }
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".card").forEach((card) => {
  card.classList.add("hidden");
  observer.observe(card);
});

// --- Détecte si on est sur mobile ---
const isMobile = window.innerWidth <= 768;

// --- Vidéos des projets ---
document.querySelectorAll(".card video").forEach((video) => {
  video.removeAttribute("controls"); // supprime la barre
  video.muted = true; // lecture silencieuse obligatoire pour autoplay
  video.preload = "metadata";

  if (!isMobile) {
    // --- Sur desktop : lecture au hover ---
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
  // Sur mobile : la lecture se fait automatiquement via l'observer
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

document.querySelectorAll(".card").forEach((card) => {
  const title = card.querySelector("h4")?.innerText.trim();
  const githubLink = githubLinks[title];

  if (githubLink) {
    if (isMobile) {
      // --- Sur mobile : on ajoute seulement le bouton ---
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
