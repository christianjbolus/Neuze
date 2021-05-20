const home = document.querySelector('#title')
const myArticles = document.querySelector('#my-articles');
const searchForm = document.querySelector('#search-form');
const input = document.querySelector('input');
const validation = document.querySelector('.validation');
const articleContainer = document.querySelector('.article-container');

const API_KEY = 'fjc5OVaxAFce0CdOsFdAoV1Tu46z6XWC';
// Save state of article ids.
let READ_LIST = localStorage.length === 0 ? 0 : Math.max(...Object.keys(localStorage)) + 1

const URLS = {
    base: 'https://api.nytimes.com/svc/topstories/v2/home.json',
    search: `https://api.nytimes.com/svc/search/v2/articlesearch.json`,
    img: 'http://static01.nyt.com',
};

home.addEventListener('click', async () => {
    clearArticles(articleContainer);
    let topStories = await getTopStories()
    renderArticleComponents(topStories);
})

searchForm.addEventListener('submit', e => {
    e.preventDefault();
    if (input.value === '') {
        validation.classList.add('active');
    } else {
        validation.classList.remove('active')
        let keyword = input.value.trim();
        clearArticles(articleContainer);
        renderSearchComponent(keyword);
        input.value = '';
    }
});

myArticles.addEventListener('click', () => {
    let savedArticles = getSavedArticles();
    clearArticles(articleContainer);
    renderArticleComponents(savedArticles);
});

function listenForRenderModal() {
    const cards = document.querySelectorAll('.card');
    for (let card of cards) {
        card.addEventListener('click', function () {
            renderModal(this);
            listenForCloseModal();
            listenForBookmark();
        });
    }
}

function listenForCloseModal() {
    const modal = document.querySelector('.modal-container');
    const close = document.querySelector('#close');
    window.addEventListener('click', e => {
        if (e.target == modal || e.target == close) {
            modal.classList.remove('active');
            setTimeout(() => {
                articleContainer.firstElementChild.remove();
            }, 300);
        }
    });
}

async function getTopStories() {
    try {
        let reqUrl = buildUrl(URLS.base);
        const res = await axios.get(reqUrl);
        let data = res.data.results;
        return data;
    } catch (err) {
        console.log(err);
    }
}

async function getSearchResults(keyword) {
    try {
        let reqUrl = buildUrl(URLS.search, keyword);
        const res = await axios.get(reqUrl);
        let data = res.data.response.docs;
        if (!data[0]) renderError("Couldn't find what you're looking for");
        return data;
    } catch (err) {
        console.log(err);
    }
}


async function renderSearchComponent(keyword) {
    let response = await getSearchResults(keyword);
    for (let article of response) {
        if (article.multimedia[0]) {      //! WORK ON THIS CONDITIONAL
            let component = `
                <div class="card">
                    <div class="card-img" style="background-image: url('${URLS.img}/${article.multimedia[0].url}')"></div>
                    <div class="card-body">
                        <h3 class="headline">${article.headline.main}</h3>
                        <p class="byline hidden">${article.byline.original}</p>
                        <p class="publish-date">${formatDate(article.pub_date)}</p>
                        <p class="lead-paragraph hidden">${article.lead_paragraph}</p>      
                        <p class="article-link hidden">${article.web_url}</p>
                    </div>
                </div>
                `;
            articleContainer.insertAdjacentHTML('beforeend', component);
        }
    }
    listenForRenderModal();
}

function renderArticleComponents(response) {
    for (let article of response) {
        if (article.multimedia[0]) {
            let component = `
                <div class="card">
                    <div class="card-img" style="background-image: url('${article.multimedia[0].url}')"></div>
                    <div class="card-body">
                        <h3 class="headline">${article.title}</h3>
                        <p class="byline hidden">${article.byline}</p>
                        <p class="publish-date">${formatDate(article.published_date)}</p>
                        <p class="lead-paragraph hidden">${article.abstract}</p>
                        <p class="article-link hidden">${article.url}</p>
                        <p class="hidden">${article?.id}</p>
                        <p class="hidden">${article?.saved}</p>
                    </div>
                </div>
                `;
            articleContainer.insertAdjacentHTML('beforeend', component);
        }
    }
    listenForRenderModal();
}

function renderModal(element) {
    let modal = `
        <div class="modal-container">
            <div class="modal" id="${element.lastElementChild.children[5]?.textContent}">
                <div class="modal-img" style="background-image: ${element.firstElementChild.style.backgroundImage.replaceAll('"', "'")}"></div>
                <div class="modal-body">
                    <h3 class="modal-headline">${element.lastElementChild.firstElementChild.textContent}</h3>
                    <h4 class="byline">${element.lastElementChild.children[1].textContent}</h4>
                    <p class="modal-publish-date">${element.lastElementChild.children[2].textContent}</p>
                    <p class="lead-paragraph">${element.lastElementChild.children[3].textContent}</p>
                    <a href="${element.lastElementChild.children[4].textContent}" target="_blank"><button id="modal-btn" class="btn">Full Article</button></a>
                    <div class="modal-control">
                        <i id="bookmark" class="${element.lastElementChild.children[6]?.textContent === 'true' ? 'fas' : 'far'} fa-bookmark"></i>
                        <i id="close" class="fas fa-times"></i>
                    </div>  
                </div
            </div>
        </div> 
        `;
    articleContainer.insertAdjacentHTML('afterbegin', modal);
    let modalContainer = document.querySelector('.modal-container');
    setTimeout(() => {
        modalContainer.classList.add('active');
    }, 100);
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

function renderError() {
    let error = `<div class="error"></div>`;
    articleContainer.insertAdjacentHTML('afterbegin', error);
}

function trimUrl(url) {
    return url.slice(5, url.length - 2);
}

function toggleClass(element, class1, class2) {
    if (element.classList.contains(class1)) {
        element.classList.remove(class1);
        element.classList.add(class2);
    } else {
        element.classList.remove(class2);
        element.classList.add(class1);
    }
}

(async () => {
    let topStories = await getTopStories()
    renderArticleComponents(topStories)
})()

//========================================================================
//* PSEUDOCODE FOR READLIST

// Create event listener on modal bookmark icon
function listenForBookmark() {
    let bookmark = document.querySelector('#bookmark');
    bookmark.addEventListener('click', function () {
        toggleClass(this, 'far', 'fas');
        let modal = this.closest('.modal');
        if (this.classList.contains('fas')) {
            let article = createArticleObject(modal);
            saveArticle(article);
        } else {
            localStorage.removeItem(modal.id)
            // READ_LIST--
        }
    });
}

// Create object and store aticle data
function createArticleObject(element) {
    let articleObj = {
        id: READ_LIST,
        multimedia: [{ url: trimUrl(element.firstElementChild.style.backgroundImage) }],
        title: element.lastElementChild.firstElementChild.textContent,
        byline: element.lastElementChild.children[1].textContent,
        published_date: element.lastElementChild.children[2].textContent,
        abstract: element.lastElementChild.children[3].textContent,
        url: element.lastElementChild.children[4].href,
        saved: true
    };
    return articleObj;
}

// Covert object to JSON string and save in local storage
function saveArticle(article) {
    localStorage.setItem(READ_LIST.toString(), JSON.stringify(article));
    READ_LIST++;
}

// Create read list button in nav
// ✅

// Create function to pull from all articles from local storage
function getSavedArticles() {
    let savedArticles = [];
    let keys = Object.keys(localStorage)
    for (let i = 0; i < keys.length; i++) {
        savedArticles.push(JSON.parse(localStorage.getItem(keys[i])));
    }
    return savedArticles;
}
// Parse each object (JSON.parse) and push into readlist array
// ✅

// Render each article object.
// ✅

// Create function to remove article from local storage
// ✅

// Create function to clear local storage

//=========================================================================