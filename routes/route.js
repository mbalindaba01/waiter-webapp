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
        res.render('home')
    }

    const dashboard = (req, res) => {
        res.render('dashboard')
    }

    const wait = async (req, res) => {
        let week = await waiters.getDays()
        res.render('index', {
            name: waiters.getName(),
            days: week
        })
    }

    const home = (req, res) => {
        waiters.setUser(req.body.user)
        waiters.getUser() == "Manager" ? res.redirect('/dashboard') : res.redirect('/login')
    }

    const login = (req, res) => {
        res.render('login')
    }

    const name = (req, res) => {
        waiters.setName(req.body.name)
        console.log(waiters.getName())
        res.redirect('waiters')
    }

    const days = async (req, res) => {
        res.redirect('/')
    }

    const back = (req, res) => {
        res.redirect('/')
    }

    return {
        main,
        days,
        home,
        dashboard,
        wait,
        back,
        login,
        name
    }
}