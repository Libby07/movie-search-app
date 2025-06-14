const apiKey = "b6da3a16acc70b8017734c0489869acc";

const searchInput = document.getElementById("searchInput");
const featuredCarousel = document.getElementById("featuredCarousel");
const genreFilters = document.getElementById("genreFilters");
const searchResultsContainer = document.getElementById(
  "searchResultsContainer"
);

let debounceTimer = null;

// ✅ Load everything on page load
document.addEventListener("DOMContentLoaded", () => {
  loadGenres();
  loadFeaturedMovies();
});

// ✅ Auto search while typing (debounced)
searchInput.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    const query = searchInput.value.trim();
    if (query) {
      searchMovies(query);
    } else {
      searchResultsContainer.innerHTML = ""; // Clear search results when input is empty
    }
  }, 500);
});

// ✅ Load movie genres and create filter buttons
async function loadGenres() {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
    );
    const data = await res.json();
    data.genres.forEach((genre) => {
      const btn = document.createElement("button");
      btn.textContent = genre.name;
      btn.addEventListener("click", () => filterFeaturedByGenre(genre.id));
      genreFilters.appendChild(btn);
    });
  } catch (err) {
    console.error("Failed to load genres", err);
  }
}

// ✅ Load popular movies as featured
async function loadFeaturedMovies() {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
    );
    const data = await res.json();
    displayFeatured(data.results);
  } catch (err) {
    console.error("Failed to load featured movies", err);
  }
}

// ✅ Filter featured movies by genre
async function filterFeaturedByGenre(genreId) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`
    );
    const data = await res.json();
    displayFeatured(data.results);
  } catch (err) {
    console.error("Failed to filter by genre", err);
  }
}

// ✅ Display featured movies in horizontal carousel
function displayFeatured(movies) {
  featuredCarousel.innerHTML = "";
  movies.forEach((movie) => {
    featuredCarousel.appendChild(createMovieCard(movie));
  });
}

// ✅ Search movies by keyword
async function searchMovies(query) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
        query
      )}`
    );
    const data = await res.json();
    displaySearchResults(data.results);
  } catch (err) {
    console.error("Search failed", err);
  }
}

// ✅ Display search results in grid layout
function displaySearchResults(movies) {
  searchResultsContainer.innerHTML = "<h2>🔍 Search Results</h2>";
  const grid = document.createElement("div");
  grid.className = "movie-grid"; // Optional class for future styling

  movies.forEach((movie) => {
    grid.appendChild(createMovieCard(movie));
  });

  searchResultsContainer.appendChild(grid);
}

// ✅ Create reusable movie card with overlay effect
function createMovieCard(movie) {
  const card = document.createElement("div");
  card.className = "movie-card";

  const posterURL = movie.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : null;

  const shortOverview =
    movie.overview && movie.overview.length > 120
      ? movie.overview.slice(0, 120) + "…"
      : movie.overview || "No description available.";

  card.innerHTML = `
    ${
      posterURL
        ? `<img src="${posterURL}" alt="${movie.title}" />`
        : `<div class="no-image">No Image</div>`
    }
    <div class="overlay">
      <h3>${movie.title}</h3>
      <p>${
        movie.release_date ? movie.release_date.slice(0, 4) : "Unknown Year"
      }</p>
      <p>${shortOverview}</p>
    </div>
  `;

  return card;
}

btn.addEventListener("click", () => {
  document
    .querySelectorAll(".genre-filters button")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  filterFeaturedByGenre(genre.id);
});

// Scroll
document.querySelector(".scroll-left").onclick = () => {
  featuredCarousel.scrollBy({ left: -300, behavior: "smooth" });
};
document.querySelector(".scroll-right").onclick = () => {
  featuredCarousel.scrollBy({ left: 300, behavior: "smooth" });
};
// Get the carousel container and scroll buttons
const carousel = document.getElementById("featuredCarousel");
const scrollLeft = document.querySelector(".scroll-left");
const scrollRight = document.querySelector(".scroll-right");

// Scroll the carousel left
scrollLeft.addEventListener("click", () => {
  carousel.scrollBy({
    left: -300, // Adjust the value to scroll by the desired amount
    behavior: "smooth",
  });
});

// Scroll the carousel right
scrollRight.addEventListener("click", () => {
  carousel.scrollBy({
    left: 300, // Adjust the value to scroll by the desired amount
    behavior: "smooth",
  });
});
