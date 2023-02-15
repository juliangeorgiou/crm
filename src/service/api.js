const baseURL = process.env.NODE_ENV === "production" ? "https://julian-crm.pfiers.net/api/" : "http://localhost:8000/api/"
const abc = process.env.NODE_ENV

export async function fetchData(dataSetName){
    console.log(abc)
    const timeOut = new Promise((_resolve, reject) => {
        setTimeout(reject, 10000, 'Fetching data timed out. Please contact support.');
      });
    const fetchPromise = (async () => {
        const res = await fetch(`${baseURL}${dataSetName}`)
        const dataSet = await res.json()
        return dataSet
    })()
    const result = await Promise.race([timeOut, fetchPromise])
    return result
}
//TODO: REMOVE ASYNC BELOW AND MAKE IT SO IT STILL WORKS WITH .THEN METHOD
//TODO: CALL THIS FUNCTION FOR ORDERS, PRODUCTS ETC.
/*export async function fetchDataPromise(dataSetName){
    const timeOut = new Promise((_resolve, reject) => {
        setTimeout(reject, 10000, 'Fetching data timed out. Please contact support.');
      });
    const fetchPromise = (async () => {
        const res = await fetch(`http://localhost:8000/api/${dataSetName}`)
        const dataSet = await res.json()
        return dataSet
    })()
    const result = await Promise.race([timeOut, fetchPromise])
    return result
}*/
//TODO:
//POST DATA ASYNC FN
export async function postData(dataSetName, dataForPosting){
    const timeOut = new Promise((_resolve, reject) => {
        setTimeout(reject, 10000, 'Posting data timed out. Please contact support.');
      });
    const postPromise = (async () => {
        const res = await fetch(`${baseURL}${dataSetName}`, {
            method: "POST",
            body: JSON.stringify(dataForPosting),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (res.status !== 200){
            throw new Error("Unexpected error")
        }
        //TODO: WHAT RESPONSE TO GET?
        const dataSet = await res.json()
        return dataSet
    })()
    const result = await Promise.race([timeOut, postPromise])
    return result
}