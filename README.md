# 🪙 CryptoView

**CryptoView** is a modern, real-time cryptocurrency tracker built with Nuxt 3. It features live updates from Binance, internationalization, currency selection, dark/light theme, and a mobile-first responsive design.

🔗 [Live Demo](https://crypto-view-mocha.vercel.app/favorites)

---

## 🚀 Features

- 📊 Display of crypto assets with current price, 24h % change, and dynamic currency conversion
- 🔄 Real-time updates via Binance WebSocket API
- 💱 Switch between multiple fiat currencies (USD, EUR, UAH, etc.)
- 🌐 Multilingual support: English 🇺🇸 & Ukrainian 🇺🇦
- 🌗 Dark & Light mode support (TailwindCSS)
- 🔍 Full-text search for coins
- ⭐ Favorites stored in `localStorage`
- 📈 Individual coin page with detailed chart (intervals: minute, hour, day, week, month)
- 🖼️ Coin icons and branding
- ⚙️ PWA support: offline mode, `manifest.json`, caching
- 🧠 SEO-optimized with Open Graph / Twitter metadata
- 📱 Fully responsive design (mobile-first)

---

## 🛠️ Tech Stack

- [Nuxt 3](https://nuxt.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Element Plus UI](https://element-plus.org/)
- [ApexCharts](https://apexcharts.com/)
- [Pinia](https://pinia.vuejs.org/)
- [VueUse](https://vueuse.org/)
- [Binance API](https://binance-docs.github.io/apidocs/spot/en/)
- [@vite-pwa/nuxt](https://vite-pwa-org.netlify.app/frameworks/nuxt.html)
- [@nuxtjs/i18n](https://i18n.nuxtjs.org/)
- [moment.js](https://momentjs.com/)
- Deployed via [Vercel](https://vercel.com/)

---


## 📦 Getting Started

```bash
git clone https://github.com/proVject/cryptoView.git
cd cryptoView
npm install
npm run dev