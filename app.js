console.log("Let's get this party started!");

const form = document.getElementById("searchBar");
const resultsContainer = document.getElementById("resultsContainer");
const searchTermInput = document.getElementById("searchTerm");
const removeButton = document.getElementById("remove");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const searchTerm = searchTermInput.value;
  
  try {
    const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
      params: {
        q: searchTerm,
        api_key: "9JhZMlmqUVgnhe7d9iw9bEHobFedOfhL",
        limit: 10,
      },
    });

    const gifs = response.data.data;
    resultsContainer.innerHTML = "";
    
    gifs.forEach((gif) => {
      const img = document.createElement("img");
      img.src = gif.images.fixed_width.url;
      img.alt = gif.title;
      resultsContainer.appendChild(img);
    });
    
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
removeButton.addEventListener("click", (event) => {
    event.preventDefault();
    searchTermInput.value = "";
    resultsContainer.innerHTML = "";
});
