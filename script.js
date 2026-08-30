document.addEventListener("DOMContentLoaded", function () {

    const button = document.querySelector('a[href="#cabinet"]');

    if (!button) return;

    button.addEventListener("click", function (event) {
        event.preventDefault();

        const name = prompt("🐦 G-BANK\n\nВведите ваше имя:");

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

        window.location.hash = "cabinet";
    });

});
