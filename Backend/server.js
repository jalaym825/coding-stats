const cors = require('cors')
const express = require('express');
const app = express();

app.use(express.json());
app.use(cors()) // Use this after the variable declaration and before routes declaration

app.get('/geeksforgeeks/:id', async (req, res) => {
    const data = await require('./geeksforgeeks')(req);
    res.json(data);
})

app.get('/leetcode/:id', async (req, res) => {
    const data = await require('./leetcode')(req);
    res.json(data);
})

app.get('/codechef/:id', async (req, res) => {
    const data = await require('./codechef')(req);
    res.json(data);
})

app.get('/codeforces/:id', async (req, res) => {
    const data = await require('./codeforces')(req);
    res.json(data);
})

app.listen(4000, () => {
    console.log("server running on port: " + 4000)
});