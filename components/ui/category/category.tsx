import { useRouter } from "next/router"
import { useEffect } from "react"
import { GlobalStateStore } from "../../../stores"

const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>


export const CategoryTabs = () => {
    const state = GlobalStateStore.useContainer()
    const router = useRouter();
    useEffect(() => {
        return () => {
            state.clearCategory()
        }
    }, [router])

    const toggleFilter = (e: string) => {
        if (state.selectedCategory.includes(e)) {
            state.setSelectedCategory([...state.selectedCategory].filter(el => el != e))
        } else {
            state.setSelectedCategory([...state.selectedCategory, e])
        }
    }

    return (
        <div className="container mx-auto py-2 ">
            <div>
                <b className="text-2xl py-2">Filter</b>
            </div>
            <div className="flex flex-wrap">
                {state.availableCatagories?.map((e: any, i) => (
                    <button onClick={() => toggleFilter(e)} key={i}
                        className={`relative py-2 px-4 pr-2 mb-1 mx-1 ${i == 0 ? "ml-0": ""} border border-1 border-gray-400 rounded-md flex ${state.selectedCategory.includes(e) ? 'bg-blue-600 text-white border-blue-600 text-sm mr-2' : ''}`}>
                        {e} {state.selectedCategory.includes(e) ? <span className="pl-2"><CloseIcon /></span> : ''}
                    </button>
                ))}
                {state.selectedCategory.length > 1 ? <button onClick={state.clearCategory}>clear all</button> : ""}
            </div>
        </div>
    )
}