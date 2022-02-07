import { useContext } from "react";

import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cartContext";
import CartIcon from "../Cart/CartIcon";

const HeaderCartButton = props => {
	// Managed by the closest provider which is the CartProvider in App.js
	const cartCtx = useContext(CartContext);

	const numOfCartItems = cartCtx.items.reduce((curNumber, item) => {
		return curNumber + item.amount;
	}, 0);

	// The button will be re-evaluated every time the context changes.
	return (
		<button className={classes.button} onClick={props.onButtonClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>{props.children}</span>
			<span className={classes.badge}>{numOfCartItems}</span>
		</button>
	);
};

export default HeaderCartButton;
