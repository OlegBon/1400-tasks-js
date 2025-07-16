let outputDiv = document.querySelector(".output");
let outputParagraph = document.createElement("p");
// let outputPre = document.createElement("pre");

outputDiv.append(outputParagraph); // Додаємо параграф до div для виводу
// outputDiv.append(outputPre); // Додаємо параграф до div для виводу

// Створення елементів для вводу числа та кнопки для додавання числа
let divInput = document.createElement("div");
let input = document.createElement("input");
input.type = "number"; // Тип поля ввода
input.placeholder = "Введіть радіус круга"; // Плейсхолдер для поля ввода
let button = document.createElement("button");
button.textContent = "Знайти діаметр круга"; // Текст кнопки
divInput.append(input, button); // Додаємо input та кнопку до divInput

outputDiv.before(divInput);

// Клас для обробки помилок
class FormulaError extends Error {
  constructor(message, variableName, value) {
    super(`${message} Змінна: ${variableName}, значення: ${value}`);
    this.name = "FormulaError";
    input.value = "";
    this.value = value;
  }
}

// Функція для обчислення діаметра круга
function diameterOfCircle(radius) {
  if (radius <= 0) {
    throw new FormulaError(
      "Діаметр не може бути менше або дорівнювати нулю",
      "radius",
      radius
    );
  }
  return 2 * radius;
}

button.addEventListener("click", () => {
  const inputValue = input.value;

  if (inputValue === "") {
    outputParagraph.textContent = "Ви не ввели число.";
    return;
  }

  const radius = +inputValue;

  try {
    const result = diameterOfCircle(radius);
    outputParagraph.textContent = `radius = ${radius}, diameter = ${result}`;
  } catch (error) {
    if (error instanceof FormulaError) {
      console.error(error.message);
      outputParagraph.textContent =
        "Сталася помилка — дивіться консоль для деталей.";
    } else {
      console.error("Невідома помилка:", error);
      outputParagraph.textContent = "Невідома помилка обчислення.";
    }
  }

  input.value = "";
});
