import { FC, useEffect } from "react"
import { GlobalStateStore } from "../../stores"

export const GeneralMiddleware: FC = ({ children }) => {
	const state = GlobalStateStore.useContainer()
	useEffect(() => {
		let loca = localStorage.getItem("cart");
		if (!!loca) {
			if (!!JSON.parse(loca).cart) {
				if (JSON.parse(loca).cart.length) {
					state.setCart(JSON.parse(loca).cart)
				}
			}
		}
		return () => {
			// localStorage.setItem("cart", JSON.stringify({ cart: state.cart }))
		}
	}, [])
	return (
		<div>
			{children}
		</div>
	)
}