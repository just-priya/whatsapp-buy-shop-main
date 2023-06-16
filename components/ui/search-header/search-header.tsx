import { useRouter } from "next/router"
import { GlobalStateStore } from "../../../stores"

export const SearchHeader = () => {
	const router = useRouter()
	const state = GlobalStateStore.useContainer()
	return (
		<div className='container mx-auto sticky top-0 bg-gray-100 z-10'>
			<header className="text-gray-600 body-font">
				<div className="flex  p-3 flex-row items-center">
					<button onClick={() => {
						router.back()
					}}>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
						</svg>
					</button>
					<input
					autoFocus
					autoComplete="off"
						value={state.search}
						onChange={(e) => state.setSearch(e.target.value)}
						className="flex-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="username"
						type="text"
						placeholder="Search product..." />
				</div>
				{state.computedData.length != state.data.length && <div className='pl-10 pt-0 text-sm'>
					found {state.computedData.length} of {state.data.length}
				</div>}
			</header>
		</div>
	)
}