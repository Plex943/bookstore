import { useState, useEffect } from "react"
import api from "../../../utils/api"
import { Link } from "react-router-dom"
import styles from "./Cart.module.css"

function Cart() {
    const [token] = useState(localStorage.getItem("token")|| "")
    const [books, setBooks] = useState([])

    useEffect(() => {
        api.get("/cart", {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setBooks(response.data?.Books)
        })
    }, [token])

    return (
        <section className={styles.Userbooks}>
            <div className={styles.title_conteiner}>
                <h2>Livros No Carrinho</h2>
            </div>
            <ul>
                {books.map((book) => {
                    return (
                        <li>
                            <img src={book.img} alt={book.title} />
                            <span  >{book.title}</span>
                            <Link to={`/books/details/${book.id}`} className="btn">Detalhes</Link>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

export default Cart