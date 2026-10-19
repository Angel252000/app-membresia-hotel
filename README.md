# App de membresía y reservas de restaurante para hotel (prototipo)

Prototipo de una función de membresía de hotel (niveles Silver/Gold/Platinum/Black)
con reservas de restaurante, pedidos a la habitación y reseñas. No es una
aplicación completa: son componentes y pantallas escritos para explorar el
diseño de la función, en dos variantes paralelas.

> **Estado real: no se puede instalar ni correr tal cual.** No hay
> `package.json` ni archivo de configuración en ninguna de las dos variantes —
> son árboles de código fuente, pensados como referencia o para incorporar a
> un proyecto ya armado (por ejemplo, el propio Next.js o Expo donde vaya a
> vivir esta función), no un repositorio ejecutable por sí solo.

## Dos variantes

- **`src/`** — variante web, en React puro (JSX) con CSS Modules. Pantalla
  principal: `src/pages/DiningPortal.jsx`, con componentes de reserva, menú,
  pedidos a la habitación y reseñas en `src/components/Dining/`.
- **`tmp_frontend/`** — variante móvil, en Expo (React Native + TypeScript)
  con Expo Router. Incluye pantallas de autenticación (`app/(auth)`), perfil
  (`app/(tabs)/profile.tsx`) y comedor (`app/(tabs)/dining.tsx`), más
  integración con Supabase (`src/lib/supabase.ts`, `src/services/`).
- **`tmp_supabase/profile_schema.sql`** — esquema de la tabla `profiles`
  (niveles de membresía, idioma y moneda preferidos) con políticas de RLS.

## Para usarlo

1. Decide cuál de las dos variantes seguir (web o móvil) — no están pensadas
   para coexistir en el mismo proyecto final.
2. Crea el proyecto base correspondiente (`create-next-app` o `npx create-expo-app`)
   e instala sus dependencias reales (`lucide-react` para la variante web;
   `@supabase/supabase-js` y Expo Router para la variante móvil).
3. Copia los archivos de la variante elegida a la estructura del proyecto base.
4. Para Supabase: copia `tmp_frontend/.env.example` a `.env`, crea un
   proyecto en supabase.com y reemplaza los valores de ejemplo por los tuyos.
   Corre `tmp_supabase/profile_schema.sql` en el editor SQL de ese proyecto.
