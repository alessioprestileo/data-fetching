const API_KEY = 'c9845169';
const API_URL = 'http://www.omdbapi.com';

const fetchMovies = async fragment => {
  const url = `${API_URL}?apikey=${API_KEY}&s=${fragment}*`;
  const response = await fetch(url);

  return response.json();
};

const getListItem = movie => {
  const item = document.createElement('li');
  item.innerHTML = `
    ${movie.Title}
  `;

  return item
};

document.addEventListener('DOMContentLoaded', async () => {
  const title = document.querySelector('.ready .title');
  const initialTitle = title.innerHTML;

  document.querySelector('.search-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const fragment = document.querySelector('.search-field input').value;
    const fetching = document.querySelector('.fetching');
    const ready = document.querySelector('.ready');
    const error = document.querySelector('.error');

    fetching.style.display = 'block';
    ready.style.display = 'none';
    error.style.display = 'none';
    title.style.display = 'none';

    const list = document.querySelector('.results');
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
    const response = await fetchMovies(fragment)
    const movies = response.Search;
    if (!movies) {
      error.style.display = 'block';
      fetching.style.display = 'none';
      ready.style.display = 'block';
  
      return;
    }

    movies.forEach(movie => {
      list.append(getListItem(movie))
    });

    title.innerHTML = `${initialTitle} "${fragment}"`;
    fetching.style.display = 'none';
    ready.style.display = 'block';
    title.style.display = 'block';
  });
})
