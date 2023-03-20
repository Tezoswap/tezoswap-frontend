import { Network } from './web3';

export enum Ticker {
	XTZ = 'XTZ',
}

export interface TickerInfo {
	address: string;
	ticker: Ticker;
	tickerName: string;
	logoURL: string;
}

export interface Balance extends TickerInfo {
	balance: number;
}

export type TickerInfoMap = Record<Ticker, TickerInfo>;
export type TickerInfoMapByNetwork = Record<Network, TickerInfoMap>;

export const TEZOS_MAINNET_TICKER_INFO: TickerInfoMap = {
	[Ticker.XTZ]: {
		address: '',
		ticker: Ticker.XTZ,
		tickerName: 'Tezos',
		logoURL:
			'https://assets.coingecko.com/coins/images/976/large/Tezos-logo.png?1547034862',
	},
};

export const TEZOS_LIMANET_TICKER_INFO: TickerInfoMap = {
	[Ticker.XTZ]: {
		address: '',
		ticker: Ticker.XTZ,
		tickerName: 'Tezos',
		logoURL:
			'https://assets.coingecko.com/coins/images/976/large/Tezos-logo.png?1547034862',
	},
};

export const TEZOS_GHOSTNET_TICKER_INFO: TickerInfoMap = {
	[Ticker.XTZ]: {
		address: '',
		ticker: Ticker.XTZ,
		tickerName: 'Tezos',
		logoURL:
			'https://assets.coingecko.com/coins/images/976/large/Tezos-logo.png?1547034862',
	},
};

export const TickerAddressesMapping: TickerInfoMapByNetwork = {
	[Network.TEZOS_MAINNET]: TEZOS_MAINNET_TICKER_INFO,
	[Network.TEZOS_LIMANET]: TEZOS_LIMANET_TICKER_INFO,
	[Network.TEZOS_GHOSTNET]: TEZOS_GHOSTNET_TICKER_INFO,
};
