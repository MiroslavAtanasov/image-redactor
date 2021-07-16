const models = require('../models/user')
const jwt = require('../utils/jwt')

module.exports = {
    post: {
        register: async (req, res) => {
            const { email, password, rePassword } = req.body
            try {
                const userError = await models.findOne({ email })

                if (userError) {
                    return res.status(401).send({ error: `User e-mail ${email} already exists` })
                }

                const user = await models.create({ email, password })
                const token = jwt.createToken({ id: user._id })
                res.header('Authorization', token).send(user)
            } catch (err) {
                return res.status(500).send(err)
            }
        },
        login: async (req, res) => {
            const { email, password } = req.body
            try {
                const user = await models.findOne({ email })
                const match = await user.matchPassword(password)
                if (!match) {
                    res.status(401).send({ error: 'Invalid user e-mail or password!' })
                    return
                }
                const token = jwt.createToken({ id: user._id })
                res.header('Authorization', token).send(user)
            } catch (err) {
                res.send({ error: 'Invalid user e-mail or password!' })
            }
        },
        verify: async (req, res) => {
            try {
                const token = req.headers.authorization || ''
                const data = jwt.verifyToken(token)
                const user = await models.findById(data.id)
                res.send({ status: true, user })
            } catch (error) {
                res.send({ status: false })
            }
        },
    },
}