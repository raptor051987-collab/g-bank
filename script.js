document.addEventListener("DOMContentLoaded", function () {

    document.addEventListener("click", function (event) {

        // 🏦 ОТКРЫТИЕ СЧЁТА

        const openButton = event.target.closest('a[href="#cabinet"]');

        if (openButton) {

            event.preventDefault();

            let user = localStorage.getItem("gBankUser");

            if (!user) {

                const name = prompt(
                    "🏦 G-BANK\n\nВведите ваше имя:"
                );

                if (!name || !name.trim()) return;

                const password = prompt(
                    "Придумайте пароль для G-BANK:"
                );

                if (!password || password.length < 4) {
                    alert("Пароль должен содержать минимум 4 символа.");
                    return;
                }

                user = name.trim();

                localStorage.setItem("gBankUser", user);
                localStorage.setItem("gBankBalance", "12480");

                if (!localStorage.getItem("gBankHistory")) {
                    localStorage.setItem("gBankHistory", "[]");
                }

                alert(
                    "🎉 Счёт G-BANK создан!\n\n" +
                    "Клиент: " + user + "\n" +
                    "Баланс: 12 480 G-COIN"
                );
            }

            showCabinet(user);
            return;
        }


        // 💳 КАРТА

        if (event.target.closest("#cardBtn")) {

            const card = document.getElementById("myCard");
            const cardName = document.getElementById("cardName");

            if (card) card.style.display = "block";

            if (cardName) {
                cardName.textContent =
                    localStorage.getItem("gBankUser") || "";
            }

            return;
        }


        // 💸 ПЕРЕВЕСТИ

        if (event.target.closest("#transferBtn")) {

            const box = document.getElementById("transferBox");

            if (box) {
                box.style.display = "block";
            }

            return;
        }


        // 💸 ОТПРАВИТЬ

        if (event.target.closest("#sendTransfer")) {

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
                String(newBalance)
            );


            // 📊 СОХРАНЯЕМ ИСТОРИЮ

            let history = JSON.parse(
                localStorage.getItem("gBankHistory") || "[]"
            );

            history.unshift({
                type: "Перевод",
                recipient: recipient,
                amount: amount,
                date: new Date().toLocaleString("ru-RU")
            });

            localStorage.setItem(
                "gBankHistory",
                JSON.stringify(history)
            );


            document.getElementById("balance").textContent =
                "💰 Баланс: " +
                newBalance.toLocaleString("ru-RU") +
                " G-COIN";


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


            document.getElementById("recipient").value = "";
            document.getElementById("transferAmount").value = "";

            return;
        }


        // 📊 ИСТОРИЯ

        if (event.target.closest("#historyBtn")) {

            const historyBox =
                document.getElementById("historyBox");

            const historyList =
                document.getElementById("historyList");


            if (!historyBox || !historyList) return;


            let history = JSON.parse(
                localStorage.getItem("gBankHistory") || "[]"
            );


            historyBox.style.display = "block";


            if (history.length === 0) {

                historyList.innerHTML =
                    '<p style="color:#999;">Операций пока нет.</p>';

                return;
            }


            historyList.innerHTML = "";


            history.forEach(function (operation) {

                const item =
                    document.createElement("div");

                item.style.padding = "15px 0";
                item.style.borderBottom =
                    "1px solid rgba(255,255,255,.08)";

                item.innerHTML =
                    '<div style="font-weight:800;">' +
                    '🔴 ' + operation.type +
                    '</div>' +

                    '<div style="margin-top:6px;color:#aaa;">' +
                    'Получатель: ' +
                    operation.recipient +
                    '</div>' +

                    '<div style="margin-top:6px;color:#e7c84b;font-weight:700;">' +
                    '−' +
                    operation.amount.toLocaleString("ru-RU") +
                    ' G-COIN' +
                    '</div>' +

                    '<div style="margin-top:6px;color:#777;">' +
                    operation.date +
                    '</div>';

                historyList.appendChild(item);

            });


            historyBox.scrollIntoView({
                behavior: "smooth"
            });

            return;
        }


        // 🚪 ВЫЙТИ

        if (event.target.closest("#logoutBtn")) {

            localStorage.removeItem("gBankUser");
            localStorage.removeItem("gBankBalance");

            const cabinet =
                document.getElementById("cabinet");

            if (cabinet) {
                cabinet.style.display = "none";
            }

            return;
        }

    });


    // 👤 ПОКАЗ КАБИНЕТА

    function showCabinet(user) {

        const cabinet =
            document.getElementById("cabinet");

        const welcome =
            document.getElementById("welcome");

        const balanceElement =
            document.getElementById("balance");


        if (cabinet) {
            cabinet.style.display = "block";
        }

        if (welcome) {
            welcome.textContent =
                "Добро пожаловать, " +
                user +
                "!";
        }


        const balance =
            Number(
                localStorage.getItem("gBankBalance") || 12480
            );


        if (balanceElement) {

            balanceElement.textContent =
                "💰 Баланс: " +
                balance.toLocaleString("ru-RU") +
                " G-COIN";
        }

    }

});
