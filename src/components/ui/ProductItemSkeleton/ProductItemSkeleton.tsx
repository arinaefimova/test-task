import { Box, Skeleton } from "@mui/material";

const ProductItemSkeleton = () => {
	return (
		<Box
			sx={{
				width: "100%",
				borderRadius: "6px",
				boxSizing: "border-box",
			}}
		>
			<Skeleton
				variant="rectangular"
				sx={{
					width: "100%",
					height: "250px",
					borderRadius: "6px",
					mb: 1,
				}}
			/>
			<Skeleton
				sx={{
					width: "100%",
					height: "50px",
					borderRadius: "6px",
				}}
			/>
			<Skeleton
				sx={{
					width: "100%",
					height: "70px",
					borderRadius: "6px",
				}}
			/>
		</Box>
	);
};

export default ProductItemSkeleton;
