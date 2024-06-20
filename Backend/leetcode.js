const axios = require("axios").default;

module.exports = async (req, res) => {
    try {
        const [rating, badges, problems, {maxStreak, currentStreak}] = await Promise.all([getRatings(req.params.id), getBadges(req.params.id), getProblems(req.params.id), getStreaks(req.params.id)]);
        const user = {
            rating: rating,
            badges: badges,
            problems: problems,
            maxStreak: maxStreak,
            currentStreak: currentStreak
        }
        res.status(200).json(user);
    } catch (e) {
        res.status(500).json({ message: e.message });
        console.log(e)
    }
}

async function getRatings(id) {
    const options = {
        method: 'POST',
        url: 'https://leetcode.com/graphql',
        headers: {
            'content-type': 'application/json'
        },
        data: {
            query: '\n    query userContestRankingInfo($username: String!) {\n  userContestRanking(username: $username) {\n    attendedContestsCount\n    rating\n    globalRanking\n    totalParticipants\n    topPercentage\n    badge {\n      name\n    }\n  }\n \n}\n    ',
            variables: { username: id },
            operationName: 'userContestRankingInfo'
        }
    };

    return axios.request(options).then(function (response) {
        return response.data.data;
    }).catch(function (error) {
        console.error(error);
    });
}

async function getBadges(id) {
    const options = {
        method: 'POST',
        url: 'https://leetcode.com/graphql',
        headers: {
            'content-type': 'application/json'
        },
        data: {
            query: '\n    query userBadges($username: String!) {\n  matchedUser(username: $username) {\n    badges {\n      id\n      name\n      shortName\n      displayName\n      icon\n      hoverText\n      medal {\n        slug\n        config {\n          iconGif\n          iconGifBackground\n        }\n      }\n      creationDate\n      category\n    }\n    upcomingBadges {\n      name\n      icon\n      progress\n    }\n  }\n}\n    ',
            variables: { username: id },
            operationName: 'userBadges'
        }
    };

    return axios.request(options).then(function (response) {
        return response.data.data;
    }).catch(function (error) {
        console.error(error);
    });
}


async function getProblems(id) {
    const options = {
        method: 'POST',
        url: 'https://leetcode.com/graphql',
        headers: {
            'content-type': 'application/json'
        },
        data: {
            query: '\n    query userProblemsSolved($username: String!) {\n  allQuestionsCount {\n    difficulty\n    count\n  }\n  matchedUser(username: $username) {\n    problemsSolvedBeatsStats {\n      difficulty\n      percentage\n    }\n    submitStatsGlobal {\n      acSubmissionNum {\n        difficulty\n        count\n      }\n    }\n  }\n}\n    ',
            variables: { username: id },
            operationName: 'userProblemsSolved'
        }
    };

    return axios.request(options).then(function (response) {
        return response.data.data;
    }).catch(function (error) {
        console.error(error);
    });
}

async function getStreaks(id) {
    const options = {
        method: 'POST',
        url: 'https://leetcode.com/graphql',
        headers: {
            'content-type': 'application/json'
        },
        data: {
            query: 'query userProfileCalendar($username: String!, $year: Int) {\n  matchedUser(username: $username) {\n    userCalendar(year: $year) {\n      submissionCalendar\n    }\n  }\n}',
            variables: {username: 'jalaym825'},
            operationName: 'userProfileCalendar'
          }
    };
    return axios.request(options).then(function (response) {
        const data = JSON.parse(response.data.data.matchedUser.userCalendar.submissionCalendar);
        const sortedEntries = Object.entries(data).sort((a, b) => a[0] - b[0]);

        let currentStreak = 0;
        let maxStreak = 0;
        let lastTimestamp = null;
        
        sortedEntries.forEach(([timestamp, value]) => {
            if (value > 0) {
                if (lastTimestamp === null || timestamp - lastTimestamp === 86400) {
                    currentStreak++;
                } else {
                    currentStreak = 1;
                }
                maxStreak = Math.max(maxStreak, currentStreak);
            } else {
                currentStreak = 0;
            }
            lastTimestamp = timestamp;
        });
        
        console.log("Current streak:", currentStreak);
        console.log("Max streak:", maxStreak);

        return {currentStreak, maxStreak};
    }).catch(function (error) {
        console.error(error);
    });
}