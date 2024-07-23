const songsList = [
    {
        name: "Jazz In Paris",
        artist: "Media Right Productions",
        src: "assets/1.mp3",
        cover: "assets/1.jpg"
    },
    {
        name: "Blue Skies",
        artist: "Silent Partner",
        src: "assets/2.mp3",
        cover: "assets/2.jpg"
    },
    {
        name: "Crimson Fly",
        artist: "Huma-Huma",
        src: "assets/3.mp3",
        cover: "assets/3.jpg"
    }
];

const artistName = document.querySelector('.artist-name');
const musicName = document.querySelector('.song-name');
const fillBar = document.querySelector('.fill-bar');
const time = document.querySelector('.time');
const cover = document.getElementById('cover');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const prog = document.querySelector('.progress-bar');

let song = new Audio();
let currentSong = 0;
let playing = false;

document.addEventListener('DOMContentLoaded', () => {
    loadSong(currentSong);
    song.addEventListener('timeupdate', updateProgress);
    song.addEventListener('ended', nextSong);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    playBtn.addEventListener('click', togglePlayPause);
    prog.addEventListener('click', seek);
});

function loadSong(index) {
    const { name, artist, src, cover: thumb } = songsList[index];
    artistName.innerText = artist;
    musicName.innerText = name;
    song.src = src;
    cover.style.backgroundImage = `url(${thumb})`;
}

function updateProgress() {
    if (song.duration) {
        const pos = (song.currentTime / song.duration) * 100;
        fillBar.style.width = `${pos}%`;

        const duration = formatTime(song.duration);
        const currentTime = formatTime(song.currentTime);
        time.innerText = `${currentTime} - ${duration}`;

    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function togglePlayPause() {
    if (playing) {
        song.pause();
    } else {
        song.play();
    }
    playing = !playing;
    playBtn.classList.toggle('fa-pause', playing);
    playBtn.classList.toggle('fa-play', !playing);
    cover.classList.toggle('active', playing);
}

function nextSong() {
    currentSong = (currentSong + 1) % songsList.length;
    playMusic();
}

function prevSong() {
    currentSong = (currentSong - 1 + songsList.length) % songsList.length;
    playMusic();
}

function playMusic() {
    loadSong(currentSong);
    song.play();
    playing = true;
    playBtn.classList.add('fa-pause');
    playBtn.classList.remove('fa-play');
    cover.classList.add('active');
}

function seek(e) {
    const pos = (e.offsetX / prog.clientWidth) * song.duration;
    song.currentTime = pos;
}
// Selecting DOM elements
const container = document.querySelector(".container");
const addQuestionCard = document.getElementById("add-question-card");
const cardButton = document.getElementById("save-btn");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const errorMessage = document.getElementById("error");
const addQuestion = document.getElementById("add-flashcard");
const closeBtn = document.getElementById("close-btn");

// Initializing variables
let editBool = false;
let originalId = null;
let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];

addQuestion.addEventListener("click", () => {
  // Show the add question card and hide the container
  container.classList.add("hide");
  question.value = "";
  answer.value = "";
  addQuestionCard.classList.remove("hide");
});

closeBtn.addEventListener("click", () => {
  // Close the add question card and show the container
  container.classList.remove("hide");
  addQuestionCard.classList.add("hide");
  if (editBool) {
    editBool = false;
  }
});

cardButton.addEventListener("click", () => {
  // Save the flashcard
  let tempQuestion = question.value.trim();
  let tempAnswer = answer.value.trim();
  if (!tempQuestion || !tempAnswer) {
    // Display error message if question or answer is empty
    errorMessage.classList.remove("hide");
  } else {
    if (editBool) {
      // If editing an existing flashcard, remove the original flashcard from the array
      flashcards = flashcards.filter(flashcard => flashcard.id !== originalId);
    }
    let id = Date.now();
    // Add the new flashcard to the array
    flashcards.push({ id, question: tempQuestion, answer: tempAnswer });
    // Save the flashcards array to local storage
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
    container.classList.remove("hide");
    errorMessage.classList.add("hide");
    viewlist();
    question.value = "";
    answer.value = "";
    editBool = false;
    addQuestionCard.classList.add("hide"); // This line hides the modal after the flashcard is added
  }
});

// Function to display the flashcard list
function viewlist() {
  const listCard = document.querySelector(".card-list-container");
  listCard.innerHTML = '';
  flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
  flashcards.forEach(flashcard => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <p class="question-div">${flashcard.question}</p>
      <p class="answer-div hide">${flashcard.answer}</p>
      <a href="#" class="show-hide-btn">Show/Hide</a>
      <div class="buttons-con">
        <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="delete"><i class="fa-solid fa-trash-can"></i></button>
      </div>
    `;
    div.setAttribute('data-id', flashcard.id);
    const displayAnswer = div.querySelector(".answer-div");
    const showHideBtn = div.querySelector(".show-hide-btn");
    const editButton = div.querySelector(".edit");
    const deleteButton = div.querySelector(".delete");

    showHideBtn.addEventListener("click", () => {
      // Toggle the visibility of the answer
      displayAnswer.classList.toggle("hide");
    });

    editButton.addEventListener("click", () => {
      // Enable editing mode and show the add question card
      editBool = true;
      modifyElement(editButton, true);
      addQuestionCard.classList.remove("hide");
    });

    deleteButton.addEventListener("click", () => {
      // Delete the flashcard
      modifyElement(deleteButton);
    });

    listCard.appendChild(div);
  });
}

// Function to modify a flashcard element
const modifyElement = (element, edit = false) => {
  const parentDiv = element.parentElement.parentElement;
  const id = Number(parentDiv.getAttribute('data-id'));
  const parentQuestion = parentDiv.querySelector(".question-div").innerText;
  if (edit) {
    const parentAns = parentDiv.querySelector(".answer-div").innerText;
    answer.value = parentAns;
    question.value = parentQuestion;
    originalId = id;
    disableButtons(true);
  } else {
    // Remove the flashcard from the array and update local storage
    flashcards = flashcards.filter(flashcard => flashcard.id !== id);
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
  }
  parentDiv.remove();
};

// Function to disable edit buttons
const disableButtons = (value) => {
  const editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((element) => {
    element.disabled = value;
  });
};

// Event listener to display the flashcard list when the DOM is loaded
document.addEventListener("DOMContentLoaded", viewlist);







