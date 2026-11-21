# Repository Guidelines

## Project Structure & Module Organization

This repository is a Create React App weather dashboard. `src/App.js` contains the page composition and shared UI state; reusable weather, search, forecast, loading, error, and theme components live in `src/components/`. Weather API state and requests are in `src/hooks/useWeather.js`. Global and page styles are in `src/index.css` and `src/App.css`, with Tailwind configured in `tailwind.config.js`. Static app assets and HTML are in `public/`. Tests are colocated with source files, such as `src/App.test.js`; Jest setup is in `src/setupTests.js`.

## Build, Test, and Development Commands

Run commands from the repository root:

- `npm install` installs dependencies from `package-lock.json`.
- `npm start` starts the local development server at `http://localhost:3000`.
- `npm test -- --watchAll=false` runs the Create React App/Jest test suite once; `npm test` starts watch mode.
- `npm run build` creates the optimized production bundle in `build/`.

## Coding Style & Naming Conventions

Follow the existing React and Create React App ESLint conventions. Use functional components and hooks, two-space indentation, semicolons, and descriptive camelCase names for variables and functions. Use PascalCase for component filenames and exports (for example, `WeatherDetails.js`), and `use`-prefixed camelCase for hooks (for example, `useWeather.js`). Keep component-specific UI in `src/components/` and data-fetching/state logic in hooks. Match the surrounding file's quote style when editing; no standalone formatter or lint script is configured.

## Testing Guidelines

Write Jest tests with React Testing Library, keeping tests beside the code they cover and naming them `*.test.js`. Prefer user-visible queries such as `getByRole` or `getByText` and assert observable behavior. Run `npm test -- --watchAll=false` before submitting changes; add or update tests for changed UI behavior and weather request states.

## Commit & Pull Request Guidelines

Recent commits use short, plain descriptions (for example, `remove api key`), without a strict conventional-commit prefix. Keep commit subjects concise and action-oriented. Pull requests should summarize the user-visible change, note relevant validation commands and results, link related issues when applicable, and include screenshots for visual changes. Call out any required environment configuration.

## Security & Configuration

The app reads its OpenWeather key from `REACT_APP_WEATHER_API_KEY`. Set it in a local `.env` file and never commit API keys or other secrets. Client-side environment variables are included in the browser bundle, so use a key intended for public client use and apply provider restrictions.
