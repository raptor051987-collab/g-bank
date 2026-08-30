document.addEventListener("DOMContentLoaded", function () {

    const button = document.querySelector('a[href="#cabinet"]');
    const cabinet = document.getElementById("cabinet");

    if (!button || !cabinet) return;

    button.addEventListener("click", function (event) {
        event.preventDefault();

        const savedUser = localStorage.getItem("gBankUser");

        if (savedUser) {
            showCabinet(savedUser);
            return;
        }

        const name = prompt("🐦 G-BANK\n\nВведите ваше имя:");

        if (!name || !name.trim()) return;

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

        const balance = localStorage.getItem("gBankBalance") || "12480";

        cabinet.style.display = "block";

        document.getElementById("welcome").textContent =
            "Добро пожаловать, " + name + "!";

        document.getElementById("balance").textContent =
            "💰 Баланс: " +
            Number(balance).toLocaleString("ru-RU") +
            " G-COIN";

        cabinet.scrollIntoView({
            behavior: "smooth"
        });
    }


    // 💳 МОЯ КАРТА

    document.getElementById("cardBtn").addEventListener("click", function () {

        const card = document.getElementById("myCard");
        const cardName = document.getElementById("cardName");
        const user = localStorage.getItem("gBankUser");

        if (!card || !user) return;

        cardName.textContent = user;
        card.style.display = "block";

        card.scrollIntoView({
            behavior: "smooth"
        });

    });


    // 💸 ПЕРЕВОД

    document.getElementById("transferBtn").addEventListener("click", function () {

        const box = document.getElementById("transferBox");

        if (!box) return;

        box.style.display = "block";

    });


    // 📊 ИСТОРИЯ

    document.getElementById("historyBtn").addEventListener("click", function () {

        alert(
            "📊 История операций\n\n" +
            "Пока операций нет."
        );

    });


    // 🚪 ВЫХОД

    document.getElementById("logoutBtn").addEventListener("click", function () {

        localStorage.removeItem("gBankUser");
        localStorage.removeItem("gBankBalance");

        cabinet.style.display = "none";

        alert("Вы вышли из G-BANK.");

    });

});
