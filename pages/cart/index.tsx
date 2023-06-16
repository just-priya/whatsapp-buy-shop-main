import { CartPage } from "../../components/pages/cart/cart";
import Head from 'next/head'

const Cart = () => {
	return (
		<div className={`container mx-auto`}>
            <Head>
                <title>Shop Online</title>
                <meta name="description" content="sell, buy products online with your progressive web app which helps you reach you client easier" />
                <link rel="icon" href="/ico.svg" />
            </Head>
			<div>
				<CartPage />
			</div>
		</div>
	)
}

export default Cart;
