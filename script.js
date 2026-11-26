


/* =====================================
   JAYMUSIC - MAIN JAVASCRIPT
   Your Music. Your World.
===================================== */

/* HTML ELEMENTS */

const audioPlayer = document.getElementById("audioPlayer");
const songList = document.getElementById("songList");
const otherSongList = document.getElementById("otherSongList");

const searchInput = document.getElementById("searchInput");
const fileInput = document.getElementById("fileInput");
const uploadBtn = document.getElementById("uploadBtn");

const playBtn = document.getElementById("playBtn");
const nextBtn = document.getElementById("nextBtn");
const previousBtn = document.getElementById("previuosBtn");
const seekBar = document.getElementById("seekBar");

const nowTitle = document.getElementById("nowTittle");
const nowArtist = document.getElementById("nowArtist");

const downloadText = document.getElementById("downloadText");
const downloadProgress = document.getElementById("downloadProgress");

/* APP DATA */

let songs = [];

let favorites = [];
let downloaded = [];

let currentSongIndex = -1;
let activePage = "home";
let activeCategory = "All";

let freeDownloads = 2;
const totalFreeDownloads = 2;

/* SAMPLE MUSIC */

const sampleSongs = [
    {
        id: 1,
        title: "My First Song",
        artist: "JAYmusic Artist",
        category: "Bongo Flava",
        src: "",
        cover: "🎵"
    },
    {
        id: 2,
        title: "African Vibes",
        artist: "JAYmusic Artist",
        category: "Afrobeats",
        src: "",
        cover: "🌍"
    },
    {
        id: 3,
        title: "Piano Energy",
        artist: "JAYmusic Artist",
        category: "Amapiano",
        src: "",
        cover: "🎹"
    },
    {
        id: 4,
        title: "Street Life",
        artist: "JAYmusic Artist",
        category: "Hip Hop",
        src: "",
        cover: "🎧"
    },
    {
        id: 5,
        title: "Amazing Grace",
        artist: "JAYmusic Artist",
        category: "Gospel",
        src: "",
        cover: "🙏"
    }
];

songs = [...sampleSongs];

/* =====================================
   CREATE SONG CARD
===================================== */

function createSongCard(song, index) {

    const card = document.createElement("div");

    card.className = "song-card";

    const cover = document.createElement("div");
    cover.className = "song-cover";
    cover.textContent = song.cover || "🎵";

    const title = document.createElement("h3");
    title.textContent = song.title;

    const artist = document.createElement("p");
    artist.textContent = song.artist;

    const category = document.createElement("small");
    category.textContent = song.category;

    const controls = document.createElement("div");
    controls.className = "song-actions";

    const playButton = document.createElement("button");
    playButton.textContent = "▶ Play";
    playButton.type = "button";

    playButton.addEventListener("click", () => {
        playSong(index);
    });

    const favoriteButton = document.createElement("button");
    favoriteButton.type = "button";

    favoriteButton.textContent =
        favorites.includes(song.id) ? "❤️" : "🤍";

    favoriteButton.addEventListener("click", () => {

        toggleFavorite(song.id);

        favoriteButton.textContent =
            favorites.includes(song.id) ? "❤️" : "🤍";
    });

    const downloadButton = document.createElement("button");
    downloadButton.textContent = "⬇";
    downloadButton.type = "button";

    downloadButton.addEventListener("click", () => {
        downloadSong(song);
    });

    controls.appendChild(playButton);
    controls.appendChild(favoriteButton);
    controls.appendChild(downloadButton);

    card.appendChild(cover);
    card.appendChild(title);
    card.appendChild(artist);
    card.appendChild(category);
    card.appendChild(controls);

    return card;
}

/* =====================================
   DISPLAY SONGS
===================================== */

function displaySongs() {

    songList.innerHTML = "";

    let filteredSongs = songs.filter(song => {

        const matchesCategory =
            activeCategory === "All" ||
            song.category === activeCategory;

        const searchTerm =
            searchInput.value.toLowerCase().trim();

        const matchesSearch =
            song.title.toLowerCase().includes(searchTerm) ||
            song.artist.toLowerCase().includes(searchTerm);

        return matchesCategory && matchesSearch;
    });

    document.getElementById("songCount").textContent =
        filteredSongs.length + " songs";

    if (filteredSongs.length === 0) {

        songList.textContent = "No songs found.";

        return;
    }

    filteredSongs.forEach(song => {

        const index = songs.indexOf(song);

        songList.appendChild(
            createSongCard(song, index)
        );
    });
}

/* =====================================
   PLAY MUSIC
===================================== */

function playSong(index) {

    const song = songs[index];

    if (!song) return;

    if (!song.src) {

        alert(
            "This is a sample music card.\n" +
            "Import an audio file from your phone to play music."
        );

        return;
    }

    currentSongIndex = index;

    audioPlayer.src = song.src;

    audioPlayer.play().then(() => {

        playBtn.textContent = "⏸️";

    }).catch(() => {

        alert("Unable to play this audio file.");

    });

    nowTitle.textContent = song.title;
    nowArtist.textContent = song.artist;
}

/* =====================================
   PLAY / PAUSE
===================================== */

playBtn.addEventListener("click", () => {

    if (audioPlayer.paused) {

        if (currentSongIndex === -1) {

            alert("Please select a song first.");

            return;
        }

        audioPlayer.play();

    } else {

        audioPlayer.pause();
    }
});

audioPlayer.addEventListener("play", () => {
    playBtn.textContent = "⏸️";
});

audioPlayer.addEventListener("pause", () => {
    playBtn.textContent = "▶️";
});

/* =====================================
   NEXT SONG
===================================== */

function nextSong() {

    if (songs.length === 0) return;

    let nextIndex = currentSongIndex + 1;

    if (nextIndex >= songs.length) {
        nextIndex = 0;
    }

    playSong(nextIndex);
}

nextBtn.addEventListener("click", nextSong);

/* =====================================
   PREVIOUS SONG
===================================== */

function previousSong() {

    if (songs.length === 0) return;

    let previousIndex = currentSongIndex - 1;

    if (previousIndex < 0) {
        previousIndex = songs.length - 1;
    }

    playSong(previousIndex);
}

previousBtn.addEventListener("click", previousSong);

/* =====================================
   AUDIO PROGRESS
===================================== */

audioPlayer.addEventListener("timeupdate", () => {

    if (audioPlayer.duration) {

        seekBar.value =
            (audioPlayer.currentTime / audioPlayer.duration) * 100;
    }
});

seekBar.addEventListener("input", () => {

    if (audioPlayer.duration) {

        audioPlayer.currentTime =
            (seekBar.value / 100) * audioPlayer.duration;
    }
});

audioPlayer.addEventListener("ended", nextSong);

/* =====================================
   SEARCH MUSIC
===================================== */

searchInput.addEventListener("input", displaySongs);

/* =====================================
   MUSIC CATEGORIES
===================================== */

document.querySelectorAll(".category").forEach(button => {

    button.addEventListener("click", () => {

        activeCategory = button.dataset.category;

        document.querySelectorAll(".category").forEach(category => {
            category.classList.remove("active");
        });

        button.classList.add("active");

        displaySongs();
    });
});

/* =====================================
   IMPORT MUSIC FROM PHONE
===================================== */

uploadBtn.addEventListener("click", () => {
    fileInput.click();
});

fileInput.addEventListener("change", () => {

    const files = Array.from(fileInput.files);

    files.forEach((file, index) => {

        if (!file.type.startsWith("audio/")) return;

        const newSong = {

            id: Date.now() + index,

            title: file.name.replace(/\.[^/.]+$/, ""),

            artist: "My Device",

            category: "Bongo Flava",

            src: URL.createObjectURL(file),

            cover: "🎵"
        };

        songs.push(newSong);
    });

    displaySongs();

    fileInput.value = "";

    alert(files.length + " file(s) selected.");
});

/* =====================================
   FAVORITES
===================================== */

function toggleFavorite(songId) {

    if (favorites.includes(songId)) {

        favorites = favorites.filter(id => id !== songId);

    } else {

        favorites.push(songId);
    }
}

/* =====================================
   DOWNLOAD MUSIC
===================================== */

function downloadSong(song) {

    if (!song.src) {

        alert("This sample song has no downloadable audio file.");

        return;
    }

    if (downloaded.includes(song.id)) {

        alert("This song is already in your downloads.");

        return;
    }

    if (freeDownloads <= 0) {

        alert(
            "Your 2 free downloads have been used.\n" +
            "JAYmusic Premium will be available in a future release."
        );

        return;
    }

    const link = document.createElement("a");

    link.href = song.src;

    link.download = song.title + ".mp3";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    downloaded.push(song.id);

    freeDownloads--;

    updateDownloadStatus();
}

/* =====================================
   DOWNLOAD STATUS
===================================== */

function updateDownloadStatus() {

    downloadText.textContent =
        freeDownloads + " free downloads remaining";

    const used =
        totalFreeDownloads - freeDownloads;

    downloadProgress.style.width =
        (used / totalFreeDownloads * 100) + "%";
}

/* =====================================
   OTHER PAGES
===================================== */

function displayOtherPage() {

    otherSongList.innerHTML = "";

    let pageSongs = [];

    const otherTitle = document.getElementById("otherTittle");
    const otherDescription = document.getElementById("otherDescribtion");
    const otherSectionTitle = document.getElementById("otherSectionTittle");

    if (activePage === "explore") {

        pageSongs = songs;

        otherTitle.textContent = "Explore Music";
        otherDescription.textContent = "Discover music from different categories.";
        otherSectionTitle.textContent = "All Music";
    }

    if (activePage === "library") {

        pageSongs = songs.filter(song =>
            favorites.includes(song.id)
        );

        otherTitle.textContent = "My Library";
        otherDescription.textContent = "Your favorite music in one place.";
        otherSectionTitle.textContent = "Favorite Songs";
    }

    if (activePage === "profile") {

        otherTitle.textContent = "My Profile";
        otherDescription.textContent = "Welcome to your JAYmusic account.";
        otherSectionTitle.textContent = "Account Information";

        const message = document.createElement("div");

        message.className = "empty-message";

        message.textContent =
            "Guest Account | Sign up and Login will be added in a future release.";

        otherSongList.appendChild(message);

        return;
    }

    if (pageSongs.length === 0) {

        const message = document.createElement("div");

        message.className = "empty-message";

        message.textContent = "No music available in this section yet.";

        otherSongList.appendChild(message);

        return;
    }

    pageSongs.forEach(song => {

        const index = songs.indexOf(song);

        otherSongList.appendChild(
            createSongCard(song, index)
        );
    });
}

/* =====================================
   NAVIGATION
===================================== */

document.querySelectorAll(".bottom-nav button").forEach(button => {

    button.addEventListener("click", () => {

        activePage = button.dataset.page;

        document.querySelectorAll(".bottom-nav button").forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const homePage = document.getElementById("homePage");
        const otherPage = document.getElementById("otherPage");

        if (activePage === "home") {

            homePage.hidden = false;
            otherPage.hidden = true;

        } else {

            homePage.hidden = true;
            otherPage.hidden = false;

            displayOtherPage();
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});

/* =====================================
   PREMIUM BUTTON
===================================== */

document.getElementById("premiumBtn").addEventListener("click", () => {

    alert(
        "Welcome to JAYmusic Premium!\n\n" +
        "Subscription packages and secure payments " +
        "will be connected in a future release."
    );
});

/* =====================================
   INITIALIZATION
===================================== */

updateDownloadStatus();
displaySongs();
