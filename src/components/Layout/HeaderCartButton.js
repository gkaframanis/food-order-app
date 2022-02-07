import { useContext, useEffect, useState } from "react";

import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cartContext";
import CartIcon from "../Cart/CartIcon";

const HeaderCartButton = props => {
	const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
	// Managed by the closest provider which is the CartProvider in App.js
	const cartCtx = useContext(CartContext);

	const numOfCartItems = cartCtx.items.reduce((curNumber, item) => {
		return curNumber + item.amount;
	}, 0);

	const { items } = cartCtx;

	const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ""}`;

	useEffect(() => {
		if (items.length === 0) {
			return;
		}
		setBtnIsHighlighted(true);
		// After the duration of the animation
		const timer = setTimeout(() => {
			setBtnIsHighlighted(false);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [items]);

	// The button will be re-evaluated every time the context changes.
	return (
		<button className={btnClasses} onClick={props.onButtonClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>{props.children}</span>
			<span className={classes.badge}>{numOfCartItems}</span>
		</button>
	);
};

export default HeaderCartButton;
