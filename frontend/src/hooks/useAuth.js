import api from "../utils/api";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFlashMessage from "./useFlashMessage";

export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false)
    const {setFlashMessage} = useFlashMessage()
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")

        if (token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
        }
    }, [])

    function authUser(token) {
        setAuthenticated(true)
        
        localStorage.setItem("token", JSON.stringify(token))

        navigate("/")
    }


    async function register(user) {
        let msgTxt = "Cadastro reilzado com sucesso"
        let msgType = "success"
        try {
            const response = await api.post("/user/register", user)
            const data = response.data
        
            authUser(data.token)
        } catch (err) {
            msgTxt = err.response.message
            msgType = "error"
        }
        setFlashMessage(msgTxt, msgType)
    }

    async function login({email, password}) {
        let msgTxt = "Login realizado com sucesso"
        let msgType = "success"
        const userData = {email, password}

        try {
            const response = await api.post("/user/login", userData)
            const data = response.data

            authUser(data.token)
        } catch (err) {
            msgTxt = err.response.message
            msgType = "error"
        }
        setFlashMessage(msgTxt, msgType)

    }

    async function logout() {
        const msgTxt = "Logout realizado com sucesso"
        const msgType = "success"

        localStorage.removeItem("token")
        setAuthenticated(false)
        api.defaults.headers.Authorization = undefined
        navigate("/")

        setFlashMessage(msgTxt, msgType)
    }
    return({ authenticated, register, login, logout})
}
