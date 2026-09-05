const SUPABASE_URL = "https://lfisabcgwlcqniphoohm.supabase.co";
const SUPABASE_KEY = "sb_publishable_jwJUmiV1f83556Z6zWKLNw_ekhLufyp";

const AUTH_URL = SUPABASE_URL + "/auth/v1";

let currentUser = null;


// ===============================
// 🔐 РЕГИСТРАЦИЯ
// ===============================

async function registerUser(username, email, password) {

    const response = await fetch(
        AUTH_URL + "/signup",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "apikey": SUPABASE_KEY
            },

            body: JSON.stringify({
                email: email,
                password: password,

                data: {
                    username: username
                }
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.msg ||
            data.message ||
            data.error_description ||
            "Не удалось создать аккаунт."
        );
    }

    return data;
}


// ===============================
// 🔑 ВХОД
// ===============================

async function loginUser(email, password) {

    const response = await fetch(
        AUTH_URL + "/token?grant_type=password",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "apikey": SUPABASE_KEY
            },

            body: JSON.stringify({
                email: email,
                password: password
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.error_description ||
            data.msg ||
            data.message ||
            "Неверный Email или пароль."
        );
    }

    currentUser = data.user;

    return data;
}


// ===============================
// 🔐 КНОПКА ВХОДА
// ===============================

const loginOpenBtn =
    document.getElementById("loginOpenBtn");

const authBox =
    document.getElementById("authBox");

const authTitle =
    document.getElementById("authTitle");

const loginName =
    document.getElementById("loginName");

const loginPassword =
    document.getElementById("loginPassword");

const registerEmail =
    document.getElementById("registerEmail");

const registerPassword =
    document.getElementById("registerPassword");

const authActionBtn =
    document.getElementById("authActionBtn");

const switchAuthBtn =
    document.getElementById("switchAuthBtn");


let registerMode = false;


// ===============================
// 🔓 ОТКРЫТИЕ ФОРМЫ
// ===============================

if (loginOpenBtn) {

    loginOpenBtn.addEventListener(
        "click",
        function () {

            authBox.style.display = "block";

            registerMode = false;

            authTitle.textContent =
                "🔐 Вход в G-BANK";

            authActionBtn.textContent =
                "Войти";

            switchAuthBtn.textContent =
                "Нет аккаунта? Зарегистрироваться";

            if (registerEmail) {
                registerEmail.style.display =
                    "none";
            }

            registerPassword.style.display =
                "none";

            loginName.placeholder =
                "Email";
        }
    );
}


// ===============================
// 🔄 РЕГИСТРАЦИЯ / ВХОД
// ===============================

if (switchAuthBtn) {

    switchAuthBtn.addEventListener(
        "click",
        function () {

            registerMode =
                !registerMode;


            if (registerMode) {

                authTitle.textContent =
                    "📝 Регистрация в G-BANK";

                authActionBtn.textContent =
                    "Создать аккаунт";

                switchAuthBtn.textContent =
                    "Уже есть аккаунт? Войти";

                if (registerEmail) {
                    registerEmail.style.display =
                        "block";
                }

                registerPassword.style.display =
                    "block";

                loginName.placeholder =
                    "Имя клиента";

            } else {

                authTitle.textContent =
                    "🔐 Вход в G-BANK";

                authActionBtn.textContent =
                    "Войти";

                switchAuthBtn.textContent =
                    "Нет аккаунта? Зарегистрироваться";

                if (registerEmail) {
                    registerEmail.style.display =
                        "none";
                }

                registerPassword.style.display =
                    "none";

                loginName.placeholder =
                    "Email";
            }
        }
    );
}


// ===============================
// 🚀 ДЕЙСТВИЕ ФОРМЫ
// ===============================

if (authActionBtn) {

    authActionBtn.addEventListener(
        "click",
        async function () {

            const username =
                loginName.value.trim();

            const password =
                loginPassword.value;

            // =====================
            // 📝 РЕГИСТРАЦИЯ
            // =====================

            if (registerMode) {

                const email =
                    registerEmail
                        ? registerEmail.value.trim()
                        : "";

                const repeatPassword =
                    registerPassword.value;


                if (!username) {

                    alert(
                        "Введите имя клиента."
                    );

                    return;
                }


                if (!email) {

                    alert(
                        "Введите Email."
                    );

                    return;
                }


                if (!email.includes("@")) {

                    alert(
                        "Введите корректный Email."
                    );

                    return;
                }


                if (!password) {

                    alert(
                        "Введите пароль."
                    );

                    return;
                }


                if (password.length < 6) {

                    alert(
                        "Пароль должен содержать минимум 6 символов."
                    );

                    return;
                }


                if (password !== repeatPassword) {

                    alert(
                        "Пароли не совпадают."
                    );

                    return;
                }


                try {

                    authActionBtn.disabled = true;

                    authActionBtn.textContent =
                        "Создаём аккаунт...";


                    await registerUser(
                        username,
                        email,
                        password
                    );


                    // Сохраняем имя клиента
                    localStorage.setItem(
                        "gBankUser",
                        username
                    );


                    // Начальный баланс
                    if (
                        !localStorage.getItem(
                            "gBankBalance"
                        )
                    ) {

                        localStorage.setItem(
                            "gBankBalance",
                            "12480"
                        );
                    }


                    alert(
                        "🎉 Аккаунт G-BANK создан!"
                    );


                    registerMode =
                        false;


                    authTitle.textContent =
                        "🔐 Вход в G-BANK";

                    authActionBtn.textContent =
                        "Войти";

                    switchAuthBtn.textContent =
                        "Нет аккаунта? Зарегистрироваться";


                    if (registerEmail) {
                        registerEmail.style.display =
                            "none";
                    }

                    registerPassword.style.display =
                        "none";


                    loginName.value =
                        email;

                    loginPassword.value =
                        "";


                } catch (error) {

                    alert(
                        "❌ " +
                        error.message
                    );

                } finally {

                    authActionBtn.disabled =
                        false;

                    authActionBtn.textContent =
                        registerMode
                            ? "Создать аккаунт"
                            : "Войти";
                }


                return;
            }


            // =====================
            // 🔐 ВХОД
            // =====================

            if (!username) {

                alert(
                    "Введите Email."
                );

                return;
            }


            if (!password) {

                alert(
                    "Введите пароль."
                );

                return;
            }


            try {

                authActionBtn.disabled =
                    true;

                authActionBtn.textContent =
                    "Входим...";


                const data =
                    await loginUser(
                        username,
                        password
                    );


                // Сохраняем сессию
                localStorage.setItem(
                    "gBankSession",
                    data.access_token
                );


                // Если Supabase передал имя
                const supabaseUsername =
                    data.user &&
                    data.user.user_metadata &&
                    data.user.user_metadata.username;


                const finalUsername =
                    supabaseUsername ||
                    localStorage.getItem(
                        "gBankUser"
                    ) ||
                    username;


                localStorage.setItem(
                    "gBankUser",
                    finalUsername
                );


                // Начальный баланс
                if (
                    !localStorage.getItem(
                        "gBankBalance"
                    )
                ) {

                    localStorage.setItem(
                        "gBankBalance",
                        "12480"
                    );
                }


                authBox.style.display =
                    "none";


                showCabinet(
                    finalUsername
                );


                alert(
                    "✅ Вход выполнен!\n\n" +
                    "Добро пожаловать, " +
                    finalUsername +
                    "!"
                );


            } catch (error) {

                alert(
                    "❌ " +
                    error.message
                );

            } finally {

                authActionBtn.disabled =
                    false;

                authActionBtn.textContent =
                    registerMode
                        ? "Создать аккаунт"
                        : "Войти";
            }
        }
    );
}


// ===============================
// 👤 КАБИНЕТ
// ===============================

function showCabinet(username) {

    const cabinet =
        document.getElementById("cabinet");

    const welcome =
        document.getElementById("welcome");


    if (cabinet) {

        cabinet.style.display =
            "block";
    }


    if (welcome) {

        welcome.textContent =
            "Добро пожаловать, " +
            username +
            "!";
    }


    updateBalance();
}


// ===============================
// 💰 БАЛАНС
// ===============================

function updateBalance() {

    const balanceElement =
        document.getElementById("balance");


    if (!balanceElement) {
        return;
    }


    const balance =
        Number(
            localStorage.getItem(
                "gBankBalance"
            ) || "12480"
        );


    balanceElement.textContent =
        "💰 Баланс: " +
        balance.toLocaleString("ru-RU") +
        " G-COIN";
}


// ===============================
// 💳 КАРТА
// ===============================

const cardBtn =
    document.getElementById("cardBtn");


if (cardBtn) {

    cardBtn.addEventListener(
        "click",
        function () {

            const card =
                document.getElementById(
                    "myCard"
                );

            const cardName =
                document.getElementById(
                    "cardName"
                );


            if (card) {

                card.style.display =
                    "block";
            }


            if (cardName) {

                cardName.textContent =
                    localStorage.getItem(
                        "gBankUser"
                    ) || "";
            }
        }
    );
}


// ===============================
// 🚪 ВЫХОД
// ===============================

const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );


if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        async function () {

            const token =
                localStorage.getItem(
                    "gBankSession"
                );


            if (token) {

                try {

                    await fetch(
                        AUTH_URL + "/logout",
                        {
                            method: "POST",

                            headers: {
                                "apikey":
                                    SUPABASE_KEY,

                                "Authorization":
                                    "Bearer " +
                                    token
                            }
                        }
                    );

                } catch (error) {

                    console.log(
                        "Ошибка выхода:",
                        error
                    );
                }
            }


            localStorage.removeItem(
                "gBankSession"
            );

            localStorage.removeItem(
                "gBankUser"
            );


            const cabinet =
                document.getElementById(
                    "cabinet"
                );


            if (cabinet) {

                cabinet.style.display =
                    "none";
            }


            alert(
                "Вы вышли из G-BANK."
            );
        }
    );
}
