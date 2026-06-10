const QueryModel = require("../user/userQuery.js")


const createQuery = async ({userName,Email,PhoneNumber,Message})=>{
    try {
        const query = await QueryModel.create({
            userName,
            Email,
            PhoneNumber,
            Message
        })
        return query        
    } catch (error) {
        throw error
    }
}

module.exports = {createQuery}