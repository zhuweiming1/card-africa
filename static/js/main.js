document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const menu = document.getElementById('menu');

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', () => {
            menu.classList.toggle('show');
            menuToggle.querySelector('i').classList.toggle('fa-bars');
            menuToggle.querySelector('i').classList.toggle('fa-times');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (menu && menuToggle && menu.classList.contains('show')) {
            if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
                menu.classList.remove('show');
                menuToggle.querySelector('i').classList.add('fa-bars');
                menuToggle.querySelector('i').classList.remove('fa-times');
            }
        }
    });

    // Calculator functionality
    const calculateBtn = document.querySelector('.btn-calculate');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateRate);
    }

    // Initialize calculator with default values
    initializeCalculator();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (menu && menu.classList.contains('show')) {
                    menu.classList.remove('show');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                }
            }
        });
    });
});

function calculateRate() {
    const cardTypeSelect = document.getElementById('card-type');
    const cardAmountInput = document.getElementById('card-amount');
    const resultElement = document.getElementById('result');

    // Exchange rates (₦ per $1)
    const rates = {
        steam: 1355,
        itunes: 1320,
        amazon: 1300,
        google: 1280,
        sephora: 1250
    };

    const cardType = cardTypeSelect.value;
    const cardAmount = parseFloat(cardAmountInput.value) || 0;

    if (cardAmount <= 0) {
        alert(document.documentElement.lang === 'en' ?
            "Please enter a valid amount" :
            "Por favor, insira um valor válido");
        return;
    }

    const rate = rates[cardType] || 1300;
    const result = cardAmount * rate;

    if (resultElement) {
        // Add animation effect
        resultElement.textContent = "0";
        let current = 0;
        const increment = result / 50;

        const timer = setInterval(() => {
            current += increment;
            if (current >= result) {
                clearInterval(timer);
                resultElement.textContent = Math.floor(result).toLocaleString();
            } else {
                resultElement.textContent = Math.floor(current).toLocaleString();
            }
        }, 20);
    }
}

function initializeCalculator() {
    const cardAmountInput = document.getElementById('card-amount');
    if (cardAmountInput) {
        cardAmountInput.value = 100;
        // Trigger calculation after a short delay
        setTimeout(calculateRate, 300);
    }
}