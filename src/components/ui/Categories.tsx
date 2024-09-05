import React from "react";
import { ConfigProvider, Select } from "antd";
import { selectTheme } from "../../constants";

interface CategoriesProps {
	handleChange: (value: string) => void;
}
const Categories: React.FC<CategoriesProps> = ({ handleChange }) => {
	return (
		<div>
			<h3 className="filter-title">Categories</h3>
			<div>
				<ConfigProvider theme={selectTheme}>
					<Select
						defaultValue="all"
						style={{ width: "100%" }}
						onChange={handleChange}
						options={[
							{ value: "all", label: "All" },
							{ value: "fav", label: "Favourites" },
						]}
					/>
				</ConfigProvider>
			</div>
		</div>
	);
};

export default Categories;
