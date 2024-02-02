"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
// Путь к вашему JSON-файлу
var filePath = './l/data.json';
// Чтение файла
fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
        console.error('Ошибка чтения файла:', err);
        return;
    }
    try {
        // Преобразование содержимого файла в JavaScript-объект
        var jsonData = JSON.parse(data);
        console.log(jsonData); // Пример вывода содержимого файла в консоль
        // Теперь вы можете использовать переменную jsonData в вашем JavaScript-коде
    }
    catch (error) {
        console.error('Ошибка парсинга JSON:', error);
    }
});
