import Input from "../../form/Input"
import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import styles from "../../form/Form.module.css"
import { Context } from "../../../context/UserContext"

function Register() {
    const [user, setUser] = useState({})
    const {register} = useContext(Context)
    function handleonChange(e) {
        setUser({...user, [e.target.name]: e.target.value})
    }

    function onSubmit(e) {
        e.preventDefault()
        register(user)
    }

    return(
        <section className={styles.form_conteiner}>
            <h1>
                Resgistre sua conta
            </h1>
            <form onSubmit={onSubmit}>
                <Input
                text="Nome:"
                type="text"
                name="name"
                placeholder="Digite o nome da conta"
                handleonChange={handleonChange}
                />
                <Input
                text="Email:"
                type="email"
                name="email"
                placeholder="Digite o email da conta"
                handleonChange={handleonChange}
                />
                <Input
                text="Senha:"
                type="password"
                name="password"
                placeholder="Digite a senha da conta"
                handleonChange={handleonChange}
                />
                <Input
                text="Confirme a Senha:"
                type="password"
                name="confirmPassword"
                placeholder="Confirme a senha da conta"
                handleonChange={handleonChange}
                />

                <input value="Registrar" type="submit" />
            </form>
            <p>Játem uma conta? <Link to={"/user/login"}>Clique aqui</Link></p>
        </section>
    )
}

export default Register