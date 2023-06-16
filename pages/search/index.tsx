
import { ProductGrid } from "../../components/ui/product-grid/product-grid";
import { GlobalStateStore } from "../../stores";
import Head from 'next/head'
import { LoaderWrapper } from "../../components/ui/loaders/loader-wrapper";
import { OrderLoader } from "../../components/ui/loaders/orbit";
import { CategoryTabs } from "../../components/ui/category/category";

const Search = () => {
    const state = GlobalStateStore.useContainer()
    return (
        <div>
            <Head>
                <title>Show Online</title>
                <meta name="description" content="sell, buy products online with your progressive web app which helps you reach you client easier" />
                <link rel="icon" href="/ico.svg" />
            </Head>
            {!state.loading ?
                <div>
                    <CategoryTabs />
                    <ProductGrid data={state.computedData} filters={state.selectedCategory} />
                </div>
                : <LoaderWrapper><OrderLoader /></LoaderWrapper>}
        </div>
    )
}

Search.layout = "search"

export default Search;