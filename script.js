document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // 🏦 ОТКРЫТИЕ КАБИНЕТА
    // =========================

    const openButton = document.querySelector('a[href="#cabinet"]');

    if (openButton) {
        openButton.addEventListener("click", function (event) {

            event.preventDefault();

            let user = localStorage.getItem("gBankUser");

            if (!user) {

                const name = prompt(
                    "🏦 G-BANK\n\nВведите ваше имя:"
                );

                if (!name || !name.trim()) {
                    return;
                }

                const password = prompt(
                    "🔐 Придумайте пароль:"
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
        });
    }


    // =========================
    // 💳 МОЯ КАРТА
    // =========================

    const cardBtn = document.getElementById("cardBtn");

    if (cardBtn) {

        cardBtn.addEventListener("click", function () {

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


    // =========================
    // 💸 ОТКРЫТЬ ПЕРЕВОД
    // =========================

    const transferBtn =
        document.getElementById("transferBtn");

    if (transferBtn) {

        transferBtn.addEventListener("click", function () {

            const box =
                document.getElementById("transferBox");

            if (box) {
                box.style.display = "block";
            }

        });
    }


    // =========================
    // 💸 ОТПРАВИТЬ ПЕРЕВОД
    // =========================

    const sendTransfer =
        document.getElementById("sendTransfer");

    if (sendTransfer) {

        sendTransfer.addEventListener("click", function () {

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
                    localStorage.getItem("gBankBalance") || "12480"
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


            // 📊 Записываем операцию

            const history = getHistory();

            history.unshift({

                type: "transfer",

                recipient: recipient,

                amount: amount,

                date: new Date().toLocaleString("ru-RU")

            });


            saveHistory(history);

            updateBalance(newBalance);


            alert(
                "✅ Перевод выполнен!\n\n" +
                "Получатель: " + recipient + "\n" +
                "Сумма: −" +
                amount.toLocaleString("ru-RU") +
                " G-COIN\n\n" +
                "Новый баланс: " +
                newBalance.toLocaleString("ru-RU") +
                " G-COIN"
            );


            recipientInput.value = "";
            amountInput.value = "";

        });
    }


    // =========================
    // 💰 ОТКРЫТЬ ПОПОЛНЕНИЕ
    // =========================

    const depositBtn =
        document.getElementById("depositBtn");

    if (depositBtn) {

        depositBtn.addEventListener("click", function () {

            const box =
                document.getElementById("depositBox");

            if (box) {
                box.style.display = "block";
            }

        });
    }


    // =========================
    // 💰 ПОПОЛНИТЬ БАЛАНС
    // =========================

    const sendDeposit =
        document.getElementById("sendDeposit");

    if (sendDeposit) {

        sendDeposit.addEventListener("click", function () {

            const amountInput =
                document.getElementById("depositAmount");

            const amount =
                Number(amountInput.value);


            if (!amount || amount <= 0) {

                alert(
                    "Введите корректную сумму."
                );

                return;
            }


            const balance =
                Number(
                    localStorage.getItem("gBankBalance") || "0"
                );


            const newBalance =
                balance + amount;


            localStorage.setItem(
                "gBankBalance",
                String(newBalance)
            );


            // 📊 Записываем пополнение

            const history = getHistory();

            history.unshift({

                type: "deposit",

                amount: amount,

                date: new Date().toLocaleString("ru-RU")

            });


            saveHistory(history);

            updateBalance(newBalance);


            alert(
                "✅ Баланс пополнен!\n\n" +
                "+" +
                amount.toLocaleString("ru-RU") +
                " G-COIN\n\n" +
                "Новый баланс: " +
                newBalance.toLocaleString("ru-RU") +
                " G-COIN"
            );


            amountInput.value = "";

        });
    }


    // =========================
    // 📊 ИСТОРИЯ
    // =========================

    const historyBtn =
        document.getElementById("historyBtn");

    if (historyBtn) {

        historyBtn.addEventListener("click", function () {

            const historyBox =
                document.getElementById("historyBox");

            const historyList =
                document.getElementById("historyList");


            if (!historyBox || !historyList) {

                alert(
                    "❌ Блок истории не найден."
                );

                return;
            }


            const history = getHistory();


            historyBox.style.display = "block";


            if (history.length === 0) {

                historyList.innerHTML = `
                    <div style="
                        text-align:center;
                        padding:20px;
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


                if (operation.type === "deposit") {

                    item.innerHTML = `

                        <div style="
                            display:flex;
                            justify-content:space-between;
                            align-items:center;
                        ">

                            <div>

                                <div style="
                                    font-weight:800;
                                    font-size:17px;
                                ">
                                    🟢 Пополнение
                                </div>

                                <div style="
                                    color:#777;
                                    margin-top:6px;
                                    font-size:13px;
                                ">
                                    ${operation.date}
                                </div>

                            </div>

                            <div style="
                                color:#65c76a;
                                font-weight:800;
                                font-size:18px;
                            ">
                                +${Number(operation.amount).toLocaleString("ru-RU")}
                                G-COIN
                            </div>

                        </div>

                    `;

                } else {

                    item.innerHTML = `

                        <div style="
                            display:flex;
                            justify-content:space-between;
                            align-items:center;
                        ">

                            <div>

                                <div style="
                                    font-weight:800;
                                    font-size:17px;
                                ">
                                    🔴 Перевод
                                </div>

                                <div style="
                                    color:#aaa;
                                    margin-top:6px;
                                ">
                                    Получатель:
                                    ${escapeHTML(operation.recipient)}
                                </div>

                                <div style="
                                    color:#777;
                                    margin-top:6px;
                                    font-size:13px;
                                ">
                                    ${operation.date}
                                </div>

                            </div>

                            <div style="
                                color:#e7c84b;
                                font-weight:800;
                                font-size:18px;
                            ">
                                −${Number(operation.amount).toLocaleString("ru-RU")}
                                G-COIN
                            </div>

                        </div>

                    `;

                }


                historyList.appendChild(item);

            });


            historyBox.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        });
    }


    // =========================
    // 🚪 ВЫХОД
    // =========================

    const logoutBtn =
        document.getElementById("logoutBtn");

    if (logoutBtn) {

        logoutBtn.addEventListener("click", function () {

            localStorage.removeItem("gBankUser");
            localStorage.removeItem("gBankBalance");

            const cabinet =
                document.getElementById("cabinet");

            if (cabinet) {
                cabinet.style.display = "none";
            }

            alert("Вы вышли из G-BANK.");

        });
    }


    // =========================
    // 👤 ПОКАЗАТЬ КАБИНЕТ
    // =========================

    function showCabinet(user) {

        const cabinet =
            document.getElementById("cabinet");

        const welcome =
            document.getElementById("welcome");


        if (cabinet) {
            cabinet.style.display = "block";
        }


        if (welcome) {

            welcome.textContent =
                "Добро пожаловать, " +
                user +
                "!";
        }


        updateBalance(
            Number(
                localStorage.getItem("gBankBalance") || "12480"
            )
        );

    }


    // =========================
    // 💰 ОБНОВИТЬ БАЛАНС
    // =========================

    function updateBalance(balance) {

        const balanceElement =
            document.getElementById("balance");

        if (balanceElement) {

            balanceElement.textContent =
                "💰 Баланс: " +
                Number(balance).toLocaleString("ru-RU") +
                " G-COIN";

        }

    }


    // =========================
    // 📊 ПОЛУЧИТЬ ИСТОРИЮ
    // =========================

    function getHistory() {

        try {

            const history =
                JSON.parse(
                    localStorage.getItem("gBankHistory") || "[]"
                );

            if (Array.isArray(history)) {
                return history;
            }

        } catch (error) {

        }

        return [];

    }


    // =========================
    // 💾 СОХРАНИТЬ ИСТОРИЮ
    // =========================

    function saveHistory(history) {

        localStorage.setItem(
            "gBankHistory",
            JSON.stringify(history)
        );

    }


    // =========================
    // 🛡️ ЗАЩИТА ТЕКСТА
    // =========================

    function escapeHTML(text) {

        return String(text)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }

});
