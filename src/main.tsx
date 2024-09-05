import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/common/Layout/Layout.tsx";
import Home from "./pages/Home/Home.tsx";

import "./reset.css";
import "./index.scss";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import Product from "./pages/Product/Product.tsx";
import CreateProduct from "./pages/CreateProduct/CreateProduct.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
            {
				path: "/product/:id",
				element: <Product />,
				
			},
            {
				path: "/create-product",
				element: <CreateProduct />,
				
			},
		],
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
);
