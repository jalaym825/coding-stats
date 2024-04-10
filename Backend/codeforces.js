const { response } = require("express");

const axios = require("axios").default;

module.exports = async (req, res) => {
    try {
        res.status(200).json(await getUserInfo());
    } catch (e) {
        res.status(500).json({ message: e.message });
        console.error(e);
    }
}

async function getUserInfo() {
    const options = {
        method: 'GET',
        url: 'https://codeforces.com/api/user.info',
        params: { handles: "jalaym825" }
    }
    return axios.request(options).then(async function (response) {
        const user = response.data.result[0];
        let submissions = await getSubmissions();
        let solvedProblems = new Set();
        submissions.forEach(submission => {
            if (submission.verdict === "OK") {
                solvedProblems.add(submission.problem.contestId + submission.problem.index);
            }
        });
        user.problems_solved = solvedProblems.size;    
        return response.data.result[0];
    }).catch(function (error) {
        console.error(error);
    });
}

async function getSubmissions() {
    const options = {
        method: 'GET',
        url: 'https://codeforces.com/api/user.status',
        params: { handle: "jalaym825" }
    }
    return axios.request(options).then(function (response) {
        return response.data.result;
    }).catch(function (error) {
        console.error(error);
    });
}