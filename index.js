async function renderAllSongs() {
  const response = await fetch("musicLibrary.json");
  const data = await response.json();
  const allSongs = data.music;

  const songContainer = document.getElementById("songList");

  allSongs.forEach((song) => {
    const songDiv = document.createElement("div");
    songDiv.className = "songDiv";
    songDiv.textContent = `${song.title} by ${song.artist}`;

    const buttonFavorite = document.createElement("button");
    buttonFavorite.textContent = "Mark as favorite";

    const albumCover = document.createElement("img");
    albumCover.src = song.image;
    albumCover.className = "albumCover";

    songContainer.append(songDiv);
    songDiv.append(albumCover, buttonFavorite);
  });
}

renderAllSongs();
