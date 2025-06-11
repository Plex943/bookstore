import {useState, useEffect} from "react"
import api from "../utils/api"
import{ Link } from "react-router-dom"
import styles from "./Home.module.css"

function Home() {
    const [inputValue ,setInputValue] = useState()
    const [search, setSearch] = useState()
    const [order, setOrder] = useState("new")
    const [books, setBooks] = useState([])
    
    useEffect(() =>{
        api.get("/books/").then((response) => {
            setBooks(response.data?.books)
        })
    }, [])

    async function Search() {
        setSearch(inputValue)
        try {
            const response = await api.get("/books", {
                params: {
                    search: inputValue,
                    order: order
                }
            })
            if (response.data.books) {
                setBooks(response.data?.books)
            }
        } catch(err) {
            console.log(err)
        }
    }

    return(
        <section className={styles.book_conteiner}>
            <h1>Criado por <a href="https://www.linkedin.com/in/arthur-marques-956a08310/">Arthur Marques</a></h1>
            
            <section className={styles.search_conteiner}>
                {search 
                ? (<h1>Resultados Para: <span className="bold" >{search}</span></h1>) 
                : (<h1>Veja Alguns Livros no Catalogo</h1>)}
                <form onSubmit={((e) => {
                    e.preventDefault()
                    Search()
                })}>
                    <input key="search" type="text" placeholder="Digite oque deseja procurar..." name="search" onChange={(e) => {
                        setInputValue(e.target.value)
                    }} />
                    <input type="submit" value="Buscar" className="btn" />
                    <select
                    className={styles.select_order}
                    name="order"
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                    >
                        <option value="new" key="new" >Mais Recentes</option>
                        <option value="old" key="old" >Mais Antigos</option>
                    </select>
                </form>
            </section>


            {books.map((book) => {
                    return(
                        <figure key={book.title}>
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
