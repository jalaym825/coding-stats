const axios = require("axios");
const https = require('https');
const cheerio = require("cheerio");

module.exports = async (req, res) => {
    try {
        const url = `https://auth.geeksforgeeks.org/user/${req.params.id}/practice`

        const { data: html } = await axios.get(url);
        const $ = cheerio.load(html);
        const InstituteRank = $('span[class="rankNum"]').text();
        const TotalSolved = $('span[class="score_card_value"]').text();
        const Consistency = $('div[class="streakCnt tooltipped"]').text();
        const TotalBasic = $('a[href="#basic"]').text();
        const TotalEasy = $('a[href="#easy"]').text();
        const TotalMedium = $('a[href="#medium"]').text();
        const TotalHard = $('a[href="#hard"]').text();
        console.log()
        const obj = {
            "rank": InstituteRank,
            "problems_solved": Number(TotalBasic.trim().match(/(\d+)/)[0])+ Number(TotalEasy.trim().match(/(\d+)/)[0])+ Number(TotalMedium.trim().match(/(\d+)/)[0])+ Number(TotalHard.trim().match(/(\d+)/)[0]),
        }

        res.status(200).json(obj);
    } catch (e) {
        res.status(500).json({ message: e.message });
        console.error(e);
    }
}