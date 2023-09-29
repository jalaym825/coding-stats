const { LeetCode } = require("leetcode-query");
const leetcode = new LeetCode();

module.exports = async (req, res) => {
    try {
        const user = await leetcode.user(req.params.id);
        return user;
    } catch (e) {
        console.log(e)
    }
}