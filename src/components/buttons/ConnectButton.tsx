
import { Button } from '@chakra-ui/react';
import { FC, useCallback, useMemo } from 'react';
import { useWeb3Auth } from '../../hooks/useWeb3Auth';

export const ConnectButton: FC = () => {
    const { login, logout, address } = useWeb3Auth();

    const handleLogin = useCallback(() => {
        login();
    }, [login])

    return (
        <>
            <Button onClick={handleLogin}></Button>
        </>
    )
}