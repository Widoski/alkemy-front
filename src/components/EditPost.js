import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import conf from '../conf';
import axios from 'axios';
import { Grid, TextField, Button, Typography } from '@material-ui/core';
import AppContext from '../appContext';

const styles = {
   grid: {
      display: "flex",
      justifyContent: "center"
   },
   title: {
      marginTop: 5,
      marginBottom: 5,
      fontWeight: "bold"
   },
   form: {
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      border: "2px solid black",
      borderRadius: 5
   },
   button: {
      margin: 10
   },
   field: {
      marginTop: 5,
      marginBottom: 5,
      background: "#f5f5f5"
   }
};

export default function EditPost() {
   const context = useContext(AppContext);

   const { id } = useParams();

   const [post, setPost] = useState({
      title: "",
      body: "",
      userId: ""
   });

   useEffect(() => {
      axios.get(`${conf.API_URL}/posts/${id}`)
         .then(res => {
            setPost(res.data);
         })
         .catch(err => console.log(err));
   }, []);

   const onChangeHandler = (e) => {
      const { name, value } = e.target;

      setPost({
         ...post,
         [name]: value
      });
   };

   const onSubmitPost = (e) => {
      e.preventDefault();

      axios.put(`${conf.API_URL}/posts/${id}`, post)
         .then(res => {
            console.log(res.data);
            context.handleSnackbar("success", "¡Post editado!");
         })
         .catch(err => {
            context.handleSnackbar("error", "No se pudo editar el post.");
         });
   };

   return (
      <Layout>
         <Grid container item xs={12} style={styles.grid}>
            <Grid item xs={12} sm={6}>
               <form onSubmit={onSubmitPost} style={styles.form}>
                  <Typography variant="button" style={styles.title}>Title</Typography>
                  <TextField
                     name="title"
                     onChange={onChangeHandler}
                     value={post.title}
                     fullWidth
                     style={styles.field}
                  >
                     {post.title}
                  </TextField>
                  <Typography variant="button" style={styles.title}>Body</Typography>
                  <TextField
                     name="body"
                     onChange={onChangeHandler}
                     value={post.body}
                     fullWidth
                     multiline
                     style={styles.field}
                  >
                     {post.body}
                  </TextField>
                  <Button
                     style={styles.button}
                     variant="contained"
                     type="submit"
                  >
                     Confirmar
                  </Button>
               </form>
            </Grid>
         </Grid>
      </Layout>
   )
}
