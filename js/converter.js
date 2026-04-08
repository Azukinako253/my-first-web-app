// ここからコードを書いてください

export function setupConverter() {
  // 変換ロジックに必要な要素を取得する
  const converterForm = document.querySelector(".converter-form");
  // ↑こいつはトップのvalueの部分
  const converterInput = document.querySelector(".converter-input");
  const converterFrom = document.querySelector(".selectr-from");
  const converterTo = document.querySelector(".selectr-to");
  const converterResult = document.querySelector(".converter-result");

  // 単位データを定義する
  const lengthUnit = [
    { name: "meter", base: 1 },
    { name: "kilometer", base: 1000 },
    { name: "centimeter", base: 0.01 },
    { name: "millimeter", base: 0.001 },
    { name: "inch", base: 0.0254 },
    { name: "foot", base: 0.3048 },
    { name: "yard", base: 0.9144 },
    { name: "mile", base: 1609.344 },
  ];

  // 単位選択欄 (From / To) を初期化する
  lengthUnit.forEach((unit) => {
    const optionFrom = document.createElement("option");
    optionFrom.value = unit.base;
    optionFrom.textContent = unit.name;
    converterFrom.appendChild(optionFrom);

    const optionTo = document.createElement("option");
    optionTo.value = unit.base;
    optionTo.textContent = unit.name;
    converterTo.appendChild(optionTo);
  });

  // 初期値を設定: From = meter (index 0), To = kilometer (index 1)
  converterFrom.selectedIndex = 0;
  converterTo.selectedIndex = 1;

  // 変換処理を実装する
  function convert() {
    // 入力フィールドの値を取得し、数値に変換
    const inputValue = parseFloat(converterInput.value);

    // 入力値が数値であるかを確認
    if (isNaN(inputValue)) {
      converterResult.textContent = "Please enter a valid number";
      return;
    }

    // 変換元と変換先の単位を取得
    const fromValue = parseFloat(converterFrom.value);
    const toValue = parseFloat(converterTo.value);

    // 変換後の値を計算
    const convertedValue = (inputValue * fromValue) / toValue;

    // 変換結果を表示
    const fromName =
      converterFrom.options[converterFrom.selectedIndex].textContent;
    const toName = converterTo.options[converterTo.selectedIndex].textContent;
    converterResult.textContent = `${inputValue} ${fromName} = ${convertedValue.toFixed(3)} ${toName}`;
  }

  // リアルタイムに変換が行われるようにする
  converterForm.addEventListener("input", convert);

  // Web アプリケーション起動時に結果を表示
  convert();
}
	