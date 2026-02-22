document.addEventListener('DOMContentLoaded', () => {
  // 1) Отримання елементів
  const input = document.querySelector('#input');
  const translateBtn = document.querySelector('#translateBtn');
  const output = document.querySelector('#output');

  // можеш вписати свій email (не обов'язково, але бажано)
  const email = 'your_email@example.com';

  // 2) Функція перекладу
  async function translateText() {
    const text = input.value.trim();

    if (!text) {
      output.textContent = 'Введіть текст для перекладу 🙂';
      return;
    }

    const safeText = encodeURIComponent(text);
    const url = `https://api.mymemory.translated.net/get?q=${safeText}&langpair=uk|en&de=${encodeURIComponent(email)}`;

    output.textContent = 'Перекладаю...';

    try {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }

      const data = await res.json();
      output.textContent = data?.responseData?.translatedText ?? 'Не вдалося отримати переклад 😕';
    } catch (err) {
      console.error(err);
      output.textContent = 'Помилка запиту. Спробуйте ще раз 😕';
    }
  }

  // 3) Прив’язка до кнопки
  translateBtn.addEventListener('click', translateText);

  // (не обов’язково) переклад по Enter (Ctrl+Enter)
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      translateText();
    }
  });
});
