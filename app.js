const searchForm = document.querySelector('#search-form');
const input = document.querySelector('input');
const articleContainer = document.querySelector('.article-container')

// let keyword = 'bitcoin';
// let imgPath = null;
const apiKey = 'fjc5OVaxAFce0CdOsFdAoV1Tu46z6XWC';

const url = {
    base: 'https://api.nytimes.com/svc/topstories/v2/home.json',
    search: `https://api.nytimes.com/svc/search/v2/articlesearch.json`,
    img: 'http://static01.nyt.com',
};

searchForm.addEventListener('submit', e => {
    e.preventDefault();
    let keyword = input.value.trim();
    buildSearchComponent(keyword)
});

async function getTopStories() {
    try {
        let reqUrl = buildUrl(url.base);
        const res = await axios.get(reqUrl);
        let data = res.data.results;
        return data;
    } catch (err) {
        console.log(err);
    }
}

async function getSearchResults(keyword) {
    try {
        let reqUrl = buildUrl(url.search, keyword);
        const res = await axios.get(reqUrl);
        let data = res.data.response.docs;
        return data;
    } catch (err) {
        console.log(err);
    }
}

// getTopStories();
// getSearchResults(keyword)

async function buildSearchComponent(keyword) {
    let response = await getSearchResults(keyword);
    for (let article of response) {
        if (article.multimedia[0]) {  //! WORK ON THIS CONDITIONAL
            let component = `
            <div class="card">
                <div class="card-img" style="background-image: url('${url.img}/${article.multimedia[0].url}')"></div>
                <div class="card-body">
                    <h3 class="headline">${article.headline.main}</h3>
                    <p class="publish-date">${article.pub_date}</p>
                </div>
            </div>
            `;
            articleContainer.insertAdjacentHTML('beforeend', component)
        }
    }
    // console.log(response)
}





function buildUrl(url, searchParam) {
    const newUrl = new URL(url);
    newUrl.searchParams.append('api-key', apiKey);
    if (searchParam) newUrl.searchParams.append('q', searchParam);
    return newUrl;
}


