
const fetcher = function (url) {
    console.log('fetching ...');
    return fetch(url).then(r => r.json())
}

export default fetcher