// Получение JSON файла хранящегося на GitHub
fetch('https://api.github.com/repos/Ilya-Avd/My-works/contents/Test/data.json') //Примечание (Может слететь и нужно выбрать заново)
    .then(function (response) { return response.json(); })
    .then(function (data) {
    // Декодирование содержимого из base64
    var content = atob(data.content);
    var parsedData = JSON.parse(content).map(function (item) { return ({
        'Id':item.id,
        'First Name': item.name.firstName,
        'Last Name': item.name.lastName,
        'About': item.about,
        'Eye Color': item.eyeColor
    }); });
    let numberPage=1;//Переменная хранящая номер страницы
    //Массив цветов 
    let arrColor=[...new Set(parsedData.map(elData=>elData['Eye Color']))]
    
    // Создание таблицы HTML
    function CreateTable() {
        
        var table = document.createElement('table');
        table.setAttribute('id', 'taable');
        var thead = document.createElement('thead');
        var tbody = document.createElement('tbody');
        // Создание заголовков таблицы
        var headers = Object.keys(parsedData[0]).splice(1,4);
        var headerRow = document.createElement('tr');
        headers.forEach(function (headerText) {
            var th = document.createElement('th');
            th.textContent = headerText;
            th.classList.add(headerText.toLowerCase().replace(/\s/g, '-'));
            //Зададим сортировку
            th.onclick=sortTable;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);
        // Заполнение тела таблицы
        parsedData.slice((numberPage-1)*10,numberPage*10).forEach(function (dataItem) {
            var row = document.createElement('tr');
            
            row.setAttribute('id', dataItem.Id);
            row.onclick=formEdit;  //Обработчик для редактирования
            headers.forEach(function (header) {
                var cell = document.createElement('td');
                // Цвет глаз устанавливаем фоном
               
                if (header === 'Eye Color') { 
                    cell.style.backgroundColor = dataItem[header];
                } 
                
                else {
                cell.textContent = dataItem[header];
                }
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
    //Сортировка
    let objState={
        "First Name": "not",
        "Last Name": "not",
        "About": 'not',
        'Eye Color': 'not'
    }
    
    function sortTable(e) {
    
        let el = e.target.textContent;

        if(objState[el]=='not'){
        objState[el]='y'
        parsedData.sort((a, b) => a[el].localeCompare(b[el]));
       
        }
        else {
            objState[el]='not'
            parsedData.sort((a, b) => b[el].localeCompare(a[el]));           
    }
    updateTable(); 
    }
      //Форма редактирования 
      function formEdit(element){
        
        let newDrop=document.getElementById('form_div')//Проверка на дубликат
            if(newDrop){newDrop.remove()}
        let eEdit=element.currentTarget
        //Объявление контейнер и форму
        let form_div=document.createElement('div')
        form_div.setAttribute("id", "form_div")
        let newForm=document.createElement('form')
        //Элементы формы
        let arrInp=[
         document.createElement('input'),
         document.createElement('input'),
         document.createElement('textarea'),
         document.createElement('select'),
         
        ]
        
         
        let buttn=document.createElement('button')
         buttn.textContent = "Save";
        //Заполнение данных формы
        let tdValues = Array.from(eEdit.children).map(td => td.textContent);
        arrInp.forEach((input, index) => {
            if (index < tdValues.length &&tdValues[index]!=='') { 
                
                input.value = tdValues[index];
            }
            else {arrColor.forEach((color)=>{
                let option =document.createElement('option')
            option.style.backgroundColor=color
            
            
            input.appendChild(option)
            input.setAttribute("id", "inp")
            })
            // Смена цвета select
            input.onchange=function(e){
                let indexEvent=this.selectedIndex;
                let option_num=this.options[indexEvent]
                let colorOp=option_num.style.backgroundColor
                this.style.backgroundColor=colorOp
                
            }
            input.style.backgroundColor=eEdit.children[index].style.backgroundColor
        }
            
            newForm.appendChild(input)
        });
      
       
         
        //Обработчик отправки изменений
        buttn.onclick=function(){
           
            let inputValues = arrInp.map(input => input.value===''? input.value=input.style.backgroundColor : input.value);
            console.log(inputValues)
            parsedData.forEach((tr,index) => {
                
                if(tr.Id==eEdit.id){
                    
                    let key = Object.keys(parsedData[index]).splice(1,4);
                    
                    key.forEach((rowKey, i) => {
                        if(key[i]==='Eye Color'){tr[rowKey]=inputValues[i]}
                        tr[rowKey] = inputValues[i];
                        
                    });
                    
                }
                
                
            });
            let dropForm=document.getElementById('form_div')
            dropForm.remove()
            updateTable()
        }


        //Добавление 

        newForm.appendChild(buttn)
        form_div.appendChild(newForm)
        document.body.appendChild(form_div)
      }
    

      

      // Выборка страницы
      function numRow(){
        let inp_div=document.createElement('div');//Создадим контейнер
        inp_div.setAttribute("class", "inutDiv");
        
        let newInp = document.createElement("input");
        newInp.setAttribute("type", "number");
        newInp.value=1;
        newInp.addEventListener('input', function(){  // Обработчик события 
            
             // Получаем значение из поля ввода
             var value = parseInt(this.value);
            // Проверяем, не превышает ли введенное значение максимального
            if (value > parsedData.length/10) {
            // Если превышает, устанавливаем значение равным максимальному
      this.value = parsedData.length/10
             };
             if (value < 1) {
                // Если меньше 1, устанавливаем значение равным 0
          this.value = 1
                 };
             
             
       numberPage=newInp.value;
         updateTable();
        })
        document.body.appendChild(inp_div);
        inp_div.appendChild(newInp);        
        
    }
    
      function updateTable(){
        const element = document.getElementById("taable");
            element.remove();
          CreateTable();
      }
    // Скрываем колонку по нажатию на кнопку 
    function hideColumn() {
        var btn_div = document.createElement('div');
        btn_div.setAttribute("class", "btn_div"); //Создаем контейнер для кнопок
        // Создаем кнопки
        var headers_btn = Object.keys(parsedData[0]).splice(1,4);
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
        numRow();        
    }
    Start();
});
