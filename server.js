const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const users = []; // Simple array to hold user data

app.use(bodyParser.json()); // Middleware to parse JSON

// API endpoint to register a new user
app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const userExists = users.find(user => user.email === email);
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Add the new user to the "database"
    users.push({ username, email, password });
    res.status(200).json({ message: "Registration successful" });
});

// API endpoint to log in a user
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Check if the user exists
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    // Successful login
    res.status(200).json({ message: "Login successful" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
