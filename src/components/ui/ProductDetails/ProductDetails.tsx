import styles from "./ProductDetails.module.scss";
import { FC } from "react";


interface ProductDetailsProps{
    name:string;
    type:string;
    calories:number;
    yield:number;
    healthLabels: string[];
    ingredientLines: string[];
    totalTime: number;
    meal:string;
}
const ProductDetails:FC<ProductDetailsProps> = ({ name, type, calories, yield: num,healthLabels, ingredientLines, meal, totalTime}) => {
	return (
		<>
			<h1 className="title">{name}</h1>
			<hr />
			<p className="details-title">
				Cuisine type: <span className={styles.upper}> {type}</span>
			</p>
			<p className="details-title">
				Calories:{" "}
				<span>
					{num! > 0
						? Number((calories / num!).toFixed(0)) > 0
							? Number((calories / num!).toFixed(0))
							: "N/A"
						: "N/A"}
				</span>
			</p>
			<div className={styles.labels}>
				<p className="details-title">Health Labels:</p>
				<div className={styles.box}>
					{healthLabels?.slice(0, 8).map((label:string) => (
						<span key={label}>{label}</span>
					))}
				</div>
			</div>
			<div className={styles.labels}>
				<p className="details-title">Ingredients</p>
				<div className={styles.box}>
					{ingredientLines?.slice(0, 8).map((label:string) => (
						<span key={label}>{label}</span>
					))}
				</div>
			</div>
			<p className="details-title">
				Type of meal: <span className={styles.upper}>{meal}</span>
			</p>
			<p className="details-title">
				Total Time:{" "}
				<span>
					{totalTime === 0
						? "any"
						: `${
								Math.floor(totalTime! / 60) > 0
									? `${Math.floor(totalTime! / 60)} hr `
									: ""
						  }${totalTime! % 60} min`}
				</span>
			</p>

			
		</>
	);
};

export default ProductDetails;
