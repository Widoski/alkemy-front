import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';

const styles = {
    link: {
        textDecoration: "none",
        color: "#f5f5f5",
        margin: 20
    },
    toolbar: {
        display: "flex",
    }
};

export default function Appbar({ children }) {

    return (
        <>
            <AppBar position="static">
                <Toolbar style={styles.toolbar}>
                    <Link to="/" style={styles.link}>
                        INICIO
                    </Link>
                    <Link to="/edit" style={styles.link}>
                        EDITAR
                    </Link>
                </Toolbar>
            </AppBar>
            {children}
        </>
    );
}