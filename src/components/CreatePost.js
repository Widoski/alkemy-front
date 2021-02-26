import { useState, useContext } from 'react';
import Layout from '../components/Layout';
import { Grid, TextField, Button, Typography } from '@material-ui/core';
import AppContext from '../appContext';
import conf from '../conf';
import axios from 'axios';

const styles = {
    grid: {
        display: "flex",
        justifyContent: "center"
    },
    title: {
        padding: 10,
        fontWeight: "bold",
        fontSize: 20,
        background: "#03506f",
        color: "#f5f5f5",
        borderRadius: 5
    },
    form: {
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        border: "2px solid #03506f",
        borderRadius: 5,
        background: "#f5f5f5",
        padding: 20,
        margin: 10
    },
    button: {
        margin: 20
    },
    titleBox: {
        margin: 20,
    }
};

export default function EditPost() {
    const context = useContext(AppContext);

    const [post, setPost] = useState({
        title: "",
        body: "",
        userId: 1
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;

        setPost({
            ...post,
            [name]: value
        });
    };

    const onSubmitPost = (e) => {
        e.preventDefault();

        if (!post.title || post.body.length < 100) {
            context.handleSnackbar("error", "No se pudo crear el post. Caracteres insuficientes.")
        } else {
            axios.post(`${conf.API_URL}/posts`, post)
                .then(res => {
                    console.log(res.data);
                    context.handleSnackbar("success", "¡Post creado!");
                })
                .catch(err => {
                    context.handleSnackbar("error", "No se pudo crear el post.");
                });
        }
    };

    return (
        <Layout>
            <Grid container item xs={12} style={styles.grid}>
                <Grid item xs={12} sm={6}>
                    <form onSubmit={onSubmitPost} style={styles.form}>
                        <div style={styles.titleBox}>
                            <Typography style={styles.title} variant="button" >Título</Typography>
                        </div>
                        <TextField
                            name="title"
                            onChange={onChangeHandler}
                            value={post.title}
                            fullWidth
                            multiline
                            style={styles.field}
                        >
                        </TextField>
                        <div style={styles.titleBox}>
                            <Typography style={styles.title} variant="button">Cuerpo</Typography>
                        </div>
                        <TextField
                            name="body"
                            onChange={onChangeHandler}
                            value={post.body}
                            fullWidth
                            multiline
                            style={styles.field}
                        >
                        </TextField>
                        <Button
                            style={styles.button}
                            variant="contained"
                            type="submit"
                            color="primary"
                        >
                            Crear
                  </Button>
                    </form>
                </Grid>
            </Grid>
        </Layout>
    )
}
