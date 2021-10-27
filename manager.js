module.exports = (pool) => {
    let chosenDay = ""

    const setDay = (day) => {
        chosenDay = day
    }

    const getDay = () => {
        return chosenDay
    }

    const getWaiters = async () => {
        let waiters = await pool.query("SELECT * FROM waiters WHERE days LIKE '%' || $1 || '%'", [getDay()])
        return waiters.rows
    }

    const getDayColor = async () => {
        let waiters = await pool.query("SELECT * FROM waiters WHERE days LIKE '%' || $1 || '%'", [getDay()])
        return waiters.rows.length
    }

    return {
        setDay,
        getDay,
        getWaiters,
        getDayColor
    }
}