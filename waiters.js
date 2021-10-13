module.exports = (pool) => {
    let appUser = ""
    let username = ""
    let chosenDays = []

    const setUser = (user) => {
        appUser = user
    }

    const setName = (name) => {
        username = name
    }

    const setChosenDays = (days) => {
        chosenDays = days
    }

    const getDays = async () => {
        let days = await pool.query('select day from days')
        return days.rows
    }
    const getName = () => username

    const getUser = () => appUser

    const getChosenDays = () => chosenDays

    const saveToDb = async () => {
        await pool.query("insert into waiters (waiter_name, days) values ($1, $2)", [getName(), getChosenDays()])
    }

    return {
        setUser,
        getDays,
        getUser,
        setName,
        getName,
        setChosenDays,
        getChosenDays,
        saveToDb,
    }
}