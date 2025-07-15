let outputDiv = document.querySelector(".output");
let outputParagraph = document.createElement("p");
// let outputPre = document.createElement("pre");

outputDiv.append(outputParagraph); // Додаємо параграф до div для виводу
// outputDiv.append(outputPre); // Додаємо параграф до div для виводу

// Створення елементів для вводу числа та кнопки для додавання числа
let divInput = document.createElement("div");
let input = document.createElement("input");
input.type = "number"; // Тип поля ввода
input.placeholder = "Введіть число"; // Плейсхолдер для поля ввода
let button = document.createElement("button");
button.textContent = "Додати число"; // Текст кнопки
divInput.append(input, button); // Додаємо input та кнопку до divInput

outputDiv.before(divInput);

// sqrt((2a + sin(|3a|))/3.56)

class FormulaError extends Error {
  constructor(message, variableName, value) {
    super(`${message} Змінна: ${variableName}, значення: ${value}`);
    this.name = "FormulaError";
    input.value = "";
    this.value = value;
  }
}

function mathFormulaA(a) {
  const y = (2 * a + Math.sin(Math.abs(3 * a))) / 3.56;
  if (y < 0) {
    throw new FormulaError("Помилка: вираз під коренем від’ємний.", "y", y);
  }
  return Math.sqrt(y).toFixed(3);
}

// (3.2 + sqrt(1+x))/(|5x|)
function mathFormulaX(x) {
  const underRoot = 1 + x;
  if (underRoot < 0) {
    throw new FormulaError(
      "Помилка: вираз під коренем від’ємний.",
      "1 + x",
      underRoot
    );
  }
  if (x === 0) {
    throw new FormulaError("Помилка: ділення на нуль.", "x", x);
  }
  const y = (3.2 + Math.sqrt(underRoot)) / Math.abs(5 * x);
  return y.toFixed(3);
}

button.addEventListener("click", () => {
  const inputValue = input.value;

  if (inputValue === "") {
    outputParagraph.textContent = "Ви не ввели число.";
    return;
  }

  // const a = +inputValue;
  const x = +inputValue;

  // try {
  //   const result = mathFormulaA(a);
  //   outputParagraph.textContent = `a = ${a}, y = sqrt((2a + sin(|3a|))/3.56) = ${result}`;
  // } catch (error) {
  //   if (error instanceof FormulaError) {
  //     console.error(error.message);
  //     outputParagraph.textContent =
  //       "Сталася помилка — дивіться консоль для деталей.";
  //   } else {
  //     console.error("Невідома помилка:", error);
  //     outputParagraph.textContent = "Невідома помилка обчислення.";
  //   }
  // }

  try {
    const result = mathFormulaX(x);
    outputParagraph.textContent = `x = ${x}, y = (3.2 + sqrt(1+x))/(|5x|) = ${result}`;
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
