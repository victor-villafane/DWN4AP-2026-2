export function call(uri, method = "GET", body = undefined) {
    return fetch("http://localhost:2026/api" + uri, {
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