import config from "../config/config.json"

export default async function get_videos_by_word(word) {
    const body = new FormData()
    body.append('word', word)
    const res = await fetch(config.host + "/getvideos/", {
        method: "POST",
        body: body,
        headers: {}
    })
    return await res.json()
}