keyword = 'bitcoin'

const BASE_URL = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=fjc5OVaxAFce0CdOsFdAoV1Tu46z6XWC';
const SEARCH_URL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${keyword}&api-key=fjc5OVaxAFce0CdOsFdAoV1Tu46z6XWC`
const IMG_URL = `static01.nyt.com/${url}`

async function getData() {
    try {
        const res = await axios.get(SEARCH_URL);
        console.log(res);
    } catch (err) {
        console.log(err);
    }
}

getData();
