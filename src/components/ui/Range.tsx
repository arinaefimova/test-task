import { FC, useCallback } from "react";
import { ConfigProvider, Slider } from "antd";
import { rangeTheme } from "../../constants";

interface RangeProps {
	title: string;
	min: number;
	handleRangeChange: (value: number) => void;
	max: number;
	params?: number;
}

const Range: FC<RangeProps> = ({
	title,
	params,
	handleRangeChange,
	min,
	max,
}) => {
	const onChange = useCallback(
		(value: number | number[]) => {
			handleRangeChange(value as number);
		},
		[handleRangeChange]
	);
	return (
		<div>
			<h3 className="filter-title">{title}</h3>
			<div>
				<ConfigProvider theme={rangeTheme}>
					<Slider
						min={min}
						max={max}
						defaultValue={params}
						onChange={onChange}
					/>
				</ConfigProvider>
			</div>
		</div>
	);
};

export default Range;
