const flash = require('express-flash')
const session = require('express-session')
const express = require('express')
const exphbs = require('express-handlebars')
const Routes = require('./routes/route')

const app = express()
const routes = Routes()

//initialise session middleware - flash-express depends on it
app.use(session({
  secret : "<add a secret string here>",
  resave: false,
  saveUninitialized: true
}))

// initialise the flash middleware
app.use(flash())


//set up middleware
app.engine('handlebars', exphbs({layoutsDir: "views/layouts/"}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())



app.get('/', routes.main)

app.get('/dashboard', routes.dashboard)

app.get('/waiters', routes.wait)

app.get('/login', routes.login)

app.post("/waiter", routes.days)

app.post('/home', routes.home)

app.post('/name', routes.name)

app.post('/back', routes.back)

// //empties database and resets counter
// app.post("/counter", routes.counter)

// app.post("/greeted", routes.greeted)

// app.get("/greeted/:name", routes.greetList)

const PORT = process.env.PORT || 3012

app.listen(PORT, () => {
    console.log("App is running at port " + PORT)
})