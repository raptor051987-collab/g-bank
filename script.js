document.addEventListener("DOMContentLoaded", function () {

    const button = document.querySelector('a[href="#cabinet"]');
    const cabinet = document.getElementById("cabinet");
    const welcome = document.getElementById("welcome");
    const balance = document.getElementById("balance");

    if (!button || !cabinet) return;

    button.addEventListener("click", function (event) {
        event.preventDefault();

        const savedUser = localStorage.getItem("gBankUser");

        if (savedUser) {
            showCabinet(savedUser);
            return;
        }

        const name = prompt("🐦 G-BANK\n\nВведите ваше имя:");

        if (!name || !name.trim()) {
            alert("Имя не введено.");
            return;
        }

        const password = prompt("Придумайте пароль для G-BANK:");

        if (!password || password.length < 4) {
            alert("Пароль должен содержать минимум 4 символа.");
            return;
        }

        localStorage.setItem("gBankUser", name.trim());
        localStorage.setItem("gBankBalance", "12480");

        showCabinet(name.trim());
    });

    function showCabinet(name) {
        const savedBalance = localStorage.getItem("gBankBalance") || "12480";

        cabinet.style.display = "block";
        welcome.textContent = "Добро пожаловать, " + name + "!";
        balance.textContent = "💰 Баланс: " + Number(savedBalance).toLocaleString("ru-RU") + " G-COIN";

        cabinet.scrollIntoView({
            behavior: "smooth"
        });
    }

    document.getElementById("cardBtn").addEventListener("click", function () {
        alert("💳 G-CARD\n\n0000 • 0000 • 0000 • 0001");
    });

    document.getElementById("transferBtn").addEventListener("click", function () {
        alert("💸 Переводы пока находятся в разработке.");
    });

    document.getElementById("historyBtn").addEventListener("click", function () {
        alert("📊 История операций\n\nПока операций нет.");
    });

    document.getElementById("logoutBtn").addEventListener("click", function () {
        localStorage.removeItem("gBankUser");
        localStorage.removeItem("gBankBalance");

        cabinet.style.display = "none";

        alert("Вы вышли из G-BANK.");
    });

});
