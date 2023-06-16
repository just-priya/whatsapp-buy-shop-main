import { FC, useMemo } from 'react'
import { ProductCard, ProductCardProps } from '../card/product-card'
import { CategoryTabs } from '../category/category'

export const ProductGrid: FC<{ data: ProductCardProps[], filters: string[] }> = (_props) => {
	const computedData = useMemo(() => {
		return !!_props.filters.length ? _props.data.filter((e) => _props.filters.includes(e.category)) : _props.data
	}, [_props.filters, _props.data])
	return (
		<section className="text-gray-600 body-font min-h-screen">
			<div className="container px-5 py-10 mx-auto">
				<div className="flex flex-wrap -m-4">
					{computedData.map((e, i) =>
						<div className="lg:w-1/4 md:w-1/2 p-1 w-1/2" key={i}>
							<ProductCard {...e} />
						</div>
					)}
				</div>
			</div>
		</section>
	)
}