document.addEventListener("DOMContentLoaded", function () {

    const button = document.querySelector('a[href="#cabinet"]');
    const cabinet = document.getElementById("cabinet");

    if (!button || !cabinet) return;


    // 🏦 ОТКРЫТИЕ СЧЁТА

    button.addEventListener("click", function (event) {

        event.preventDefault();

        const savedUser = localStorage.getItem("gBankUser");

        if (savedUser) {
            showCabinet(savedUser);
            return;
        }

        const name = prompt("🏦 G-BANK\n\nВведите ваше имя:");

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

        alert(
            "🎉 Счёт G-BANK создан!\n\n" +
            "Клиент: " + name.trim() + "\n" +
            "Баланс: 12 480 G-COIN"
        );

        showCabinet(name.trim());

    });


    // 👤 ЛИЧНЫЙ КАБИНЕТ

    function showCabinet(name) {

        const balance = Number(
            localStorage.getItem("gBankBalance") || 12480
        );

        cabinet.style.display = "block";

        document.getElementById("welcome").textContent =
            "Добро пожаловать, " + name + "!";

        document.getElementById("balance").textContent =
            "💰 Баланс: " +
            balance.toLocaleString("ru-RU") +
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


    // 💸 ОКНО ПЕРЕВОДА

    document.getElementById("transferBtn").addEventListener("click", function () {

        const box = document.getElementById("transferBox");

        if (!box) return;

        box.style.display = "block";

        box.scrollIntoView({
            behavior: "smooth"
        });

    });


    // 💸 ОТПРАВКА ПЕРЕВОДА

    document.getElementById("sendTransfer").addEventListener("click", function () {

        const recipient =
            document.getElementById("recipient").value.trim();

        const amount =
            Number(document.getElementById("transferAmount").value);

        if (!recipient) {
            alert("Введите имя получателя.");
            return;
        }

        if (!amount || amount <= 0) {
            alert("Введите корректную сумму.");
            return;
        }

        const balance =
            Number(localStorage.getItem("gBankBalance") || 0);

        if (amount > balance) {
            alert("❌ Недостаточно средств.");
            return;
        }

        const newBalance = balance - amount;

        localStorage.setItem(
            "gBankBalance",
            newBalance
        );

        alert(
            "✅ Перевод выполнен!\n\n" +
            "Получатель: " + recipient + "\n" +
            "Сумма: " +
            amount.toLocaleString("ru-RU") +
            " G-COIN\n\n" +
            "Новый баланс: " +
            newBalance.toLocaleString("ru-RU") +
            " G-COIN"
        );

        document.getElementById("balance").textContent =
            "💰 Баланс: " +
            newBalance.toLocaleString("ru-RU") +
            " G-COIN";

        document.getElementById("recipient").value = "";
        document.getElementById("transferAmount").value = "";

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
