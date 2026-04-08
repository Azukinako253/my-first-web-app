// ここからコードを書いてください
import { setupTabs } from "./js/tabs.js";
import { setupConverter } from "./js/converter.js";
import { setupFlashcards } from "./js/flashcards.js";

document.addEventListener("DOMContentLoaded", () => {
  setupTabs();
  setupConverter();
  setupFlashcards();
});
// ↑こいつがあることでconverter.jsの関数が動く！！！！！！！これがないと関数が起動せずエラーになる⚠⚠⚠
