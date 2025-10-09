// Animation subtile du header au scroll
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

// Animation d'apparition des cartes
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".card").forEach((card) => {
  card.classList.add("hidden");
  observer.observe(card);
});


// --- Ajout du comportement des vidéos au survol ---
document.querySelectorAll(".card video").forEach((video) => {
  const card = video.closest(".card");

  // Lecture au survol
  card.addEventListener("mouseenter", () => {
    video.play();
  });

  // Pause à la sortie
  card.addEventListener("mouseleave", () => {
    video.pause();
    video.currentTime = 0; // remet au début pour un effet propre
  });
});

// --- Ajout de l'ouverture du lien GitHub au clic ---
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
  if (githubLinks[title]) {
    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
      window.open(githubLinks[title], "_blank");
    });
  }
});