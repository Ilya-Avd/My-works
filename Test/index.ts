// Получение JSON файла хранящегося на GitHub
fetch('https://api.github.com/repos/Ilya-Avd/My-works/contents/Test/dataa.json')
  .then(response => response.json())
  .then((data: { content: string }) => {
    // Декодирование содержимого из base64
    const content: string = atob(data.content);
    // Преобразование содержимого из JSON строки в объект TypeScript
    interface Person {
        [key: string]: string;
    }
    
    
    const parsedData: Person[] = JSON.parse(content).map(item => ({
        'First Name': item.name.firstName,
        'Last Name': item.name.lastName,
        'About': item.about,
        'Eye Color': item.eyeColor
    }));
   
    // Создание таблицы HTML
    function CreateTable() {
        
        var table = document.createElement('table');
        table.setAttribute('id', 'taable')
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
    
        // Создание заголовков таблицы
        const headers = Object.keys(parsedData[0]);
        const headerRow = document.createElement('tr');
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            th.classList.add(headerText.toLowerCase().replace(/\s/g, '-'))
            //Зададим сортировку
            th.addEventListener('click', function (){
                const columnIndex = headers.indexOf(headerText);
                let sortDirection = 1; // Направление сортировки (1 для возрастания, -1 для убывания)
                
                // Переключение направления сортировки
                if (th.classList.contains('sorted')) {
                    sortDirection = -1;
                    th.classList.remove('sorted');
                } else {
                    // Убираем класс 'sorted' у предыдущей сортированной колонки
                    const sortedColumn = table.querySelector('th.sorted');
                    if (sortedColumn) {
                        sortedColumn.classList.remove('sorted');
                    }
                    th.classList.add('sorted');
                }
            
                let sortColumn = Array.from(table.rows).slice(1).sort((rowA, rowB) => {
                    let valueA = rowA.cells[columnIndex].textContent;
                    let valueB = rowB.cells[columnIndex].textContent;
                    return sortDirection * valueA.localeCompare(valueB);
                });
            
                table.tBodies[0].append(...sortColumn);
            });
            
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);
    
        // Заполнение тела таблицы
        parsedData.forEach(dataItem => {
            const row = document.createElement('tr');
            headers.forEach(header => {
               
                const cell = document.createElement('td');
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
     function hideColumn (){

        let btn_div=document.createElement('div');   //Создаем контейнер для кнопок
        
        // Создаем кнопки
        const headers_btn = Object.keys(parsedData[0]);
        headers_btn.forEach(heade_Text=>{
            let btn=document.createElement('button');
            btn.innerText=heade_Text.toLowerCase().replace(/\s/g, '-');
            //Создание обработчика
            btn.addEventListener('click', function (){

                const elementsToHide: NodeListOf<HTMLElement> = document.querySelectorAll('.'+btn.innerText);
                elementsToHide.forEach(element => {
                    element.style.display!=='none'? element.style.display = 'none': element.style.display='';
                });
                   

            })
            btn_div.appendChild(btn);
            
        })
        document.body.appendChild(btn_div);
     }
        
     
    
    function Start() {
        CreateTable();
        hideColumn();
       
    }

    Start();
});
