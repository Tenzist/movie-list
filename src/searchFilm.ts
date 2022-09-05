import card from "./card";

export default async function searchFilm(value: string, page: number){
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=7489e679e1a6f690615bf5ee54489fe7&query=${value}&page=${page}`, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        const result = (await response.json());
        const films: any = result.results;
        for (let i: number = 0; i < films.length; i++) {
            card(films[i],false);
        }
        return result;
    } catch (error) {
        if (error instanceof Error) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}