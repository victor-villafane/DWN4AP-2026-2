export function call(uri, method, body) {
    return fetch("http://localhost:2026/api" + uri, {
        headers: {
            "Content-Type": "application/json"
        },
        method: method,
        body: JSON.stringify(body)
    })
        .then(res => {
            if (!res.ok) throw new Error()
            return res.json()
        })
}