const axios = require("axios");
const https = require('https');
const cheerio = require("cheerio");

module.exports = async (req, res) => {
    try {
        const instance = new axios.Axios({
            baseURL: 'https://www.codechef.com/users',
            timeout: 60000, //optional
            httpsAgent: new https.Agent({ keepAlive: true }),
            headers: { 'Content-Type': 'application/xml' }
        });
        const { data } = await instance.get(`/${req.params.id}`);
        const $ = cheerio.load(data);
        const user = {
            ranks: {
                global_rank: 0,
                country_rank: 0
            },
            ratings: {
                current: 0,
                highest: 0
            },
            problems_solved: {
                fully_solved: 0,
                partially_solved: 0
            },
            stars: 0
        }
        user.stars = parseInt($('span.rating').text());
        user.ratings.current = parseInt($('.rating-number').text().trim().match(/(\d+)/)[0]);
        user.ratings.highest = parseInt($('.rating-header small').text().trim().match(/(\d+)/)[0]);

        let map = {
            0: 'global_rank',
            1: 'country_rank'
        }
        $('.rating-ranks ul li strong').each((i, x) => {
            user.ranks[map[i]] = parseInt($(x).text().trim());
        })
        map = {
            0: 'fully_solved',
            1: 'partially_solved'
        }
        $('.content > h5:nth-child(1)').each((i, x) => {
            user.problems_solved[map[i]] = parseInt($(x).text().trim().match(/(\d+)/)[0]);
        })
        return user;
    } catch (err) {
        console.error(err);
    }
}