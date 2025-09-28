function setFavoriteSongs(titles) {
  localStorage.setItem("favoriteSongs", JSON.stringify(titles));
}

function getFavoriteSongs() {
  return JSON.parse(localStorage.getItem("favoriteSongs") || "[]");
}

function createSongDiv(song, isFavoritePage, onFavoriteToggle) {
  const songDiv = document.createElement("div");
  songDiv.className = "songDiv";
  songDiv.textContent = `${song.title}`;

  const albumCover = document.createElement("img");
  albumCover.src = song.image;
  albumCover.className = "albumCover";
  albumCover.alt = song.title;

  const button = document.createElement("button");
  if (isFavoritePage) {
    button.textContent = "☆"; 
    button.style.fontSize = "24px";
    button.style.color = "red";
    button.style.background = "none";
    button.style.border = "none";
    button.style.cursor = "pointer";
    button.style.display = "flex";
    button.style.justifyContent = "flex-start";
    button.style.alignItems = "center";
    button.style.gap = "5px";
    button.style.padding = "5px 10px";
    button.style.border = "none";
    button.title = "Remove from favorites";
    button.onmouseover = () => {
      button.style.transform = "scale(1.5)";
      button.style.transition = "transform 0.2s";
    };
    button.onmouseout = () => {
      button.style.transform = "scale(1.0)";
    };
    
  } else {
    const favoriteTitles = getFavoriteSongs();
    if (favoriteTitles.includes(song.title)) {
      button.textContent = "Marked as favorite";
      button.disabled = true;
      button.style.backgroundColor = "lightgray";
      button.style.cursor = "not-allowed";
      button.style.color = "darkgray";
      button.style.display = "flex";
      button.style.justifyContent = "flex-start";
      button.style.alignItems = "center";
      button.style.gap = "5px";
      button.style.fontSize = "16px";
      button.style.padding = "5px 10px";
      button.style.border = "none";

    } else {
      button.textContent = "★";
      button.style.fontSize = "24px";
      button.style.color = "gold";
      button.style.background = "none";
      button.style.border = "none";
      button.style.cursor = "pointer";
      button.style.display = "flex";
      button.style.justifyContent = "flex-start";
      button.style.alignItems = "center";
      button.style.gap = "5px";
      button.style.padding = "5px 10px";
      button.style.border = "none";
      button.title = "Add to favorites";
      button.onmouseover = () => {
        button.style.transform = "scale(1.5)";
        button.style.transition = "transform 0.2s";
      };
      button.onmouseout = () => {
        button.style.transform = "scale(1.0)";
      };
    }
  }
  button.onclick = onFavoriteToggle;

  songDiv.append(albumCover, button);
  return songDiv;
}

async function renderAllSongs() {
  const songContainer = document.getElementById("songList");
  if (!songContainer) return;
  songContainer.innerHTML = "";

  const response = await fetch("musicLibrary.json");
  const data = await response.json();
  const allSongs = data.music;

  allSongs.forEach((song) => {
    const songDiv = createSongDiv(song, false, () => {
      const updatedFavorites = [...getFavoriteSongs(), song.title];
      setFavoriteSongs(updatedFavorites);
      renderAllSongs();
      renderFavoriteSongs();
    });
    songContainer.append(songDiv);
  });
}

async function renderFavoriteSongs() {
  const favoriteSongContainer = document.getElementById("favoriteSongList");
  if (!favoriteSongContainer) return;
  favoriteSongContainer.innerHTML = "";

  const response = await fetch("musicLibrary.json");
  const data = await response.json();
  const allSongs = data.music;

  const favoriteTitles = getFavoriteSongs();
  const favoriteSongs = allSongs.filter(song => favoriteTitles.includes(song.title));

  favoriteSongs.forEach((song) => {
    const songDiv = createSongDiv(song, true, () => {
      const updatedFavorites = getFavoriteSongs().filter(title => title !== song.title);
      setFavoriteSongs(updatedFavorites);
      renderAllSongs();
      renderFavoriteSongs();
    });
    favoriteSongContainer.append(songDiv);
  });
}

if (document.getElementById("songList")) {
  renderAllSongs();
}
if (document.getElementById("favoriteSongList")) {
  renderFavoriteSongs();
}