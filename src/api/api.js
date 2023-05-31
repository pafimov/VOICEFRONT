import config from "../config/config.json"

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