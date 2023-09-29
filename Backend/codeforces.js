const axios = require("axios");
const https = require('https');
const cheerio = require("cheerio");

module.exports = async (req, res) => {
    try {
        const instance = new axios.Axios({
            baseURL: 'https://codeforces.com/profile',
            timeout: 60000, //optional
            httpsAgent: new https.Agent({ keepAlive: true }),
            headers: { 'Content-Type': 'application/xml' }
        });
        const { data } = await instance.get(`/${req.params.id}`);
        const $ = cheerio.load(data);
        const user = {
            user_rank: {
                current: "",
                max: ""
            },
            ratings: {
                current: "",
                max: ""
            },
            problems_solved: 0
        }
        user.user_rank.current = $('.user-rank').text().trim();

        user.user_rank.max = $('.info > ul > li:nth-child(1)').text().replace(/\s+/g, ' ').trim().split(" ")[4].slice(0, -1);

        user.ratings.current = parseInt($('.info > ul > li:nth-child(1)').text().replace(/\s+/g, ' ').trim().match(/(\d+)/)[0]);
        user.ratings.max = parseInt($('.info > ul > li:nth-child(1)').text().replace(/\s+/g, ' ').trim().match(/(\d+)/)[1]);

        user.problems_solved = parseInt($('._UserActivityFrame_counterValue').first().text().trim().split(" ")[0])

        return user;

    } catch (err) {
        console.error(err);
    }
}