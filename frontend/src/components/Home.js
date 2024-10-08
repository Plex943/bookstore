import {useState, useEffect} from "react"
import api from "../utils/api"
import{ Link } from "react-router-dom"
import styles from "./Home.module.css"

function Home() {
    const [books, setBooks] = useState([])
    
    useEffect(() =>{
        api.get("/books/").then((response) => {
            setBooks(response.data?.books)
        })
    }, [])

    return(
        <section className={styles.book_conteiner}>
            <h1>Livros No Catalogo</h1>
            {books.map((book) => {
                    return(
                        <figure>
                            <span>
                                <img src={book.img} alt={book.title} />
                                <label>
                                    <blockquote>
                                        {book.title}
                                    </blockquote>
                                    <figcaption>
                                        por: {book.autor}
                                    </figcaption>
                                </label>
                            </span>
                            <Link to={`/books/details/${book.id}`} className="btn" >Detalhes</Link>
                        </figure>
                    )
                })}
        </section>
    )
}

export default Home