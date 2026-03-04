# Admin Products App

Небольшое административное веб-приложение, разработанное с использованием **React + TypeScript + Redux Toolkit + RTK Query + Ant Design**.

## Запуск локально

Установите зависимости:

npm install

Запустите dev-сервер:

npm run dev

Откройте в последней версии **Google Chrome**:

http://localhost:5173

## Реализованный функционал

- Поток авторизации с публичной страницей **/login** и защищенной страницей **/products**
- Форма входа с **React Hook Form + Zod** для валидации
- Логика **Remember me**:
  - **Включено** → токен сохраняется в `localStorage`
  - **Выключено** → токен сохраняется в `sessionStorage`
- Таблица товаров с:
  - загрузкой списка из API (`/products`)
  - поиском через API (`/products/search?q=...`) с **debounce 300мс**
  - сортировкой (Price, Rating, Title) с устойчивой клиентской сортировкой
  - отображением рейтинга **красным цветом**, если `rating < 3`
- Модальное окно **Add Product** (добавление только локально, без сохранения в API)
- Кэширование запросов и состояния загрузки/ошибок через **RTK Query**

## Структура проекта

src/
  app/
    router/
    styles/
    store.ts
    storeHooks.ts
  shared/
    api/
    lib/hooks/
  entities/
    product/
      api/
      model/
  features/
    auth/
      api/
      lib/
      model/
      ui/
    productAdd/
      ui/
  pages/
    LoginPage/
    ProductsPage/

## Основные архитектурные решения

**RTK Query**  
Выбран из-за встроенного кэширования, управления состояниями загрузки и удобной интеграции с Redux Toolkit.

**Ant Design**  
Используется для готовых production-компонентов (формы, таблицы, модальные окна), которые хорошо подходят для административных интерфейсов.

**React Hook Form + Zod**  
Легковесное управление состоянием формы с **строгой схемной валидацией** и типизацией значений формы.

**Модульная структура feature/entity/shared**  
Позволяет изолировать доменные части приложения и облегчает масштабирование проекта.

## API

Авторизация:

POST https://dummyjson.com/auth/login

Товары:

GET https://dummyjson.com/products  
GET https://dummyjson.com/products/search?q=...

## Использование AI

Модель:  
**GPT-5.3 Codex (Cursor coding agent)**