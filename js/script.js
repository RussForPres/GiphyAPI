// Your Giphy API key
const API_KEY = "MKmMZBTxAIcDF1srPqXGcHfToIJLSjiu";

// Grab DOM elements
const fetchBtn = document.querySelector("#fetch-gif-btn");
const gifContainer = document.querySelector("#gif-container");
const searchInput = document.querySelector("#search-input");

// Function to fetch GIFs from Giphy
async function fetchGifs(query) {
  try {
    const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=10`;
    const response = await fetch(endpoint);
    const data = await response.json();

    // Extract URLs of GIFs
    return data.data.map(gif => gif.images.original.url);
  } catch (error) {
    console.error("Error fetching GIFs:", error);
    return [];
  }
}

// Event listener for the button
fetchBtn.addEventListener("click", async () => {
  // Clear previous GIFs
  gifContainer.innerHTML = "";

  // Get search term or default to "funny"
  const query = searchInput.value || "funny";

  // Fetch GIF URLs
  const images = await fetchGifs(query);

  // Render GIFs in the container
  images.forEach(url => {
    gifContainer.innerHTML += `<div class="col-3 mb-3"><img src="${url}" class="img-fluid"></div>`;
  });
});