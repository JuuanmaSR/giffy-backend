const { port,environment } = require('./config/envConfig')
const express = require('express')
const app = express()
const cors = require('cors')
const container = require('../src/config/dic')()
/**
 * @type {import('sequelize').Sequelize} sequelize
 */
const sequelize = container.get('Sequelize')

// Routes
const userRoutes = require('../routes/user')
const favoriteRoutes = require('../routes/favorite')
const testingRoutes = require('../routes/testing')

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Hello world')
})
app.use(userRoutes)
app.use('/api', favoriteRoutes)
if (environment === 'testing') {
    app.use('/api',testingRoutes)
}


//Error catch
app.use((error, req, res, next) => {
    res.status(500).json(error)
})

async function main() {
    try {
        await sequelize.authenticate();
        app.listen(port, () => {
            console.log(`App listening on port ${port}`)
        });
    } catch (error) {
        console.error(error);

    }
}
main();
