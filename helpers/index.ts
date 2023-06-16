export const InRs = (va: any) => Number(va).toLocaleString("en-IN", {
    style: "currency",
    currency: 'INR'
}).replace('.00', '')



export const CsvToJson = (arg: string) => {
    let allData = String(arg).split("\r\n")
    let header = allData[0].split('\t')
    let body = allData.splice(1,).map((e) => {
        let arr = e.split('\t')
        let obj: any = {};
        header.forEach((e, i) => {
            obj[e] = arr[i]
        });
        return obj
    })
    return { header, body }
}

export const ParseDataV1 = (response: string) => {
    let strData = String(response)
        .replace("google.visualization.Query.setResponse(", "")
        .replace("/*O_o*/", "")
        .replace(');', '')
    let parsData = JSON.parse(strData)
    if (parsData.table) {
        console.log(parsData.table);
        let cols: any[] = parsData.table.cols.filter((e: any) => !!e.label).map((e: any, i: any) => e.label)
        let rows: any[] = parsData.table.rows.map((e: any) => {
            let c = e.c
            let newVal: any = {}
            cols?.forEach((el: any, i: number) => {
                newVal[el] = !!c[i] ? c[i].v : ""
            })
            return newVal
        })
        return {rows, cols};
    }
    return false
}
