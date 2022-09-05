export default async function getRandomFilm() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=7489e679e1a6f690615bf5ee54489fe7&page=1`, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        const result = (await response.json());
        const films: any = result.results;

        const randomFilm = films[Math.floor(Math.random() * films.length)]
        const hname: any = document.getElementById('random-movie-name');
        const ptext: any = document.getElementById('random-movie-description');
        const rname: any = document.getElementById('random-movie');

        rname.style.backgroundImage = `url('https://image.tmdb.org/t/p/original/${randomFilm.poster_path}')`
        rname.style.backgroundSize = '100%';
        hname.innerHTML = randomFilm.original_title;
        ptext.innerHTML = randomFilm.overview;

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

