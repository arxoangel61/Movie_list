
const inputNode = document.querySelector('.js-input');
const buttonNode = document.querySelector('.content__btn');
const historyNode = document.querySelector('.content__history__list');



let list = []; //создаем список


buttonNode.addEventListener('click', function(){    
    const newList = getSelectionString();
    //проверка если null, то не добавляется в массив
    if (newList == null) {
        clearInput()
        return false;
    } else {
        list.push(newList); 
    }

    console.log(list);
    

    renderHistory()

    clearInput()

     // Сохраняем список в localStorage
    localStorage.setItem('myList', JSON.stringify(list));
});



// ввод значения в input
function getSelectionString() {

    const strongText = inputNode.value;
    // console.log(typeof(strongText));

    //проверка на ввод , если ввидены только чисто, то сброс
    if(strongText >= 0 || strongText <= 0){
        console.log(`проверка не пройдена`);
        return null;
    } else {
        console.log(`проверка пройдена`);
        return strongText;
    }
    

};



// очистка ввода после значения
const clearInput = (input) => {
    inputNode.value = ''; //обнулить значение
}


const itemClick = document.querySelector(".content__history__item--click");
const itemDelete = document.querySelector(".content__history__item--delete");




//Отрисовывает / обновляет блок в html
function renderHistory() {


    const item = getSelectionString();
    // создаем элемент li
    const listItem = document.createElement("li");

    //добавляем элемент который вводит пользователь в созданный li
    listItem.innerHTML = `<button class="content__history__item--delete"></button><button class="content__history__item--click"></button><p class="content__history__item--text">${item}</p>`;

    //добавляем класс
    listItem.className = "content__history__items";

    // добавляем элемент в список
    historyNode.appendChild(listItem);
    
};

// Функция удаления элемента из списка
function deleteItem(e) {
    if (e.target.classList.contains('content__history__item--delete')) {

        //через e.target.parentElement определяем элемент на который было произведено событие клика
        const listItem = e.target.parentElement;
        console.log(listItem)

        //innerText - свойство элемента, которое содержит весь текстовый контент, который находится внутри него.
        //trim() - метод строк js, удаляет начальные и конечные пробелы в строке.
        const itemValue = listItem.innerText.trim();
        console.log(itemValue); // получаем чисто для сравнение с массивом

        //Метод removeChild() применяется к родительскому элементу и принимает в качестве аргумента элемент, который нужно удалить из него.
        //historyNode.removeChild(listItem) удаляет элемент listItem из родительского элемента historyNode, что приводит к его удалению из DOM
        historyNode.removeChild(listItem);

        list = list.filter(item => item !== itemValue);

        console.log(list);

        // Обновляем список в localStorage
        localStorage.setItem('myList', JSON.stringify(list));
    
    }
}


// Обработчик клика на кнопку "Удалить"
historyNode.addEventListener('click', deleteItem);


// Функция смены класса элемента, а также поддчеркивания текста из списка по клику на кнопку
function toggleUnderLine(e) {
    if (e.target.classList.contains('content__history__item--click')) {
        const listItem = e.target.parentElement;
        listItem.classList.toggle('content__history__items--line');

        // Обновляем список в localStorage
        localStorage.setItem('myList', JSON.stringify(list));
    }
  }

  // обработчик клика на кнопку "Клик" (просмотрено)
  historyNode.addEventListener('click', toggleUnderLine);


// Функция смены класса элемента, а также поддчеркивания текста из списка по клику по тегу <p></p>
  function toggleTextLine(e) {
    if (e.target.classList.contains('content__history__item--text')) {
        const listItem = e.target.parentElement;
        listItem.classList.toggle('content__history__items--line');

        // Обновляем список в localStorage
        localStorage.setItem('myList', JSON.stringify(list));
    }
  }
  // обработчик клика по тегу <p></p> (просмотрено)
  historyNode.addEventListener('click', toggleTextLine);



  
// Восстановление элементов массива из localStorage при загрузке страницы
function restoreListFromLocalStorage() {
    const storedList = localStorage.getItem('myList');
    if (storedList) {
      list = JSON.parse(storedList);
      list.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<button class="content__history__item--delete"></button>
                               <button class="content__history__item--click"></button>
                               <p class="content__history__item--text">${item}</p>`;
        listItem.className = 'content__history__items';
  
        const isLine = item.includes('content__history__items--line');
        if (isLine) {
          listItem.classList.add('content__history__items--line');
        }
  
        historyNode.appendChild(listItem);
      });
    }
  }
  
  document.addEventListener('DOMContentLoaded', restoreListFromLocalStorage);
  

