import { Link } from "react-router-dom"
import styles from "./NavBar.module.css"

function NavBar() {
    return (
        <nav className={styles.navbar}>
            <h2>BookStore</h2>
            <ul>
                <li>
                    <Link to={"/"}>Books</Link>
                </li>
                <li>
                    <Link to={"/user/login"}>Entrar</Link>
                </li>
                <li>
                    <Link to={"/user/register"}>Registrar</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar