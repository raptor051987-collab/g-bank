document.addEventListener("DOMContentLoaded", function () {

    const loginOpenBtn = document.getElementById("loginOpenBtn");
    const authBox = document.getElementById("authBox");
    const authTitle = document.getElementById("authTitle");
    const loginName = document.getElementById("loginName");
    const loginPassword = document.getElementById("loginPassword");
    const registerPassword = document.getElementById("registerPassword");
    const authActionBtn = document.getElementById("authActionBtn");
    const switchAuthBtn = document.getElementById("switchAuthBtn");

    let registerMode = false;


    // 🔐 ОТКРЫТЬ ОКНО ВХОДА

    if (loginOpenBtn) {

        loginOpenBtn.addEventListener("click", function () {

            authBox.style.display = "block";

            registerMode = false;

            authTitle.textContent = "🔐 Вход в G-BANK";

            authActionBtn.textContent = "Войти";

            switchAuthBtn.textContent =
                "Нет аккаунта? Зарегистрироваться";

            registerPassword.style.display = "none";

        });

    }


    // 🔄 ПЕРЕКЛЮЧЕНИЕ ВХОД / РЕГИСТРАЦИЯ

    if (switchAuthBtn) {

        switchAuthBtn.addEventListener("click", function () {

            registerMode = !registerMode;


            if (registerMode) {

                authTitle.textContent =
                    "📝 Регистрация в G-BANK";

                authActionBtn.textContent =
                    "Создать аккаунт";

                switchAuthBtn.textContent =
                    "Уже есть аккаунт? Войти";

                registerPassword.style.display =
                    "block";

            } else {

                authTitle.textContent =
                    "🔐 Вход в G-BANK";

                authActionBtn.textContent =
                    "Войти";

                switchAuthBtn.textContent =
                    "Нет аккаунта? Зарегистрироваться";

                registerPassword.style.display =
                    "none";

            }

        });

    }


    // 🔐 ВХОД / РЕГИСТРАЦИЯ

    if (authActionBtn) {

        authActionBtn.addEventListener("click", function () {

            const name =
                loginName.value.trim();

            const password =
                loginPassword.value;


            if (!name) {

                alert("Введите имя клиента.");

                return;
            }


            if (!password) {

                alert("Введите пароль.");

                return;
            }


            // 📝 РЕГИСТРАЦИЯ

            if (registerMode) {

                const repeatPassword =
                    registerPassword.value;


                if (password.length < 4) {

                    alert(
                        "Пароль должен содержать минимум 4 символа."
                    );

                    return;
                }


                if (password !== repeatPassword) {

                    alert(
                        "Пароли не совпадают."
                    );

                    return;
                }


                if (localStorage.getItem("gBankUser")) {

                    alert(
                        "Аккаунт уже существует."
                    );

                    return;
                }


                localStorage.setItem(
                    "gBankUser",
                    name
                );

                localStorage.setItem(
                    "gBankPassword",
                    password
                );

                localStorage.setItem(
                    "gBankBalance",
                    "12480"
                );

                localStorage.setItem(
                    "gBankHistory",
                    "[]"
                );


                alert(
                    "🎉 Регистрация завершена!\n\n" +
                    "Добро пожаловать в G-BANK, " +
                    name +
                    "!"
                );


                authBox.style.display =
                    "none";


                showCabinet(name);

                return;
            }


            // 🔐 ВХОД

            const savedUser =
                localStorage.getItem("gBankUser");

            const savedPassword =
                localStorage.getItem("gBankPassword");


            if (!savedUser) {

                alert(
                    "❌ Аккаунт не найден.\n\n" +
                    "Сначала зарегистрируйтесь."
                );

                return;
            }


            if (
                name !== savedUser ||
                password !== savedPassword
            ) {

                alert(
                    "❌ Неверное имя или пароль."
                );

                return;
            }


            alert(
                "✅ Вход выполнен!\n\n" +
                "Добро пожаловать, " +
                savedUser +
                "!"
            );


            authBox.style.display =
                "none";


            showCabinet(savedUser);

        });

    }


    // 💳 КАРТА

    const cardBtn =
        document.getElementById("cardBtn");

    if (cardBtn) {

        cardBtn.addEventListener("click", function () {

            const card =
                document.getElementById("myCard");

            const cardName =
                document.getElementById("cardName");

            if (card) {
                card.style.display = "block";
            }

            if (cardName) {

                cardName.textContent =
                    localStorage.getItem("gBankUser") || "";

            }

        });

    }


    // 💸 ПЕРЕВОД

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


    // 💸 ОТПРАВИТЬ ПЕРЕВОД

    const sendTransfer =
        document.getElementById("sendTransfer");

    if (sendTransfer) {

        sendTransfer.addEventListener("click", function () {

            const recipient =
                document.getElementById("recipient")
                .value.trim();

            const amount =
                Number(
                    document.getElementById("transferAmount")
                    .value
                );


            if (!recipient) {

                alert(
                    "Введите имя получателя."
                );

                return;
            }


            if (!amount || amount <= 0) {

                alert(
                    "Введите корректную сумму."
                );

                return;
            }


            const balance =
                Number(
                    localStorage.getItem(
                        "gBankBalance"
                    ) || "0"
                );


            if (amount > balance) {

                alert(
                    "❌ Недостаточно средств."
                );

                return;
            }


            const newBalance =
                balance - amount;


            localStorage.setItem(
                "gBankBalance",
                String(newBalance)
            );


            const history =
                getHistory();


            history.unshift({

                type: "transfer",

                recipient: recipient,

                amount: amount,

                date: new Date()
                    .toLocaleString("ru-RU")

            });


            saveHistory(history);

            updateBalance(newBalance);


            alert(
                "✅ Перевод выполнен!\n\n" +
                "Получатель: " +
                recipient +
                "\n" +
                "Сумма: −" +
                amount.toLocaleString("ru-RU") +
                " G-COIN"
            );


            document.getElementById(
                "recipient"
            ).value = "";

            document.getElementById(
                "transferAmount"
            ).value = "";

        });

    }


    // 💰 ПОПОЛНЕНИЕ

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


    // 💰 ПОПОЛНИТЬ

    const sendDeposit =
        document.getElementById("sendDeposit");

    if (sendDeposit) {

        sendDeposit.addEventListener("click", function () {

            const amount =
                Number(
                    document.getElementById(
                        "depositAmount"
                    ).value
                );


            if (!amount || amount <= 0) {

                alert(
                    "Введите корректную сумму."
                );

                return;
            }


            const balance =
                Number(
                    localStorage.getItem(
                        "gBankBalance"
                    ) || "0"
                );


            const newBalance =
                balance + amount;


            localStorage.setItem(
                "gBankBalance",
                String(newBalance)
            );


            const history =
                getHistory();


            history.unshift({

                type: "deposit",

                amount: amount,

                date: new Date()
                    .toLocaleString("ru-RU")

            });


            saveHistory(history);

            updateBalance(newBalance);


            alert(
                "✅ Баланс пополнен!\n\n" +
                "+" +
                amount.toLocaleString("ru-RU") +
                " G-COIN"
            );


            document.getElementById(
                "depositAmount"
            ).value = "";

        });

    }


    // 📊 ИСТОРИЯ

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
                    "Блок истории не найден."
                );

                return;
            }


            const history =
                getHistory();


            historyBox.style.display =
                "block";


            if (history.length === 0) {

                historyList.innerHTML =
                    "<p style='color:#999;text-align:center;'>📭 Операций пока нет</p>";

                return;
            }


            historyList.innerHTML = "";


            history.forEach(function (operation) {

                const item =
                    document.createElement("div");


                item.style.padding =
                    "18px 0";

                item.style.borderBottom =
                    "1px solid rgba(255,255,255,.08)";


                if (operation.type === "deposit") {

                    item.innerHTML =

                        "<div style='display:flex;justify-content:space-between;'>" +

                        "<div>" +

                        "<b>🟢 Пополнение</b>" +

                        "<div style='color:#777;margin-top:6px;'>" +
                        operation.date +
                        "</div>" +

                        "</div>" +

                        "<strong style='color:#65c76a;'>" +
                        "+" +
                        Number(operation.amount)
                            .toLocaleString("ru-RU") +
                        " G-COIN" +
                        "</strong>" +

                        "</div>";

                } else {

                    item.innerHTML =

                        "<div style='display:flex;justify-content:space-between;'>" +

                        "<div>" +

                        "<b>🔴 Перевод</b>" +

                        "<div style='color:#aaa;margin-top:6px;'>" +
                        "Получатель: " +
                        escapeHTML(operation.recipient) +
                        "</div>" +

                        "<div style='color:#777;margin-top:6px;'>" +
                        operation.date +
                        "</div>" +

                        "</div>" +

                        "<strong style='color:#e7c84b;'>" +
                        "−" +
                        Number(operation.amount)
                            .toLocaleString("ru-RU") +
                        " G-COIN" +
                        "</strong>" +

                        "</div>";
                }


                historyList.appendChild(item);

            });

        });

    }


    // 🚪 ВЫХОД

    const logoutBtn =
        document.getElementById("logoutBtn");

    if (logoutBtn) {

        logoutBtn.addEventListener("click", function () {

            localStorage.removeItem("gBankUser");
            localStorage.removeItem("gBankPassword");
            localStorage.removeItem("gBankBalance");

            const cabinet =
                document.getElementById("cabinet");

            if (cabinet) {
                cabinet.style.display = "none";
            }

            alert(
                "Вы вышли из G-BANK."
            );

        });

    }


    // 💰 БАЛАНС

    function updateBalance(balance) {

        const element =
            document.getElementById("balance");

        if (element) {

            element.textContent =
                "💰 Баланс: " +
                Number(balance)
                    .toLocaleString("ru-RU") +
                " G-COIN";

        }

    }


    // 📊 ИСТОРИЯ

    function getHistory() {

        try {

            const history =
                JSON.parse(
                    localStorage.getItem(
                        "gBankHistory"
                    ) || "[]"
                );

            return Array.isArray(history)
                ? history
                : [];

        } catch (error) {

            return [];

        }

    }


    function saveHistory(history) {

        localStorage.setItem(
            "gBankHistory",
            JSON.stringify(history)
        );

    }


    // 👤 КАБИНЕТ

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
                localStorage.getItem(
                    "gBankBalance"
                ) || "12480"
            )
        );

    }


    // 🛡️ ЗАЩИТА ТЕКСТА

    function escapeHTML(text) {

        return String(text)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }

});
