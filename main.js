const api = axios.create({
  baseURL: "https://api.thedogapi.com/v1",
});
api.defaults.headers.common["X-API-KEY"] =
  "f8e757eb-3e56-4b8c-ac41-c3208d7c6ed6";

const URLGET = `https://api.thedogapi.com/v1/images/search
?limit=10`;
//URL SIN AXIOS PARA SAVEFAVORITESMICHIS
const URLFavourites = `https://api.thedogapi.com/v1/favourites?&api_key=f8e757eb-3e56-4b8c-ac41-c3208d7c6ed6`;
const URLFavouritesDelete = (id) =>
  `https://api.thedogapi.com/v1/favourites/${id}?&api_key=f8e757eb-3e56-4b8c-ac41-c3208d7c6ed6`;
const URLUploadImages = `https://api.thedogapi.com/v1/images/upload`;

const spanError = document.getElementById("error");
// Cargar Imagen de Usuario

document.getElementById("file").onchange = function (e) {
  let reader = new FileReader();
  reader.readAsDataURL(e.target.files[0]);
  reader.onload = function () {
    let preview = document.getElementById("preview");
    img = document.createElement("img");
    img.src = reader.result;
    img.style.width = "200px";
    img.style.height = "200px";
    img.style.margin = "auto";
    preview.innerHTML = "";
    preview.append(img);
  };
};

const getData = async () => {
  const response = await fetch(URLGET);
  const results = await response.json();

  if (response.ok) {
    const img1 = document.getElementById("img1");
    const btn1 = document.getElementById("btn1");
    const img2 = document.getElementById("img2");
    const btn2 = document.getElementById("btn2");
    const img3 = document.getElementById("img3");
    const btn3 = document.getElementById("btn3");
    const img4 = document.getElementById("img4");
    const btn4 = document.getElementById("btn4");
    const img5 = document.getElementById("img5");
    const btn5 = document.getElementById("btn5");
    const img6 = document.getElementById("img6");
    const btn6 = document.getElementById("btn6");
    const img7 = document.getElementById("img7");
    const btn7 = document.getElementById("btn7");
    const img8 = document.getElementById("img8");
    const btn8 = document.getElementById("btn8");
    const img9 = document.getElementById("img9");
    const btn9 = document.getElementById("btn9");
    const img10 = document.getElementById("img10");
    const btn10 = document.getElementById("btn10");
    console.log(results);
    img1.src = results[0].url;
    img2.src = results[1].url;
    img3.src = results[2].url;
    img4.src = results[3].url;
    img5.src = results[4].url;
    img6.src = results[5].url;
    img7.src = results[6].url;
    img8.src = results[7].url;
    img9.src = results[8].url;
    img10.src = results[9].url;

    btn1.onclick = () => saveFavoritesMichis(results[0].id);
    btn2.onclick = () => saveFavoritesMichis(results[1].id);
    btn3.onclick = () => saveFavoritesMichis(results[2].id);
    btn4.onclick = () => saveFavoritesMichis(results[3].id);
    btn5.onclick = () => saveFavoritesMichis(results[4].id);
    btn6.onclick = () => saveFavoritesMichis(results[5].id);
    btn7.onclick = () => saveFavoritesMichis(results[6].id);
    btn8.onclick = () => saveFavoritesMichis(results[7].id);
    btn9.onclick = () => saveFavoritesMichis(results[8].id);
    btn10.onclick = () => saveFavoritesMichis(results[9].id);
  } else {
    spanError.innerHTML = "Hubo un error" + response.status + response.message;
  }
};

const favoritesData = async () => {
  const response = await fetch(URLFavourites);
  const results = await response.json();
  if (response.status !== 200) {
    spanError.innerHTML = "Hubo un error" + response.status + response.message;
  } else {
    const section = document.getElementById("favoritesMichis");
    const containerFavoriteDogs = document.getElementById(
      "containerFavoriteDogs"
    );
    section.innerHTML = "";
    containerFavoriteDogs.innerHTML = "";
    const h2 = document.createElement("h2");
    const h2Text = document.createTextNode("Perros Favoritos");
    h2.appendChild(h2Text);
    section.appendChild(h2);
    section.appendChild(containerFavoriteDogs);
    containerFavoriteDogs.style.display = "grid";
    containerFavoriteDogs.style.margin = "auto";
    containerFavoriteDogs.style.width = "100%";
    containerFavoriteDogs.style.gridTemplateColumns =
      "repeat(auto-fill, minmax(80px, 2fr))";
    containerFavoriteDogs.style.gap = "10px";

    results.forEach((michi) => {
      const article = document.createElement("article");
      const img = document.createElement("img");
      const btn = document.createElement("button");
      const btnText = document.createTextNode("Eliminar");
      img.src = michi.image.url;
      img.style.width = "50px";
      img.style.height = "50px";
      img.style.borderRadius = "50%";
      btn.appendChild(btnText);
      btn.onclick = () => deleteFavourites(michi.id);
      article.appendChild(img);
      article.appendChild(btn);
      article.style.margin = "10px auto";
      section.appendChild(containerFavoriteDogs);
      // section.appendChild(article);
      containerFavoriteDogs.appendChild(article);
      //  containerFavoriteDogs.style.display = "flex";
      btn.style.display = "block";
      btn.style.cursor = "pointer";
      btn.style.borderRadius = "4px";
      btn.style.fontSize = "10px";
      btn.style.background = "#6e91ff";
      

      // michi.image.url
    });
  }
};

async function saveFavoritesMichis(id) {
  const { result, status } = await api.post("/favourites", {
    image_id: id,
  });
  if (status !== 200) {
    spanError.innerHTML = "Hubo un error" + status + result.message;
  } else {
    console.log("Michi guardado en favoritos");
    favoritesData();
  }
}

async function deleteFavourites(id) {
  const response = await fetch(URLFavouritesDelete(id), {
    method: "Delete",
  });
  const result = await response.json();
  if (response.status !== 200) {
    spanError.innerHTML = "Hubo un error" + response.status + result.message;
  } else {
    console.log("Michi eliminado de favoritos");
    favoritesData();
  }
}

async function uploadMichiPhoto() {
  const form = document.getElementById("uploadingForm");
  const formData = new FormData(form);
  console.log(formData.get("file"));
  const response = await fetch(URLUploadImages, {
    method: "POST",
    headers: {
      // "Content-Type": "multipart/formdata",
      "x-api-key": "f8e757eb-3e56-4b8c-ac41-c3208d7c6ed6",
    },
    body: formData,
  });
  const result = await response.json();
  if (response.status !== 201) {
    spanError.innerHTML = "Hubo un error" + response.status + result.message;
  } else {
    saveFavoritesMichis(result.id);
  }
}

favoritesData();
getData();
