// Получение JSON файла хранящегося на GitHub
fetch('https://api.github.com/repos/Ilya-Avd/My-works/contents/Test/dataa.json')
    .then(function (response) { return response.json(); })
    .then(function (data) {
    // Декодирование содержимого из base64
    var content = atob(data.content);
    var parsedData = JSON.parse(content).map(function (item) { return ({
        'First Name': item.name.firstName,
        'Last Name': item.name.lastName,
        'About': item.about,
        'Eye Color': item.eyeColor
    }); });
    // Создание таблицы HTML
    function CreateTable() {
        var table = document.createElement('table');
        table.setAttribute('id', 'taable');
        var thead = document.createElement('thead');
        var tbody = document.createElement('tbody');
        // Создание заголовков таблицы
        var headers = Object.keys(parsedData[0]);
        var headerRow = document.createElement('tr');
        headers.forEach(function (headerText) {
            var th = document.createElement('th');
            th.textContent = headerText;
            th.classList.add(headerText.toLowerCase().replace(/\s/g, '-'));
            //Зададим сортировку
            th.addEventListener('click', function () {
                var _a;
                var columnIndex = headers.indexOf(headerText);
                var sortDirection = 1; // Направление сортировки (1 для возрастания, -1 для убывания)
                // Переключение направления сортировки
                if (th.classList.contains('sorted')) {
                    sortDirection = -1;
                    th.classList.remove('sorted');
                }
                else {
                    // Убираем класс 'sorted' у предыдущей сортированной колонки
                    var sortedColumn = table.querySelector('th.sorted');
                    if (sortedColumn) {
                        sortedColumn.classList.remove('sorted');
                    }
                    th.classList.add('sorted');
                }
                var sortColumn = Array.from(table.rows).slice(1).sort(function (rowA, rowB) {
                    var valueA = rowA.cells[columnIndex].textContent;
                    var valueB = rowB.cells[columnIndex].textContent;
                    return sortDirection * valueA.localeCompare(valueB);
                });
                (_a = table.tBodies[0]).append.apply(_a, sortColumn);
            });
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);
        // Заполнение тела таблицы
        parsedData.forEach(function (dataItem) {
            var row = document.createElement('tr');
            headers.forEach(function (header) {
                var cell = document.createElement('td');
                cell.textContent = dataItem[header];
                cell.classList.add(header.toLowerCase().replace(/\s/g, '-')); // Добавляем классы
                row.appendChild(cell);
            });
            tbody.appendChild(row);
        });
        table.appendChild(tbody);
        // Вставка таблицы в документ
        document.body.appendChild(table);
        return headers;
    }
    // Скрываем колонку по нажатию на кнопку 
    function hideColumn() {
        var btn_div = document.createElement('div'); //Создаем контейнер для кнопок
        // Создаем кнопки
        var headers_btn = Object.keys(parsedData[0]);
        headers_btn.forEach(function (heade_Text) {
            var btn = document.createElement('button');
            btn.innerText = heade_Text.toLowerCase().replace(/\s/g, '-');
            //Создание обработчика
            btn.addEventListener('click', function () {
                var elementsToHide = document.querySelectorAll('.' + btn.innerText);
                elementsToHide.forEach(function (element) {
                    element.style.display !== 'none' ? element.style.display = 'none' : element.style.display = '';
                });
            });
            btn_div.appendChild(btn);
        });
        document.body.appendChild(btn_div);
    }
    function Start() {
        CreateTable();
        hideColumn();
    }
    Start();
});
