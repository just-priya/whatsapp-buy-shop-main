import { FC } from "react"
import { InRs } from "../../../helpers"
import { ProductCardProps } from "../../ui/card/product-card"

type CartItemProps = {
	data: ProductCardProps
	qty: any
	addQty: () => void
	reduceQty: () => void
	delete: () => void
}

export const CartItem: FC<CartItemProps> = (props) => {
	return (
		<div className="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
			<div className="w-20 h-26 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded flex-shrink-0">
				<img src={props.data.image} alt="image" />
			</div>
			<div className="flex-grow">
				<h2 className="text-gray-900 text-lg title-font font-medium mb-3">{props.data.name}</h2>
				<p className="leading-relaxed text-base">
					{String(props.data.description).slice(0, 30)}
				</p>
				<a className="mt-1 font-bold inline-flex items-center">
					Price: {InRs(props.data.price * props.qty)}
				</a>
				<div className='flex sm:w-full'>
					<div className='flex flex-1'>
						<button onClick={props.reduceQty} className='rounded px-4 bg-gray-100'>-</button>
						<span className='p-2 px-5'>{props.qty}</span>
						<button onClick={props.addQty} className='rounded px-4 bg-gray-100'>+</button>
					</div>
					<div className='flex items-center justify-center text-red-400'>
						<button onClick={props.delete} className='p-2'>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}