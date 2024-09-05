import React, { FC, useCallback } from "react";
import styles from "./Search.module.scss";

interface SearchProps {
	handleQueryChange: (query: string) => void;
	query: string;
}

const Search: FC<SearchProps> = ({ handleQueryChange, query }) => {
    
	const onSearchChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			handleQueryChange(event.target.value.trim());
		},
		[handleQueryChange]
	);

	return (
		<div className={styles.box}>
			<label htmlFor="search" className="filter-title">
				Find your recipes
			</label>
			<div className={styles.search}>
				<input
					id="search"
					value={query}
					onChange={onSearchChange}
					type="text"
					placeholder="Search recipes..."
					aria-label="Search recipes"
				/>
			</div>
		</div>
	);
};

export default Search;
