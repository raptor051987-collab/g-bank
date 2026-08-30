document.addEventListener("DOMContentLoaded", function () {

    // 🏦 ОТКРЫТИЕ СЧЁТА

    document.addEventListener("click", function (event) {

        const openButton = event.target.closest('a[href="#cabinet"]');

        if (openButton) {

            event.preventDefault();

            let user = localStorage.getItem("gBankUser");

            if (!user) {

                const name = prompt(
                    "🏦 G-BANK\n\nВведите ваше имя:"
                );

                if (!name || !name.trim()) {
                    alert("Имя не введено.");
                    return;
                }

                const password = prompt(
                    "Придумайте пароль для G-BANK:"
                );

                if (!password || password.length < 4) {
                    alert(
                        "Пароль должен содержать минимум 4 символа."
                    );
                    return;
                }

                user = name.trim();

                localStorage.setItem(
                    "gBankUser",
                    user
                );

                localStorage.setItem(
                    "gBankBalance",
                    "12480"
                );

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

        const cardButton =
            event.target.closest("#cardBtn");

        if (cardButton) {

            const card =
                document.getElementById("myCard");

            const cardName =
                document.getElementById("cardName");

            const user =
                localStorage.getItem("gBankUser");

            if (card) {
                card.style.display = "block";
            }

            if (cardName) {
                cardName.textContent = user || "";
            }

            return;
        }


        // 💸 ПЕРЕВЕСТИ

        const transferButton =
            event.target.closest("#transferBtn");

        if (transferButton) {

            const box =
                document.getElementById("transferBox");

            if (box) {
                box.style.display = "block";
            }

            return;
        }


        // 💸 ОТПРАВИТЬ

        const sendButton =
            event.target.closest("#sendTransfer");

        if (sendButton) {

            const recipientInput =
                document.getElementById("recipient");

            const amountInput =
                document.getElementById("transferAmount");

            const recipient =
                recipientInput
                    ? recipientInput.value.trim()
                    : "";

            const amount =
                amountInput
                    ? Number(amountInput.value)
                    : 0;


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
                    localStorage.getItem(
                        "gBankBalance"
                    ) || 0
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


            const newBalance =
                balance - amount;


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
                "Получатель: " +
                recipient +
                "\n" +
                "Сумма: " +
                amount.toLocaleString("ru-RU") +
                " G-COIN\n\n" +
                "Новый баланс: " +
                newBalance.toLocaleString("ru-RU") +
                " G-COIN"
            );


            if (recipientInput) {
                recipientInput.value = "";
            }

            if (amountInput) {
                amountInput.value = "";
            }

            return;
        }


        // 📊 ИСТОРИЯ

        const historyButton =
            event.target.closest("#historyBtn");

        if (historyButton) {

            alert(
                "📊 История операций\n\n" +
                "Операций пока нет."
            );

            return;
        }


        // 🚪 ВЫХОД

        const logoutButton =
            event.target.closest("#logoutBtn");

        if (logoutButton) {

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
                localStorage.getItem(
                    "gBankBalance"
                ) || 12480
            );


        if (balanceElement) {

            balanceElement.textContent =
                "💰 Баланс: " +
                balance.toLocaleString("ru-RU") +
                " G-COIN";
        }

    }

});
