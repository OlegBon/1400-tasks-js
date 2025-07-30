let outputDiv = document.querySelector(".output");
let outputParagraph = document.createElement("p");
// let outputPre = document.createElement("pre");

outputDiv.append(outputParagraph); // Додаємо параграф до div для виводу
// outputDiv.append(outputPre); // Додаємо параграф до div для виводу

// Створення елементів для вводу числа та кнопки для додавання числа
let divInput = document.createElement("div");
let input = document.createElement("input");
input.type = "number"; // Тип поля ввода
input.placeholder = "Введіть координати вершин"; // Плейсхолдер для поля ввода
let button = document.createElement("button");
button.textContent = "Обчислити площу"; // Текст кнопки
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
let arrIn = ["x1", "y1", "x2", "y2", "x3", "y3", "x4", "y4"]; // Масив назв змінних для виводу

// Функція для обчислення площи випуклого чотирикутника як суму площ трикутників
function calculateAreaOfQuadrilateral(pointA, pointB, pointC, pointD) {
  // Функція для обчислення площі трикутника за координатами вершин
  function calculateTriangleArea(p1, p2, p3) {
    const side1 = Math.sqrt(
      Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)
    );
    const side2 = Math.sqrt(
      Math.pow(p3.x - p2.x, 2) + Math.pow(p3.y - p2.y, 2)
    );
    const side3 = Math.sqrt(
      Math.pow(p1.x - p3.x, 2) + Math.pow(p1.y - p3.y, 2)
    );
    const s = (side1 + side2 + side3) / 2;
    return Math.sqrt(s * (s - side1) * (s - side2) * (s - side3));
  }

  // Обчислюємо площі трикутників за координатами вершин
  const triangle1Area = calculateTriangleArea(pointA, pointB, pointC);
  const triangle2Area = calculateTriangleArea(pointA, pointC, pointD);
  const totalArea = (triangle1Area + triangle2Area).toFixed(3);

  // Повертаємо суму площ трикутників
  return totalArea;
}

function handlerClick() {
  let number = +input.value;
  // if (number === "") {
  if (isNaN(number)) {
    outputParagraph.textContent = "Ви не ввели число.";
    return;
  }

  nmbr.push(number);

  if (nmbr.length === 8) {
    try {
      let result = calculateAreaOfQuadrilateral(
        { x: nmbr[0], y: nmbr[1] }, // pointA
        { x: nmbr[2], y: nmbr[3] }, // pointB
        { x: nmbr[4], y: nmbr[5] }, // pointC
        { x: nmbr[6], y: nmbr[7] } // pointD
      );
      outputParagraph.textContent = `Координати вершин чотирикутника: ${nmbr.join(
        ", "
      )}. Площа чотирикутника: ${result}`;
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
