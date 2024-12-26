// Smooth scroll functionality for navigation links
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth',
        });
    });
});

// Contact form submission handling
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

async function loadCourses() {
    try {
        const response = await fetch('http://localhost:5001/api/courses');
        const courses = await response.json();

        const coursesSection = document.getElementById('courses');
        const coursesList = document.createElement('ul');
        courses.forEach(course => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${course.name}</strong>: ${course.description}`;
            coursesList.appendChild(listItem);
        });
        coursesSection.appendChild(coursesList);
    } catch (error) {
        console.error('Error fetching courses:', error);
    }
}

// Call loadCourses when the page loads
document.addEventListener('DOMContentLoaded', loadCourses);

