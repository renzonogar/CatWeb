// Random cat loader, local visitor counter and automatic gallery saving.
(function () {
  var catButton = document.getElementById("catButton");
  var catImage = document.getElementById("catImage");
  var loading = document.getElementById("loading");
  var error = document.getElementById("error");
  var visitorCount = document.getElementById("visitorCount");
  var GALLERY_KEY = "catWebGallery";

  if (visitorCount) {
    try {
      var count = Number(localStorage.getItem("catWebVisits") || "0") + 1;
      localStorage.setItem("catWebVisits", String(count));
      visitorCount.textContent = String(count).padStart(6, "0");
    } catch (e) {
      visitorCount.textContent = "LOCAL";
    }
  }

  function saveCat(url) {
    try {
      var cats = JSON.parse(localStorage.getItem(GALLERY_KEY) || "[]");
      if (!Array.isArray(cats)) cats = [];
      if (!cats.some(function (cat) { return cat.url === url; })) {
        cats.unshift({ url: url, savedAt: new Date().toISOString() });
        localStorage.setItem(GALLERY_KEY, JSON.stringify(cats));
      }
    } catch (e) {
      console.warn("Could not save cat:", e);
    }
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
        var url = data[0].url;
        catImage.onload = function () {
          loading.style.display = "none";
          catImage.style.display = "inline";
          saveCat(url);
        };
        catImage.onerror = function () {
          loading.style.display = "none";
          error.textContent = "ERROR: Could not display cat.";
          error.style.display = "inline";
        };
        catImage.src = url;
      })
      .catch(function (e) {
        console.log(e);
        loading.style.display = "none";
        error.textContent = "ERROR: Could not load cat.";
        error.style.display = "inline";
      });
  }

  if (catButton) catButton.addEventListener("click", buscarGato);
  if (catImage) buscarGato();
})();
