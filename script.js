const movieContainer = document.getElementById("movie-container");
const searchBtn = document.getElementById("search-btn");
const searchBar = document.getElementById("search-bar");
const watchlistBtn = document.getElementById("watchlist");
let currentMovies = [];
let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

// console.log("CurrentMOvies -----", currentMovies);
renderInitialScreen();

if (searchBtn) {
  searchBtn.addEventListener("click", handleClick);
}

async function handleClick() {
  try {
    const inputValue = searchBar.value;
    if (inputValue === "") {
      return;
    }

    const response = await fetch(
      `http://www.omdbapi.com/?s=${inputValue}&apikey=947cb689`
    );
    const data = await response.json();

    if (!data.Search) {
      console.log("No movies found for: ", data.Search);
    }
    const fullMovie = data.Search;
    // console.log("Full Movie", fullMovie);

    const detailResponse = fullMovie.map(async (response) => {
      const res = await fetch(
        `http://www.omdbapi.com/?i=${response.imdbID}&apikey=947cb689`
      );

      const dataRes = await res.json();

      return dataRes;
    });

    const moviesWithDetails = await Promise.all(detailResponse);

    currentMovies = moviesWithDetails;

    if (!moviesWithDetails || moviesWithDetails === "False") {
      renderInitialScreen();
    } else {
      displayMovies(moviesWithDetails);
    }
  } catch (error) {
    console.log(error);
  }
}

export function displayMovies(movies, isWatchlistPage = false) {
  const iconClass = isWatchlistPage ? "fa-solid" : "fa-regular";

  let renderMovies = ``;

  movies.forEach((item) => {
    renderMovies += `
    <div class="movie-card">
    <img src="${item.Poster}" class="poster" alt="${item.Title} Poster" />
      <div class="movie-content">
       <div class="movie-title-rating">
          <h3>${item.Title}</h3>
          <i class="fa-solid fa-star fa-lg" style="color: #FFD43B;"></i>
          <p>${item.imdbRating}</p>
        </div>
        <div class="group-data">
          <p>${item.Runtime}</p>
          <p>${item.Genre}</p>

          <button data-movie-id="${item.imdbID}" class="button-11" aria-pressed="false" aria-label="Add to watchlist">
          <i class="${iconClass} fa-bookmark"></i>
          <span>Watchlist</span>
          </button>
        </div>
          <p class="plot">${item.Plot}</p>
        </div>
      </div>
    </div>
    <hr>
  `;
  });
  // localStorage.setItem("watchlist", JSON.stringify(movies));
  movieContainer.innerHTML = renderMovies;
}

movieContainer.addEventListener("click", (event) => {
  const btn = event.target.closest(".button-11");

  if (btn) {
    // console.log(btn)
    const icon = btn.querySelector("i");

    // Get the value from the data attribute (data-movie-id -> dataset.movieID)
    const imdbId = btn.dataset.movieId;

    if (!imdbId) return;

    // compare to the API propery imdbID
    const movie = currentMovies.find((m) => m.imdbID === imdbId);
    const movieIndex = watchlist.findIndex((m) => m.imdbID === imdbId);

    if (movieIndex > -1) {
      watchlist.splice(movieIndex, 1);
    } else {
      watchlist.push(movie);
    }

    localStorage.setItem("watchlist", JSON.stringify(watchlist));

    const isWatchListPage = window.location.pathname.includes("watchlist");

    if (isWatchListPage && movieIndex > -1) {
      const movieCard = btn.closest(".movie-card");
      if (watchlist.length === 0) {
        renderInitialScreen();
      }
      movieCard.remove();
    }

    if (icon.classList.contains("fa-regular")) {
      icon.classList.replace("fa-regular", "fa-solid");
    } else {
      icon.classList.replace("fa-solid", "fa-regular");
    }
  }
});

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
