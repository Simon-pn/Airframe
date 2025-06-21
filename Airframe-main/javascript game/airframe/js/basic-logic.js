        const sessionID = Math.floor(1e14 + Math.random() * 9e14);
        const playerID = Math.floor(1000000 + Math.random() * 9000000);
        let currentUsername = '';
        let highscore = "0";

        function showUsernamePopup() {
            const popup = document.getElementById('usernamePopup');
            const input = document.getElementById('usernameInput');
            const errorMessage = document.getElementById('errorMessage');
            
            popup.classList.add('show');
            errorMessage.classList.remove('show');
            
            setTimeout(() => {
                input.focus();
            }, 300);
            
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    confirmUsername();
                }
            });
        }

        function closeUsernamePopup() {
            const popup = document.getElementById('usernamePopup');
            popup.classList.remove('show');
        }

        function confirmUsername() {
            const input = document.getElementById('usernameInput');
            const errorMessage = document.getElementById('errorMessage');
            const username = input.value.trim();
            
            if (username.length < 2) {
                errorMessage.textContent = 'Name muss mindestens 2 Zeichen lang sein!';
                errorMessage.classList.add('show');
                input.style.animation = 'shake 0.3s ease-in-out';
                setTimeout(() => {
                    input.style.animation = '';
                }, 300);
                return;
            }
            
            if (username.length > 20) {
                errorMessage.textContent = 'Name darf maximal 20 Zeichen lang sein!';
                errorMessage.classList.add('show');
                return;
            }
            
            currentUsername = username;
            document.getElementById('pilot-name').textContent = username;
            
            localStorage.setItem('username', username);
            
            closeUsernamePopup();
        }

        function random() {
            const chars = '0123456789abcdefghijklmQ!@#$%^&*()-_=+|;:,.?012345678901234567890123456789';
            let result = '';
            for (let i = 0; i < 30; i++) {
                const randomIndex = Math.floor(Math.random() * chars.length);
                result += chars[randomIndex];
            }
            return result;
        }

        const secretKey = "airframe_main_53";
        const cryptoHighscore = highscore;
        sessionStorage.setItem('lastHighscore', highscore);

        const encrypted = CryptoJS.AES.encrypt(cryptoHighscore.toString(), secretKey).toString();

        const gamekey = random();
        const event_param = "default";
        const highscore_token = encrypted;

        function startGame() {
            const savedUsername = localStorage.getItem('username');
            if (savedUsername) {
                const username = savedUsername;
                document.getElementById('pilot-name').textContent = savedUsername;
                
                console.log('Starting Game with saved pilot:', username);
                document.body.style.transition = 'all 0.2s ease';
                document.body.style.filter = 'brightness(1.5)';
                setTimeout(() => {
                    document.body.style.filter = 'brightness(1)';
                    window.location.href =`game.html?game_key=${gamekey}&event=${event_param}&highscore_token=${highscore_token}`;
                    alert(`Spiel startet für Pilot: ${savedUsername}`);
                }, 200);
            } else {
                showUsernamePopup();
            }
        }
        
        function showScores() {
            const container = document.querySelector('.container');
            container.style.animation = 'shake 0.3s ease-in-out';
            setTimeout(() => {
                container.style.animation = '';
                setTimeout(() => {
                    window.location.href = "imprint.html";
                }, 100);
            }, 300);
        }
        
        function exitGame() {
            console.log('Quitting...');
            document.body.style.transition = 'opacity 0.8s ease';
            document.body.style.opacity = '0';
            setTimeout(() => {
                window.location.href = "https://google.com";
            }, 800);
        }

        document.addEventListener("DOMContentLoaded", () => {
            if (!localStorage.getItem("player-id")) {
                document.getElementById("player-id").innerText = playerID;
                localStorage.setItem("player-id", playerID);
            } else {
                document.getElementById("player-id").innerText = localStorage.getItem("player-id");
                if (!localStorage.getItem("username")) {
                    showUsernamePopup();
                } else {
                    document.getElementById("pilot-name").innerText = localStorage.getItem("username");
                }
            }
            
            document.getElementById("session-id").innerText = sessionID;
            sessionStorage.setItem("session-id", sessionID);

            document.getElementById("highscore").innerText = highscore;
            
        });