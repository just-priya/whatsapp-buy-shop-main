import { GlobalStateStore } from "../../../stores"
import Link from 'next/link'
import { useRouter } from "next/router"

const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
	<path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
</svg>

const Contact = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
</svg>


export const Header = () => {
	const state = GlobalStateStore.useContainer()
	const links = [
		{ name: <SearchIcon />, link: '/search' },
		{ name: <Contact />, link: '/contact' },
	]
	const router = useRouter()
	return (
		<header className="text-gray-600 body-font sticky top-0 bg-gray-100 z-10">
			<div className="container mx-auto flex flex-wrap p-3 items-center">
				<div className="flex title-font font-medium items-center text-gray-900 md:mb-0">
					<Link href="/">
						<a>
							<img src="/ico.svg" 
							height="34"
							width="34"
							alt="" />
						</a>
					</Link>
				</div>
				<div className="flex-1"></div>
				<nav className="flex flex-wrap items-center text-base justify-center">
					{links.map((e, i) => <Link href={e.link} key={i}>
						<a className="mr-5 hover:text-gray-900">{e.name}</a>
					</Link>)}
				</nav>
				<button onClick={() => router.push('/cart')}
					className="inline-flex items-center bg-gray-100 border-0 py-2 px-3 focus:outline-none hover:bg-gray-200 rounded text-base">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
					</svg>
					<sup>{state.cartItemCount}</sup>
				</button>
			</div>
		</header>
	)
}