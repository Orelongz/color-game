var squ = document.querySelectorAll(".square");
var message = document.getElementById("message");
var colorCode = document.getElementById("colorCode");
var newGame = document.getElementById("newGame");
var navback = document.querySelector(".navback");
var mode = document.querySelectorAll(".mode");
var coloring = [];
var num = 6;

// GENERATES EACH RANDOM COLOR
function randomize () {
	rand = []
	for (var i = 0; i < 3; i++) {
		var col = Math.floor(Math.random()*256);
		rand.push(col);
	}
	return "rgb("+rand[0]+ ", " + rand[1] + ", " + rand[2] + ")";
}

// POPULATES "COLORING" WITH THE RANDOM COLORS GENERATED
function color() {
	for (var i = 0; i < num; i++) {
		coloring.push(randomize());
	}
}

// MAKES BACKGROUND AND SQUARES THE SAME COLOR
function correctBack () {
	for (var i = 0; i < coloring.length; i++) {
		squ[i].style.background = correct;
	}
	navback.style.background = correct;
}

// MAIN GAME LOGIC
function mainGame() {
	for (var i = 0; i < squ.length; i++) {
		if (coloring[i]) {
			squ[i].style.display = "block";
			squ[i].style.background = coloring[i];
		} else {
			squ[i].style.display = "none";
		}

		squ[i].addEventListener("click", function () {
			if (this.style.background === correct) {
				message.textContent = "Correct!!!"
				correctBack();
				newGame.textContent = "Play Again?"
			}
			else {
				message.textContent = ("Try Again!");
				this.style.background = "#232323";
			}
		});
	}
}

// RESTARTS THE GAME
function reoccur() {
	newGame.textContent = "New Colors";						
	message.textContent ="";								// CLEARING THE VALUE OF MESSAGE
	navback.style.background = "rgb(107, 107, 240)";		// DEFAULT BACKGROUND
	coloring = [];											// CLEARING THE COLORING ARRAY
	color();												// RUNNING COLOR() TO POPULATE COLORING
	correct = coloring[Math.floor(Math.random()*num)];		// CHOOSING THE RGB TO BE DISPLAYED
	colorCode.textContent = correct;						// DISPLAYING THE CHOSEN RGB VALUE
	mainGame();												// RUNNING THE MAIN LOGIC
}


// EVENT LISTENER ON HARD AND EASY BUTTONS
for (var i = 0; i < mode.length; i++) {
	mode[i].addEventListener("click", function () {
		mode[0].classList.remove("selected");
		mode[1].classList.remove("selected");
		this.classList.add("selected");
		this.textContent === "Easy" ? num = 3 : num = 6;
		reoccur();
	});
}


// EVENT LISTENER ON THE NEW COLOR BUTTON
newGame.addEventListener("click", function () {
	reoccur();
});



// CALLING THE START OF THE GAME
reoccur();