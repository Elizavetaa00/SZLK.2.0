// Основной JavaScript файл

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initActiveNav();
    initScrollToTop();
    initAnimations();
    initCurrentYear();
});

// ИНИЦИАЛИЗАЦИЯ МОБИЛЬНОГО МЕНЮ (ПОЛНОСТЬЮ ПЕРЕПИСАНА)
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    console.log('mobileMenuBtn:', mobileMenuBtn); // Для отладки
    console.log('mobileMenu:', mobileMenu); // Для отладки
    
    if (!mobileMenuBtn || !mobileMenu) {
        console.log('Элементы мобильного меню не найдены');
        return;
    }
    
    // Удаляем все старые обработчики (на всякий случай)
    mobileMenuBtn.replaceWith(mobileMenuBtn.cloneNode(true));
    const newMobileMenuBtn = document.getElementById('mobileMenuBtn');
    
    // Добавляем новый обработчик
    newMobileMenuBtn.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        console.log('Клик по кнопке меню');
        
        // Переключаем класс active
        mobileMenu.classList.toggle('active');
        
        // Меняем иконку
        const icon = this.querySelector('i');
        if (icon) {
            if (mobileMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                console.log('Меню открыто');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                console.log('Меню закрыто');
            }
        }
    });
    
    // Закрытие при клике на ссылку
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            const icon = newMobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Закрытие при клике вне меню
    document.addEventListener('click', function(event) {
        if (mobileMenu.classList.contains('active')) {
            if (!mobileMenu.contains(event.target) && !newMobileMenuBtn.contains(event.target)) {
                mobileMenu.classList.remove('active');
                const icon = newMobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    });
    
    // Предотвращаем всплытие клика по самому меню
    mobileMenu.addEventListener('click', function(event) {
        event.stopPropagation();
    });
}

// Инициализация активной навигации
function initActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    console.log('Текущая страница:', currentPage);
    
    // Сначала убираем active у всех ссылок
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Добавляем active только для текущей страницы
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        
        // Для обычных страниц
        if (linkPage === currentPage) {
            link.classList.add('active');
            console.log('Активирована ссылка:', linkPage);
        }
        
        // Особый случай для главной страницы
        if ((currentPage === '' || currentPage === 'index.html') && 
            (linkPage === 'index.html' || linkPage === '')) {
            link.classList.add('active');
        }
    });
}

// Инициализация кнопки "Наверх"
function initScrollToTop() {
    // Создаем кнопку если её нет
    let scrollBtn = document.getElementById('scrollToTop');
    
    if (!scrollBtn) {
        scrollBtn = document.createElement('button');
        scrollBtn.id = 'scrollToTop';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        scrollBtn.title = 'Наверх';
        document.body.appendChild(scrollBtn);
        
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Показать/скрыть кнопку при прокрутке
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
}

// Инициализация анимаций
function initAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .client-card, .advantage-card, .achievement-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Обновление года в футере
function initCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Показать сообщение
function showMessage(elementId, message, type) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.className = `form-message ${type}`;
        element.style.display = 'block';
        
        if (type === 'success') {
            setTimeout(() => {
                element.style.display = 'none';
            }, 5000);
        }
    }
}

// Проверка валидности поля
function validateField(field) {
    const value = field.value.trim();
    const errorElement = field.nextElementSibling;
    
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.style.display = 'none';
    }
    
    field.classList.remove('error');
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'Это поле обязательно для заполнения');
        return false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Введите корректный email адрес');
            return false;
        }
    }
    
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            showFieldError(field, 'Введите корректный номер телефона');
            return false;
        }
    }
    
    return true;
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
}

// Валидация всей формы
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    let isValid = true;
    const fields = form.querySelectorAll('input, textarea, select');
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Отправка формы
function submitForm(formId, successMessage) {
    const form = document.getElementById(formId);
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm(formId)) {
            showMessage('formMessage', successMessage || 'Форма успешно отправлена!', 'success');
            form.reset();
            
            document.getElementById('formMessage').scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
        } else {
            showMessage('formMessage', 'Пожалуйста, исправьте ошибки в форме', 'error');
        }
    });
}