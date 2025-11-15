// const { randomBytes } = require("node:crypto");
// implement search filter
// render all the cards
// the default screen should disappear and result should show at 5 cards
// a button {watchlist} which should we render on watchlist.html or my watchlist screen once we're pressing it
//

const moveContainer = document.getElementById("movie-container");
const searchBtn = document.getElementById("search-btn");

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

    displayMovies(fullMovie);
  } catch (error) {
    console.log(error);
  }
}

// console.log("Hello world");
// // handleClick()
function displayMovies(movies) {
  moveContainer.innerHTML = `
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
            <i class="fa-solid fa-sm"></i>  
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

/**
 *
 *
 */
