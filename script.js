const SUPABASE_URL = "https://lfisabcgwlcqniphoohm.supabase.co";
const SUPABASE_KEY = "sb_publishable_jwJUmiV1f83556Z6zWKLNw_ekhLufyp";

const AUTH_URL = SUPABASE_URL + "/auth/v1";

let currentUser = null;


// ===============================
// 🔐 РЕГИСТРАЦИЯ
// ===============================

async function registerUser(username, password) {

    const email =
        username.toLowerCase().replace(/\s+/g, "") +
        "@g-bank.local";

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
                password: password
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.msg ||
            data.message ||
            "Не удалось создать аккаунт."
        );
    }

    return data;
}


// ===============================
// 🔑 ВХОД
// ===============================

async function loginUser(username, password) {

    const email =
        username.toLowerCase().replace(/\s+/g, "") +
        "@g-bank.local";

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
            "Неверное имя или пароль."
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

const registerPassword =
    document.getElementById("registerPassword");

const authActionBtn =
    document.getElementById("authActionBtn");

const switchAuthBtn =
    document.getElementById("switchAuthBtn");


let registerMode = false;


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

            registerPassword.style.display =
                "none";
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


            if (!username) {

                alert("Введите имя клиента.");

                return;
            }


            if (password.length < 4) {

                alert(
                    "Пароль должен содержать минимум 4 символа."
                );

                return;
            }


            try {

                authActionBtn.disabled = true;

                authActionBtn.textContent =
                    "Подождите...";


                // =====================
                // 📝 РЕГИСТРАЦИЯ
                // =====================

                if (registerMode) {

                    const repeatPassword =
                        registerPassword.value;


                    if (password !== repeatPassword) {

                        alert(
                            "Пароли не совпадают."
                        );

                        return;
                    }


                    await registerUser(
                        username,
                        password
                    );


                    alert(
                        "🎉 Аккаунт G-BANK создан!"
                    );


                    registerMode = false;

                    authTitle.textContent =
                        "🔐 Вход в G-BANK";

                    authActionBtn.textContent =
                        "Войти";

                    switchAuthBtn.textContent =
                        "Нет аккаунта? Зарегистрироваться";

                    registerPassword.style.display =
                        "none";

                    loginPassword.value = "";

                    return;
                }


                // =====================
                // 🔐 ВХОД
                // =====================

                const data =
                    await loginUser(
                        username,
                        password
                    );


                localStorage.setItem(
                    "gBankSession",
                    data.access_token
                );

                localStorage.setItem(
                    "gBankUser",
                    username
                );


                authBox.style.display =
                    "none";


                showCabinet(username);


                alert(
                    "✅ Вход выполнен!\n\n" +
                    "Добро пожаловать, " +
                    username +
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
                document.getElementById("myCard");

            const cardName =
                document.getElementById("cardName");


            if (card) {
                card.style.display = "block";
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
    document.getElementById("logoutBtn");

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
                                "apikey": SUPABASE_KEY,
                                "Authorization":
                                    "Bearer " + token
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
