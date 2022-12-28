export default function params(url){
    // returning params from the req url
    const regex = /:([a-zA-Z]+)/g
    const Params = Array.from(url.matchAll(regex), match => match[1])
    return Params;
}