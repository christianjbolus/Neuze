const searchForm = document.querySelector('#search-form');
const input = document.querySelector('input');
const validation = document.querySelector('.validation')
const articleContainer = document.querySelector('.article-container');


const API_KEY = 'fjc5OVaxAFce0CdOsFdAoV1Tu46z6XWC';

const url = {
    base: 'https://api.nytimes.com/svc/topstories/v2/home.json',
    search: `https://api.nytimes.com/svc/search/v2/articlesearch.json`,
    img: 'http://static01.nyt.com',
};


searchForm.addEventListener('submit', e => {
    e.preventDefault();
    if (input.value === '') {
        validation.style.display = 'block'
    } else {
        validation.style.display = 'none'
        let keyword = input.value.trim();
        clearArticles(articleContainer);
        buildSearchComponent(keyword);
        input.value = ''
    }
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
        if (!data[0]) renderError()
        return data;
    } catch (err) {
        console.log(err);
    }
}


async function buildSearchComponent(keyword) {
    let response = await getSearchResults(keyword);
    for (let article of response) {
        if (article.multimedia[0]) {    //! WORK ON THIS CONDITIONAL
            let component = `
            <div class="card">
                <div class="card-img" style="background-image: url('${url.img}/${article.multimedia[0].url}')"></div>
                <div class="card-body">
                    <h3 class="headline">${article.headline.main}</h3>
                    <p class="byline hidden">${article.byline.original}</p>
                    <p class="lead-paragraph hidden">${article.lead_paragraph}</p>
                    <p class="publish-date">${formatDate(article.pub_date)}</p>
                </div>
            </div>
            `;
            articleContainer.insertAdjacentHTML('beforeend', component);
        }
    }
    listenForRenderModal()
}


async function buildMainComponent() {
    let response = await getTopStories();
    for (let article of response) {
        if (article.multimedia[0]) {
            let component = `
            <div class="card">
                <div class="card-img" style="background-image: url('${article.multimedia[0].url}')"></div>
                <div class="card-body">
                    <h3 class="headline">${article.title}</h3>
                    <p class="byline hidden">${article.byline}</p>
                    <p class="lead-paragraph hidden">${article.abstract}</p>
                    <p class="publish-date">${formatDate(article.published_date)}</p>
                </div>
            </div>
            `;
            articleContainer.insertAdjacentHTML('beforeend', component);
        }
    }
    listenForRenderModal()
}

function listenForRenderModal() {
    const cards = document.querySelectorAll('.card')
    for (let card of cards) {
        card.addEventListener('click', function() {
            renderModal(this)
            listenForCloseModal()
        })
    }
}


function clearArticles(element) {
    while (element.lastChild) {
        element.removeChild(element.lastChild);
    }
}


function formatDate(date) {
    let formattedDate = new Date(date).toDateString().slice(4);
    return formattedDate;
}


function buildUrl(url, searchParam) {
    const newUrl = new URL(url);
    newUrl.searchParams.append('api-key', API_KEY);
    if (searchParam) newUrl.searchParams.append('q', searchParam);
    return newUrl;
}


function renderModal(element) {
    let modal = `
    <div class="modal-container">
        <div class="modal">
            <div class="modal-img" style="background-image: ${element.firstElementChild.style.backgroundImage.replaceAll('"', '\'')}"></div>
            <div class="modal-body">
                <h3 class="modal-headline">${element.lastElementChild.firstElementChild.textContent}</h3>
                <h4 class="byline">${element.lastElementChild.children[1].textContent}</h4>
                <p class="modal-publish-date">${element.lastElementChild.lastElementChild.textContent}</p>
                <p class="lead-paragraph">${element.lastElementChild.children[2].textContent}</p>
                <button id="modal-btn" class="btn">Full Article</button>    
            </div
        </div>
    </div> 
    `
    articleContainer.insertAdjacentHTML('afterbegin', modal)
    let modalContainer = document.querySelector('.modal-container')
    setTimeout(() => {
        modalContainer.classList.add('active')
    }, 100)
    
}


function renderError() {
    let error = '<div class="error"></div>'
    articleContainer.insertAdjacentHTML('afterbegin', error)
}

function listenForCloseModal() {
    const modal = document.querySelector('.modal-container')
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.classList.remove('active')
            setTimeout(() => {
                articleContainer.firstElementChild.remove()
            }, 300)
        }
    })
}
buildMainComponent()
