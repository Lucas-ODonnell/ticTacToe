//factory function to create player
const createPlayer = (name, piece) => {
	return {
		name: name,
		piece: piece
	};
}

//game logic
const Game = (() => {
	const placePiece = (position) => {
		if (board[position] !== "") {
			return;
		} else {
			board[position] = currentPlayer.piece;
			gameOver(currentPlayer);
			changePlayer();
		}
	};

	const gameOver = (currentPlayer) => {
		if (winner(currentPlayer) == true) {
			window.alert(`${currentPlayer.name}(${currentPlayer.piece}) wins!`);
		} else if (draw() == true) {
			window.alert("It's a draw!");
		}	
	};


	const changePlayer = () => {
		if (currentPlayer == player1) {
			currentPlayer = player2;
		} else {
			currentPlayer = player1
		}
	}
	const winner = (currentPlayer) => {
		if (
			(board[0] == currentPlayer.piece && board[1] == currentPlayer.piece && board[2] == currentPlayer.piece) ||
			(board[3] == currentPlayer.piece && board[4] == currentPlayer.piece && board[5] == currentPlayer.piece) ||
			(board[6] == currentPlayer.piece && board[7] == currentPlayer.piece && board[8] == currentPlayer.piece)) {
			return true;
		} else if (
			(board[0] == currentPlayer.piece && board[3] == currentPlayer.piece && board[6] == currentPlayer.piece) ||
			(board[1] == currentPlayer.piece && board[4] == currentPlayer.piece && board[7] == currentPlayer.piece) ||
			(board[2] == currentPlayer.piece && board[5] == currentPlayer.piece && board[8] == currentPlayer.piece)) {
			return true;
		} else if (
			(board[0] == currentPlayer.piece && board[4] == currentPlayer.piece && board[8] == currentPlayer.piece) ||
			(board[6] == currentPlayer.piece && board[4] == currentPlayer.piece && board[2] == currentPlayer.piece)) {
			return true;
		} else {
			return false;
		}
	};

	const draw = () => {
		for (let i = 0; i <= board.length; i++) {
			if (board[i] === "") {
				return false;
			}
		}
		return true;
	};

	const clear = () => {
		board = ["","","","","","","","",""]; 
	};

	return {
		placePiece,
		gameOver,
		clear,
		changePlayer,
	}

})();

//animate the browser 
const Animate= (() => {
	const allPositions = document.querySelectorAll('[data-square-target]');
	const resetButton = document.querySelector('[data-reset-board]');
	const allBoard = document.querySelector('[data-all-board]');
	const playerButtons = document.querySelectorAll('[data-player-target]');
	const numberConverter = {"#zero": 0, "#one": 1, "#two": 2, "#three": 3, "#four": 4, "#five": 5, "#six": 6, "#seven": 7, "#eight": 8};

	const allBoardPositions = allPositions.forEach(position => {
		position.addEventListener("click", () => {
			let thisPosition = document.querySelector(position.dataset.squareTarget);
			animateBoard(thisPosition);
		});
	});

	/* Prevent User from changing name and piece during a game */

	const preventChange = allPositions.forEach(position => {
		position.addEventListener('click', () => {
			let thisPosition = document.querySelector(position.dataset.squareTarget);
			if (thisPosition != "") {
				preventMultiple();
			}
		})
	});

	function preventMultiple() {
		playerButtons.forEach(button => {
			button.setAttribute("disabled", true);
		})
	}


	function animateBoard(thisPosition){
		if (thisPosition.innerText == ""){
			thisPosition.innerText = currentPlayer.piece;
		}
		Game.placePiece(numberConverter[thisPosition.dataset.squareTarget]);
	}

	resetButton.addEventListener('click', () => {
		Game.clear();
		resetAnimatedBoard();
	});

	function resetAnimatedBoard() {
		location.reload();
	}
})();

//Let player choose name and piece
const ChangePlayer = (() => {
	const overlay = document.getElementById('overlay');
	const playerButtons = document.querySelectorAll('[data-player-target]');
	const closeModalButton = document.querySelector('[data-close-button]')
	const formForSubmit = document.querySelector('[data-edit-player-form]')
	let currentIndex;

	playerButtons.forEach((button, index) => {
		button.addEventListener('click', () => {
			currentIndex = index;
			const modal = document.querySelector(button.dataset.playerTarget);
			openModal(modal);
		});
	});

	closeModalButton.addEventListener('click', () => {
		const modal = closeModalButton.closest(".modal");
		closeModal(modal);
	});

	function openModal(modal) {
		if (modal == null) return;
		modal.classList.add('active');
		overlay.classList.add('active');
	}

	function closeModal(modal) {
		if (modal == null) return;
		modal.classList.remove('active');
		overlay.classList.remove('active');
	}

	//Submit **********************************************
	formForSubmit.addEventListener('submit', editPlayer);

	function editPlayer(e) {
		e.preventDefault();
		player = createPlayer(
			document.querySelector('[name=name]').value,
			document.querySelector('[name=piece]').value
		);
		setPlayer(player, currentIndex);
		closeModal(modal);
		this.reset();
	}

	function setPlayer(player, currentIndex) {
		if (currentIndex == 0) {
			player1 = player;
			currentPlayer = player1;
		} else if (currentIndex == 1) {
			player2 = player;
		} else {
			return;
		}
	}
})();

let player1 = createPlayer("John Doe","X");
let player2 = createPlayer("Jane Doe","O");

let currentPlayer = player1;
let board = ["","","","","","", "","",""];

