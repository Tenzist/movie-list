import card from "./card";

export default async function getLiked(id: number[]) {

    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=7489e679e1a6f690615bf5ee54489fe7`, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        const result = (await response.json());
        card(result, true);

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