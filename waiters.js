module.exports = (pool) => {
    let appUser = ""
    let username = ""

    const setUser = (user) => {
        appUser = user
    }

    const setName = (name) => {
        username = name
    }

    const setChosenDays = () => {
        
    }

    const getDays = async () => {
        let days = await pool.query('select day from days')
        return days.rows
    }
    const getName = () => username

    const getUser = () => appUser

    const saveToDb = async () => {
        pool.query("insert into waiters (waiter_name, days) values ($1, $2)", [])
    }

    return {
        setUser,
        getDays,
        getUser,
        setName,
        getName
    }
}