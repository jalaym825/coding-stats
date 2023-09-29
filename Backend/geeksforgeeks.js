const axios = require("axios");
const https = require('https');
const cheerio = require("cheerio");

module.exports = async (req, res) => {
    try {
        const instance = new axios.Axios({
            baseURL: 'https://auth.geeksforgeeks.org/user',
            timeout: 60000, //optional
            httpsAgent: new https.Agent({ keepAlive: true }),
            headers: { 'Content-Type': 'application/xml' }
        });
        const { data } = await instance.get(`/${req.params.id}`);
        const $ = cheerio.load(data);
        const user = {
            rank: 0,
            score_cards: {
                overall_coding_score: 0,
                total_problem_solved: 0,
                monthly_coding_score: 0
            }
        }
        user.rank = parseInt($('.profile_rank_div span.rankNum').text().trim());
        const map = {
            0: 'overall_coding_score',
            1: 'total_problem_solved',
            2: 'monthly_coding_score'
        }
        $('.score_card_left span.score_card_value').each((i, x) => {
            user.score_cards[map[i]] = parseInt($(x).text().trim());
        })
        return user;
    } catch (err) {
        console.error(err);
    }
}