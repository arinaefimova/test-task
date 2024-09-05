import  { FC, useCallback } from "react";
import styles from "./Filters.module.scss";
import Categories from "../Categories";
import Range from "../Range";
import Search from "../Search/Search";

interface FilterProps {
	onFilterChange: (filters: string) => void;
	handleQueryChange: (query: string) => void;
	query: string;
	handleRangeChange: (value: number) => void;
	calories: number;
    handleIngrChange: (value: number) => void;
    ingr: number;
   
}
const Filters: FC<FilterProps> = ({
	onFilterChange,
	handleQueryChange,
	query,
	handleRangeChange,
	calories,
	handleIngrChange,
	ingr,
}) => {
    const handleChange = useCallback((value: string) => {
        onFilterChange(value);
      }, [onFilterChange]);
    
	return (
		<div className={styles.filters}>
			<Categories handleChange={handleChange} />
			<Range
				title="Calories range"
				handleRangeChange={handleRangeChange}
				params={calories}
                min={0}
                max={1000}
			/>
			<Range min={1}
                max={8} handleRangeChange={handleIngrChange} params={ingr} title="Number of ingredients" />
			<Search handleQueryChange={handleQueryChange} query={query} />
		</div>
	);
};

export default Filters;
