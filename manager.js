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

    return {
        setDay,
        getDay,
        getWaiters
    }
}