import { RouteObject } from "react-router-dom";
import Main from "./components/layouts/Main";

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Main />,
        children: [

        ],
    },
];

export default routes;