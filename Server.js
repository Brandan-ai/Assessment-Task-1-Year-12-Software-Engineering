const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON data
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Create a SQLite database for study sessions
const db = new sqlite3.Database("C:/Users/slpsa/Downloads/Assessment-Task-1-Year-12-Software-Engineering/study-planner.db", (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite study sessions database.');
});

// Create the study_sessions table if it doesn't exist
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS study_sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subject TEXT NOT NULL,
        topic TEXT NOT NULL,
        due_date TEXT NOT NULL
    )`);
});

// Endpoint to add a new study session
app.post('/api/study-sessions', (req, res) => {
    const { subject, topic, due_date } = req.body;
    const sql = 'INSERT INTO study_sessions (subject, topic, due_date) VALUES (?, ?, ?)';
    
    db.run(sql, [subject, topic, due_date], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID });
    });
});

// Endpoint to retrieve all study sessions
app.get('/api/study-sessions', (req, res) => {
    const sql = 'SELECT * FROM study_sessions';
    
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Endpoint to search study sessions by subject or topic
app.get('/api/study-sessions/search', (req, res) => {
    const { query } = req.query;
    const sql = `
        SELECT * FROM study_sessions 
        WHERE subject LIKE ? OR topic LIKE ?`;
    
    db.all(sql, [`%${query}%`, `%${query}%`], (err, rows) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Create a SQLite database for users
const userDb = new sqlite3.Database("C:/Users/slpsa/Downloads/Assessment-Task-1-Year-12-Software-Engineering/users.db", (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite user database.');
});

// Create the users table if it doesn't exist
userDb.serialize(() => {
    userDb.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL
    )`);
});

// Endpoint to register a new user
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    
    userDb.run(sql, [username, password], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID });
    });
});

// Endpoint to sign in
app.post('/api/signin', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    
    userDb.get(sql, [username, password], (err, row) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (row) {
            res.json({ message: 'Sign-in successful', user: row });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });
});

// Serve the sign-in HTML file as the default page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Sign In.html'));
});

// Serve the main HTML file (Study Planner) after sign-in
app.get('/study-planner', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Study Planner.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
