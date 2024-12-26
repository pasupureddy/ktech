document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const apiUrl = 'http://localhost:5001/api/auth/login';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (response.ok && result.token) {
            localStorage.setItem('authToken', result.token);
            window.location.href = 'recordings.html';
        } else {
            document.getElementById('loginResponse').innerText = `Error: ${result.error || 'Login failed'}`;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('loginResponse').innerText = 'An error occurred. Please try again.';
    }
});

document.getElementById('registrationForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const role = document.getElementById('registerRole').value || 'student';

    try {
        const response = await fetch('http://localhost:5001/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password, role }),
        });

        const result = await response.json();

        if (response.ok) {
            alert('Registration successful!');
            window.location.href = 'login.html'; // Redirect to login page
        } else {
            alert(`Error: ${result.message || 'Registration failed'}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during registration.');
    }
});
