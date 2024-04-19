// Функция для получения данных в формате JSON
async function fetchJSON(url) {
  const response = await fetch(url);
  return await response.json();
}

// Загрузка пользователей и клиентов из файлов JSON
let users, clients;
fetchJSON("./users.json").then((data) => (users = data));
fetchJSON("./clients.json").then((data) => (clients = data));

// Функция для обработки отправки формы
async function login(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    // Показать таблицу клиентов
    displayClientTable(user.fullName);
  } else {
    alert("Неверное имя пользователя или пароль");
  }
}

// Функция для отображения таблицы клиентов
function displayClientTable(responsiblePerson) {
  const clientTableDiv = document.getElementById("clientTable");
  clientTableDiv.innerHTML = "<h2>Таблица клиентов</h2>";

  const table = document.createElement("table");
  const headerRow = table.insertRow();
  const headers = [
    "Номер счета",
    "Фамилия",
    "Имя",
    "Отчество",
    "Дата рождения",
    "ИНН",
    "Ответственное лицо",
    "Статус",
    "Действие",
  ];
  headers.forEach((headerText) => {
    const header = document.createElement("th");
    header.textContent = headerText;
    headerRow.appendChild(header);
  });

  for (let i = 0; i < clients.length; i++) {
    const client = clients[i];
    if (client.responsiblePerson === responsiblePerson) {
      const row = table.insertRow();
      Object.values(client).forEach((value) => {
        const cell = row.insertCell();
        cell.textContent = value;
      });

      // Добавить выпадающий список изменения статуса
      const statusCell = row.insertCell();
      const statusSelect = document.createElement("select");
      const statuses = ["Не в работе", "В работе", "Отказ", "Сделка закрыта"];
      statuses.forEach((status) => {
        const option = document.createElement("option");
        option.value = status;
        option.textContent = status;
        statusSelect.appendChild(option);
      });

      // Установить начальное значение элемента select
      statusSelect.value = client.status;

      statusSelect.addEventListener("change", (event) => {
        // Обновить значение статуса в объекте клиента
        client.status = event.target.value;
        // Перерисовать всю таблицу с обновленными данными
        displayClientTable(responsiblePerson);
      });

      statusCell.appendChild(statusSelect);
    }
  }

  clientTableDiv.appendChild(table);
  clientTableDiv.style.display = "block";
}

// Слушатель событий для отправки формы
document.getElementById("loginForm").addEventListener("submit", login);
