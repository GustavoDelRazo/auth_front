async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const backendURL = "https://8000-axelcarrill-herokubacke-l038cx8hr2i.ws-us106.gitpod.io"; // Reemplaza con la URL de tu backend

    try {
        const response = await fetch(`${backendURL}/token`, {
            method: "POST",
            headers: {
                "Authorization": "Basic " + btoa(`${username}:${password}`),
                "Content-Type": "application/json",  // Cambiado a "application/json" para el nuevo método
            },
        });

        if (response.ok) {
            const data = await response.json();

            // Almacenar el token en las cookies con HttpOnly y Secure
            document.cookie = `token=${data.token}; path=/; secure; samesite=strict`;

            // Redirigir a la página "/home"
            window.location.href = "/home";
        } else {
            const data = await response.json();
            document.getElementById("message").innerText = `Inicio de sesión fallido. ${data.detail}`;
        }
    } catch (error) {
        console.error("Error durante el inicio de sesión:", error);
        document.getElementById("message").innerText = "Ocurrió un error al iniciar sesión.";
    }
}
