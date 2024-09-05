import { useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetRecipesQuery } from "../../redux/slices/apiSlice";
import styles from "./Product.module.scss";
import { CiHeart } from "react-icons/ci";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useAppDispatch } from "../../redux/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toggleFav } from "../../redux/slices/cardSlice";
import { LoadingOutlined } from "@ant-design/icons";
import { ConfigProvider, Spin } from "antd";
import theme from "../../constants";
import useProduct from "../../hooks/useProduct";
import ProductDetails from "../../components/ui/ProductDetails/ProductDetails";

const Product = () => {
	let { id } = useParams<{ id: string }>();
	const query = useSelector((state: RootState) => state.filter.query);
	const term = "recipe";
	const calories = useSelector((state: RootState) => state.filter.calories);
	const ingr = useSelector((state: RootState) => state.filter.ingr);
	const termSearch = query === "" ? term : query;
	const { data, isLoading } = useGetRecipesQuery({
		query: termSearch,
		maxCalories: calories,
		ingredients: ingr,
	});
	const dispatch = useAppDispatch();
	const favArray = useSelector((state: RootState) => state.card.favArray);
	const isFav = favArray.includes(id!);

	const product = useProduct({ data, productId: id });

	const handleToggleFav = useCallback(() => {
		dispatch(toggleFav(id!));
	}, [dispatch, id]);
	return (
		<div className={styles.prod}>
			<div className="container">
				{isLoading ? (
					<ConfigProvider theme={theme}>
						<Spin className={styles.spin} indicator={<LoadingOutlined style={{ fontSize: 88 }} spin />}/>
					</ConfigProvider>
				) : product ? (
					<div className={styles.row}>
						<div className={styles.image}>
							<img src={product?.image} alt={product?.label} />
						</div>
                        <div className={styles.details}>
						<ProductDetails
							name={product?.label}
							type={product?.cuisineType?.[0]!}
							calories={product.calories!}
							totalTime={product?.totalTime!}
							yield={product.yield!}
							healthLabels={product.healthLabels!}
							ingredientLines={product.ingredientLines!}
							meal={product?.mealType![0]}
						/>
						<div className={styles.actions}>
							<button
								onClick={() => handleToggleFav()}
								className={isFav ? styles.fav : ""}
							>
								{isFav ? " Remove from Favourites" : "Add to Favourites"}

								<span>
									<CiHeart size={20} />
								</span>
							</button>
							<Link to="/">
								<button className={styles.button}>
									Go home{" "}
									<span>
										<IoIosArrowRoundBack size={20} />
									</span>
								</button>
							</Link>
						</div>
                        </div>
					</div>
				) : (
					<div className={styles.spin}>
						An error occurred. The item you requested could not be found.
					</div>
				)}
			</div>
		</div>
	);
};

export default Product;
