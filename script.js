document.addEventListener("DOMContentLoaded", function () {

    document.addEventListener("click", function (event) {

        // 🏦 ОТКРЫТЬ СЧЁТ
        const openButton = event.target.closest('a[href="#cabinet"]');

        if (openButton) {
            event.preventDefault();

            let user = localStorage.getItem("gBankUser");

            if (!user) {
                const name = prompt("🏦 G-BANK\n\nВведите ваше имя:");

                if (!name || !name.trim()) return;

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
            return;
        }


        // 💳 МОЯ КАРТА
        if (event.target.closest("#cardBtn")) {

            const card = document.getElementById("myCard");
            const cardName = document.getElementById("cardName");

            if (card) {
                card.style.display = "block";
            }

            if (cardName) {
                cardName.textContent =
                    localStorage.getItem("gBankUser") || "";
            }

            return;
        }


        // 💸 ОТКРЫТЬ ПЕРЕВОД
        if (event.target.closest("#transferBtn")) {

            const box = document.getElementById("transferBox");

            if (box) {
                box.style.display = "block";
            }

            return;
        }


        // 💸 ОТПРАВИТЬ ПЕРЕВОД
        if (event.target.closest("#sendTransfer")) {

            const recipientInput =
                document.getElementById("recipient");

            const amountInput =
                document.getElementById("transferAmount");

            const recipient =
                recipientInput.value.trim();

            const amount =
                Number(amountInput.value);


            if (!recipient) {
                alert("Введите имя получателя.");
                return;
            }


            if (!amount || amount <= 0) {
                alert("Введите корректную сумму.");
                return;
            }


            const balance =
                Number(
                    localStorage.getItem("gBankBalance") || 0
                );


            if (amount > balance) {
                alert(
                    "❌ Недостаточно средств.\n\n" +
                    "Ваш баланс: " +
                    balance.toLocaleString("ru-RU") +
                    " G-COIN"
                );
                return;
            }


            // 💰 НОВЫЙ БАЛАНС
            const newBalance = balance - amount;

            localStorage.setItem(
                "gBankBalance",
                String(newBalance)
            );


            // 📊 СОХРАНЯЕМ ИСТОРИЮ
            let history = [];

            try {
                history = JSON.parse(
                    localStorage.getItem("gBankHistory") || "[]"
                );

                if (!Array.isArray(history)) {
                    history = [];
                }

            } catch (error) {
                history = [];
            }


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


            // 🔄 ОБНОВЛЯЕМ БАЛАНС НА ЭКРАНЕ
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


            recipientInput.value = "";
            amountInput.value = "";

            return;
        }


        // 📊 ИСТОРИЯ
        if (event.target.closest("#historyBtn")) {

            const historyBox =
                document.getElementById("historyBox");

            const historyList =
                document.getElementById("historyList");


            if (!historyBox || !historyList) {
                alert("Ошибка: блок истории не найден.");
                return;
            }


            let history = [];

            try {
                history = JSON.parse(
                    localStorage.getItem("gBankHistory") || "[]"
                );

                if (!Array.isArray(history)) {
                    history = [];
                }

            } catch (error) {
                history = [];
            }


            historyBox.style.display = "block";


            if (history.length === 0) {

                historyList.innerHTML = `
                    <div style="
                        padding:20px;
                        text-align:center;
                        color:#999;
                    ">
                        📭 Операций пока нет
                    </div>
                `;

                return;
            }


            historyList.innerHTML = "";


            history.forEach(function (operation) {

                const item =
                    document.createElement("div");

                item.style.padding = "18px 0";
                item.style.borderBottom =
                    "1px solid rgba(255,255,255,.08)";


                item.innerHTML = `
                    <div style="
                        display:flex;
                        justify-content:space-between;
                        align-items:center;
                    ">
                        <div>
                            <div style="
                                font-size:17px;
                                font-weight:800;
                            ">
                                💸 Перевод
                            </div>

                            <div style="
                                margin-top:7px;
                                color:#aaa;
                            ">
                                Получатель: ${escapeHTML(operation.recipient)}
                            </div>

                            <div style="
                                margin-top:6px;
                                color:#777;
                                font-size:13px;
                            ">
                                ${operation.date}
                            </div>
                        </div>

                        <div style="
                            color:#e7c84b;
                            font-size:18px;
                            font-weight:800;
                        ">
                            −${Number(operation.amount).toLocaleString("ru-RU")}
                            G-COIN
                        </div>
                    </div>
                `;


                historyList.appendChild(item);

            });


            historyBox.scrollIntoView({
                behavior: "smooth",
                block: "center"
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

            alert("Вы вышли из G-BANK.");

            return;
        }

    });


    // 👤 ПОКАЗАТЬ КАБИНЕТ
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


    // 🛡️ ЗАЩИТА ТЕКСТА ПОЛУЧАТЕЛЯ
    function escapeHTML(text) {

        return String(text)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }

});
