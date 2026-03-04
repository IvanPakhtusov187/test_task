# Admin Products App

Small admin-like web app built with React + TypeScript + Redux Toolkit + RTK Query + Ant Design.

## Run locally

1. Install dependencies:
   - `npm install`
2. Start dev server:
   - `npm run dev`
3. Open in latest Google Chrome:
   - `http://localhost:5173`

## Implemented features

- Auth flow with public `/login` and protected `/products`
- Login form with React Hook Form + Zod validation
- Remember me behavior:
  - ON: token stored in `localStorage`
  - OFF: token stored in `sessionStorage`
- Products table with:
  - API list fetch (`/products`)
  - API search (`/products/search?q=...`) with 300ms debounce
  - Sorting (Price, Rating, Title) with stable client-side fallback
  - Red rating text when `rating < 3`
- Add Product modal (local-only insert, no API save)
- RTK Query caching and request loading/error states

## Project structure

```text
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
```

## Key decisions

- **RTK Query**: chosen for first-class caching, loading states, and endpoint co-location with Redux Toolkit.
- **Ant Design**: provides production-ready form/table/modal components that fit admin use-cases.
- **React Hook Form + Zod**: lightweight form state management with strict schema-based validation and typed form values.
- **Feature/entity/shared modularization**: keeps domain code isolated and easy to scale.

## API notes

- Auth endpoint: `POST https://dummyjson.com/auth/login`
- Products endpoints:
  - `GET https://dummyjson.com/products`
  - `GET https://dummyjson.com/products/search?q=...`

## AI usage

- Model: GPT-5.3 Codex (Cursor coding agent)
- Prompts used:
  - Initial implementation prompt provided by user (this exact prompt)
