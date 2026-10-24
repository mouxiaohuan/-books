# WeChat Mini Program UI Demo

A Taro 4, React 18, TypeScript, and SCSS interface demo based on the reference image in [`ux.png`](./ux.png).

The project contains two switchable pages:

- **List Management**: search, sort menu, member cards, copy action, loading skeleton, and `Loading More...` state.
- **Member Registration**: name, gender, date of birth, email, phone, store, and submit button.

The data is local mock data. There is no backend service, and submitting the registration form only shows a success message.

## Requirements

- Node.js 20+
- WeChat Developer Tools

## Run in WeChat Developer Tools

Install dependencies and start the WeChat build watcher:

```bash
npm install
npm run dev:weapp
```

Open the project directory in WeChat Developer Tools. The root `project.config.json` points the mini program root to `dist/`.

Make sure **Auto Compile** is enabled in WeChat Developer Tools. Changes under `src/` are compiled into `dist/` automatically and will refresh the simulator.

The two pages can be switched from the in-app links:

- `List Management` → `Member Registration`
- `Member Registration` → `List Management`

No network service or API configuration is required.

## Commands

| Command | Description |
| --- | --- |
| `npm run dev:weapp` | Build the WeChat Mini Program and watch for changes |
| `npm run build:weapp` | Build the WeChat Mini Program into `dist/` |
| `npm run typecheck` | Run the TypeScript type checker |

## Project Structure

```text
src/
├── assets/                 # Reference avatar asset
├── components/             # Reusable avatar and member card components
├── mock/                   # Local demo users
├── pages/users/            # List Management page
├── pages/user-form/        # Member Registration page
├── types/                  # TypeScript types and asset declarations
├── app.config.ts           # Mini program pages and window settings
└── app.scss                # Shared SCSS and reference screen styles
```

## Notes

- The copy button on each member card writes the member information to the system clipboard and displays a toast.
- The registration submit button is intentionally a UI-only demo action.
- `project.private.config.json` keeps local WeChat Developer Tools settings, including hot reload and launch page shortcuts.
