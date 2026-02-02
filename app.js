const actions = [
  "Envoie un cœur ❤️",
  "Fais un compliment",
  "Souris"
];

const truths = [
  "Ton plus beau souvenir ?",
  "Ce que tu préfères chez moi ?",
  "Plutôt câlin ou bisous ?"
];

const actionBtn = document.getElementById("actionBtn");
const truthBtn = document.getElementById("truthBtn");
const card = document.getElementById("card");

if (actionBtn && truthBtn) {
  actionBtn.onclick = () => {
    card.innerText = actions[Math.floor(Math.random() * actions.length)];
  };
  truthBtn.onclick = () => {
    card.innerText = truths[Math.floor(Math.random() * truths.length)];
  };
}

const createBtn = document.getElementById("createGame");
if (createBtn) {
  createBtn.onclick = () => {
    const id = Math.random().toString(36).substring(2, 8);
    window.location.href = `game.html?id=${id}`;
  };
}
