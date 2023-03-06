import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Pools from './pages/Pools';
import Tokens from './pages/Tokens';
import Transactions from './pages/Transactions';

describe('Tokens Component', () => {
    beforeAll(() => {
        jest.spyOn(window, 'fetch').mockImplementation(() => {
            return Promise.resolve({
                json: () => Promise.resolve({
                    data: {
                        tokens: [
                            {
                                id: '0x6b175474e89094c44da98b954eedeac495271d0f',
                                symbol: 'DAI',
                                name: 'Dai Stablecoin',
                                derivedETH: 0.000977978525130813,
                                totalValueLocked: 682702680.528748,
                                tokenDayData: [
                                    {
                                        date: 1646256000,
                                        priceUSD: 1
                                    },
                                    {
                                        date: 1646179200,
                                        priceUSD: 1
                                    }
                                ]
                            }
                        ]
                    }
                })
            })
        })
    });

    afterAll(() => {
        window.fetch.mockRestore();
    });

    it('should render Tokens component', async () => {
        render(<Tokens />);

        expect(screen.getByText('Top Tokens')).toBeInTheDocument();
        expect(screen.getByText('DAI')).toBeInTheDocument();
        expect(screen.getByText('Dai Stablecoin')).toBeInTheDocument();
        expect(screen.getByText('0.000978')).toBeInTheDocument();
        expect(screen.getByText('682702680.53')).toBeInTheDocument();
        expect(screen.getByText('Load More')).toBeInTheDocument();
    });

    it('should load more data when clicking on Load More button', async () => {
        render(<Tokens />);
        const loadMoreButton = screen.getByText('Load More');

        fireEvent.click(loadMoreButton);
        await waitFor(() => screen.getByText('Loading...'));
        await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(2));
        expect(screen.getByText('DAI')).toBeInTheDocument();
    });

    it('should update the token list when clicking on Update List button', async () => {
        render(<Tokens />);
        const updateListButton = screen.getByText('Update List');

        fireEvent.click(updateListButton);
        await waitFor(() => screen.getByText('Loading...'));
        await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(2));
        expect(screen.getByText('DAI')).toBeInTheDocument();
    });
});

describe('Pools Component', () => {
    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue({
                data: {
                    pools: [
                        {
                            id: '0x1',
                            totalValueLockedUSD: 100,
                            volumeUSD: 200,
                        },
                        {
                            id: '0x2',
                            totalValueLockedUSD: 300,
                            volumeUSD: 400,
                        },
                    ],
                },
            }),
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('renders Top Pools heading', async () => {
        render(<Pools />);
        const headingElement = await screen.findByText(/Top Pools/i);
        expect(headingElement).toBeInTheDocument();
    });

    test('renders pool data in table', async () => {
        render(<Pools />);
        const pairAddressElements = await screen.findAllByRole('cell', { name: /0x/i });
        expect(pairAddressElements.length).toBe(2);

        const firstPairAddress = pairAddressElements[0];
        expect(firstPairAddress).toHaveTextContent('0x1...');

        const volumeElements = screen.getAllByRole('cell', { name: /volume/i });
        expect(volumeElements.length).toBe(2);

        const firstVolume = volumeElements[0];
        expect(firstVolume).toHaveTextContent('$200.00');

        const tvlElements = screen.getAllByRole('cell', { name: /tvl/i });
        expect(tvlElements.length).toBe(2);

        const firstTvl = tvlElements[0];
        expect(firstTvl).toHaveTextContent('$100.00');
    });

    test('calls loadMoreData on button click', async () => {
        render(<Pools />);
        const buttonElement = await screen.findByText(/Load More/i);

        fireEvent.click(buttonElement);
        expect(global.fetch).toHaveBeenCalledWith(expect.anything(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: expect.anything(),
        });
    });

    test('calls handleUpdate on Update List button click', async () => {
        render(<Pools />);
        const updateListButtonElement = await screen.findByText(/Update List/i);

        fireEvent.click(updateListButtonElement);
        expect(global.fetch).toHaveBeenCalledWith(expect.anything(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: expect.anything(),
        });
    });

    test('shows loading skeleton while fetching data', async () => {
        render(<Pools />);
        expect(screen.queryByRole('status')).not.toBeInTheDocument();

        fireEvent.click(await screen.findByText(/Load More/i));
        expect(screen.getByRole('status')).toBeInTheDocument();

        await screen.findByRole('cell', { name: /0x/i });
        expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });
});

describe('Transactions component', () => {
    test('renders transactions list', async () => {
        const mockData = {
            data: {
                swaps: [
                    {
                        id: '1',
                        timestamp: new Date().getTime() / 1000 - 1000, // 1000 seconds ago
                        token0: {
                            id: '0x123',
                            name: 'Token A',
                        },
                        token1: {
                            id: '0x456',
                            name: 'Token B',
                        },
                        transaction: {
                            id: '0x789',
                        },
                        amountUSD: 100,
                        recipient: '0x987654321',
                        sender: '0x123456789',
                        amount0: 10,
                        amount1: 20,
                    },
                    {
                        id: '2',
                        timestamp: new Date().getTime() / 1000 - 2000, // 2000 seconds ago
                        token0: {
                            id: '0x123',
                            name: 'Token A',
                        },
                        token1: {
                            id: '0x456',
                            name: 'Token B',
                        },
                        transaction: {
                            id: '0xdef',
                        },
                        amountUSD: 200,
                        recipient: '0x123456789',
                        sender: '0x987654321',
                        amount0: 20,
                        amount1: 30,
                    },
                ],
            },
        };

        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockData),
            })
        );

        render(<Transactions />);

        expect(screen.getByText('Top Transactions')).toBeInTheDocument();
        expect(screen.getByText('Update List')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('0.10 Token A')).toBeInTheDocument();
            expect(screen.getByText('-20.00 Token B')).toBeInTheDocument();
            expect(screen.getByText('0.20 Token A')).toBeInTheDocument();
            expect(screen.getByText('-30.00 Token B')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('Update List'));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(2);
        });

        global.fetch.mockRestore();
    });

    test('renders loading skeleton when fetching data', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(() =>
            new Promise(() => { }) // never resolve the promise to simulate a pending request
        );

        render(<Transactions />);

        expect(screen.getByText('Top Transactions')).toBeInTheDocument();
        expect(screen.getByText('Update List')).toBeInTheDocument();
        expect(screen.getByTestId('transactions-loading-skeleton')).toBeInTheDocument();

        global.fetch.mockRestore();
    });
});