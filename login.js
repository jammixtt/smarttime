function login() {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    if (!username || !password) {
        message.textContent = "กรุณากรอกข้อมูลให้ครบ";
        return;
    }

    const savedUser = localStorage.getItem("user_" + username);

    if (!savedUser) {
        message.textContent = "ไม่พบชื่อผู้ใช้นี้";
        return;
    }

    const user = JSON.parse(savedUser);

    if (password === user.password) {

        localStorage.setItem("currentUser", username);

        window.location.href = "index.html";

    } else {

        message.textContent = "รหัสผ่านไม่ถูกต้อง";

    }
}

function goRegister() {
    window.location.href = "register.html";
}