import styles from "./Conteiner.module.css"

function Conteiner({children}) {
    return(
        <main className={styles.conteiner}>
            {children}
        </main>
    )
}

export default Conteiner