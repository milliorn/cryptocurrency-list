# cryptocurrency-list

[![CodeQL](https://github.com/milliorn/cryptocurrency-list/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/milliorn/cryptocurrency-list/actions/workflows/github-code-scanning/codeql)

This repository is a collection of cryptocurrency-related information and resources. It provides a web application built with React, showcasing a list of cryptocurrencies along with their details.

## Demo

You can check out the live cryptocurrency list application [here](https://milliorn.github.io/cryptocurrency-list).

## Features

- Display a list of cryptocurrencies
- Show details of each cryptocurrency
- Fetch cryptocurrency data from the CoinGecko API
- Use Axios for making API requests
- Utilize React Router for navigation
- Lazy load images for improved performance
- Apply Tailwind CSS for styling

## Installation

To run the cryptocurrency-list application locally, follow these steps:

1. Clone the repository
2. Navigate to the project directory: `cd cryptocurrency-list`
3. Install the dependencies: `npm install`

## Usage

### Development Server

To start the development server, use the following command `npm start`

This will launch the application at `http://localhost:3000`.

### Production Build

To build the application for production, use the following command `npm run build`

This will create a production-ready build in the `build` folder.

### Deploy

To deploy the application to GitHub Pages, use the following command `npm run deploy`

This will deploy the application to the URL specified in the `homepage` field of the `package.json` file.

## Technologies Used

- React
- Axios
- CoinGecko API
- React Router
- React Icons
- React Lazy Load Image Component
- Tailwind CSS

## Dependencies

- [axios](https://www.npmjs.com/package/axios) - Promise-based HTTP client for making API requests
- [dompurify](https://www.npmjs.com/package/dompurify) - Library to sanitize HTML
- [react-router-dom](https://www.npmjs.com/package/react-router-dom) - DOM bindings for React Router
- [CoinGecko](https://www.coingecko.com/en/api/documentation) - CoinGecko API for fetching cryptocurrency data
- [TailwindCSS](https://tailwindcss.com/docs/guides/create-react-app) - Utility-first CSS framework for styling

## Contributing

Contributions are welcome! If you'd like to contribute to the cryptocurrency-list project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make the necessary changes and commit them.
4. Push your branch to your forked repository.
5. Submit a pull request to the `main` branch of the original repository.

Please ensure that your code follows the project's coding style and conventions.

## License

This project is licensed under the [MIT License](LICENSE).
