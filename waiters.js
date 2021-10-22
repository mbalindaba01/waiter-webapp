module.exports = (pool) => {
    let appUser = ""
    let username = ""
    let chosenDays = []
    let successMsg = ""
    let btnText = "Submit"

    const setUser = (user) => {
        appUser = user
    }

    const setName = (name) => {
        username = name.toLowerCase().trim()
    }

    const setChosenDays = (days) => {
        chosenDays = days
    }

    const getDays = async () => {
        let days = await pool.query('select * from days')
        return days.rows
    }
    const getName = () => username

    const getUser = () => appUser

    const userExists = async () => {
        let test = await pool.query("select * from waiters where waiter_name = $1", [getName()])
        return test.rows
    }

    const greetText = async () => {
        if((await userExists()).length == 0){
            return "What's up, "
        }else {
            btnText = "Update"
            return "Welcome back, "
        }
    }

    const setSuccessMessage = async () => {
        if((await userExists()).length == 0 ){
            successMsg = "Days successfully saved"
        }else {
            successMsg = "Days successfully updated"
        }
    }

    const getChosenDays = () => chosenDays

    const saveToDb = async () => {
        if((await userExists()).length == 0 ){
            await pool.query("insert into waiters (waiter_name, days) values ($1, $2)", [getName(), getChosenDays()])
        }else {
            await pool.query("delete from waiters where waiter_name = $1", [getName()])
            await pool.query("insert into waiters (waiter_name, days) values ($1, $2)", [getName(), getChosenDays()])
        }
    }

    const success = () => {
        return successMsg
    }

    const btnMessage = () => {
        return btnText
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
        userExists,
        greetText,
        success,
        btnMessage,
        setSuccessMessage
    }
}