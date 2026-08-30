document.addEventListener("DOMContentLoaded", function () {

    const openButton = document.querySelector('a[href="#cabinet"]');
    const cabinet = document.getElementById("cabinet");

    if (!openButton || !cabinet) return;


    // 🏦 ОТКРЫТИЕ СЧЁТА

    openButton.addEventListener("click", function (event) {

        event.preventDefault();

        let user = localStorage.getItem("gBankUser");

        if (!user) {

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

            user = name.trim();

            localStorage.setItem("gBankUser", user);
            localStorage.setItem("gBankBalance", "12480");

            alert(
                "🎉 Счёт G-BANK создан!\n\n" +
                "Клиент: " + user + "\n" +
                "Баланс: 12 480 G-COIN"
            );
        }

        showCabinet(user);
    });


    // 👤 КАБИНЕТ

    function showCabinet(user) {

        const balance = Number(
            localStorage.getItem("gBankBalance") || 12480
        );

        cabinet.style.display = "block";

        const welcome = document.getElementById("welcome");
        const balanceElement = document.getElementById("balance");

        if (welcome) {
            welcome.textContent =
                "Добро пожаловать, " + user + "!";
        }

        if (balanceElement) {
            balanceElement.textContent =
                "💰 Баланс: " +
                balance.toLocaleString("ru-RU") +
                " G-COIN";
        }

        cabinet.scrollIntoView({
            behavior: "smooth"
        });
    }


    // 💳 КАРТА

    const cardButton = document.getElementById("cardBtn");

    if (cardButton) {

        cardButton.addEventListener("click", function () {

            const card = document.getElementById("myCard");
            const cardName = document.getElementById("cardName");

            if (card) {
                card.style.display = "block";
            }

            if (cardName) {
                cardName.textContent =
                    localStorage.getItem("gBankUser") || "";
            }

        });
    }


    // 💸 ОТКРЫТЬ ПЕРЕВОД

    const transferButton = document.getElementById("transferBtn");

    if (transferButton) {

        transferButton.addEventListener("click", function () {

            const box = document.getElementById("transferBox");

            if (!box) return;

            box.style.display = "block";

            box.scrollIntoView({
                behavior: "smooth"
            });

        });
    }


    // 💸 ОТПРАВИТЬ ПЕРЕВОД

    const sendButton = document.getElementById("sendTransfer");

    if (sendButton) {

        sendButton.addEventListener("click", function () {

            const recipientElement =
                document.getElementById("recipient");

            const amountElement =
                document.getElementById("transferAmount");

            const recipient =
                recipientElement ? recipientElement.value.trim() : "";

            const amount =
                amountElement ? Number(amountElement.value) : 0;

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
                String(newBalance)
            );

            const balanceElement =
                document.getElementById("balance");

            if (balanceElement) {
                balanceElement.textContent =
                    "💰 Баланс: " +
                    newBalance.toLocaleString("ru-RU") +
                    " G-COIN";
            }

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

            if (recipientElement) {
                recipientElement.value = "";
            }

            if (amountElement) {
                amountElement.value = "";
            }

        });
    }


    // 📊 ИСТОРИЯ

    const historyButton =
        document.getElementById("historyBtn");

    if (historyButton) {

        historyButton.addEventListener("click", function () {

            alert(
                "📊 История операций\n\n" +
                "Операций пока нет."
            );

        });
    }


    // 🚪 ВЫХОД

    const logoutButton =
        document.getElementById("logoutBtn");

    if (logoutButton) {

        logoutButton.addEventListener("click", function () {

            localStorage.removeItem("gBankUser");
            localStorage.removeItem("gBankBalance");

            cabinet.style.display = "none";

            alert("Вы вышли из G-BANK.");

        });
    }

});
