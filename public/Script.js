document.getElementById('study-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Get values from the input fields
    const subject = document.getElementById('subject').value;
    const topic = document.getElementById('topic').value;
    const due_date = new Date(document.getElementById('due-date').value).toLocaleDateString('en-GB'); // Format the date
    // Send a POST request to add a new study session
    fetch('/api/study-sessions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ subject, topic, due_date })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Study session added:', data);
        fetchStudySessions(); // Refresh the list of study sessions
    })
    .catch(error => console.error('Error:', error));

    document.getElementById('study-form').reset();
});

// Add event listener for the search button

document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-query').value;
    fetchStudySessions(query); // Fetch study sessions based on the search query
});

// Function to fetch study sessions from the server
function fetchStudySessions(query = '') {
    const url = query ? `/api/study-sessions/search?query=${encodeURIComponent(query)}` : '/api/study-sessions';
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const studyList = document.getElementById('study-list');
            studyList.innerHTML = '<li class="study-session header"><div class="session-item subject">Subject</div><div class="session-item topic">Topic</div><div class="session-item due-date">Due Date</div></li>'; // Reset list with header

            // Populate the list with study sessions
            data.forEach(session => {
                const li = document.createElement('li');
                li.classList.add('study-session');
                li.innerHTML = `<div class="session-item subject">${session.subject}</div>
                                <div class="session-item topic">${session.topic}</div>
                                <div class="session-item due-date">${session.due_date}</div>`;
                studyList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching sessions:', error));
}

// Load existing study sessions when the page loads
fetchStudySessions();
