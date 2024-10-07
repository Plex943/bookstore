import { useState, useEffect } from "react"
import api from "../../../utils/api"
import { useParams, useNavigate } from "react-router-dom"
import BookForm from "../../form/BookForm"
import styles from "./EditBook.module.css"
import Formstyles from "../../form/Form.module.css"
import useFlashMessage from "../../../hooks/useFlashMessage"

function EditBook() {
    const [book, setBook] = useState({}) 
    const [token] = useState(localStorage.getItem("token") || "")
    const {id} = useParams()
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()

    useEffect(() => {
            api.get(`/books/${id}`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            }).then((response) => {
                setBook(response?.data?.book)
            })
        

    }, [token, id])

    async function handleSubmit(book) {
        let MsgType = "success"
        try {
            const response = await api.patch(`/books/edit/${book.id}`, book, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            })
            setFlashMessage(response?.data?.message, MsgType)
        } catch (err) {
            MsgType = "error"
            setFlashMessage(err.response?.data?.message)
        }

        navigate("/")
    }

    async function handleImageChange(URL) {
        setBook((prevBook) => ({
            ...prevBook,
            img: URL
        }))
    }


    return(
        <section className={styles.edit_form_conteiner}>
            <div className={styles.img_preview}>
                <label>Imagem:</label>
                <img src={book.img} alt={book.title}/>
            </div>
            <div className={Formstyles.form_conteiner}>
                <h1>Editar <span className="bold">{book.title}</span></h1>
                {book.title &&
                <BookForm btnText="Editar" BookData={book} handleSubmit={handleSubmit} handleImageChange={handleImageChange}/>}
            </div>
        </section>
    )
}

export default EditBook