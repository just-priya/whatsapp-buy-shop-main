import { useEffect, useMemo, useState } from "react"
import { createContainer } from "unstated-next"
import axios from 'axios'
import { ProductCardProps } from "../components/ui/card/product-card"
import { CsvToJson, InRs, ParseDataV1 } from "../helpers"
import { Config } from "../config"

export type CartItem = {
	id: any,
	qty: any,
}

export const SheetLink = (id: string, sheet: string) =>
	`https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:json&gid=${sheet}`

const GlobalState = () => {
	const [data, setData] = useState([] as ProductCardProps[])
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(false);
	const computedData = useMemo(() => {
		let keys = ['name', 'category']
		return data.filter((e: any) => {
			return keys.map(
				(el: any) => String(e[el]).toLowerCase()
					.indexOf(String(search).toLowerCase()) != -1
			).reduce((x, y) => x || y)
		})
	}, [search, data])
	useEffect(() => {
		init()
	}, [])
	const getOne = (id: any) => {
		return data.find((e) => e.id == id);
	}
	const init = () => {
		setLoading(true)
		axios.get(SheetLink(Config.SHEET, Config.PRODUCT)).then(re => {
			console.log("data");
			const resp = ParseDataV1(re.data)
			if (!!resp) {
				setData(resp.rows);
				setLoading(false)
				console.log(resp.rows);
			}
			setLoading(false)
		}).catch(err => {
			console.error(err);
			setLoading(false)
		})
	}
	const [cart, setCart] = useState([] as CartItem[]);
	const addToCart = (id: any) => {
		let includes = cart.map(e => e.id).includes(id)
		let newResult = cart
		if (includes) {
			newResult = newResult.map((e) => {
				if (e.id == id) {
					e.qty += 1
				}
				return e
			});
		} else {
			newResult = [{ id, qty: 1 }, ...newResult]
		}
		setCart(newResult)
		localStorage.setItem("cart", JSON.stringify({ cart: newResult }))
	}

	const removeFromCart = (id: any) => {
		let resu = cart.filter(e => e.id != id)
		setCart(resu);
		localStorage.setItem("cart", JSON.stringify({ cart: resu }))
		return
	}

	const decreaseCartCunt = (id: any) => {
		let newCart: any = cart.map(e => {
			if (e.id == id) {
				e.qty -= 1
			}
			if (!!e.qty) {
				return e
			}
		}).filter(e => !!e)
		setCart(newCart);
		localStorage.setItem("cart", JSON.stringify({ cart: newCart }))
		return
	}

	const inCart = (id: any) => cart.find(e => e.id == id)

	const cartItemCount = useMemo(() => {
		let count = 0;
		cart.forEach((e) => {
			count += e.qty
		});
		return count
	}, [cart])

	const filterItemsBasedOnKey = (key: string, value: string) => data.filter((e: any) => e[key] == value)

	const checkout = () => {
		const data = cart

		let number = "+91" + process.env.MOBILE_NO;
		let message = `Hi ${process.env.NAME} i would like to by the following products,`;
		console.log(data);
		if (!!data.length) {
			let total = 0
			let newData = cart.map((el: any) => {
				let da: any = getOne(el.id);
				el["data"] = da;
				el["total"] = InRs(da.price * el.qty)
				total += (da.price * el.qty)
				return el;
			})
			newData.forEach(el => {
				message += `\nname: ${el.data.name}\ndescription: ${el.data.description}\nqty: ${el.qty}\nTotal: ${el.total}\nlink: ${window.location.protocol}//${window.location.host}/product?id=${el.id}`;
			})
			message += `\nGrand Total: ${InRs(total)}`
		}
		let str = "https://api.whatsapp.com/send?phone=" + number + "&text=%20" + encodeURI(message)
		console.log(str);
		window.open(str);
	}

	const buyNow = (id: any) => {
		let number = "+91" + process.env.MOBILE_NO;
		let message = `Hi ${process.env.NAME} i would like to by the following product,`;
		let data = getOne(id);
		if (!!data) {
			message += `\nname: ${data.name}\ndescription: ${data.description}\nqty: ${1}\nTotal: ${data.price}\nlink: ${window.location.protocol}//${window.location.host}/product?id=${id}`;
			message += `\nGrand Total: ${InRs(data.price)}`
		} else {
			return
		}
		let str = "https://api.whatsapp.com/send?phone=" + number + "&text=%20" + encodeURI(message)
		console.log(str);
		window.open(str);
	}

	const cartTotal = useMemo(() => {
		let total = 0
		cart.forEach(e => {
			total += getOne(e.id)?.price * e.qty
		})
		return total
	}, [cart, data])

	const availableCatagories: string[] = useMemo(() => {
		let val: string[] = [];
		data.forEach((e) => {
			if (!val.includes(e.category)) {
				val.push(String(e.category));
			}
		})
		return val
	}, [data])

	const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

	const clearCategory = () => {
		setSelectedCategory([]);
	}

	return { clearCategory, setSelectedCategory, selectedCategory, cartTotal, buyNow, checkout, computedData, cart, setCart, filterItemsBasedOnKey, cartItemCount, init, search, setSearch, data, inCart, getOne, addToCart, removeFromCart, decreaseCartCunt, loading, availableCatagories }
}

export const GlobalStateStore = createContainer(GlobalState);
