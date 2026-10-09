// CAT WEB: random cat loader and local visitor counter.
(function () {
  var catButton = document.getElementById("catButton");
  var catImage = document.getElementById("catImage");
  var loading = document.getElementById("loading");
  var error = document.getElementById("error");
  var visitorCount = document.getElementById("visitorCount");

  // Local counter: counts page visits in this browser only (not global visitors).
  if (visitorCount) {
    var count = Number(localStorage.getItem("catWebVisits") || "0");
    count += 1;
    localStorage.setItem("catWebVisits", String(count));
    visitorCount.textContent = String(count).padStart(6, "0");
  }

  function buscarGato() {
    if (!catImage || !loading || !error) return;
    error.style.display = "none";
    catImage.style.display = "none";
    loading.style.display = "inline";
    loading.textContent = "Loading cat...";

    fetch("https://api.thecatapi.com/v1/images/search")
      .then(function (response) {
        if (!response.ok) throw new Error("API error");
        return response.json();
      })
      .then(function (data) {
        if (!data || !data[0] || !data[0].url) throw new Error("No cat found");
        catImage.onload = function () {
          loading.style.display = "none";
          catImage.style.display = "inline";
        };
        catImage.onerror = function () {
          loading.style.display = "none";
          error.textContent = "ERROR: Could not display cat.";
          error.style.display = "inline";
        };
        catImage.src = data[0].url;
      })
      .catch(function (err) {
        console.log(err);
        loading.style.display = "none";
        error.textContent = "ERROR: Could not load cat.";
        error.style.display = "inline";
      });
  }

  if (catButton) catButton.addEventListener("click", buscarGato);

  // Automatically show a random cat on the home page and Cats page.
  if (catImage) buscarGato();
})();
