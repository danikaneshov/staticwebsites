// Меняешь только ЭТО — всё остальное обновится автоматически
const TELEGRAM_LINK = "https://t.me/fgdgdjdghdfhgiusdf4u584458bot";

// Ничего ниже менять не нужно
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("tg-button");
    if (btn) btn.href = TELEGRAM_LINK;
});
