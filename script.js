const form = document.getElementById('registerForm');

    // функция для отображения ошибки
function showError(inputId, errorId, isValid) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);

    if (!isValid) {
        input.classList.add('error');
        error.style.display = 'block';
    } else {
        input.classList.remove('error');
        error.style.display = 'none';
    }
    return isValid;
}

// Регулярные выражения

// ФИО - латинница/кириллица, без цифр и символов, кроме пробела
const regexFullname = /^[A-Za-zА-Яа-яЁё\s]+$/;

// Логин - латиница, есть строчные и заглавные, мин 1 спецсимвол, мин 3 цифры, длина минимум 15
const regexLogin = /^(?=.*[a-z])(?=.*[A-Z])(?=(.*\d){3})(?=.*\W)\S{15,}$/;

// Email - проверка на имя, @ и домен. Только латиница
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Возраст - 18-99
const regexAge = /^(1[89]|[2-9]\d)$/;

// Пароль - те же условия, что у логина, но кириллица
const regexPassword = /^(?=.*[а-яё])(?=.*[А-ЯЁ])(?=(.*\d){3})(?=.*\W)\S{15,}$/;

form.addEventListener('submit', function(event) {
    event.preventDefault(); // отменяет стандартную отправку

    // значения
    const lastname = document.getElementById('lastname').value.trim();
    const name = document.getElementById('name').value.trim();
    const midname = document.getElementById('midname').value.trim();
    const login = document.getElementById('login').value.trim();
    const email = document.getElementById('email').value.trim();
    const age = document.getElementById('age').value.trim();
    const password = document.getElementById('password').value;

    let isValid = true;

    // проверка
    if (!showError('lastname', 'error-lastname', regexFullname.test(lastname))) {
        isValid = false;
    }

    if (!showError('name', 'error-name', regexFullname.test(name))) {
        isValid = false;
    }

    if (!showError('midname', 'error-midname', regexFullname.test(midname))) {
        isValid = false;
    }

    if (!showError('login', 'error-login', regexLogin.test(login))) {
        isValid = false;
    }

    if (!showError('email', 'error-email', regexEmail.test(email))) {
        isValid = false;
    }

    if (!showError('age', 'error-age', regexAge.test(age))) {
        isValid = false;
    }

    if (!showError('password', 'error-password', regexPassword.test(password))) {
        isValid = false;
    }

    // если всё верно
    if (isValid) {
        alert('Форма успешно отправлена!');
        form.reset();
    } else {
        console.log('Форма содержит ошибки');
    }
});

// убирает текст ошибки сразу же как человек начал что то вводить
const inputs = form.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('input', function() {
        this.classList.remove('error');
        const errorDiv = this.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains('error-message')) {
            errorDiv.style.display = 'none';
        }
    });
});