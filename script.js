// const { randomBytes } = require("node:crypto");
// implement search filter
// render all the cards
// the default screen should disappear and result should show at 5 cards
// a button {watchlist} which should we render on watchlist.html or my watchlist screen once we're pressing it
//

const movieContainer = document.getElementById("movie-container");
const searchBtn = document.getElementById("search-btn");

renderInitialScreen()

searchBtn.addEventListener("click", handleClick);
async function handleClick() {
  const searchTerm = [
    "love",
    "war",
    "life",
    "death",
    "man",
    "day",
    "night",
    "time",
  ];

  const randomTerm = searchTerm[Math.floor(Math.random() * searchTerm.length)];

  try {
    const respone = await fetch(
      `http://www.omdbapi.com/?s=${randomTerm}&apikey=947cb689`
    );
    const data = await respone.json();

    if (!data.Search) {
      console.log("No movies found for: ", randomTerm);
    }

    const randomMovie =
      data.Search[Math.floor(Math.random() * data.Search.length)];

    const detailResponse = await fetch(
      `http://www.omdbapi.com/?i=${randomMovie.imdbID}&apikey=947cb689`
    );

    const fullMovie = await detailResponse.json();
    console.log(fullMovie);

    if(!fullMovie || fullMovie.Response === "False"){
      renderInitialScreen()
    }else{
      displayMovies(fullMovie);
    }
  } catch (error) {
    console.log(error);
  }
}

// We've two screen right now one says find your film and another presents the movies
// so we need to do some conditional rendering here so if we have some in the screen we must see the the movie card or we should see the entry screen

function displayMovies(movies) {
  movieContainer.innerHTML = `
    <div class="movie-card">
    <img src="${movies.Poster}" class="poster" alt="${movies.Title} Poster" />
      <div class="movie-content">
       <div class="movie-title-rating">
          <h3>${movies.Title}</h3>
          <i class="fa-solid fa-star fa-lg" style="color: #FFD43B;"></i>
          <p>${movies.imdbRating}</p>
        </div>
        <div class="group-data">
          <p>${movies.Runtime}</p>
          <p>${movies.Genre}</p>
    
          <button class="button-11" aria-pressed="false" aria-label="Add to watchlist">
             <i class="fa-solid fa-bookmark"></i>   
            <span>Watchlist</span>
          </button>
        </div>
          <p class="plot">${movies.Plot}</p>
        </div>
      </div>
    </div>
    <hr>
  `;
}

function renderInitialScreen() {
  movieContainer.innerHTML = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.9"
    stroke="currentColor"
    className="exploring-icon"
>
    <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"
    />
</svg>
<h2>Explore movie</h2>`;
}
