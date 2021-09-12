const home = document.querySelector('#home')
const myArticles = document.querySelector('#my-articles');
const searchForm = document.querySelector('#search-form');
const searchBar = document.querySelector('input');
const validationMessage = document.querySelector('.validation-msg');
const articleContainer = document.querySelector('.article-container');
const deleteButton = document.querySelector('#delete-btn')

const API_KEY = 'fjc5OVaxAFce0CdOsFdAoV1Tu46z6XWC';

const URLS = {
    base: 'https://api.nytimes.com/svc/topstories/v2/home.json',
    search: `https://api.nytimes.com/svc/search/v2/articlesearch.json`,
    img: 'https://static01.nyt.com/',
};

// Render top stories when app name clicked
home.addEventListener('click', async () => {
    deleteButton.classList.add('hidden')
    clearArticles(articleContainer);
    let topStories = await getTopStories()
    for (article of topStories) {
        let props = {
            image: article.multimedia[0]?.url.replace('https://static01.nyt.com/', ''),
            title: article.title,
            byline: article.byline,
            pubDate: article.published_date,
            leadPara: article.abstract,
            url: article.url,
            id: article.uri.replace('nyt://article/', ''), 
            saved: article?.saved
        }
        renderArticleComponent(props)
    }
    listenForRenderModal();
})

// Render search results or validation message
searchForm.addEventListener('submit', async e => {
    e.preventDefault();
    if (searchBar.value === '') {
        validationMessage.classList.add('active');
        searchBar.classList.add('validate')
    } else {
        let keyword = searchBar.value.trim();
        let searchResults = await getSearchResults(keyword)
        deleteButton.classList.add('hidden')
        clearArticles(articleContainer);
        searchBar.value = '';
        for (let article of searchResults) {
            let props = {
                image: article.multimedia[0]?.url,
                title: article.headline.main,
                byline: article.byline.original,
                pubDate: article.pub_date,
                leadPara: article.lead_paragraph, 
                url: article.web_url,
                id: article.uri.replace('nyt://article/', ''), 
                saved: article?.saved
            }
            renderArticleComponent(props)
        }
        listenForRenderModal();
    }
});

// Remove validation upon text entry
searchBar.addEventListener('input', () => {
    validationMessage.classList.remove('active')
    searchBar.classList.remove('validate')
});

// Remove validation when click away
window.addEventListener('click', () => {
    validationMessage.classList.remove('active')
    searchBar.classList.remove('validate')
});

// Render saved articles
myArticles.addEventListener('click', () => {
    let savedArticles = getSavedArticles();
    clearArticles(articleContainer);
    if (savedArticles.length) {
        for (article of savedArticles) {
            let props = {
                image: article.multimedia[0]?.url.replace('https://static01.nyt.com/', ''),
                title: article.title,
                byline: article.byline,
                pubDate: article.published_date,
                leadPara: article.abstract,
                url: article.url,
                id: article.id,
                saved: article?.saved
            }
            renderArticleComponent(props)
        }
        listenForRenderModal();
        deleteButton.classList.remove('hidden')
    } else {
        let message = `<p class="bookmark-msg">You have no articles bookmarked.</p>`
        articleContainer.insertAdjacentHTML('afterbegin', message)
    }
});

deleteButton.addEventListener('click', () => {
    localStorage.clear()
    window.location.reload()
})

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
        if (!data[0]) renderError();
        return data;
    } catch (err) {
        console.log(err);
    }
}


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
    const modalContainer = document.querySelector('.modal-container');
    const close = document.querySelector('#close');
    window.addEventListener('click', e => {
        if (e.target == modalContainer || e.target == close) {
            modalContainer.classList.remove('active');
            setTimeout(() => {
                articleContainer.firstElementChild.remove();
            }, 300);
        }
    });
}

// Either save article to or delete article from localStorage
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
        }
    });
}

// Create object and store article data
function createArticleObject(element) {
    let articleObj = {
        id: element.id,
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

// Covert object to JSON string and save in localStorage
function saveArticle(article) {
    localStorage.setItem(article.id, JSON.stringify(article));
}

// Pull all articles from local storage and parse into objects
function getSavedArticles() {
    let savedArticles = [];
    for (let key of Object.keys(localStorage)) {
        savedArticles.push(JSON.parse(localStorage.getItem(key)));
    }
    return savedArticles;
}

function renderArticleComponent(props) {
    let component = `
        <div class="card">
            <img class="card-img" src=${props.image ? prependDomain(props.image): './assets/NYT_logo.png'} />
            <div class="card-body">
                <h3 class="headline">${props.title}</h3>
                <p class="hidden">${props.byline}</p>
                <p class="publish-date">${formatDate(props.pubDate)}</p>
                <p class="hidden">${props.leadPara}</p>
                <p class="hidden">${props.url}</p>
                <p class="hidden">${props.id}</p>
                <p class="hidden">${props.saved}</p>
            </div>
        </div>
        `;
    articleContainer.insertAdjacentHTML('beforeend', component);
}


function renderModal(element) {
    let modal = `
        <div class="modal-container" onclick="void(0)">
            <div class="modal" id="${element.lastElementChild.children[5].textContent}">
                <img class="modal-img" src=${element.firstElementChild.src} />
                <div class="modal-body">
                    <h3 class="modal-headline">${element.lastElementChild.firstElementChild.textContent}</h3>
                    <h4 class="byline">${element.lastElementChild.children[1].textContent}</h4>
                    <p class="modal-publish-date">${element.lastElementChild.children[2].textContent}</p>
                    <p class="lead-paragraph">${element.lastElementChild.children[3].textContent}</p>
                    <a href="${element.lastElementChild.children[4].textContent}" target="_blank"><button id="modal-btn" class="btn">Full Article</button></a>
                    <div class="modal-control">
                        <i id="bookmark" class="${element.lastElementChild.children[6].textContent === 'true' ? 'fas' : 'far'} fa-bookmark"></i>
                        <i id="close" class="fas fa-times" onclick="void(0)"></i>
                    </div>  
                </div
            </div>
        </div> 
        `;
    articleContainer.insertAdjacentHTML('afterbegin', modal);
    // Set class of active after 100ms triggers animation
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
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

function buildUrl(url, searchParam) {
    const newUrl = new URL(url);
    newUrl.searchParams.append('api-key', API_KEY);
    if (searchParam) newUrl.searchParams.append('q', searchParam);
    return newUrl;
}

function renderError() {
    let error = '<div class="error"></div>';
    articleContainer.insertAdjacentHTML('afterbegin', error);
    console.log("rendered")
}

function prependDomain(url) {
    return `${URLS.img}${url}`
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

// Render top stories on page load
(async () => {
    let topStories = await getTopStories()
    for (article of topStories) {
        let props = {
            image: article.multimedia[0]?.url.replace('https://static01.nyt.com/', ''),
            title: article.title,
            byline: article.byline,
            pubDate: article.published_date,
            leadPara: article.abstract,
            url: article.url,
            id: article.uri.replace('nyt://article/', ''), 
            saved: article?.saved
        }
        renderArticleComponent(props)
    }
    listenForRenderModal();
})()



