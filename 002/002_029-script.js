let outputDiv = document.querySelector(".output");
let outputParagraph = document.createElement("p");
// let outputPre = document.createElement("pre");

outputDiv.append(outputParagraph); // Додаємо параграф до div для виводу
// outputDiv.append(outputPre); // Додаємо параграф до div для виводу

// Створення елементів для вводу числа та кнопки для додавання числа
let divInput = document.createElement("div");
let input = document.createElement("input");
input.type = "number"; // Тип поля ввода
input.placeholder = "Введіть координати вершин трикутника"; // Плейсхолдер для поля ввода
let button = document.createElement("button");
button.textContent = "Обчислити периметр та площу"; // Текст кнопки
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
let nmbr = []; // Масив для збереження введених чисел
let arrIn = ["x1", "y1", "x2", "y2", "x3", "y3"]; // Масив назв змінних для виводу

// Функція для обчислення периметра та площі трикутника
function calculateTriangle(x1, y1, x2, y2, x3, y3) {
  if (
    x1 === "" ||
    y1 === "" ||
    x2 === "" ||
    y2 === "" ||
    x3 === "" ||
    y3 === ""
  ) {
    throw FormulaError.invalidValue("Координати", "одна з координат порожня");
  }
  // Обчислення довжин сторін трикутника
  let side1 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  let side2 = Math.sqrt(Math.pow(x3 - x2, 2) + Math.pow(y3 - y2, 2));
  let side3 = Math.sqrt(Math.pow(x1 - x3, 2) + Math.pow(y1 - y3, 2));

  // Обчислення периметра трикутника
  let perimeter = (side1 + side2 + side3).toFixed(3);

  // Обчислення площі трикутника за теоремою Герона
  let s = (side1 + side2 + side3) / 2; // Половина периметра
  let area = Math.sqrt(s * (s - side1) * (s - side2) * (s - side3)).toFixed(3); // Формула Герона

  return { perimeter, area }; // Повертаємо об'єкт з периметром та площею
}

function handlerClick() {
  let number = +input.value;
  // if (number === "") {
  if (isNaN(number)) {
    outputParagraph.textContent = "Ви не ввели число.";
    return;
  }

  nmbr.push(number);

  if (nmbr.length === 6) {
    try {
      let result = calculateTriangle(
        nmbr[0],
        nmbr[1],
        nmbr[2],
        nmbr[3],
        nmbr[4],
        nmbr[5]
      );
      outputParagraph.textContent = `Координати вершин трикутника: ${nmbr.join(
        ", "
      )}. Периметр трикутника: ${result.perimeter}, Площа трикутника: ${
        result.area
      }`;
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
    nmbr = [];
  } else {
    let remaining = arrIn.slice(nmbr.length); // Масив залишкових змінних
    outputParagraph.textContent = `Введено ${
      arrIn[nmbr.length - 1]
    }. Залишається: ${remaining.join(", ")}`;
  }
  input.value = "";
}

button.addEventListener("click", handlerClick);
