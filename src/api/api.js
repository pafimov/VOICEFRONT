import config from "../config/config.json"

export async function auth(username, password) {
    const body = new FormData()
    body.append('username', username)
    body.append('password', password)
    const res = await fetch(config.host + "/auth/", {
        method: "POST",
        body: body,
        headers: {}
    })
    return await res.json()
}

export async function sendcode(email) {
    const body = new FormData()
    body.append('email', email)
    const res = await fetch(config.host + "/sendcode/", {
        method: "POST",
        body: body,
        headers: {}
    })
    return await res.json()
}


export async function check_code(code) {
    const body = new FormData()
    body.append('code', code)
    const res = await fetch(config.host + "/checkcode/", {
        method: "POST",
        body: body,
        headers: {}
    })
    return await res.json()
}


export async function register(email, password, secret) {
    const body = new FormData()
    body.append('email', email)
    body.append('password', password)
    body.append('secret', secret)
    const res = await fetch(config.host + "/register/", {
        method: "POST",
        body: body,
        headers: {}
    })
    return await res.json()
}

export async function get_videos_by_word(word, accent) {
    const body = new FormData()
    body.append('word', word)
    body.append('accent', accent)
    const res = await fetch(config.host + "/getvideos/", {
        method: "POST",
        body: body,
        headers: {}
    })
    return await res.json()
}

export async function get_audios_by_word(word, accent) {
    const body = new FormData()
    body.append('word', word)
    body.append('accent', accent)
    const res = await fetch(config.host + "/getaudios/", {
        method: "POST",
        body: body,
        headers: {}
    })
    return await res.json()
}

export async function get_username(token) {
    const body = new FormData()
    const res = await fetch(config.host + "/getusername/", {
        method: "POST",
        body: body,
        headers: { "Authorization": 'Token ' + token }
    })
    return await res.json()
}