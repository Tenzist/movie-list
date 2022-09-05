import getFilms from "./getFilms";
import getLiked from "./getLiked";
import searchFilm from "./searchFilm";

export default async function setEventListeners(currentRank: string, currentPage: number) {
    const search: any = document.getElementById('search');
    const clean: any = document.getElementById('film-container');
    const films = JSON.parse(localStorage.getItem('films') || '[]');

    for(let i = 0; i < films.length; i++){
        getLiked(films[i])
    }

    document.getElementById('popular')?.addEventListener('click', function () {
        showFilms(this);
    })

    document.getElementById('upcoming')?.addEventListener('click', function () {
        showFilms(this);
    })

    document.getElementById('top_rated')?.addEventListener('click', function () {
        showFilms(this);
    })

    document.getElementById('load-more')?.addEventListener('click', function () {
        currentPage++;
        updateURLParams();
        if (search.value) {
            searchFilm(search.value, currentPage);
        } else {
            getFilms(currentRank, currentPage);
        }
    })

    document.getElementById('submit')?.addEventListener('click', function () {
        clean.innerHTML = "";
        updateURLParams();
        if (search) {
            currentPage = 1;
            searchFilm(search.value, currentPage);
        }
    })

    function showFilms(rank: HTMLElement) {
        clean.innerHTML = "";
        currentPage = 1;
        currentRank = rank.id
        updateURLParams();
        getFilms(currentRank, currentPage);
    }
    function updateURLParams() {
        let url = new URL(location.href);
        url.searchParams.set('page',`${currentPage}`)
        window.history.pushState(null, null!, url.href);
    }
}