import { FC, useCallback } from "react";
import styles from "./ProductItem.module.scss";
import { CiCircleRemove, CiHeart } from "react-icons/ci";
import { toggleFav } from "../../../redux/slices/cardSlice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { Link } from "react-router-dom";

interface ProductItemProps {
	title: string;
	img: string;
	alt: string;
	descr: string;
	id: string;
	onRemove: () => void;
}

const ProductItem: FC<ProductItemProps> = ({
	descr,
	img,
	title,
	alt,
	id,
	onRemove,
}) => {
	const dispatch = useAppDispatch();
	const favArray = useSelector((state: RootState) => state.card.favArray);
	const idNew = id.replace("http://www.edamam.com/ontologies/edamam.owl#", "");
	const isFav = favArray.includes(idNew);

	const handleRemoveClick = useCallback(
		(e: React.MouseEvent) => {
			e.preventDefault();
			onRemove();
		},
		[onRemove]
	);

	const handleFavClick = useCallback(
		(e: React.MouseEvent) => {
			e.preventDefault();
			dispatch(toggleFav(idNew));
		},
		[dispatch, idNew]
	);

	return (
		<Link to={`/product/${idNew}`} className={styles["product-item"]}>
			<button
				className={styles.remove}
				onClick={handleRemoveClick}
				aria-label="Remove item"
			>
				<CiCircleRemove size={30} />
			</button>
			<div className={styles.image}>
				<img  src={img} alt={alt} />
				<button
					onClick={handleFavClick}
					className={`${styles.icon} ${isFav ? styles.active : ""}`}
				>
					<CiHeart size={20} />
				</button>
			</div>
			<div className={styles.title}>{title}</div>
			<div className={styles.descr}>{descr}</div>
		</Link>
	);
};

export default ProductItem;
