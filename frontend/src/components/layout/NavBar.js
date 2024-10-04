import { useContext } from "react"
import { Link } from "react-router-dom"
import styles from "./NavBar.module.css"
import {Context} from "../../context/UserContext"

function NavBar() {
    const {authenticated, admin, logout} = useContext(Context)

    return (
        <nav className={styles.navbar}>
            <h2>BookStore</h2>
            <ul>
                <li>
                    <Link to={"/"}>Books</Link>
                </li>
                {authenticated ? (
                    <>
                        {admin ? (
                            <li>
                                <Link to={"/books/adminBooks"}>Add Books</Link>
                            </li>
                        ) : (
                            <li>
                                <Link to={"/cart"}>Carrinho</Link>
                            </li>
                        )}
                        <li>
                            <Link onClick={logout}>Sair</Link>
                        </li>
                    </>
                ): (
                    <>
                        <li>
                            <Link to={"/user/login"}>Entrar</Link>
                        </li>
                        <li>
                            <Link to={"/user/register"}>Registrar</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default NavBar