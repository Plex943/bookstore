import { useState } from "react"
import Input from "./Input"

function BookForm({handleSubmit, BookData, btnText, handleImageChange}) {
    const [book, setBook]= useState(BookData || "")

    function handleOnChange(e) {
        setBook({...book, [e.target.name]: e.target.value})
        
        if (e.target.name === "img") {
            if (handleImageChange) {
                handleImageChange(e.target.value)
            }
        }
    }

    function submit(e) {
        e.preventDefault()
        handleSubmit(book)
    }

    return (
        <form onSubmit={submit}>
            <Input
            text="Titulo"
            type="text"
            name="title"
            placeholder="digite o titulo do livro..."
            value={book.title || ""}
            handleonChange={handleOnChange}
            />
            <Input
            text="Autor"
            type="text"
            name="autor"
            placeholder="digite o autor do Livro..."
            value={book.autor || ""}
            handleonChange={handleOnChange}
            />
            <Input
            text="Ano"
            type="text"
            name="year"
            placeholder="digite o ano em que o Livro foi lançado...."
            value={book.year || ""}
            handleonChange={handleOnChange}
            />
            <Input
            text="Imagem"
            type="text"
            name="img"
            placeholder="digite a URL da imagem..."
            value={book.img || ""}
            handleonChange={handleOnChange}
            />
            <Input
            text="Descrição"
            type="text"
            name="descripition"
            placeholder="digite a descrição do Livro"
            value={book.descripition || ""}
            handleonChange={handleOnChange}
            />

            <input value={btnText} type="submit"/>
        </form>
    )
}

export default BookForm