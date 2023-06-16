import { GlobalStateStore } from "../../stores"
import { NextPage } from 'next'
import { ProductPage } from "../../components/pages/product"
import { ProductGrid } from "../../components/ui/product-grid/product-grid"

import Head from 'next/head'
import { LoaderWrapper } from "../../components/ui/loaders/loader-wrapper"
import { OrderLoader } from "../../components/ui/loaders/orbit"


const Product: NextPage<{ id: any }> = ({ id }) => {
	const state = GlobalStateStore.useContainer()
	return (
		<div>
			<Head>
				<title>Show Online</title>
				<meta name="description" content="sell, buy products online with your progressive web app which helps you reach you client easier" />
				<link rel="icon" href="/ico.svg" />
			</Head>
			{!!state.data.length ?
				!!state.getOne(id) ? <div className='container mx-auto'>
					<ProductPage data={state.getOne(id)} />
					<div className='text-xl bolder'>Similar Products</div>
					<ProductGrid filters={[]} data={state.filterItemsBasedOnKey("category", `${state.getOne(id)?.category}`)} />
				</div>
					: <div>
						404 not fund
					</div> : <div>
					<LoaderWrapper><OrderLoader /></LoaderWrapper>
				</div>}
		</div>
	)
}

Product.getInitialProps = (ctx) => {
	return { id: ctx.query.id }
}

export default Product
