# Finance - GEM Strategy Analyzer

A modern web application for analyzing and implementing the **Global Equity Momentum (GEM)** investment strategy. This tool helps investors make data-driven decisions by analyzing 12-month momentum across various ETFs and providing clear investment signals.

## 🚀 Features

- **GEM Strategy Analysis**: Real-time calculation of 12-month momentum for selected ETFs
- **Interactive Charts**: Visualize momentum trends over time using Chart.js
- **ETF Comparison**: Compare performance across multiple asset classes:
  - **IWDA** - iShares MSCI World (Developed Markets)
  - **EIMI** - iShares MSCI Emerging Markets
  - **CSPX** - iShares Core S&P 500
  - **CNDX** - iShares NASDAQ 100
  - **CBU0** - iShares $ Treasury Bond 7-10yr
  - **IB01** - iShares $ Treasury Bond 0-1yr
- **Portfolio Management**: Track and manage your investment portfolio
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🧠 What is GEM Strategy?

The Global Equity Momentum (GEM) strategy, described by Gary Antonacci, is based on a simple principle: invest in assets that have shown the best momentum over the last 12 months (minus one month). The strategy aims to:

- **Avoid prolonged bear markets** by rotating to safer assets
- **Capture upward trends** by staying invested in strong-performing assets
- **Reduce portfolio volatility** through systematic rebalancing

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite
- **Charts**: Chart.js with React integration
- **Routing**: React Router DOM
- **Styling**: CSS Modules
- **Data Processing**: Python (yfinance, pandas)
- **Testing**: Vitest, Playwright
- **Deployment**: GitHub Pages

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/SzymiYay/finance.git
   cd finance
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Install Python dependencies** (for data processing):
   ```bash
   pip install yfinance pandas python-dateutil
   ```

## 🎯 Usage

### Development

Start the development server:
```bash
npm run dev
```

### Data Processing

Update ETF data and momentum calculations:
```bash
python scripts/gem.py
```

This script will:
- Fetch latest ETF price data from Yahoo Finance
- Calculate 12-month momentum for all tracked ETFs
- Update `public/data/results.json` and `public/data/history.json`

### Building for Production

```bash
npm run build
```

### Testing

Run unit tests:
```bash
npm run test
```

Run end-to-end tests:
```bash
npm run test:e2e
```

### Linting

```bash
npm run lint
npm run lint:fix
```

### Complete Check

Run all quality checks:
```bash
npm run check
```

This will run linting, tests, build, and e2e tests.

## 🚀 Deployment

The application is automatically deployed to GitHub Pages using GitHub Actions. The deployment workflow runs on:
- Push to main branch
- Manual trigger
- Scheduled updates

Deploy manually:
```bash
npm run deploy
```

## 📊 Data Sources

- **Market Data**: Yahoo Finance via yfinance library
- **ETF Information**: Real-time price data and historical performance
- **Update Frequency**: Data can be refreshed manually or through automated scripts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## ⚠️ Disclaimer

This application is for educational and informational purposes only. It does not constitute financial advice. Always consult with a qualified financial advisor before making investment decisions. Past performance does not guarantee future results.
