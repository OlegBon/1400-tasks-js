let outputDiv = document.querySelector(".output");
let outputParagraph = document.createElement("p");
// let outputPre = document.createElement("pre");

outputDiv.append(outputParagraph); // Додаємо параграф до div для виводу
// outputDiv.append(outputPre); // Додаємо параграф до div для виводу

// Створення елементів для вводу числа та кнопки для додавання числа
let divInput = document.createElement("div");
let input = document.createElement("input");
input.type = "number"; // Тип поля ввода
input.placeholder = "Введіть кількість компьютерів"; // Плейсхолдер для поля ввода
let button = document.createElement("button");
button.textContent = "Обчислити ціну компьютерів"; // Текст кнопки
divInput.append(input, button); // Додаємо input та кнопку до divInput

outputDiv.before(divInput);

// Клас помилки
class FormulaError extends Error {
  constructor(message, variableName, value) {
    super(`${message} Змінна: ${variableName}, значення: ${value}`);
    this.name = "FormulaError";
    this.variableName = variableName;
    this.value = value;
  }

  static divisionByZero(variable, value) {
    return new FormulaError("Помилка: ділення на нуль.", variable, value);
  }

  static negativeRoot(variable, value) {
    return new FormulaError(
      "Помилка: вираз під коренем від’ємний.",
      variable,
      value
    );
  }

  static invalidValue(variable, value) {
    return new FormulaError(
      "Помилка: від'ємне число (або нуль).",
      variable,
      value
    );
  }
}

// Змінні
// Ціни на компоненти комп'ютера: монітор, системний блок, клавіатура та миш
const prices = {
  monitor: 1000,
  systemBlock: 3500,
  keyboard: 300,
  mouse: 200,
};

// Функція для обчислення вартості комп'ютера
function calculateComputerPrice(nmbr) {
  if (nmbr <= 0) {
    throw FormulaError.invalidValue("nmbr", nmbr);
  }

  let treeComputers = (
    prices.monitor * 3 +
    prices.systemBlock * 3 +
    prices.keyboard * 3 +
    prices.mouse * 3
  ).toFixed(2);

  return {
    treeComputers: treeComputers,
    total: (
      prices.monitor * nmbr +
      prices.systemBlock * nmbr +
      prices.keyboard * nmbr +
      prices.mouse * nmbr
    ).toFixed(2),
  };
}

function handlerClick() {
  let nmbr = +input.value;

  if (!input.value.trim() || nmbr <= 0) {
    outputParagraph.textContent = "Введіть додатне число більше за нуль.";
    return;
  }

  if (nmbr) {
    try {
      let result = calculateComputerPrice(nmbr);
      outputParagraph.textContent = `Вартість ${nmbr} комп'ютерів: ${result.total}. Вартість 3 комп'ютерів: ${result.treeComputers}`;
    } catch (error) {
      if (error instanceof FormulaError) {
        console.error(error.message);
        outputParagraph.textContent =
          "Сталася помилка — дивіться консоль для деталей.";
      } else {
        console.error("Невідома помилка:", error);
        outputParagraph.textContent = "Невідома помилка.";
      }
    }
  }

  input.value = "";
}

button.addEventListener("click", handlerClick);
