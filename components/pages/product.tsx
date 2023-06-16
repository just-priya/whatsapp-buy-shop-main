import { FC } from "react"
import { InRs } from "../../helpers"
import { GlobalStateStore } from "../../stores"
import { ProductCardProps } from "../ui/card/product-card"

type ProductPageProps = {
	data?: ProductCardProps
}

export const ProductPage: FC<ProductPageProps> = (_props) => {
	const state = GlobalStateStore.useContainer()

	const buyOption = (id: any) => <div>
		<div className="title-font font-medium text-2xl text-gray-900 py-2">{InRs(_props.data?.price)}</div>
		<div className="flex w-full">
			<button onClick={() => state.buyNow(id)} className="inline-flex items-center ml-auto text-white bg-indigo-500 justify-center border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded flex-1">
				Buy Now
			</button>
			{state.inCart(id)
				? <div className='flex-1 pr-2 flex items-center ml-2'>
					<button onClick={() => state.decreaseCartCunt(_props.data?.id)} className='flex-1 bg-gray-100 p-2 rounded'>-</button>
					<span className='p-2'>{state.inCart(id)?.qty}</span>
					<button onClick={() => state.addToCart(_props.data?.id)} className='flex-1 bg-gray-100 p-2 rounded'>+</button>
				</div>
				: <button onClick={() => state.addToCart(_props.data?.id)} className="bg-gray-200 py-2 px-2 border-0 inline-flex items-center justify-center text-gray-500 ml-2 rounded flex-1">
					add to cart
					<span className="text-xl ml-2">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
						</svg>
					</span>
				</button>}
		</div>
	</div>

	const isMobile = window.innerWidth < 1000

	return (
		!!_props.data
			?
			<section className="text-gray-600 body-font overflow-hidden">
				<div className="container px-5 py-10 mx-auto">
					<div className="lg:w-4/5 mx-auto flex flex-wrap">
						<img style={{
							maxHeight: '400px'
						}} alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
							src={_props.data.image} />
						<div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
							<h2 className="text-sm title-font text-gray-500 tracking-widest">{_props.data.category}</h2>
							<h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{_props.data.name}</h1>
							<p className="leading-relaxed">
								{_props.data.description}
							</p>
							<div>
							</div>
							{!isMobile ? <div className='w-full py-2' style={{
								backgroundColor: '#fff',
							}}>{buyOption(_props.data.id)}</div> :
								<div className='w-full px-2 py-2 ' style={{
									position: 'fixed',
									bottom: '0px',
									left: 0,
									zIndex: 10,
									backgroundColor: '#fff',
								}}>
									{buyOption(_props.data.id)}
								</div>}
						</div>
					</div>
				</div>
			</section>
			: <section>
				loading...
			</section>
	)

}