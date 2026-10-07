var catButton = document.getElementById("catButton");

var catImage = document.getElementById("catImage");

var loading = document.getElementById("loading");

var error = document.getElementById("error");

catButton.onclick = function () {
  buscarGato();
};

function buscarGato() {
  error.style.display = "none";

  catImage.style.display = "none";

  loading.style.display = "inline";

  fetch("https://api.thecatapi.com/v1/images/search")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("API error");
      }

      return response.json();
    })

    .then(function (data) {
      var cat = data[0];

      catImage.src = cat.url;

      catImage.onload = function () {
        loading.style.display = "none";

        catImage.style.display = "block";
      };
    })

    .catch(function (err) {
      console.log(err);

      loading.style.display = "none";

      error.innerHTML = "ERROR: Could not load cat.";

      error.style.display = "inline";
    });
}
