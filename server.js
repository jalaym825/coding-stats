const cors = require('cors');
const express = require('express');
const axios = require('axios');
const app = express();
const fs = require('fs');
require('dotenv').config()

let token = null;

app.use(express.json());
app.use(cors());

// Helper function to login and set the token
const loginCodolio = async () => {
    const res = await axios.post('https://api.codolio.com/auth/login', {
        email: process.env.EMAIL,
        password: process.env.PASSWORD
    });
    console.log("Logged in to Codolio");
    token = res.headers['authorization'];
};

// Helper function to validate token
const validateToken = async () => {
    try {
        await axios.get('https://api.codolio.com/user/details/token', {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log("Token validated");
    } catch {
        console.log("Token expired. Re-logging in.");
        await loginCodolio();
    }
};

// Helper function to group activity by month/year
const groupActivityByMonth = (activity) => {
    const result = {};
    Object.entries(activity).forEach(([timestamp, count]) => {
        const date = new Date(parseInt(timestamp) * 1000);
        const monthYear = `${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
        result[monthYear] = (result[monthYear] || 0) + count;
    });
    return result;
};

const sumMonthlyActivityAcrossPlatforms = (platformData) => {
    const overallActivity = {};

    // Loop over each platform to sum the monthly activities
    Object.keys(platformData).forEach((platform) => {
        const { monthlyActivity } = platformData[platform];

        // Sum the activities month by month
        Object.entries(monthlyActivity).forEach(([monthYear, count]) => {
            overallActivity[monthYear] = {
                "leetcode": platform === "leetcode" ? count : overallActivity[monthYear]?.leetcode || 0,
                "codechef": platform === "codechef" ? count : overallActivity[monthYear]?.codechef || 0,
                "codeforces": platform === "codeforces" ? count : overallActivity[monthYear]?.codeforces || 0,
                "geeksforgeeks": platform === "geeksforgeeks" ? count : overallActivity[monthYear]?.geeksforgeeks || 0,
                "total": (overallActivity[monthYear]?.total || 0) + count
            };
        });
    });

    return overallActivity;
};

app.get('/stats', async (req, res) => {
    try {
        if (!token) await loginCodolio();
        await validateToken();

        const { data } = await axios.get('https://api.codolio.com/user', {
            headers: { Authorization: `Bearer ${token}` }
        });

        const platforms = data.data.platformProfiles.platformProfiles;
        const platformData = {};

        platforms.forEach((platform) => {
            const { platform: name, dailyActivityStatsResponse, badgeStats, userStats, totalQuestionStats } = platform;

            platformData[name] = {
                maxRank: name === "leetcode"
                    ? badgeStats.badgeList[0].name // Use correct property for LeetCode
                    : name === "codechef"
                        ? `${userStats.stars} Stars`
                        : userStats.maxRank,
                rating: {
                    current: userStats.currentRating,
                    max: userStats.maxRating
                },
                totalQuestionStats,
                monthlyActivity: groupActivityByMonth(
                    platform === "leetcode"
                        ? dailyActivityStatsResponse.dailyActivityStatsResponse
                        : dailyActivityStatsResponse.submissionCalendar
                        || {})
            };
        });

        platformData.overAllMonthlyActivity = sumMonthlyActivityAcrossPlatforms(platformData);

        res.json(platformData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(4000, () => console.log("Server running on port 4000"));
