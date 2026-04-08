// サーバーからデータを取得する関数を作成してください
async function fetchFlashcards() {
  try {
    const response = await fetch("/api/flashcards");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function setupFlashcards() {
  // 暗記カード表示エリアの要素を取得する
  const flashcardsList = document.querySelector("#flashcards-list");

  // カード表示エリアにクリックイベントを設定（イベント委譲）
  flashcardsList.addEventListener("click", (event) => {
    const button = event.target.closest(".flashcard-meaning");
    if (!button) return;
    const id = button.getAttribute("data-toggle");
    toggleMeaning(id);
  });

  // 暗記カードを画面に表示する処理
  async function renderFlashcards(wordList) {
    // カード表示エリアの HTML を空にする
    flashcardsList.innerHTML = "";

    // wordList に対してループ処理をする
    wordList.forEach((word) => {
      // flashcard 変数に雛形を代入する
      let flashcard = `
        <div class="flashcard">
          <div class="flashcard-content">
            <p class="flashcard-title">${word.word}</p>
            <div class="flashcards-icons">
             <button class="flashcard-meaning" data-toggle="${word.id}"><span class="ri-eye-line"></span></button>
          </div>
          <div data-meaning="${word.id}" class="hidden">
            <p>${word.meaning}</p>
          </div>
        </div>
      `;

      // カード表示エリアの innerHTML に flashcard を加算代入する
      flashcardsList.innerHTML += flashcard;
    });

    // （イベントは setupFlashcards 内で設定済みなので何もしない）
  }

  // fetchFlashcards 関数と renderFlashcards 関数を繋げる処理
  async function readFlashcards() {
    const flashcards = await fetchFlashcards();
    await renderFlashcards(flashcards);
  }

  // setupFlashcards 関数の最後に readFlashcards 関数を呼ぶ
  await readFlashcards();
}
function toggleMeaning(id) {
  const meaningElement = document.querySelector(`[data-meaning="${id}"]`);
  if (meaningElement) {
    meaningElement.classList.toggle("hidden");
  }
}
