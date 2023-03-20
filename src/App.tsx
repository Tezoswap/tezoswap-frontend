import { Suspense } from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { Web3Provider } from './contexts/Web3AuthProvider';
import { useRoutes } from 'react-router-dom';
import routes from './router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {
	const elements = useRoutes(routes);

	return (
		<ChakraProvider theme={theme}>
			<Web3Provider>
				<Suspense>{elements}</Suspense>
			</Web3Provider>
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
		</ChakraProvider>
	);
}

export default App;
