# Crypto Watch

[![CodeQL](https://github.com/milliorn/cryptocurrency-list/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/milliorn/cryptocurrency-list/actions/workflows/github-code-scanning/codeql)
[![pages-build-deployment](https://github.com/milliorn/cryptocurrency-list/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/milliorn/cryptocurrency-list/actions/workflows/pages/pages-build-deployment)

Crypto Watch is a client-side web application built with React that displays real-time cryptocurrency market data sourced from the [CoinGecko public API](https://www.coingecko.com/en/api/documentation). It provides a ranked list of the top 20 cryptocurrencies by market capitalization and a dedicated detail page for each coin, including price statistics, percentage changes across multiple time horizons, and a sanitized description.

The project is intentionally lightweight — no backend, no database, no authentication. Everything runs in the browser and is deployed as a static site on GitHub Pages.

**Live demo:** [https://milliorn.github.io/cryptocurrency-list](https://milliorn.github.io/cryptocurrency-list)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Live market data** — Fetches the top 20 cryptocurrencies ranked by market cap from CoinGecko on every page load, with no API key required.
- **Coin detail pages** — Each coin links to a dedicated route that displays current price, 24-hour high/low, market cap, circulating supply, and percentage price changes over 1 hour, 24 hours, 7 days, 14 days, 30 days, and 1 year.
- **Sanitized HTML descriptions** — Coin descriptions returned by the API may contain HTML markup. DOMPurify strips any malicious content before rendering, preventing XSS attacks.
- **Lazy-loaded images** — Coin images are loaded lazily with a blur-up placeholder effect, reducing initial page load weight.
- **Responsive layout** — The coin list table progressively reveals columns (volume, market cap) at medium and large breakpoints using Tailwind CSS utility classes.
- **Client-side routing** — React Router handles navigation between the list and detail views without full page reloads.

---

## Tech Stack

| Technology | Purpose |
| --- | --- |

| [React](https://react.dev/) | UI component framework |

| [React Router DOM](https://reactrouter.com/) | Client-side routing |

| [Axios](https://axios-http.com/) | HTTP client for CoinGecko API requests |

| [DOMPurify](https://github.com/cure53/DOMPurify) | HTML sanitization before `dangerouslySetInnerHTML` |

| [React Lazy Load Image Component](https://github.com/Aljullu/react-lazy-load-image-component) | Lazy loading and blur-up effect for coin images |

| [React Icons](https://react-icons.github.io/react-icons/) | SVG icon set (Font Awesome coin icon in the navbar) |

| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework |

| [gh-pages](https://github.com/tschaub/gh-pages) | Static site deployment to GitHub Pages |

The project was bootstrapped with [Create React App](https://create-react-app.dev/) and uses `react-scripts` as the build toolchain.

---

## Prerequisites

Before you begin, ensure the following tools are installed on your machine:

- **Node.js** — version 18 or higher is recommended. You can download it from [nodejs.org](https://nodejs.org/) or install it via a version manager like [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm).
- **npm** — bundled with Node.js (version 9 or higher). Alternatively, you may use **yarn** or **pnpm**, though the lockfile in this repository is `package-lock.json` so `npm` is the canonical package manager for this project.
- **Git** — required to clone the repository.

To verify your environment:

```bash
node --version   # should print v18.x.x or higher
npm --version    # should print 9.x.x or higher
git --version
```

---

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/milliorn/cryptocurrency-list.git
   ```

2. **Navigate into the project directory**

   ```bash
   cd cryptocurrency-list
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

   This will install all runtime and development dependencies listed in `package.json` into a local `node_modules` directory. The install may take a minute on the first run.

> **Note:** This project has no environment variables or `.env` files to configure. The CoinGecko API used here is a public, unauthenticated endpoint and requires no API key.

---

## Running the App

### Development server

```bash
npm start
```

This starts the Create React App development server with hot module replacement. Open [http://localhost:3000](http://localhost:3000) in your browser. The page will automatically reload when you save changes to source files. Lint errors will appear in the terminal and the browser console.

### Production build (local preview)

```bash
npm run build
```

This compiles and bundles the application into the `build/` directory with production optimizations — minification, tree shaking, and content-hashed filenames for long-term caching. You can serve the `build/` folder with any static file server to preview the production output locally, for example:

```bash
npx serve -s build
```

---

## Project Structure

```text
cryptocurrency-list/
├── public/                  # Static assets served as-is (favicon, manifest, index.html)
│   ├── index.html           # HTML shell — React mounts into <div id="root">
│   └── logo192.png          # Placeholder image used during lazy load
├── src/
│   ├── components/
│   │   ├── CoinItem.jsx     # Single row in the coin list (rank, image, price, etc.)
│   │   ├── Coins.jsx        # Container for the full coin list; renders the header row and maps CoinItem
│   │   ├── CoinTable.jsx    # Price-change table row rendered inside the coin detail page
│   │   └── Navbar.jsx       # Top navigation bar with logo and link back to the list
│   ├── routes/
│   │   └── Coin.jsx         # Coin detail page; fetches and displays full data for a single coin
│   ├── App.jsx              # Root component; fetches top-20 list, owns router and route definitions
│   ├── index.css            # Global styles and Tailwind CSS entry point
│   └── index.js             # React DOM root; renders <App> into #root
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

---

## How It Works

### Data fetching

All data comes from the [CoinGecko v3 REST API](https://www.coingecko.com/en/api/documentation), which is free and requires no authentication for the endpoints used.

**List view** — `App.jsx` fires a single `GET` request on mount:

```text
GET https://api.coingecko.com/api/v3/coins/markets
  ?vs_currency=usd
  &order=market_cap_desc
  &per_page=20
  &page=1
  &sparkline=false
```

The response is an array of 20 coin objects. The data is stored in component state and passed down to `Coins` → `CoinItem`.

**Detail view** — `Coin.jsx` fires a request on mount using the `:coinId` URL parameter:

```text
GET https://api.coingecko.com/api/v3/coins/{coinId}
```

This returns a much richer object including localized descriptions, full market data, and percentage price changes across all tracked time periods.

### Routing

The app defines two routes in `App.jsx`:

| Path | Component | Description |
| --- | --- | --- |
| `/cryptocurrency-list` | `Coins` | The main list of top 20 coins |
| `/coin/:coinId` | `Coin` | Detail page for a specific coin, e.g. `/coin/bitcoin` |

Navigating to the root (`/`) will not redirect automatically — you should land on `/cryptocurrency-list`. When deployed to GitHub Pages the `homepage` field in `package.json` ensures the asset paths resolve correctly under the `/cryptocurrency-list` sub-path.

### Security

Coin descriptions from the CoinGecko API contain HTML tags (links, emphasis, etc.). Before rendering these strings into the DOM via `dangerouslySetInnerHTML`, they are passed through `DOMPurify.sanitize()`, which strips any script tags, event handlers, or other malicious markup while preserving safe formatting HTML.

---

## Available Scripts

| Script | Command | Description |
| --- | --- | --- |
| Start dev server | `npm start` | Runs the app in development mode at `http://localhost:3000` |
| Run tests | `npm test` | Launches the Jest test runner in interactive watch mode |
| Production build | `npm run build` | Bundles the app for production into the `build/` directory |
| Deploy | `npm run deploy` | Runs `npm run build` then pushes the `build/` directory to the `gh-pages` branch |
| Eject | `npm run eject` | Permanently exposes the underlying Webpack/Babel/ESLint config — **this is irreversible** |

> **Warning:** `npm run eject` copies all configuration files out of `react-scripts` and into your project. You lose the ability to receive future `react-scripts` updates through a single dependency upgrade. Only eject if you have a specific need that cannot be met through the existing configuration.

---

## Deployment

This project is configured to deploy to **GitHub Pages** using the `gh-pages` package.

### First-time setup

If you have forked this repository and want to deploy your own instance:

1. Update the `homepage` field in `package.json` to point to your GitHub Pages URL:

   ```json
   "homepage": "https://<your-github-username>.github.io/cryptocurrency-list"
   ```

2. Ensure the `gh-pages` branch exists or will be created automatically on first deploy.

3. Run the deploy command:

   ```bash
   npm run deploy
   ```

   This will:
   - Build the production bundle into `build/`
   - Publish the contents of `build/` to the `gh-pages` branch of your repository

4. In your GitHub repository settings, under **Pages**, set the source branch to `gh-pages` and the folder to `/ (root)`.

Your app will be available at the URL you set in `homepage` within a few minutes of the first deploy.

### Subsequent deploys

For any future update, simply run:

```bash
npm run deploy
```

The `predeploy` hook in `package.json` ensures the build is always fresh before publishing.

---

## Contributing

Contributions are welcome. To propose a change:

1. **Fork** the repository on GitHub.
2. **Create a feature branch** from `main`:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes.** Keep commits focused and descriptive.
4. **Test locally** — run `npm start` and verify your changes work as expected.
5. **Push** your branch to your fork:

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a pull request** against the `main` branch of the original repository. Include a clear description of what changed and why.

Please follow the existing code style. ESLint is configured via `react-app` and will report violations during development and in CI.

---

## License

This project is licensed under the [MIT License](LICENSE). You are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software, subject to the conditions in the license file.
