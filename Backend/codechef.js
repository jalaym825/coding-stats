const axios = require("axios");
const https = require('https');
const cheerio = require("cheerio");

module.exports = async (req, res) => {
    try {
        const instance = new axios.Axios({
            baseURL: 'https://www.codechef.com/users',
            timeout: 60000, //optional
            httpsAgent: new https.Agent({ keepAlive: true }),
            headers: {
                'Content-Type': 'application/xml',
                'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
            }
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
            problems_solved: 0,
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
        user.problems_solved += Number($('section.problems-solved > h3:nth-child(3)').text().trim().match(/(\d+)/)[0])
        user.problems_solved += Number($('section.problems-solved > h3:nth-child(1)').text().trim().match(/(\d+)/)[0])
        res.status(200).json(user);
    } catch (e) {
        res.status(500).json({ message: e.message });
        console.error(e);
    }
}