# Full Stack / Web3 Coding Challenge

## Getting Started

To get started with the code, follow these steps:

Clone this repository to your local machine using

```bash
 git clone https://github.com/Dammyton/coding-callenge.git
```

Navigate to the project directory

```bash
  cd coding-callenge
```

Install the necessary dependencies

```bash
  yarn install
```

Start the server

```bash
 yarn start
```

Running the Tests

```bash
 yarn test
```

The web appplication should now be accessible in your browser at http://localhost:3000.

## Test Suites

The following test suites are included in this project:

- **App:** renders app without crashing.
- **RefreshButton:** should render properly with activeTab prop, should call ReloadData function when clicked.
- **TopPoolsTabContent:** should render table with pool data.
- **TransactionsTabContent:** renders table with transaction data.

## Features

The web application offers the following features:

- A "Top Pools" section that displays the total volume locked (TVL) and 24-hour volume.
- A "Tokens" section that displays the price point, price change, and TVL.
- A "Transactions" section that displays the total value, token amounts, linked account to Etherscan, and time of transaction (e.g., "15 minutes ago").
- Additionally, a refresh button has been added to allow users to update the data displayed in the views.

## Technologies Used

The web appplication was built using the following technologies:

**React.js**

**CSS**

**TypeScript**
