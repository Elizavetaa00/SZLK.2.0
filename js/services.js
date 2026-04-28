// services.js - функциональность для страницы услуг

document.addEventListener('DOMContentLoaded', function() {
    initServicesSearch();
    initServicesFilter();
    initServiceButtons();
    initContactActions();
});

// Поиск по услугам
function initServicesSearch() {
    const searchInput = document.getElementById('serviceSearch');
    const searchBtn = document.querySelector('.services-search-btn');
    const serviceCards = document.querySelectorAll('.premium-service-card, .additional-card');
    
    function filterServices() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        serviceCards.forEach(card => {
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const description = card.querySelector('p')?.textContent.toLowerCase() || '';
            
            if (title.includes(searchTerm) || description.includes(searchTerm) || searchTerm === '') {
                card.style.display = 'block';
                card.classList.add('fade-in');
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', filterServices);
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', filterServices);
    }
}

// Фильтр по тегам
function initServicesFilter() {
    const tags = document.querySelectorAll('.service-tag');
    const serviceCards = document.querySelectorAll('.premium-service-card, .additional-card');
    
    tags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Убираем активный класс у всех тегов
            tags.forEach(t => t.classList.remove('active'));
            // Добавляем активный класс текущему тегу
            this.classList.add('active');
            
            const filterValue = this.textContent.toLowerCase().trim();
            
            if (filterValue === 'все услуги') {
                serviceCards.forEach(card => {
                    card.style.display = 'block';
                    card.classList.add('fade-in');
                });
            } else {
                serviceCards.forEach(card => {
                    const cardText = card.textContent.toLowerCase();
                    if (cardText.includes(filterValue)) {
                        card.style.display = 'block';
                        card.classList.add('fade-in');
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        });
    });
}

// Кнопки подробнее
function initServiceButtons() {
    const detailButtons = document.querySelectorAll('.premium-service-btn, .meta-link');
    
    detailButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Находим название услуги
            const serviceCard = this.closest('.premium-service-card, .additional-card');
            const serviceName = serviceCard?.querySelector('h3')?.textContent || 'Услуга';
            
            // Показываем уведомление с информацией
            showServiceNotification(serviceName);
            
            // Плавная прокрутка к форме регистрации
            setTimeout(() => {
                window.location.href = 'registration.html';
            }, 2000);
        });
    });
}

// Обработка контактных действий
function initContactActions() {
    const contactLinks = document.querySelectorAll('.contact-action');
    
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Для email и телефона разрешаем стандартное поведение
            if (this.getAttribute('href').startsWith('mailto:') || 
                this.getAttribute('href').startsWith('tel:')) {
                return true;
            }
        });
    });
}

// Уведомление о выборе услуги
function showServiceNotification(serviceName) {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = 'service-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-info-circle"></i>
            <div>
                <h4>Вы выбрали услугу</h4>
                <p>"${serviceName}"</p>
                <p class="small">Сейчас вы будете перенаправлены на страницу регистрации</p>
            </div>
        </div>
    `;
    
    // Добавляем стили для уведомления
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: var(--white);
        border-left: 5px solid var(--red);
        border-radius: 10px;
        padding: 20px 25px;
        box-shadow: 0 10px 40px rgba(255, 0, 0, 0.2);
        z-index: 1000;
        animation: slideIn 0.5s ease-out;
        border: 2px solid var(--red);
        max-width: 350px;
    `;
    
    // Добавляем в DOM
    document.body.appendChild(notification);
    
    // Удаляем через 2 секунды
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 2000);
}

// Добавляем ключевые кадры для анимации
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .service-notification {
        transition: all 0.3s;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 15px;
    }
    
    .notification-content i {
        font-size: 2.5rem;
        color: var(--red);
    }
    
    .notification-content h4 {
        color: var(--black);
        margin-bottom: 5px;
        font-size: 1.1rem;
    }
    
    .notification-content p {
        color: var(--gray-dark);
        margin: 0;
        font-size: 0.95rem;
    }
    
    .notification-content .small {
        font-size: 0.8rem;
        margin-top: 5px;
        color: var(--gray-dark);
        opacity: 0.8;
    }
`;

document.head.appendChild(style);