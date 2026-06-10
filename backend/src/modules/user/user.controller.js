const { createQuery } = require("../user/user.service.js")
const { automatedEmail } = require("../../utils/automatedEmail.js")

const createQueryController = async (req, res) => {
    try {
        const { userName, Email, PhoneNumber, Message } = req.body
        const query = await createQuery({ userName, Email, PhoneNumber, Message })
        await automatedEmail({ userName, Email })
            .catch(err => console.error("Email Error:", err));
        return res.status(201).json({ success: true, message: "we have got your query successfullf" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}

module.exports = { createQueryController }