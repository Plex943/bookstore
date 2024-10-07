import { useState, useEffect } from "react"
import styles from "./AdminBooks.module.css"
import api from "../../../utils/api"
import { Link } from "react-router-dom"
import useFlashMessage from "../../../hooks/useFlashMessage"
import { useNavigate } from "react-router-dom"

function AdminBooks() {
    const [token] = useState(localStorage.getItem("token") || "")
    const [books, SetBooks] = useState([])
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()

    useEffect(() => {
        const BookData = () => {
            api.get("/books/adminBooks", {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                }
            }).then((response) => {
                SetBooks(response?.data?.books)
            })
        }
        BookData()
    }, [token])

    async function remove(id) {
        console.log("executou a função")
        let msgType = "success"
        try {
            const response = await api.delete(`/books/remove/${id}`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            })
            setFlashMessage(response.data?.message, msgType)
        } catch(err) {
            msgType = "error"
            setFlashMessage(err.response?.data?.message, msgType)
        }

        navigate("/")
    }

    return(
        <section className={styles.Userbooks}>
            <div>
                <h2>Livros que você adicionou ao catalogo</h2>
                <Link to={"/books/add"} className={styles.a}>Adicionar</Link>
            </div>
            <div>
                {books && books.length > 0 ? (
                    <ul>
                        { books.map((Book) => {
                            return (
                                <li key={Book.title}>
                                    <img src={Book.img} alt={Book.title} />
                                    <span>{Book.title}</span>
                                    <Link to={`/books/edit/${Book.id}`} className={styles.btn}>Editar</Link>
                                    <form onSubmit={(e) => {
                                        e.preventDefault()
                                        remove(Book.id)
                                    }} className={styles.remove_form}>
                                        <input type="submit" value="Excluir"/>
                                    </form>
                                </li>
                            )
                        })}
                    </ul>)
                    
                    : (
                        <p>Você ainda não adicionou nenhum Livro ao catalogo.</p>
                )}
            </div>
        </section>
    )
}

export default AdminBooks