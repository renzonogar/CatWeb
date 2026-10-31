// Display and manage cats saved in this browser.
(function () {
  var KEY = "catWebGallery";
  var gallery = document.getElementById("catGallery");
  var emptyMessage = document.getElementById("emptyGallery");
  var clearButton = document.getElementById("clearGalleryButton");

  function getCats() {
    try {
      var cats = JSON.parse(localStorage.getItem(KEY) || "[]");
      return Array.isArray(cats) ? cats : [];
    } catch (e) {
      return [];
    }
  }

  function renderGallery() {
    if (!gallery || !emptyMessage) return;
    var cats = getCats();
    gallery.textContent = "";
    emptyMessage.style.display = cats.length ? "none" : "inline";

    cats.forEach(function (cat, index) {
      if (!cat || !cat.url) return;
      var item = document.createElement("div");
      item.className = "gallery-item";
      var image = document.createElement("img");
      image.src = cat.url;
      image.alt = "Saved cat " + (index + 1);
      image.loading = "lazy";
      item.appendChild(image);
      gallery.appendChild(item);
    });
  }

  if (clearButton) {
    clearButton.addEventListener("click", function () {
      if (!window.confirm("Are you sure you want to clear your saved cats?")) return;
      try {
        localStorage.removeItem(KEY);
        renderGallery();
      } catch (e) {
        window.alert("Could not clear the gallery in this browser.");
      }
    });
  }
  renderGallery();
})();
