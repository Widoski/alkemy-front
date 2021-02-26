import { AppBar, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = {
    link: {
        textDecoration: "none",
        color: "#f5f5f5",
        margin: 20
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-around"
    },
    appBar: {
        marginBottom: 15
    }
};

export default function Appbar({ children }) {
    return (
        <>
            <AppBar position="static" style={styles.appBar}>
                <Toolbar style={styles.toolbar}>
                    <Link to="/" style={styles.link}>
                        INICIO
                    </Link>
                    <Link to="/posts/create" style={styles.link}>
                        NUEVO POST
                    </Link>
                    <Link to="/posts/edit" style={styles.link}>
                        EDITAR POST
                    </Link>
                </Toolbar>
            </AppBar>
            {children}
        </>
    );
}