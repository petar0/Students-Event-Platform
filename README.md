# Students Event Platform

## Како да го стартуваш после download од GitHub

1. Влези во `project` папката:

```powershell
cd project
```

2. Инсталирај ги зависностите:

```powershell
npm install
```

3. Креирај `.env` фајл во `project` папката. Можеш да го ископираш `.env.example` и да ги внесеш твоите Supabase вредности:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Стартувај го проектот:

```powershell
npm run dev
```

Ако видиш бела страна, најчеста причина е дека `.env` фајлот недостасува или вредностите во него не се точни.

## Како стартува

### `index.html`

Ова е првиот HTML фајл што го отвора browser-от. Има `<div id="root"></div>`, каде што React ја става целата апликација. На крај го повикува `/src/main.jsx`.

### `main.jsx`

Ова е влезната точка на React. Го зема `root` div-от од `index.html`, го вчитува `App.jsx`, и ја монтира апликацијата.

### `App.jsx`

Ова е главниот контролер. Чува која страница е активна: `home`, `login`, `add-event`, `hackathon-detail` итн. Исто проверува дали корисникот е најавен преку Supabase, го прикажува `NavBar`, ја менува страницата и го прикажува footer-от.

## Главни папки

### `src`

Тука е целиот код што ние го пишуваме за апликацијата.

### `components`

Тука се делови што се користат на повеќе места. `NavBar.jsx` е горното мени, `EventCard.jsx` е картичка за настан/хакатон на почетната.

### `pages`

Тука се екраните/страниците. `HomePage.jsx` ги листа настаните и хакатоните. `AddEventPage.jsx` додава настан. `AddHackathonPage.jsx` додава хакатон. `EventDetailPage.jsx` и `HackathonDetailPage.jsx` прикажуваат детали. `ApplyPage.jsx` е пријава за хакатон. `AuthPage.jsx` е login/register. `SupportPage.jsx` е форма за поддршка.

### `lib`

Тука стои `supabase.js`. Тој го креира Supabase client-от, за целата апликација да може да чита/пишува во база и да прави login/register.

### `styles`

Тука е `main.css`. Ова е главниот CSS за изгледот: navbar, cards, forms, buttons, hero section, detail pages, responsive правила.

## Други важни фајлови

### `index.css`

Основен reset CSS: margin, padding, body font, button/input default стилови.

### `package.json`

Овде се командите и зависностите. `npm run dev` стартува проект. `npm run build` прави production верзија. `npm run lint` проверува код.

### `vite.config.js`

Конфигурација за Vite. Му кажува дека користиме React plugin.

### `eslint.config.js`

Правила за проверка на JavaScript/JSX кодот.

### `.env`

Тука се Supabase URL и key преку `VITE_SUPABASE_URL` и `VITE_SUPABASE_ANON_KEY`. Овој фајл не се става јавно.

### `supabase/migrations`

SQL структура за базата: табели `events`, `hackathons`, `applications`, `support_tickets`, плус policies и seed податоци.

### `node_modules`

Инсталирани npm пакети. Не го едитираме рачно.

### `dist`

Готов build output од `npm run build`. Не го едитираме рачно, се генерира автоматски.
