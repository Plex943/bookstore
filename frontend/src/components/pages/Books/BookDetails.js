import { useState, useEffect } from "react"
import api from "../../../utils/api"
import { useParams, useNavigate } from "react-router-dom"
import styles from "./BookDetails.module.css"
import useFlashMessage from "../../../hooks/useFlashMessage"

function BookDetails() {
    const [book, setBook] = useState({})
    const [bookOnCart, setBookOnCart] = useState()
    const [token] = useState(localStorage.getItem("token") || "")
    const [user, setUser] = useState()
    const {id} = useParams()
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()

    useEffect(() => {
        api.get(`/books/${id}`).then((response) => {
            setBook(response.data?.book)
        })
    }, [id])

    
    useEffect(() => {
        if (token && token !== "") {
            api.get("/user/", {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            }).then((response) => {
                setUser(response.data?.user)
            })
            
        } else {
            setUser(undefined)
        }        
    }, [token])
    
    useEffect(() => {
        if (token && token !== "" && book && user && !user.admin ) {
            api.get("/cart", {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            }).then((response) => {
                const BookOnCart = response.data?.Books.find((CartItem) => CartItem.id === book.id) 
                if (BookOnCart) {
                    setBookOnCart(true)
                } else {
                    setBookOnCart(false)
                }
            })
        }
    }, [token, book, user])

    async function addToCart(id) {
        let msgType = "success"
        try{
            const response = await api.post(`/cart/${id}`, {},  {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            })
            setFlashMessage(response.data?.message, msgType)
        } catch(err) {
            msgType = "error"
            setFlashMessage(err.response?.data?.message, msgType)
            console.log(err)
        }

        navigate("/")
    }

    async function remoCartItem(id) {
        let msgType = "success"
        try {
            const response = await api.delete(`/cart/remove/${id}`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            })

           setFlashMessage(response.data?.message, msgType)
        } catch(err) {
            msgType = "error"
            setFlashMessage(err.response?.data?.message)
            console.log(err)
        }

        navigate("/cart")
    }

    return (
        <section className={styles.add_form_conteiner}>
            <div className={styles.img_preview}>
                <label>
                    Imagem:
                </label>
                <img
                src={book.img}
                alt={book.title}
                /><form onSubmit={(e) => {
                    e.preventDefault()
                    remoCartItem(id)
                }}>
                {bookOnCart && 
                    <input
                    type="submit"
                    value="Remover do Carrinho"
                    className="remove_btn"
                    />}
                </form>
            </div>
            {book && <form onSubmit={(e) => {
                e.preventDefault()
                addToCart(id)
            }} >
                <h1>Detalhes do Livro: {book.title}</h1>
                <div className={styles.details_control}>
                    <span>
                        Livro:
                    </span>
                    <label>{book.title}</label>
                </div>
                <div className={styles.details_control}>
                    <span>
                        Autor:
                    </span>
                    <label>{book.autor}</label>
                </div>
                <div className={styles.details_control}>
                    <span>
                        Ano:
                    </span>
                    <label>{book.year}</label>
                </div>
                <div className={styles.details_control}>
                    <span>
                        Descrição:
                    </span>
                    <textarea value={book.descripition}></textarea>
                </div>
                {user && !user.admin && <input type="submit" value="Add ao Carrinho" className="btn" />}
                </form>}
        </section>
    )
}

export default BookDetails

