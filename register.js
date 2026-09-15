function register() {

    const username = document.getElementById("newUsername").value.trim();
    const email = document.getElementById("newEmail").value.trim().toLowerCase();
    const password = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const message = document.getElementById("message");

    if (!username || !email || !password || !confirmPassword) {
        message.textContent = "กรุณากรอกข้อมูลให้ครบ";
        return;
    }

    if (!email.includes("@")) {
        message.textContent = "กรุณากรอกอีเมลให้ถูกต้อง";
        return;
    }

    if (password !== confirmPassword) {
        message.textContent = "รหัสผ่านไม่ตรงกัน";
        return;
    }

    if (localStorage.getItem("user_" + username)) {
        message.textContent = "ชื่อผู้ใช้นี้มีอยู่แล้ว";
        return;
    }

    // ตรวจสอบอีเมลซ้ำ
    for (let i = 0; i < localStorage.length; i++) {

        const key = localStorage.key(i);

        if (key.startsWith("user_")) {

            const savedUser = JSON.parse(localStorage.getItem(key));

            if (savedUser.email === email) {
                message.textContent = "อีเมลนี้ถูกใช้ไปแล้ว";
                return;
            }
        }
    }

    const user = {
        username: username,
        email: email,
        password: password
    };

    localStorage.setItem(
        "user_" + username,
        JSON.stringify(user)
    );

    alert("สมัครสมาชิกสำเร็จ");

    window.location.href = "login.html";
}

function goLogin() {
    window.location.href = "login.html";
}