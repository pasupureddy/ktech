const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5001;

app.use(bodyParser.json());
app.use(cors());

// Handle GET request to root URL
app.get('/', (req, res) => {
    res.send('Welcome to the backend server!');
});

// Handle POST request to /api/contact
app.post('/api/contact', (req, res) => {
    const { name, email } = req.body;
    console.log(`Contact request from ${name} (${email})`);
    res.send({ message: 'Thank you for contacting us!' });
});

app.get('/api/courses', (req, res) => {
    const courses = [
        { id: 1, name: 'Web Development', description: 'Learn HTML, CSS, and JavaScript.' },
        { id: 2, name: 'Data Science', description: 'Dive into data analysis and machine learning.' },
        { id: 3, name: 'Cloud Computing', description: 'Master AWS, Azure, and GCP.' },
    ];
    res.send(courses);
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

