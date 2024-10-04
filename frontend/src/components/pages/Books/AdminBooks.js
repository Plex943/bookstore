import { useState, useEffect } from "react"
import styles from "./AdminBooks.module.css"
import api from "../../../utils/api"
import { Link } from "react-router-dom"

function AdminBooks() {
    const [token] = useState(localStorage.getItem("token") || "")
    const [books, SetBooks] = useState([])

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
                                    <Link to={"/books/edit"} className={styles.btn}>Editar</Link>
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