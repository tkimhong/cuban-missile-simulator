const startButton = document.getElementById("start_button");
const gifLanding = document.querySelector(".gif");
const questionLanding = document.querySelector(".question");

var questionMain = null;
var gifMain = null;
var siButton = null; // Previously yesButton (used for the moving button)
var noButton = null;
var input = null;
var count = 0;
var gameEnded = false;

// Sound effect
const siuuuSound = new Audio("assets/Siuuu.wav");

// Create and switch to the main interaction screen
const createMainScreen = () => {
  document.head.innerHTML =
    "<meta charset='UTF-8'>" +
    "<meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
    "<title>Cuban Missile Simulator</title>" +
    "<link rel='stylesheet' href='css/styleMain.css'/>";

  const wrapper = document.createElement("div");
  wrapper.className = "wrapper";

  const question = document.createElement("h2");
  question.className = "question";
  question.innerHTML = `Buenaaas ${input}! Do you want to launch the Cuban Missile?`;
  wrapper.appendChild(question);

  const gifContainer = document.createElement("div");
  gifContainer.className = "gif-container";
  gifContainer.style.width = "100%";
  gifContainer.style.height = "400px";
  wrapper.appendChild(gifContainer);

  const btnGroup = document.createElement("div");
  btnGroup.className = "btn-group";

  const siBtn = document.createElement("button");
  siBtn.className = "si-btn";
  siBtn.textContent = "¡Si!";
  siBtn.style.position = "absolute";
  btnGroup.appendChild(siBtn);

  const noBtn = document.createElement("button");
  noBtn.className = "no-btn";
  noBtn.textContent = "No";
  noBtn.style.position = "absolute";
  btnGroup.appendChild(noBtn);

  wrapper.appendChild(btnGroup);

  // Add permanent restart button at the bottom
  const restartBtn = document.createElement("button");
  restartBtn.textContent = "Restart";
  restartBtn.style.position = "fixed";
  restartBtn.style.bottom = "30px";
  restartBtn.style.left = "50%";
  restartBtn.style.transform = "translateX(-50%)";
  restartBtn.style.width = "200px";
  restartBtn.style.background = "#e94d58";
  restartBtn.style.zIndex = "1000";

  restartBtn.addEventListener("click", () => {
    location.reload(); // Reload the page to restart
  });

  wrapper.appendChild(restartBtn);

  // Replace body content with our new structure
  document.body.innerHTML = "";
  document.body.appendChild(wrapper);

  // Create the GIF element and append it to container
  const gif = document.createElement("img");
  gif.className = "gif";
  gif.alt = "gif";
  gif.src = "https://c.tenor.com/lRuZMvsvONkAAAAC/tenor.gif";
  gif.style.width = "100%";
  gif.style.height = "100%";
  document.querySelector(".gif-container").appendChild(gif);

  // Set up references and event listeners
  questionMain = document.querySelector(".question");
  gifMain = document.querySelector(".gif");
  siButton = document.querySelector(".si-btn"); // This is the moving button
  noButton = document.querySelector(".no-btn");

  // Connect the buttons to their functions (button behavior is reversed)
  siButton.addEventListener("click", handleSiButtonClick); // Si button has the moving function
  noButton.addEventListener("click", handleNoButtonClick); // No button stops the missile
};

startButton.addEventListener("click", () => {
  input = document.getElementById("fname").value;

  if (input == "") {
    gifLanding.src =
      "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3c5M3RlZTI3cGozNzJ1OGRxNWQ5bDNlZm95em1rc3dvcTVna3BraSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/k2pM2RW9PDmc9l4vsw/giphy.gif";
    questionLanding.innerHTML =
      "Please give your name before you can access Cuban Missile Simulator!";
  } else {
    // Don't play sound on login - we'll play it when clicking No
    createMainScreen();
  }
});

function handleNoButtonClick() {
  // This is the function for the "No" button (previously yesButtonListener)
  siuuuSound.play().catch((error) => {
    console.error("Error playing sound:", error);
  });

  // Create a new wrapper div with success content
  const wrapper = document.createElement("div");
  wrapper.className = "wrapper";

  const question = document.createElement("h2");
  question.className = "question";
  question.innerHTML = `¡Siiiiiiiiiiiii! You saved the world, ${input}!`;
  wrapper.appendChild(question);

  const gifContainer = document.createElement("div");
  gifContainer.className = "gif-container";
  gifContainer.style.width = "100%";
  gifContainer.style.height = "400px";

  const gif = document.createElement("img");
  gif.className = "gif";
  gif.alt = "aroldis chapman roll";
  gif.src =
    "https://media1.tenor.com/m/87OQUOhWkgAAAAAC/aroldis-chapman-roll.gif";
  gif.style.width = "100%";
  gif.style.height = "100%";

  gifContainer.appendChild(gif);
  wrapper.appendChild(gifContainer);

  // Add restart button
  const restartBtn = document.createElement("button");
  restartBtn.textContent = "Restart";
  restartBtn.style.position = "fixed";
  restartBtn.style.bottom = "30px";
  restartBtn.style.left = "50%";
  restartBtn.style.transform = "translateX(-50%)";
  restartBtn.style.width = "200px";
  restartBtn.style.background = "#e94d58";

  restartBtn.addEventListener("click", () => {
    location.reload();
  });

  wrapper.appendChild(restartBtn);

  // Replace the current wrapper with our new one
  document.querySelector(".wrapper").replaceWith(wrapper);
}

function updateGifSrc(url) {
  // Instead of changing the src directly, we replace the entire element
  const oldGif = document.querySelector(".gif");
  const gifContainer = document.querySelector(".gif-container");

  // Create a new gif element
  const newGif = document.createElement("img");
  newGif.className = "gif";
  newGif.alt = "gif";
  newGif.src = url;
  newGif.style.width = "100%";
  newGif.style.height = "100%";

  // Replace the old with the new
  if (gifContainer && oldGif) {
    gifContainer.removeChild(oldGif);
    gifContainer.appendChild(newGif);
  }
}

function endGame() {
  gameEnded = true;

  // First show text message
  questionMain.innerHTML = `¡BOOM! ${input}, you launched the Cuban Missile and caused World War III!`;

  // Remove the buttons
  const btnGroup = document.querySelector(".btn-group");
  if (btnGroup) {
    btnGroup.remove();
  }

  // Remove the gif container
  const gifContainer = document.querySelector(".gif-container");
  if (gifContainer) {
    gifContainer.remove();
  }

  // Create a simple countdown
  const countdownEl = document.createElement("h2");
  countdownEl.style.fontSize = "4em";
  countdownEl.style.textAlign = "center";
  countdownEl.style.marginTop = "50px";
  countdownEl.style.color = "#e94d58";
  document.querySelector(".wrapper").appendChild(countdownEl);

  // 3-second countdown
  let countdown = 3;
  countdownEl.textContent = countdown;

  const countdownInterval = setInterval(() => {
    countdown--;
    if (countdown >= 0) {
      countdownEl.textContent = countdown;
    } else {
      clearInterval(countdownInterval);

      // Replace the entire body with the fullscreen video
      document.body.innerHTML = "";
      document.body.style.margin = "0";
      document.body.style.padding = "0";
      document.body.style.overflow = "hidden";
      document.body.style.backgroundColor = "black";

      // Create the video element
      const videoContainer = document.createElement("div");
      videoContainer.style.position = "fixed";
      videoContainer.style.top = "0";
      videoContainer.style.left = "0";
      videoContainer.style.width = "100%";
      videoContainer.style.height = "100%";
      videoContainer.style.zIndex = "998";

      const video = document.createElement("video");
      video.src = "assets/cuban-missile.mp4";
      video.style.width = "100%";
      video.style.height = "100%";
      video.style.objectFit = "cover";
      video.autoplay = true;
      video.controls = false;
      video.loop = false;
      video.muted = false;

      videoContainer.appendChild(video);
      document.body.appendChild(videoContainer);

      // Add a restart button that's hidden during the video
      const restartBtn = document.createElement("button");
      restartBtn.textContent = "Restart";
      restartBtn.style.position = "fixed";
      restartBtn.style.bottom = "30px";
      restartBtn.style.left = "50%";
      restartBtn.style.transform = "translateX(-50%)";
      restartBtn.style.width = "200px";
      restartBtn.style.background = "#e94d58";
      restartBtn.style.color = "white";
      restartBtn.style.fontSize = "1.2em";
      restartBtn.style.borderRadius = "30px";
      restartBtn.style.border = "2px solid #e94d58";
      restartBtn.style.padding = "10px 20px";
      restartBtn.style.zIndex = "1000";
      restartBtn.style.cursor = "pointer";
      restartBtn.style.opacity = "0"; // Start hidden
      restartBtn.style.transition = "opacity 0.5s ease"; // Smooth fade in

      restartBtn.addEventListener("click", () => {
        location.reload(); // Reload the page to restart
      });

      document.body.appendChild(restartBtn);

      // Start playing the video
      video.play().catch((error) => {
        console.error("Error playing video:", error);
        // If autoplay fails, show a play button
        const playButton = document.createElement("button");
        playButton.textContent = "Play Video";
        playButton.style.position = "fixed";
        playButton.style.top = "50%";
        playButton.style.left = "50%";
        playButton.style.transform = "translate(-50%, -50%)";
        playButton.style.padding = "20px 40px";
        playButton.style.fontSize = "1.5em";
        playButton.style.backgroundColor = "#e94d58";
        playButton.style.color = "white";
        playButton.style.border = "none";
        playButton.style.borderRadius = "30px";
        playButton.style.cursor = "pointer";
        playButton.style.zIndex = "1001";

        playButton.addEventListener("click", () => {
          video.play();
          playButton.remove();
        });

        document.body.appendChild(playButton);
      });

      // Time the events near the end of the video
      video.addEventListener("timeupdate", function () {
        const timeLeft = video.duration - video.currentTime;

        // Show restart button 1 second before video ends
        if (timeLeft <= 1.0 && restartBtn.style.opacity === "0") {
          restartBtn.style.opacity = "1";
        }
      });
    }
  }, 1000);
}

function handleSiButtonClick() {
  if (gameEnded) return; // Don't process clicks if game is over

  // First handle the current count state
  if (count < 5) {
    updateGifSrc("https://c.tenor.com/XKKkkllMyeIAAAAC/tenor.gif");
    questionMain.innerHTML =
      "This is your first warning. Do you really want to launch the Cuban Missile?";
  } else if (count >= 5 && count < 10) {
    updateGifSrc("https://media1.tenor.com/m/LcST7Dd2BTkAAAAC/mlb.gif");
    questionMain.innerHTML =
      "This is your second warning. Do you really want to launch the Cuban Missile?";
  } else if (count >= 10 && count < 15) {
    updateGifSrc("https://c.tenor.com/3Gc6OanqRPIAAAAC/tenor.gif");
    questionMain.innerHTML =
      "This is your third and final warning before launching the Cuban Missile!";
  } else {
    // End the game after the third warning
    endGame();
    return; // Exit the function early
  }

  // Ensure the siButton exists and move it safely
  if (siButton) {
    try {
      // Calculate new position with safety margins
      const safeMargin = 50; // Pixels from edge
      const maxX = window.innerWidth - (siButton.offsetWidth + safeMargin);
      const maxY = window.innerHeight - (siButton.offsetHeight + safeMargin);

      // Ensure we don't go off screen
      const randomX = Math.min(
        Math.max(safeMargin, Math.floor(Math.random() * maxX)),
        maxX
      );
      const randomY = Math.min(
        Math.max(safeMargin, Math.floor(Math.random() * maxY)),
        maxY
      );

      // Apply absolute positioning
      siButton.style.position = "absolute";
      siButton.style.left = randomX + "px";
      siButton.style.top = randomY + "px";

      // Ensure the button is visible by checking if it's in the viewport
      const rect = siButton.getBoundingClientRect();
      if (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth
      ) {
        // Button is visible, do nothing special
      } else {
        // If somehow the button is outside viewport, reset it to a safe position
        siButton.style.left = window.innerWidth / 2 + "px";
        siButton.style.top = window.innerHeight / 2 + "px";
      }
    } catch (e) {
      console.error("Error moving button:", e);
    }
  }

  count = count + 1;
}
