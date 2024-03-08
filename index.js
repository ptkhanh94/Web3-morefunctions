<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Web App with ChatGPT</title>
</head>
<body>
    <h1>Simple Web App with ChatGPT</h1>

    <div id="login">
        <h2>Đăng nhập</h2>
        <input type="text" id="username" placeholder="Tên đăng nhập"><br>
        <input type="password" id="password" placeholder="Mật khẩu"><br>
        <button onclick="login()">Đăng nhập</button>
    </div>

    <div id="accountInfo" style="display: none;">
        <h2>Thông tin tài khoản</h2>
        <p id="userInfo"></p>
    </div>

    <div id="chat">
        <h2>Chat với ChatGPT</h2>
        <input type="text" id="userInput" placeholder="Nhập câu hỏi của bạn"><br>
        <button onclick="sendMessage()">Gửi</button>
        <div id="chatOutput"></div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/@openai/chatgpt"></script>
    <script>
        const chatgpt = new ChatGPT('YOUR_API_KEY');

        async function login() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Call backend API to authenticate user
            // Replace with your backend API endpoint
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (data.success) {
                document.getElementById('login').style.display = 'none';
                document.getElementById('accountInfo').style.display = 'block';
                document.getElementById('userInfo').innerText = data.message;
            } else {
                alert(data.message);
            }
        }

        async function sendMessage() {
            const userInput = document.getElementById('userInput').value;

            // Use ChatGPT to generate response
            const response = await chatgpt.send(userInput);
            const chatOutput = document.getElementById('chatOutput');
            chatOutput.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
            chatOutput.innerHTML += `<p><strong>ChatGPT:</strong> ${response}</p>`;
        }
    </script>
</body>
</html>
