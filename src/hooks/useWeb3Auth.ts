import { useContext } from 'react';

import { Web3Context } from '../contexts/Web3AuthProvider';

export const useWeb3Auth = () => {
    const {
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
    } = useContext(Web3Context);
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
};