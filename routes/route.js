const { Pool } = require('pg')
const Waiters = require('../waiters')


let useSSL = false
let local = process.env.local || false
if(process.env.DATABASE_URL && !local){
    useSSL = true
}

//set up pool connection to database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://postgres:Minenhle!28@localhost:5432/waiter_app",
//   ssl: {
//     rejectUnauthorized: false
//   }
})

const waiters = Waiters(pool)




module.exports = () => {
    const main = async (req, res) => {
        let week = await waiters.getDays()
        res.render('index', {
            days: week
        })
    }

    const days = async (req, res) => {
        console.log(req.body.days)
        res.redirect('/')
    }

    return {
        main,
        days
    }
}