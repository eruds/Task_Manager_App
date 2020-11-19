import React from "react";
import { IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

interface propsInput {
	category: string;
	onClick: (e: React.MouseEvent<HTMLButtonElement>, category: string) => void;
}

export default function SkillCategoryButton({ category, onClick }: propsInput) {
	return (
		<div
			style={{
				display: "flex",
				border: "1px solid #3f51b5",
				borderRadius: "5px",
				alignItems: "center",
				padding: "6px 7px",
				marginRight: "10px",
				marginBottom: "10px",
			}}
		>
			<span
				style={{
					textTransform: "uppercase",
					margin: "0",
					fontFamily: "Roboto",
					fontWeight: 500,
					padding: "0 7px",
					color: "#3f51b5",
					fontSize: "13px",
				}}
			>
				{category}
			</span>
			<IconButton
				onClick={(e) => onClick(e, category)}
				disableRipple
				style={{ padding: "0 2px", color: "#3f51b5" }}
			>
				<ClearIcon style={{ fontSize: 15 }} />
			</IconButton>
		</div>
	);
}
