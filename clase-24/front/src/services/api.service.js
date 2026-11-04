export function call(uri, method = "GET", body = undefined) {
    const url = import.meta.env.VITE_API_URL ?? "http://localhost:2026"
    return fetch( url + uri, {
        headers: {
            "Content-Type": "application/json",
            "authorization": "Bearer " + JSON.parse(localStorage.getItem("usuario"))?.token
        },
        method: method,
        body: JSON.stringify(body)
    })
        .then(res => {
            if (!res.ok) throw new Error()
            return res.json()
        })
}