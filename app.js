const searchForm = document.querySelector('#search-form');
const input = document.querySelector('input');

let keyword = 'bitcoin';
let imgPath = null;
const apiKey = 'fjc5OVaxAFce0CdOsFdAoV1Tu46z6XWC';

const url = {
    base: 'https://api.nytimes.com/svc/topstories/v2/home.json',
    search: `https://api.nytimes.com/svc/search/v2/articlesearch.json`,
    img: `static01.nyt.com/${imgPath}`,
};

searchForm.addEventListener('submit', e => {
    e.preventDefault();
    let keyword = input.value;
    // getSearchResults(keyword);
});

async function getTopStories() {
    try {
        let reqUrl = buildUrl(url.base);
        const res = await axios.get(reqUrl);
        let data = res.data.results;
        console.log(data);
    } catch (err) {
        console.log(err);
    }
}

async function getSearchResults(keyword) {
    try {
        let reqUrl = buildUrl(url.search, keyword);
        const res = await axios.get(reqUrl);
        let data = res.data.response.docs;
        console.log(data);
    } catch (err) {
        console.log(err);
    }
}

// getTopStories();
// getSearchResults()

function buildUrl(url, searchParam) {
    const newUrl = new URL(url);
    newUrl.searchParams.append('api-key', apiKey);
    if (searchParam) newUrl.searchParams.append('q', searchParam);
    return newUrl;
}
