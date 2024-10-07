import { useState } from "react"
import api from "../../../utils/api"
import BookForm from "../../form/BookForm"
import useFlashMessage from "../../../hooks/useFlashMessage"
import styles from "../../form/Form.module.css"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

function AddBooks() {
    const [token] = useState(localStorage.getItem("token") || "") 
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()

    async function handleSubmit(book) {
        let msgType = "success"
        try{
            const response = await api.post("/books/add", book, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                } 
            })
            setFlashMessage(response.data?.message, msgType)
        } catch(err) {
            msgType = "error"
            setFlashMessage(err.response?.data?.message)
        }
        
        navigate("/")
    }

    return (
        <section className={styles.form_conteiner}>
            <Link to={"/books/adminBooks"}>-Voltar</Link>
            <h1>Adicionar Livro ao Catalogo</h1>
            <BookForm handleSubmit={handleSubmit} btnText="Cadastrar Livro" />
        </section>
    )
}

export default AddBooks