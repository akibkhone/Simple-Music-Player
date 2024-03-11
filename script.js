// Define the songs array
var songs = [
	{
		songName: 'Koi Si',
		url: './songs/Koi Si.mp3',
		img: '/images/KoiSi.jpeg',
	},
	{
		songName: 'Sadqay',
		url: './songs/SADQAY.mp3',
		img: '/images/Sadqay.jpeg',
	},
	{
		songName: 'No Money No Honey',
		url: './songs/No Money No Honey.mp3',
		img: '/images/NoHoneyNoMoney.png',
	},
	{
		songName: 'Let Her Go X Husn',
		url: './songs/Let Her Go X Husn.mp3',
		img: '/images/Husn.jpeg',
	},
	{
		songName: 'Aur Tu Hai Kahan',
		url: './songs/AUR  TU HAI KAHAN.mp3',
		img: '/images/AurTuHaiKahan.jpeg',
	},
];

// Create an Audio object for playing songs
var audio = new Audio();

// Get DOM elements
var allSongs = document.querySelector('#all-songs');
var poster = document.querySelector('#left');
var play = document.querySelector('#play');
var backward = document.querySelector('#backward');
var forward = document.querySelector('#forward');

// Initialize selected song index
var selectedSong = 0;

// Function to add songs to the UI
function addSongs() {
	// Generate HTML for each song card
	var songCards = songs.map(function (song, index) {
		return `
            <div class="song-card" id="${index}">
                <div class="song">
                    <img src="${song.img}" alt="" />
                    <h2>${song.songName}</h2>
                </div>
                <h6 id="duration-${index}"></h6> 
            </div>
        `;
	});

	// Set the HTML of all-songs container
	allSongs.innerHTML = songCards.join('');

	// Set the background image and audio source
	poster.style.backgroundImage = `url(${songs[selectedSong].img})`;
	audio.src = songs[selectedSong].url;

	// Load the first song to get its duration
	audio.addEventListener('loadedmetadata', function () {
		var durationElement = document.querySelector(`#duration-${selectedSong}`);
		if (durationElement) {
			durationElement.textContent = formatTime(audio.duration);
		}
	});
}

// Function to format time in minutes and seconds
function formatTime(seconds) {
	var minutes = Math.floor(seconds / 60);
	var remainingSeconds = Math.floor(seconds % 60);
	return minutes + ':' + (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
}

// Add event listeners
allSongs.addEventListener('click', function (event) {
	selectedSong = parseInt(event.target.closest('.song-card').id);
	addSongs();
	togglePlay();
});

// Function to play or pause the song
function togglePlay() {
	if (audio.paused) {
		play.innerHTML = `<i class="ri-pause-mini-fill"></i>`;
		audio.play();
	} else {
		play.innerHTML = `<i class="ri-play-mini-fill"></i>`;
		audio.pause();
	}
}

// Function to play the previous song
function playPreviousSong() {
	selectedSong = (selectedSong - 1 + songs.length) % songs.length;
	addSongs();
	audio.play();
}

// Function to play the next song
function playNextSong() {
	selectedSong = (selectedSong + 1) % songs.length;
	addSongs();
	audio.play();
}

play.addEventListener('click', togglePlay);
backward.addEventListener('click', playPreviousSong);
forward.addEventListener('click', playNextSong);

// Add songs to the UI on page load
addSongs();
