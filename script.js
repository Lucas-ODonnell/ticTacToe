class Player {
	constructor(piece) {
		this.piece = piece
	}
};

let player1 = new Player("X");
let player2 = new Player("O");

const Game = (() => {
	const placePiece = (position) => {
		if (board[position] !== "") {
			console.log("That is an invalid position");
		} else {
			board[position] = currentPlayer.piece;
			gameOver(currentPlayer);
		}
		changePlayer();
	};

	const gameOver = (currentPlayer) => {
		if (winner(currentPlayer) == true) {
			console.log(`${currentPlayer.piece} wins!`);
			clear();
		} else if (draw() == true) {
			console.log("It's a draw");
			clear();
		} else {
			console.log("Game isn't over")
			return;
		}
	};
	

	// Private ***********************************************************************88
	let board = ["","","","","","", "","",""];
	let currentPlayer = player1;
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
		board,
		currentPlayer,
	}

})();
