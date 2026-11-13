export function call(uri, method = "GET", body = undefined) {
    const url = import.meta.env.VITE_API_URL ?? "http://localhost:2026"
    let token
    try { token = JSON.parse(localStorage.getItem("usuario"))?.token } catch { token = null }
    return fetch( url + uri, {
        headers: {
            "Content-Type": "application/json",
            "authorization": "Bearer " + token
        },
        method: method,
        body: JSON.stringify(body)
    })
        .then(res => {
            if (!res.ok) throw new Error()
            return res.json()
        })
}