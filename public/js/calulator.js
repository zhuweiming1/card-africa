// static/js/calculator.js
document.addEventListener('DOMContentLoaded', () => {
    const rates = {
        steam: 1355,
        itunes: 1086,
        ebay: 953,
        google_play: 549
    };

    const calculateBtn = document.querySelector('.btn-calculate');
    const resultEl = document.getElementById('result');

    calculateBtn.addEventListener('click', () => {
        const cardType = document.getElementById('card-type').value;
        const amount = parseFloat(document.getElementById('card-amount').value);

        if (!amount || isNaN(amount)) {
            alert("Please enter a valid amount");
            return;
        }

        const rate = rates[cardType];
        const total = amount * rate;

        resultEl.textContent = total.toLocaleString();
    });
});