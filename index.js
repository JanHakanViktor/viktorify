(async () => {
  const response = await fetch("musicLibrary.json");
  const data = await response.json();
  const songs = data.music;

  document.getElementById("renderSongs").addEventListener("click", () => {
    console.log(songs);
  });
})();
