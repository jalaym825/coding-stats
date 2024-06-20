const axios = require("axios").default;

const BASE_URL = 'https://leetcode.com/graphql';
const HEADERS = { 'content-type': 'application/json' };

module.exports = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await getUserData(id);
        const user = {
            rating: data.userContestRanking,
            badges: data.matchedUser.badges,
            problems: {
                allQuestionsCount: data.allQuestionsCount,
                problemsSolvedBeatsStats: data.matchedUser.problemsSolvedBeatsStats,
                submitStatsGlobal: data.matchedUser.submitStatsGlobal
            },
            maxStreak: data.streaks.maxStreak,
            currentStreak: data.streaks.currentStreak
        };
        res.status(200).json(user);
    } catch (e) {
        res.status(500).json({ message: e.message });
        console.error(e);
    }
};

async function getUserData(id) {
    const query = `
        query getUserData($username: String!) {
            userContestRanking(username: $username) {
                attendedContestsCount
                rating
                globalRanking
                totalParticipants
                topPercentage
                badge {
                    name
                }
            }
            matchedUser(username: $username) {
                badges {
                    id
                    name
                    shortName
                    displayName
                    icon
                    hoverText
                    medal {
                        slug
                        config {
                            iconGif
                            iconGifBackground
                        }
                    }
                    creationDate
                    category
                }
                problemsSolvedBeatsStats {
                    difficulty
                    percentage
                }
                submitStatsGlobal {
                    acSubmissionNum {
                        difficulty
                        count
                    }
                }
                userCalendar {
                    submissionCalendar
                }
            }
            allQuestionsCount {
                difficulty
                count
            }
        }
    `;

    const variables = { username: id };
    const options = {
        method: 'POST',
        url: BASE_URL,
        headers: HEADERS,
        data: { query, variables }
    };

    try {
        const response = await axios.request(options);
        const data = response.data.data;

        const streaks = calculateStreaks(data.matchedUser.userCalendar.submissionCalendar);
        return { ...data, streaks };
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch data');
    }
}

function calculateStreaks(submissionCalendar) {
    const data = JSON.parse(submissionCalendar);
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

    return { currentStreak, maxStreak };
}
