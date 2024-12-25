document.getElementById('contact-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    try {
        const response = await fetch('http://localhost:5001/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        });
        const data = await response.json();
        alert(data.message);
    } catch (error) {
        alert('Error submitting form');
        console.error(error);
    }
});

