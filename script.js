document.addEventListener("DOMContentLoaded", () => {
    const openAccountButton = document.querySelector('a[href="#cabinet"]');

    if (openAccountButton) {
        openAccountButton.addEventListener("click", () => {
            alert("Добро пожаловать в G-BANK! 🐦💰");
        });
    }
});
