import api from "../utils/api";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFlashMessage from "./useFlashMessage";

export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false)
    const [admin, setAdmin] = useState()
    const {setFlashMessage} = useFlashMessage()
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")
        const isAdmin = localStorage.getItem("admin")

        if (token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
            if (isAdmin) {
                setAdmin(JSON.parse(isAdmin))
            }
        }
    }, [])

    function authUser(token, isAdmin) {
        setAuthenticated(true)
        setAdmin(isAdmin)

        localStorage.setItem("token", JSON.stringify(token))
        localStorage.setItem("admin", JSON.stringify(isAdmin))

        navigate("/")
    }


    async function register(user) {
        let msgTxt = "Cadastro reilzado com sucesso"
        let msgType = "success"
        try {
            const response = await api.post("/user/register", user)
            const data = response.data

            authUser(data.token, data.admin)
        } catch (err) {
            msgTxt = err.response?.data?.message
            console.log(err)
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
            
            authUser(data.token, data.admin)
        } catch (err) {
            msgTxt = err.response.data.message
            console.log(err.response.data.message)
            msgType = "error"
        }
        setFlashMessage(msgTxt, msgType)

    }

    async function logout() {
        try {
            const msgTxt = "Logout realizado com sucesso"
            const msgType = "success"
            
            localStorage.removeItem("token")
            localStorage.removeItem("admin")
            setAuthenticated(false)
            api.defaults.headers.Authorization = undefined
            setTimeout(() => {
                navigate("/")
            }, 100)
            
            setFlashMessage(msgTxt, msgType)

        } catch(err) {
            console.log(err)
        }
    }
    return({ authenticated, admin, register, login, logout})
}
