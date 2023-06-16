import Link from "next/link"
import { FC } from "react"
import { InRs } from "../../../helpers"

export type ProductCardProps = {
    id: any
    name: any
    description: string;
    price: any;
    ratings: any;
    category: string;
    image: string
}

export const ProductCard: FC<ProductCardProps> = (_props) => {
    return (
        <div className="w-full">
            <Link href={`/product?id=${_props.id}`}>
                <a className="block relative h-48 rounded overflow-hidden">

                    <img
                        alt="ecommerce" className="object-cover object-center w-full h-full block"
                        src={_props.image} />
                </a>
            </Link>
            <div className="mt-4">
                <h2 className="text-gray-900 title-font text-lg font-medium overflow-hidden truncate w-full">{_props.name}</h2>
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{_props.category}</h3>
                <p className="mt-1">{InRs(_props.price)}</p>
            </div>
        </div>
    )
}