const cors = require('cors')
const express = require('express');
const leetcode = require('./leetcode');
const geeksforgeeks = require('./geeksforgeeks');
const codechef = require('./codechef');
const codeforces = require('./codeforces');
const app = express();

app.use(express.json());
app.use(cors()) // Use this after the variable declaration and before routes declaration

app.get('/geeksforgeeks/:id', geeksforgeeks)

app.get('/leetcode/:id', leetcode)

app.get('/codechef/:id', codechef)

app.get('/codeforces/:id', codeforces)

app.listen(4000, () => {
    console.log("server running on port: " + 4000)
});