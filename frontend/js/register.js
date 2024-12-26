document.getElementById('registrationForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const role = document.getElementById('registerRole').value;

    const apiUrl = 'http://localhost:5001/api/auth/register';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password, role })
        });

        const result = await response.json();

        if (response.ok) {
            console.log('Registration successful:', result);
            // Redirect to login page or show a success message
            window.location.href = 'login.html';
        } else {
            document.getElementById('registerResponse').innerText = `Error: ${result.error || 'Registration failed'}`;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('registerResponse').innerText = 'An error occurred. Please try again.';
    }
});
