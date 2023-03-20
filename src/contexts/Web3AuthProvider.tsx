import BigNumber from 'bignumber.js';
import { SafeEventEmitterProvider, Web3AuthError } from '@web3auth/base';
import { Web3Auth } from "@web3auth/modal";
import {
	FC,
	createContext,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';

import {
	Balance,
	TickerAddressesMapping,
	TickerInfoMap,
} from '../constants/ticker';
import { DEFAULT_NETWORK, Network, NetworkConfig } from '../constants/web3';
import { TezosRpc } from '../utils/TezosRpc';

interface Web3Config {
	web3auth: Web3Auth | null;
	provider: SafeEventEmitterProvider | null;
	network: Network;
	address: string | null;
	balance: BigNumber | null;
	balances: Balance[] | null;
	login: () => Promise<void>;
	logout: () => Promise<void>;
	getUserInfo: () => Promise<any>;
	signAndSendTransaction: () => Promise<unknown | undefined>;
	signMessage: () => Promise<unknown | undefined>;
	getTezosKeyPair: () => Promise<string | undefined>;
}

export const Web3Context = createContext<Web3Config>({
	network: DEFAULT_NETWORK,
	provider: null,
	web3auth: null,
	address: null,
	balance: null,
	balances: null,
	login: async () => {},
	logout: async () => {},
	getUserInfo: async () => {},
	signAndSendTransaction: async () => [],
	signMessage: async () => 'hello',
	getTezosKeyPair: async () => 'hello',
});

export const Web3Provider: FC<{ children: any }> = ({ children }) => {
    const [network, setNetwork] = useState<Network>(DEFAULT_NETWORK);
    const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
    const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null,);

    const [address, setAddress] = useState<string | null>(null);
    const [balance, setBalance] = useState<BigNumber | null>(null);
    const [balances, setBalances] = useState<Balance[] | null>(null);
    const [tickersAddresses, setTickersAddresses] = useState<TickerInfoMap | null>(null);

    useEffect(() => {
        const init = async () => {
            try {
                const web3auth = new Web3Auth({
                    clientId: import.meta.env.VITE_WEB3_AUTH_CLIENT_ID || '', 
                    web3AuthNetwork: "testnet", // mainnet, aqua, celeste, cyan or testnet
                    chainConfig: NetworkConfig[network] as any,
                });
                setWeb3auth(web3auth);

                await web3auth.initModal();

                if (web3auth.provider) {
                    setProvider(web3auth.provider);
                };
                setTickersAddresses(TickerAddressesMapping[network]);
            } catch (error) {
                console.error(error);
            }
        };
    
        init();
    }, [network]);

    const login = useCallback(async () => {
        if (!web3auth) {
            console.log("web3auth not initialized yet");
            return;
        }
        const web3authProvider = await web3auth.connect();
        setProvider(web3authProvider);
    }, [web3auth]);

    const logout = useCallback(async () => {
        if (!web3auth) {
            console.log("web3auth not initialized yet");
            return;
        }
        await web3auth.logout();
        setProvider(null);
    }, [web3auth]);

    const authenticateUser = useCallback(async () => {
        if (!web3auth) {
            console.log("web3auth not initialized yet");
            return;
        }
        const idToken = await web3auth.authenticateUser();
        return idToken;
    }, [web3auth]);

    const getUserInfo = useCallback(async () => {
        if (!web3auth) {
            console.log("web3auth not initialized yet");
            return;
        }
        const user = await web3auth.getUserInfo();
        return user;
    }, [web3auth]);

    const getTezosKeyPair = useCallback(async () => {
        if (!provider) {
            console.log('provider not initialized yet');
            return;
        }
        const rpc = new TezosRpc(provider as SafeEventEmitterProvider, network as Network);
        const tezosKey = await rpc.getTezosKeyPair();
        return tezosKey;
    }, [provider]);
    
    const getAccounts = useCallback(async () => {
        if (!provider) {
            console.log('provider not initialized yet');
            return;
        }
        const rpc = new TezosRpc(provider as SafeEventEmitterProvider, network as Network);
        const userAccount = await rpc.getAccounts();
        return userAccount;
    }, [provider]);

    const getBalance = useCallback(async () => {
        if (!provider) {
            console.log('provider not initialized yet');
            return;
        }
        const rpc = new TezosRpc(provider as SafeEventEmitterProvider, network as Network);
        const result = await rpc.getBalance();
        return result;
    }, [provider]);

    const signMessage = useCallback(async () => {
        if (!provider) {
            console.log('provider not initialized yet');
            return;
        }
        const rpc = new TezosRpc(provider as SafeEventEmitterProvider, network as Network);
        const signedMessage = await rpc.signMessage();
        return signedMessage;
    }, [provider]);
    
    const signAndSendTransaction = useCallback(async () => {
        if (!provider) {
            console.log('provider not initialized yet');
            return;
        }
        const rpc = new TezosRpc(provider as SafeEventEmitterProvider, network as Network);
        const signedAndSentTransaction = await rpc.signAndSendTransaction();
        return signedAndSentTransaction;
    }, [provider]);

    useEffect(() => {
        const fetchData = async () => {
            const addressResult = await getAccounts();
            setAddress(addressResult);

            const balanceResult = await getBalance();
            // setBalance(balanceResult ?? null);
        };
        fetchData();
    }, [getAccounts, getBalance]);

    const contextValues = useMemo(() => {
        return {
            web3auth,
            provider,
            network,
            address,
            balance,
            balances,
            login,
            logout,
            getUserInfo,
            signAndSendTransaction,
            signMessage,
            getTezosKeyPair,
        };
    }, [
        web3auth,
        provider,
        network,
        address,
        balance,
        balances,
        login,
        logout,
        getUserInfo,
        signAndSendTransaction,
        signMessage,
        getTezosKeyPair,
    ]);
    
    return (
        <Web3Context.Provider value={contextValues}>
            { children }
        </Web3Context.Provider>
    );
};