// Валидация форм

document.addEventListener('DOMContentLoaded', function() {
    initRegistrationForm();
    initContactForm();
});

// Инициализация формы регистрации
function initRegistrationForm() {
    const registrationForm = document.getElementById('registrationForm');
    
    if (registrationForm) {
        // Валидация полей в реальном времени
        const fields = registrationForm.querySelectorAll('input, textarea, select');
        
        fields.forEach(field => {
            field.addEventListener('blur', function() {
                validateField(this);
            });
            
            field.addEventListener('input', function() {
                // Сброс ошибки при вводе
                if (this.classList.contains('error')) {
                    this.classList.remove('error');
                    const errorElement = this.nextElementSibling;
                    if (errorElement && errorElement.classList.contains('error-message')) {
                        errorElement.style.display = 'none';
                    }
                }
            });
        });
        
        // Обработка отправки формы
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            fields.forEach(field => {
                if (!validateField(field)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                // Симуляция отправки на сервер
                const submitBtn = registrationForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    // В реальном приложении здесь будет AJAX-запрос
                    showSuccessMessage();
                    registrationForm.reset();
                    
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            } else {
                showMessage('formMessage', 'Пожалуйста, исправьте ошибки в форме', 'error');
            }
        });
    }
}

// Дополнительная валидация для полей
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    // Общие проверки
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'Это поле обязательно для заполнения');
        return false;
    }
    
    // Проверки для конкретных типов полей
    switch (field.type) {
        case 'email':
            if (value && !isValidEmail(value)) {
                showFieldError(field, 'Введите корректный email адрес');
                isValid = false;
            }
            break;
            
        case 'tel':
            if (value && !isValidPhone(value)) {
                showFieldError(field, 'Введите корректный номер телефона (минимум 10 цифр)');
                isValid = false;
            }
            break;
            
        case 'text':
            if (field.id === 'inn' && value && !isValidINN(value)) {
                showFieldError(field, 'ИНН должен содержать 10 или 12 цифр');
                isValid = false;
            }
            break;
    }
    
    return isValid;
}

// Валидация email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Валидация телефона
function isValidPhone(phone) {
    // Удаляем все нецифровые символы
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 10;
}

// Валидация ИНН
function isValidINN(inn) {
    const innRegex = /^\d{10}$|^\d{12}$/;
    return innRegex.test(inn);
}

// Показать ошибку поля
function showFieldError(field, message) {
    field.classList.add('error');
    
    let errorElement = field.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    
    // Прокрутка к полю с ошибкой
    field.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
}

// Показать сообщение об успехе
function showSuccessMessage() {
    const successMessage = `
        <div class="form-message success">
            <h3><i class="fas fa-check-circle"></i> Заявка успешно отправлена!</h3>
            <p>Спасибо за вашу заявку. Наш менеджер свяжется с вами в течение 1 рабочего дня.</p>
            <p>Вы также можете связаться с нами по телефону: +7 (3463) 20 53 83</p>
        </div>
    `;
    
    const formMessage = document.getElementById('formMessage');
    if (formMessage) {
        formMessage.innerHTML = successMessage;
        formMessage.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
}

// Показать сообщение
function showMessage(elementId, message, type) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = `
            <div class="form-message ${type}">
                <p><i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}-circle"></i> ${message}</p>
            </div>
        `;
    }
}

// Инициализация контактной формы (если будет на других страницах)
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm('contactForm')) {
                showMessage('contactMessage', 'Сообщение успешно отправлено! Мы ответим вам в ближайшее время.', 'success');
                contactForm.reset();
            }
        });
    }
}