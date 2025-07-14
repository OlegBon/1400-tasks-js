let outputDiv = document.querySelector(".output");
// let outputParagraph = document.createElement("p");
let outputPre = document.createElement("pre");

// outputDiv.append(outputParagraph); // Додаємо параграф до div для виводу
outputDiv.append(outputPre); // Додаємо параграф до div для виводу

// Створення елементів для вводу числа та кнопки для додавання числа
let divInput = document.createElement("div");
let input = document.createElement("input");
input.type = "number"; // Тип поля ввода
input.placeholder = "Введіть число"; // Плейсхолдер для поля ввода
let button = document.createElement("button");
button.textContent = "Додати число"; // Текст кнопки
divInput.append(input, button); // Додаємо input та кнопку до divInput

outputDiv.before(divInput);

let nmbr = []; // Масив для збереження введених чисел
let arrIn = ["t", "v", "x", "y"];

button.addEventListener("click", function () {
  let number = parseInt(input.value);
  if (isNaN(number)) {
    alert("Будь ласка, введіть коректне число!");
    return;
  }

  nmbr.push(number);

  if (nmbr.length === 4) {
    // Копіюємо шаблон і замінюємо значення змінних
    //     let updatedText = `
    //   5 10         100 ${nmbr[0]}          ${nmbr[2]} 25
    // 7 см         1949 ${nmbr[1]}         ${nmbr[2]} ${nmbr[3]}
    // `;

    let t = String(nmbr[0]).padStart(1, " ");
    let v = String(nmbr[1]).padStart(1, " ");
    let x = String(nmbr[2]).padStart(1, " ");
    let y = String(nmbr[3]).padStart(1, " ");

    let updatedText = `
  5 10      100 ${t}      ${x} 25
7 см      1949 ${v}      ${x} ${y}
    `;

    outputPre.textContent = updatedText.trim(); // Оновлюємо весь блок
    nmbr = [];
  } else {
    let remaining = arrIn.slice(nmbr.length); // Масив залишкових змінних
    outputPre.textContent = `Введено ${
      arrIn[nmbr.length - 1]
    }. Залишається: ${remaining.join(", ")}`;
  }

  input.value = "";
});
