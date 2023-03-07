This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Full Stack / Web3 Coding Challenge

## Overview

A DApp is just like any other Web application however the key difference is the backend runs entirely or mostly on a decentralized network. For the coding challenge you will be creating a data visualizing frontend interfacing with the [Uniswap](https://uniswap.org/) protocol by using their V3 subgraph. A subgraph is a decentralized API that enables developers to query blockchain data quickly. You will only need to define your queries in order to fetch the data required for the frontend.

## Task

The task is to build a React frontend interface that visualizes data that is fetched from [Uniswap V3 Subgraph](https://github.com/Uniswap/v3-subgraph). The application should fetch data from the Uniswap subgraph, and display that data in tabular/visual form. To get an understanding of the available data and queries you may inspect the [hosted V3 subgraph explorer](https://thegraph.com/hosted-service/subgraph/uniswap/uniswap-v3).

The suggested data to be included in the frontend may consist of not limited to:

- Top pools by total volume locked (TVL), and 24Hr volume
- Paginated tokens available that includes price point, price change, and TVL
- Paginated transactions that includes total value, token amounts, linked account, and time

You may visualize alternative data from the subgraph, the above data points are suggestive.

## Checklist

- [ ] Inspect what data / queries will be required using [hosted V3 subgraph explorer](https://thegraph.com/hosted-service/subgraph/uniswap/uniswap-v3)
- [ ] Setup data model, queries, and fetch data from Uniswap V3 Subgraph
- [ ] Add a tabular visualization for “Top Pools” that displays total volume locked (TVL), and 24Hr volume
- [ ] Add a tabular visualization for “Tokens” that displays price point, price change, and TVL
- [ ] Add a tabular visualization for “Transactions” that displays total value, token amounts, linked account to Etherscan, and time (e.g. 15 mins ago)
- [ ] Add a button which the user can click to refresh data in the views
- [ ] Update readme to outline how to serve the frontend locally
- [ ] Include in-line documentation

### Resources

- Uniswap V3 Subgraph repo: [https://github.com/Uniswap/v3-subgraph](https://github.com/Uniswap/v3-subgraph)
- Uniswap Subgraph query examples: [https://docs.uniswap.org/sdk/subgraph/subgraph-examples](https://docs.uniswap.org/sdk/subgraph/subgraph-examples)
- Uniswap V3 Subgraph explorer: [https://thegraph.com/hosted-service/subgraph/uniswap/uniswap-v3](https://thegraph.com/hosted-service/subgraph/uniswap/uniswap-v3)

## What makes a good submission?

- Before you start this challenge, submit your basic info [here](https://docs.google.com/forms/d/e/1FAIpQLSc2gFdXgLLl0RlyBi1Ny-ih5oHPPP7qmi8Vn6XhrUq29rMJkg/viewform)

- A good submission will provide a solution to the main task, that is to visualize the outlined data in a tabular/visual display using data fetched from Uniswaps subgraph. The code is well documented, formatted, and linted. Lastly, the code has test cases that covers the fundamental functionality.

- Bonus if you come up with creative visualizations!

- Count down timer will be started after forking this project to your repo and finished when you make a pr. Submission finish time: 09:00 pm Mar 8 (PST)
