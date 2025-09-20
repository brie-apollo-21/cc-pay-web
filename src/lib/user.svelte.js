
import axios from "axios";
import thousandsFormat from "./thousandsFormat";

const API_URI = "https://ccpay-40-2fd08e733484.herokuapp.com"
// const API_URI = "http://localhost:80"

export const userState = $state({
    id_token: undefined,
	name: undefined,
    email: undefined,
    picture: undefined,
	balance: undefined,
    history: []
});

export const clearUserState = () => {
    userState.id_token = undefined;
    userState.name = undefined;
    userState.email = undefined;
    userState.picture = undefined;
    userState.balance = undefined;
    localStorage.removeItem("user")
    console.log("user state cleared")
}

const request = async (endpoint, body) => {

    console.log(userState)

    let config = {
        method: 'POST',
        maxBodyLength: Infinity,
        url: API_URI+endpoint,
        headers: { 
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(body)
    };

    try {
        const result = await axios.request(config)
        return result.data
    }
    catch (err) {
        console.log(err)
        if(err.status == 500) {
            clearUserState()
            window.location.href = window.location.origin+"/login"
            alert("Session expired. Please login again.")
            return "Reset User Session"
        } else if(err.status == 400 && endpoint == "/pay") {
            alert(err.response.data)
        } else {
            console.error(err)
            alert(err)
        }
    }
}

export const refreshBalance = async () => {
    await request('/balance', {
        "email": userState.email
    }).then((balance) => {
        console.log(balance)
        userState.balance = "Rp"+thousandsFormat(balance)
    }).catch((err) => {
        userState.balance = "Failed to refresh balance."
    })
}

export const getBalance = async (name) => {
    return request('/balance', {
        "name": name
    }).then((balance) => {
        console.log(balance)
        return balance
    }).catch((err) => {
        return "Failed to refresh balance."
    })
}

export const startSession = async (id_token) => {
    await request('/start_session', {
        "id_token": id_token
    }).then((result) => {
        console.log(result)
        return result;
    }).catch((err) => {
        console.error(err)
    })
}

export const endSession = async () => {
    await request('/end_session', {
        "id_token": userState.id_token
    }).then((result) => {
        console.log(result)
        return result;
    }).catch((err) => {
        console.error(err)
    })
}

export const completePayment = async (merchant, amount) => {
    // userState.paymentCompleted = false
    const regex = /([^\d])+/g
    const amount_clean = Number(amount.replaceAll(regex, ""))
    await request('/pay', {
        "id_token": userState.id_token,
        "merchant_name": merchant,
        "amount": amount_clean
    }).then((result) => {
        console.log(result)
        return result;
        // userState.paymentCompleted = true
    }).catch((err) => {
        console.error(err)
    })
}

export const refreshHistory = async (merchant, amount) => {
    // userState.paymentCompleted = false
    await request('/history', {
        "id_token": userState.id_token
    }).then((result) => {
        console.log(result)
        userState.history = result
        userState.history = userState.history
        // userState.paymentCompleted = true
    }).catch((err) => {
        console.error(err)
    })
}

export const getMerchantList = async () => {
    const result = await axios.get(API_URI+"/merchants")
    return result.data
}