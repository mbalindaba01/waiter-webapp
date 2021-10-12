module.exports = (pool) => {
    let user = ""
    const setUser = (waiter) => {
        user = waiter
    }

    const getDays = async () => {
        let days = await pool.query('select day from days')
        return days.rows
    }

    const getUser = () => user

    return {
        setUser,
        getDays,
        getUser
    }
}