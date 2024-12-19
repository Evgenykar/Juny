// Функция для отображения сообщения в консоли
function showMessage(message) {
    console.log(message);
}

// Функция для переключения видимости элемента
function toggleVisibility(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.style.display = (element.style.display === 'none') ? '' : 'none';
    }
}

// Функция для извлечения параметра utm_term из URL и замены текста в H1
function changeH1FromURLParam() {
    const urlParams = new URLSearchParams(window.location.search);
    const utmTerm = urlParams.get('utm_term');
    const h1 = document.querySelector('h1');
    if (h1) {
        h1.textContent = utmTerm ? utmTerm : h1.textContent;
    }
}

// Функция для вывода текущего времени в консоль
function logCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    console.log(`${hours}:${minutes}:${seconds}`);
}

// Обработчик события click для заголовка H1
function handleH1Click() {
    alert("Вы кликнули на заголовок - так держать!");
}

// Обработчик события mouseover для фотографии студента
function handleMouseOver() {
    const studentImage = document.querySelector('img[alt="Profile Picture"]');
    if (studentImage) {
        studentImage.style.transform = "scale(1.1)";  // Увеличение на 10%
        studentImage.style.transition = "transform 0.3s";
    }
}

// Обработчик события click для замены фотографии
function handleImageClick() {
    const studentImage = document.querySelector('img[alt="Profile Picture"]');
    if (studentImage) {
        studentImage.src = "клоун.jpeg";  // Замените на путь к фотографии преподавателя
        studentImage.alt = "Любимый Препод";
    }
}

// Обработчик события dblclick для фотографии студента
function handleImageDoubleClick() {
    alert("Не налегай, у меня не так много любимых преподавателей");
}

// Добавление обработчиков событий при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // 1. Вызов функции showMessage
    showMessage("Скрипт загружен!");

    // 2. Вызов функции logCurrentTime
    logCurrentTime();

    // 4. Переключение видимости элемента .content
    toggleVisibility('.content');

    // 5. Изменение текста в H1, если параметр utm_term есть в URL
    changeH1FromURLParam();

    // 6. Добавление обработчиков событий

    // Обработчик для заголовка H1
    const h1Element = document.querySelector('h1.main-heading');
    if (h1Element) {
        h1Element.addEventListener('click', handleH1Click);
    }

    // Обработчик для изображения студента
    const studentImage = document.querySelector(' img[alt="Profile Picture"]');
    if (studentImage) {
        studentImage.addEventListener('mouseover', handleMouseOver);
        studentImage.addEventListener('click', handleImageClick);
        studentImage.addEventListener('dblclick', handleImageDoubleClick);
    }
    function submitForm(event) {
        event.preventDefault();
    
        // Сбор данных из формы
        formData.name = document.getElementById("name").value;
        formData.email = document.getElementById("email").value;
        formData.phone = document.getElementById("phone").value;
        formData.date = document.getElementById("date").value;
        formData.comment = document.getElementById("comment").value;
    
        // Валидация данных
        if (!formData.name || !formData.email || !formData.comment) {
            alert("Заполните все обязательные поля.");
            return;
        }
    
        if (!/^\d+$/.test(formData.phone)) {
            alert("Телефон должен содержать только цифры.");
            return;
        }
    
        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(formData.email)) {
            alert("Неверный формат e-mail.");
            return;
        }
    
        // Вывод данных в консоль
        formData.printData();
    
        // Показать сообщение об успешной отправке
        const messageElement = document.getElementById('submission-message');
        messageElement.textContent = 'Форма отправлена!';
        messageElement.style.display = 'block';
    
        // Анимация
        setTimeout(() => {
            messageElement.classList.add('fade-out');
        }, 2000); // Убираем текст через 2 секунды
    
        setTimeout(() => {
            messageElement.style.display = 'none';
            messageElement.classList.remove('fade-out');
        }, 2500); // Скрываем элемент через 2.5 секунды
    
        alert('Заявка отправлена!');
        closePopup();
    }

    // Обработчик события click для переключения семестров
    document.getElementById('toggleSemesters').addEventListener('click', function() {
        const tableBody = document.querySelector('table tbody');
        tableBody.innerHTML = ''; // Очистить текущие строки таблицы

        // Определяем, какие темы показать в зависимости от текущего состояния
        const isSecondSemester = tableBody.rows.length > 0 && tableBody.rows[0].cells[1].textContent !== 'Основы языка HTML';

        const topics = isSecondSemester ? firstSemesterTopics : secondSemesterTopics;

        // Перебираем темы и добавляем их в таблицу
        topics.forEach((topic, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${topic}</td>
                <td><input type="checkbox"></td>
            `;
            tableBody.appendChild(row);
        });

        // Изменить текст на кнопке
        this.textContent = isSecondSemester ? 'Посмотреть практики второго семестра' : 'Посмотреть практики первого семестра';
    });
});