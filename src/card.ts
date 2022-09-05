import getLiked from "./getLiked";

export default async function card(film: {
    id: any; poster_path: string; overview: string | null; release_date: string | null; 
}, isLike : boolean) {

    if (!film.poster_path) {
        film.poster_path = '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg';
    }
    if (!film.overview) {
        film.overview = '!This film has no overview!'
    }

    const col_lg = document.createElement('div');
    if (isLike) {
        const box = document.getElementById('favorite-movies');
        col_lg.className = 'col-12 p-2';
        box?.appendChild(col_lg);
    } else {
        const box = document.getElementById('film-container');
        col_lg.className = 'col-lg-3 col-md-4 col-12 p-2';
        box?.appendChild(col_lg);
    }

    const shadow = document.createElement('div');
    shadow.className = 'card shadow-sm';
    col_lg.appendChild(shadow);
    
    const img = document.createElement('img');
    img.srcset = "https://image.tmdb.org/t/p/original/" + film.poster_path;
    shadow.appendChild(img)

    const films = JSON.parse(localStorage.getItem('films') || '[]');
    const isLiked = films.find((el: any) => {
        return el == film.id;
    });
    renderLikeIcon(shadow, !!isLiked);

    function renderLikeIcon(node: HTMLDivElement, isLiked = false) {
        const iconColors:any = new Map([[true, 'red'], [false, '#ff000078']]);

        const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const iconPath = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'path'
        );
        iconSvg.setAttribute('id', film.id);
        iconSvg.setAttribute('width', '50');
        iconSvg.setAttribute('height', '50');
        iconSvg.setAttribute('class', 'bi bi-heart-fill position-absolute p-2');
        iconSvg.setAttribute('fill', iconColors.get(isLiked)); //#ff000078
        iconSvg.setAttribute('viewBox', '0 -2 18 22');
        iconSvg.setAttribute('stroke', 'red');
        iconSvg.classList.add('post-icon');

        iconPath.setAttribute(
            'd',
            'M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z'
        );
        iconPath.setAttribute('fill-rule', 'evenodd');
        iconSvg.appendChild(iconPath);


        iconSvg.addEventListener('click', function () {
            const films = JSON.parse(localStorage.getItem('films') || '[]');
            const isLiked = films.find((el: any) => {
                return el == film.id;
            });
            
            if (isLiked) {
                this.setAttribute('fill', '#ff000078');
                const films = JSON.parse(localStorage.getItem('films') || '[]');
                const index = films.indexOf(this.id);
                if (index > -1) {
                    films.splice(index, 1);
                }
                localStorage.setItem('films', JSON.stringify(films));
            } else {
                getLiked(film.id);
                this.setAttribute('fill', 'red');
                const films = JSON.parse(localStorage.getItem('films') || '[]');
                films.push(this.id);
                localStorage.setItem('films', JSON.stringify(films));

            }
        });

        return node.appendChild(iconSvg);
    }

    const card_body = document.createElement('div');
    card_body.className = 'card-body';

    shadow.appendChild(card_body);

    const card_text = document.createElement('p');
    card_text.className = 'card-text truncate';
    card_text.textContent = film.overview;

    card_body.appendChild(card_text);

    const rel_date = document.createElement('div');
    rel_date.className = 'd-flex justify-content-between align-items-center';

    card_body.appendChild(rel_date);

    const small = document.createElement('small');
    small.className = 'text-muted';
    small.textContent = film.release_date;

    card_body.appendChild(small);
}