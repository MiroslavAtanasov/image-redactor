const router = require('../routes/user')

module.exports = (app) => {
    app.use('/api/user', router)
    app.use('*', (req, res, next) => res.send('<h1> Error 404 Not Found </h1>'))
}