class Player {
	constructor(piece) {
		this.piece = piece
	}
};

const player1 = new Player("X");
const player2 = new Player("O");

let currentPlayer = player1;
let board = ["","","","","","", "","",""];


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
			window.alert(`${currentPlayer.piece} wins!`);
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

const Animate = (() => {

	const allPositions = document.querySelectorAll('[data-square-target]');
	const resetButton = document.querySelector('[data-reset-board]');
	const allBoard = document.querySelector('[data-all-board]');
	const numberConverter = {"#zero": 0, "#one": 1, "#two": 2, "#three": 3, "#four": 4, "#five": 5, "#six": 6, "#seven": 7, "#eight": 8};

	const randomVariable = allPositions.forEach(position => {
		position.addEventListener("click", () => {
			let thisPosition = document.querySelector(position.dataset.squareTarget);
			animateBoard(thisPosition);
		});

	});

	function animateBoard(thisPosition){
		if (thisPosition.innerText !== "X" && thisPosition.innerText !== "O"){
			thisPosition.innerText = currentPlayer.piece;
		}
		Game.placePiece(numberConverter[thisPosition.dataset.squareTarget]);
	}

	//Reset the board*******************************************************************************************************************************************
	resetButton.addEventListener('click', () => {
		Game.clear();
		resetAnimatedBoard();
	});

	function resetAnimatedBoard() {
		location.reload();
	}
})();
