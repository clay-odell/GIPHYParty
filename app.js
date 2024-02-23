console.log("Let's get this party started!");

const form = document.getElementById("searchBar");
form.addEventListener("submit", handleFormSubmit);

async function handleFormSubmit(event) {
  event.preventDefault();
  const searchTerm = document.querySelector("#searchTerm").value;
  try {
    const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
      params: {
        q: searchTerm,
        api_key: "9JhZMlmqUVgnhe7d9iw9bEHobFedOfhL",
      },
    });
    console.log(response.data);
    
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
