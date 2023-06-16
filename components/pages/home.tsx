import { GlobalStateStore } from "../../stores"
import { CategoryTabs } from "../ui/category/category";
import { LoaderWrapper } from "../ui/loaders/loader-wrapper";
import { OrderLoader } from "../ui/loaders/orbit";
import { ProductGrid } from "../ui/product-grid/product-grid"

export const HomePage = () => {
    const state = GlobalStateStore.useContainer();
    return (
        <div>
            {state.loading ? <LoaderWrapper><OrderLoader /></LoaderWrapper> :
                <div>
                    <CategoryTabs />
                    <ProductGrid data={state.data} filters={state.selectedCategory} />
                </div>
            }
        </div>
    )
}