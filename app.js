console.log("Let's get this party started!");

// Constants
const apiKey = "9JhZMlmqUVgnhe7d9iw9bEHobFedOfhL";
const giphySearchURL = "https://api.giphy.com/v1/gifs/search";

// DOM Elements
const searchInput = document.getElementById("searchInput");
const form = document.getElementById("searchBar");
const results = document.getElementById("resultsContainer");
const removeButton = document.getElementById("removeButton");

// State
let gifs = [];
let currentIndex = 0;
let displayedGifs = new Set();

// Event Listeners
form.addEventListener("submit", fetchGifs);
removeButton.addEventListener("click", clearResults);

// Fetch GIFs from Giphy API
async function fetchGifs(e) {
  e.preventDefault();

  try {
    const response = await axios.get(giphySearchURL, {
      params: {
        q: searchInput.value,
        api_key: apiKey,
      },
    });
    gifs = response.data.data;
    
    if (gifs.length === 0) {
      results.innerHTML = "No results found";
    } else {
      currentIndex = 0;
      addGifToResults();
    }
  } catch (error) {
    console.error("Error fetching GIFs", error);
    results.innerHTML = "An error occurred while fetching GIFs.";
  }
}

// Add GIF to results
function addGifToResults(e) {
  if (e) e.preventDefault();
  while (currentIndex < gifs.length) {
    const imgSrc = gifs[currentIndex].images.original.url;
    if (!displayedGifs.has(imgSrc)) {
      const img = document.createElement("img");
      img.src = imgSrc;

      results.appendChild(img);
      displayedGifs.add(imgSrc);
      currentIndex++;
      break;
    } else {
      currentIndex++;
    }
  }
  if (currentIndex >= gifs.length) {
    alert("No more GIFs to display.");
  }
}

// Clear results
function clearResults(e) {
  e.preventDefault();
  results.innerHTML = "";
  searchInput.value = "";
  currentIndex = 0;
  displayedGifs.clear();
}
