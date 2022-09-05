import setEventListeners from "./eventListeners";
import getFilms from "./getFilms";
import getRandomFilm from "./getRandomFilm";

export async function render(): Promise<void> {
    let currentPage: number = 1;
    let currentRank: string = 'popular';

    getRandomFilm();
    setEventListeners(currentRank, currentPage);
    getFilms(currentRank, currentPage);

}

