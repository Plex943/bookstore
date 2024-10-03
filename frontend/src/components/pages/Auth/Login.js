import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {Context} from "../../../context/UserContext";
import Input from "../../form/Input";
import styles from "../../form/Form.module.css"

function Login() {
    const [user, setUser] = useState({})
    const {login} = useContext(Context)

    function handleonChange(e) {
        setUser({...user, [e.target.name]: e.target.value})
    }

    function onSubmit(e) {
        e.preventDefault()
        login(user)
    }

    return <section className={styles.form_conteiner}>
        <h1>
            Logar:
        </h1>
        <form onSubmit={onSubmit}>
            <Input
            text="Email:"
            type="email"
            name="email"
            placeholder="digite o email"
            handleonChange={handleonChange}
            />
            <Input
            text="Senha:"
            type="password"
            name="password"
            placeholder="digite sua senha"
            handleonChange={handleonChange}
            />
            <input value="Entrar" type="submit"/>
            <p>Ainda não tem uma conta? <Link to={"/user/register"}>Clique aqui</Link></p>
        </form>
    </section>
}

export default Login