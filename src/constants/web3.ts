export enum Network {
	TEZOS_MAINNET = 'tezos-mainnet',
	TEZOS_LIMANET = 'tezos-limanet',
	TEZOS_GHOSTNET = 'tezos-ghostnet',
}

export type Config = {
	chainNamespace: string;
	rpcTarget: string;
	displayName: string;
	blockExplorer: string;
	ticker: string;
	tickerName: string;
};

export const NetworkConfig: Record<Network, Config> = {
	[Network.TEZOS_MAINNET]: {
		chainNamespace: 'other',
		rpcTarget: 'https://rpc.tzbeta.net/',
		displayName: 'Tezos Mainnet',
		blockExplorer: 'https://tzstats.com',
		ticker: 'XTZ',
		tickerName: 'Tezos',
	},
	[Network.TEZOS_LIMANET]: {
		chainNamespace: 'other',
		rpcTarget: 'https://limanet.ecadinfra.com',
		displayName: 'Tezos Limanet',
		blockExplorer: 'https://tzstats.com',
		ticker: 'XTZ',
		tickerName: 'Tezos',
	},
	[Network.TEZOS_GHOSTNET]: {
		chainNamespace: 'other',
		rpcTarget: 'https://ghostnet.tezos.marigold.dev/',
		displayName: 'Tezos Ghostnet',
		blockExplorer: 'https://tzstats.com',
		ticker: 'XTZ',
		tickerName: 'Tezos',
	},
};

export const DEFAULT_NETWORK = Network.TEZOS_LIMANET;
