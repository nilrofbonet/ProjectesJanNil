document.getElementById("fetch-quote").addEventListener("click", () => {
  fetch("https://api.kanye.rest/")
      .then(response => response.json())
      .then(data => {
          document.getElementById("quote").innerText = data.quote;
      })
      .catch(error => {
          document.getElementById("quote").innerText = "Oops! Something went wrong.";
          console.error("Error fetching data:", error);
      });
});
