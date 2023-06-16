import axios from "axios";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { CsvToJson, ParseDataV1 } from "../../helpers";

import Head from 'next/head'
import { LoaderWrapper } from "../../components/ui/loaders/loader-wrapper";
import { OrderLoader } from "../../components/ui/loaders/orbit";
import { SheetLink } from "../../stores";
import { Config } from "../../config";

const Contact: NextPage = () => {
    const [data, setData] = useState([] as { name: string, value: any }[])
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true)
        axios.get(SheetLink(Config.SHEET, Config.CONTACT))
            .then(res => {
                console.log("contact", res.data);

                let resp = ParseDataV1(res.data);
                if (resp) {
                    console.log("contact", resp.rows);
                    setData(resp.rows)
                    setLoading(false)
                }
                console.log(resp);
            }).catch((e) => {
                console.log("contact", e)
                setLoading(false)
            })
    }, [])
    const typeAction = (type: string, value: any) => {
        switch (type) {
            case "whatsapp":
                // window.open(`whatsapp://send?phone=+91${value}`)
                return `https://api.whatsapp.com/send?phone=+91${value}`
            case "mobile":
                // window.open(`tel:+91${value}`)
                return `tel:+91${value}`
            case "email":
                // window.open(`mailto:${value}`)
                return `mailto:${value}`
            default:
                return `#`;
        }
    }
    return (
        <div className='container mx-auto'>
            <Head>
                <title>Show Online</title>
                <meta name="description" content="sell, buy products online with your progressive web app which helps you reach you client easier" />
                <link rel="icon" href="/ico.svg" />
            </Head>
            {loading ?
                <LoaderWrapper><OrderLoader /></LoaderWrapper>
                : <div className='-m-4 p-5 max-w-lg mx-auto justify-center'>
                    <h1 className='text-xl font-bold'>Contact</h1>
                    <p className="py-4">
                        contact us for to get your own website at affordable price for your business with free trial for 30 days.
                    </p>
                    <table style={{
                        width: '100%'
                    }}>
                        <tbody>
                            {data.map((e, i) => (
                                <tr key={i}>
                                    <td>{e.name}</td>
                                    <td ><a href={typeAction(e.name, e.value)}>{e.value}</a></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>}
        </div>
    )
}


export default Contact;