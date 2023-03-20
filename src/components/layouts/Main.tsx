import { Box } from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

interface MainProps {
    children?: ReactNode;
}

const Main: FC<MainProps> = () => {
    return (
        <Box>
            <Header />
            <Box ml={{ base: 0 }} p='4'>
                <Outlet />
            </Box>
        </Box>
    );
};

export default Main;