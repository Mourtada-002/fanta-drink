# fanta-drink

> Landing page interactive et animée pour Fanta — construite en HTML/CSS/JS vanilla, zéro framework.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)

---

## Aperçu

Une landing page premium inspirée de l'univers Fanta, avec une canette animée en scroll, un système de bulles flottantes sur canvas, et un sélecteur de saveurs interactif qui change toute l'ambiance visuelle du site en temps réel.

---

## Fonctionnalités

- **Canette animée en ScrollTrigger** — la canette PNG se déplace, tourne et change d'échelle au fil du scroll, suivant des keyframes précis section par section
- **Animation drop-in à l'entrée** — la canette tombe depuis le haut au chargement de la page avec un rebond physique
- **Float idle** — animation de respiration en boucle quand la canette est au repos
- **Bulles flottantes sur Canvas** — 45 bulles générées dynamiquement, réactives à la position de la souris, avec gradient radial et reflet lumineux
- **Sélecteur de saveurs** — 3 thèmes (Orange, Raisin, Citron) qui changent simultanément : fond, ombres, variables CSS, couleur des bulles, et spin de la canette
- **Transitions fluides** — toutes les transitions de thème sont interpolées via GSAP
- **Responsive complet** — 3 breakpoints : Desktop (≥ 1024px), Tablette (768–1023px), Mobile (< 768px)
- **Menu hamburger mobile** — avec animation d'icône, fermeture au scroll, overlay flouté
- **Glassmorphism** — panneaux en `backdrop-filter: blur` avec bordures luminescentes au hover
- **Logo SVG custom** — logo Fanta style officiel dessiné en SVG inline

---

## Stack technique

| Technologie | Rôle |
|---|---|
| HTML5 sémantique | Structure de la page |
| CSS3 vanilla | Styles, animations keyframes, media queries |
| JavaScript ES6+ | Logique d'animation, Canvas, sélection de saveur |
| [GSAP 3](https://gsap.com/) + ScrollTrigger | Animation de la canette au scroll |
| [Tailwind CSS](https://tailwindcss.com/) (CDN) | Utilitaires de mise en page |
| Google Fonts — Outfit | Typographie |
| Canvas API | Système de bulles flottantes |

---

## Structure du projet

```
fanta-drink/
├── index.html       # Structure HTML + config Tailwind
├── style.css        # Styles globaux, animations CSS, responsive
├── main.js          # GSAP ScrollTrigger, Canvas bubbles, flavor switcher
└── assets/
    └── fanta-can.png  # Image de la canette (à fournir)
```

---

## Lancer le projet

Aucune dépendance à installer. Cloner le repo et ouvrir directement dans un navigateur :

```bash
git clone https://github.com/ton-username/fanta-drink.git
cd fanta-drink
# Ouvrir index.html dans le navigateur
# ou avec un live server :
npx serve .
```

> **Note :** Placer l'image de la canette dans `assets/fanta-can.png` pour que l'animation fonctionne.

---

## Architecture CSS

Le CSS est organisé en 4 blocs distincts :

1. **Variables CSS** (`:root`) — couleurs du thème, modifiées dynamiquement par JS lors du changement de saveur
2. **Styles globaux** — glassmorphism, scrollbar custom, classes utilitaires thème
3. **Animations keyframes** — `canFloat`, `canSpin`, `canDropIn`
4. **Media queries** — Tablette `(768–1023px)` puis Mobile `(< 768px)`, sans jamais toucher au desktop

---

## Architecture JS

Le fichier `main.js` est découpé en 7 sections commentées :

```
A — Registre GSAP
B — Positions de la canette par section (desktop / tablette / mobile)
C — Animation d'entrée drop-in au chargement
D — ScrollTrigger : timeline de déplacement de la canette
E — Sélecteur de saveur (spin, thème CSS, fond, bulles)
F — Système de bulles Canvas (classe Bubble, mouse repulsion, render loop)
G — Initialisation
```

---

## Responsive

| Breakpoint | Comportement |
|---|---|
| ≥ 1024px | Layout desktop 2 colonnes, canette grande taille |
| 768–1023px | Canette réduite (260×400px), h1 hero à 3.8rem, CTA en colonne |
| < 768px | Menu hamburger, canette centrée en haut, contenu en dessous avec padding-top, spacers masqués |

---

## Crédits

- Design & développement — [@ton-username](https://github.com/ton-username)
- Animations — [GSAP by GreenSock](https://gsap.com/)
- Fanta est une marque déposée de The Coca-Cola Company — ce projet est un exercice de design personnel, non affilié à la marque.

---

*Built with 🍊 and way too much caffeine.*