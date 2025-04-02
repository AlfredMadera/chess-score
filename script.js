document.addEventListener('DOMContentLoaded', function () {
    const chessBoard = document.querySelector('.chess-board');
    const centerImage = document.getElementById('center-image');
    const centerSection = document.getElementById('center-section');
    const rows = 8;
    const cols = 8;
    const whiteWinsElement = document.getElementById('white-wins');
    const blackWinsElement = document.getElementById('black-wins');
    const player1Sound = document.getElementById('player1-sound');
    const player2Sound = document.getElementById('player2-sound');
    let whiteWins = 0;
    let blackWins = 0;

    // Check if center image exists
    fetch('images/center_image/vs.png')
        .then(response => {
            if (response.ok) {
                centerImage.src = 'images/center_image/vs.png';
                centerImage.style.display = 'block';
                chessBoard.style.display = 'none';
            } else {
                centerImage.style.display = 'none';
                chessBoard.style.display = 'grid';
            }
        })
        .catch(error => {
            console.error('Error fetching center image:', error);
            centerImage.style.display = 'none';
            chessBoard.style.display = 'grid';
        });

    // Create the chessboard
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const square = document.createElement('div');
            if ((i + j) % 2 === 0) {
                square.classList.add('white');
            } else {
                square.classList.add('black');
            }
            chessBoard.appendChild(square);
        }
    }

    // Function to update the scoreboard
    function updateScoreboard() {
        whiteWinsElement.textContent = whiteWins;
        blackWinsElement.textContent = blackWins;
    }

    // Functions to increase wins
    window.increaseWins = function(player) {
        if (player === 'white') {
            whiteWins++;
            animateImage('player1-section', player1Sound);
        } else if (player === 'black') {
            blackWins++;
            animateImage('player2-section', player2Sound);
        }
        updateScoreboard();
    }

    // Function to animate the player image and play sound
    function animateImage(playerSectionId, sound) {
        const playerSection = document.getElementById(playerSectionId);
        const playerImage = playerSection.querySelector('.player-image');
        
        playerImage.classList.add('animate-enlarge-shake');
        sound.play();

        setTimeout(() => {
            playerImage.classList.remove('animate-enlarge-shake');
            sound.pause();
            sound.currentTime = 0; // Reset sound to the beginning
        }, 2000); // Duration of the animation
    }

    updateScoreboard();
});