// ====== НАСТРОЙКИ ======
const TELEGRAM_LINK = "https://t.me/your_bot_here"; // тут меняешь ссылку на своего бота

// Страны СНГ → русский
const CIS_COUNTRIES = ["RU", "KZ", "BY", "UA", "KG", "AM", "AZ", "MD", "TJ", "TM", "UZ"];

// ====== ТЕКСТЫ НА РАЗНЫХ ЯЗЫКАХ ======
const TRANSLATIONS = {
  ru: {
    loading: "Подготавливаем вакансию…",
    title: "Нанимаем на удалённую работу",
    subtitle: "Обучим с нуля, поможем с первой сделкой и закрепим за вами куратора.",
    deadline: "Набор закрывается через 12 часов",
    li1: "Доход <strong>300–1000&nbsp;$</strong> при активной работе",
    li2: "Работай из любой точки мира — нужен только интернет",
    li3: "Подходит для смартфона и ноутбука, без сложных программ",
    li4: "Куратор на связи в Telegram и пошаговые инструкции",
    cta: "Подать заявку в Telegram",
    note: "Нажимая кнопку, вы переходите в Telegram-бота для быстрой заявки.",
    partner: "официальный партнёр",
    subscribers: "1 338 395 подписчиков"
  },
  en: {
    loading: "Preparing your vacancy…",
    title: "We are hiring for remote work",
    subtitle: "We train from scratch, help with your first deal and assign a personal mentor.",
    deadline: "Applications close in 12 hours",
    li1: "Income of <strong>$300–1000</strong> with active work",
    li2: "Work from anywhere in the world — you only need internet",
    li3: "Works from phone or laptop, no complex software",
    li4: "Personal mentor in Telegram and step-by-step guidance",
    cta: "Apply via Telegram",
    note: "By clicking the button, you will be redirected to our Telegram bot.",
    partner: "official partner",
    subscribers: "1 338 395 subscribers"
  }
};

// ====== ПРИМЕНЕНИЕ ПЕРЕВОДА ======
function applyTranslations(lang) {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS["en"];

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.innerHTML = dict[key]; // используем innerHTML, т.к. внутри есть <strong>
    }
  });
}

// ====== ОПРЕДЕЛЯЕМ ЯЗЫК ======
async function detectLanguage() {
  // если уже выбирали язык (на будущее, если сделаешь переключатель)
  const saved = localStorage.getItem("preferred_lang");
  if (saved && TRANSLATIONS[saved]) {
    return saved;
  }

  try {
    // GeoIP-запрос (бесплатный пример)
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    const country = data.country; // "RU", "US" и т.д.

    if (CIS_COUNTRIES.includes(country)) {
      return "ru";
    }

    const EN_COUNTRIES = ["US", "GB", "CA", "AU", "NZ"];
    if (EN_COUNTRIES.includes(country)) {
      return "en";
    }
  } catch (e) {
    console.warn("GeoIP failed, fallback to navigator.language", e);
  }

  // Fallback: язык браузера
  const browserLang = (navigator.language || "en").toLowerCase();
  if (browserLang.startsWith("ru")) return "ru";
  return "en";
}

// ====== СТАРТ СТРАНИЦЫ ======
document.addEventListener("DOMContentLoaded", async () => {
  // ссылка на Telegram
  const btn = document.getElementById("tg-button");
  if (btn) btn.href = TELEGRAM_LINK;

  // определяем язык и применяем переводы
  const lang = await detectLanguage();
  applyTranslations(lang);
  // можно сохранить на будущее
  localStorage.setItem("preferred_lang", lang);
});
