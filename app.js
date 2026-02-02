// Firebase (ES Modules)console.log("app.js chargé");

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

// Ton firebaseConfig (celui que tu as donné)
const firebaseConfig = {
  apiKey: "AIzaSyDcBZD6abP_Xp6i3Usq9UJWJjXzIEdqoXc",
  authDomain: "love-game-e639e.firebaseapp.com",
  projectId: "love-game-e639e",
  storageBucket: "love-game-e639e.firebasestorage.app",
  messagingSenderId: "540401330227",
  appId: "1:540401330227:web:c1d44866658b5ac8081b46"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// =====================
// CARTES (gratuit)
// =====================
const actions = [
  "Envoie un cœur ❤️",
  "Fais un compliment",
  "Souris",
  "Fais une petite danse 5 secondes",
  "Envoie un vocal de 3 secondes (juste 'hey')",
];

const truths = [
  "Ton plus beau souvenir avec moi ?",
  "Ce que tu préfères chez moi ?",
  "Plutôt câlin ou bisous ?",
  "Un truc que tu n’oses pas trop me dire ?",
  "Qu’est-ce qui te fait craquer direct ?",
];

// =====================
// RÉCUPÉRER LES ÉLÉMENTS
// =====================
const createBtn = document.getElementById("createGame");
const actionBtn = document.getElementById("actionBtn");
const truthBtn = document.getElementById("truthBtn");
const card = document.getElementById("card");
const linkInput = document.getElementById("gameLink");
const copyBtn = document.getElementById("copyLink");

// =====================
// PAGE ACCUEIL: CRÉER PARTIE
// =====================
if (createBtn) {
  createBtn.addEventListener("click", () => {
    const id = Math.random().toString(36).substring(2, 8);
    window.location.href = `game.html?id=${id}`;
  });
}

// =====================
// PAGE JEU: TEMPS RÉEL
// =====================
const params = new URLSearchParams(window.location.search);
const gameId = params.get("id");

if (gameId) {
  // Afficher le lien de partie si les éléments existent
  if (linkInput) {
    linkInput.value = window.location.href;
  }
  if (copyBtn && linkInput) {
    copyBtn.onclick = async () => {
      try {
        await navigator.clipboard.writeText(linkInput.value);
        copyBtn.innerText = "Copié ✅";
        setTimeout(() => (copyBtn.innerText = "Copier le lien"), 1200);
      } catch (e) {
        // Si clipboard bloque (certains navigateurs), on fait au moins un select
        linkInput.select();
        copyBtn.innerText = "Sélectionné ✅";
        setTimeout(() => (copyBtn.innerText = "Copier le lien"), 1200);
      }
    };
  }

  // Si on est sur game.html, on branche les boutons
  if (actionBtn && truthBtn && card) {
    const gameRef = doc(db, "games", gameId);

    // Quand un joueur clique, on écrit la carte dans Firestore
    actionBtn.onclick = async () => {
      const value = actions[Math.floor(Math.random() * actions.length)];
      await setDoc(gameRef, { card: value }, { merge: true });
    };

    truthBtn.onclick = async () => {
      const value = truths[Math.floor(Math.random() * truths.length)];
      await setDoc(gameRef, { card: value }, { merge: true });
    };

    // Quand Firestore change, les 2 joueurs voient la même carte
    onSnapshot(gameRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        if (data && data.card) {
          card.innerText = data.card;
        }
      }
    });
  }
}
