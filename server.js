const express = require('express');
const app = express();
const path = require('path');

// Служить статические файлы из директории 'public'
app.use(express.static(path.join(__dirname, 'public')));

// По умолчанию отдавать index.html при доступе к корневому URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
