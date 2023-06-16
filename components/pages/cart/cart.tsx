import { useRouter } from "next/router"
import { InRs } from "../../../helpers"
import { GlobalStateStore } from "../../../stores"
import { LoaderWrapper } from "../../ui/loaders/loader-wrapper"
import { OrderLoader } from "../../ui/loaders/orbit"
import { CartItem } from "./cart-item"

export const CartPage = () => {
	const state = GlobalStateStore.useContainer()
	const router = useRouter()
	const getItem = (id: any): any => state.getOne(id)
	return (
		state.loading ?

			<LoaderWrapper><OrderLoader /></LoaderWrapper>
			: <section className="text-gray-600 body-font">
				<div className="p-4  text-center">
					<h1 className='my-5 font-bold text-xl text-center'>Your Cart</h1>
				</div>
				<div className="container px-5 py-10 mx-auto flex flex-wrap max-w-2xl">
					<div className="flex flex-wrap -m-4">
						{state.cart.map((e, i) => (
							<div className="p-4 lg:w-1/2 md:w-full" style={{ width: '100%' }} key={i}>
								{state.getOne(e.id) && <CartItem qty={e.qty}
									delete={() => state.removeFromCart(e.id)}
									addQty={() => state.addToCart(e.id)}
									reduceQty={() => state.decreaseCartCunt(e.id)}
									data={getItem(e.id)} />}
							</div>
						))}
					</div>
				</div>
				{!!state.cart.length ? <div className='container px-5 max-w-2xl mx-auto'>
					<div>
						<h1 className='my-1 font-bold text-xl'>Cart Total: {InRs(state.cartTotal)}</h1>
					</div>
					<div className='py-3'>
						<button className='bg-blue-500 rounded p-4 px-10 text-white' onClick={() => state.checkout()}>Place Order</button>
					</div>
				</div> : <div>
					<div className='text-center'>
						<h1 className='text-center'>Your cart is empty</h1>
						<button onClick={() => router.push('/')} className='mt-4 p-2 px-3 bg-blue-500 inline-flex text-white '>CONTINUE SHOPPING</button>
					</div>
				</div>}
			</section>
	)
}
