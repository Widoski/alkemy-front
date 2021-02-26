import { useState, useEffect, useContext } from 'react';
import Layout from '../components/Layout';
import {
   Grid,
   TableContainer,
   Table,
   TableRow,
   TableCell,
   TableHead,
   TableBody,
   Paper,
   IconButton,
   Tooltip,
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
   DialogContentText,
   Button
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import axios from 'axios';
import conf from '../conf';
import AppContext from '../appContext';

const styles = {
   grid: {
      display: "grid",
      justifyContent: "center"
   },
   tableHead: {
      fontWeight: "bold",
   }
};

export default function Home({ history }) {
   const context = useContext(AppContext);

   const [posts, setPosts] = useState([]);
   const [count, setCount] = useState(0);
   const [modal, setModal] = useState({
      open: false,
      title: "",
      body: ""
   });

   const limit = 10;
   let offset = 0;

   useEffect(() => {
      axios.get(`${conf.API_URL}/posts?limit=${limit}&offset=${offset}`)
         .then(res => {
            setPosts(res.data); //rows si usas sql
            setCount(res.data.count);
         })
         .catch(err => console.log(err));
   }, []);

   const handleReadPost = id => () => {
      axios.get(`${conf.API_URL}/posts/${id}`)
         .then(res => {
            setModal({
               ...modal,
               open: true,
               title: res.data.title,
               body: res.data.body
            });
         })
         .catch(err => console.log(err));
   };

   const handleCloseModal = () => {
      setModal({
         open: false,
         title: "",
         body: ""
      })
   };

   const handleEditPost = id => () => {
      history.push(`/edit/${id}`)
   };

   const handleDeletePost = id => () => {
      axios.delete(`${conf.API_URL}/posts/${id}`)
         .then(res => {
            context.handleSnackbar("success", "Post eliminado.");
            axios.get(`${conf.API_URL}/posts`)
               .then(res => {
                  setPosts(res.data);
               })
               .catch(err => console.log(err));
         })
         .catch(err => {
            context.handleSnackbar("error", "No se pudo eliminar el post.");
         });
   };

   return (
      <Layout>
         <Grid item xs={12} style={styles.grid}>
            <TableContainer component={Paper} style={styles.tableContainer}>
               <Table size="small">
                  <TableHead>
                     <TableRow>
                        <TableCell style={styles.tableHead}>Titulo del post</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {
                        posts.map(p => (
                           <TableRow key={p.id} hover>
                              <TableCell>{p.title}</TableCell>
                              <TableCell>
                                 <IconButton onClick={handleReadPost(p.id)}>
                                    <Tooltip title="Ver post">
                                       <VisibilityIcon />
                                    </Tooltip>
                                 </IconButton>
                              </TableCell>
                              <TableCell>
                                 <IconButton onClick={handleEditPost(p.id)}>
                                    <Tooltip title="Editar post">
                                       <EditIcon />
                                    </Tooltip>
                                 </IconButton>
                              </TableCell>
                              <TableCell>
                                 <IconButton onClick={handleDeletePost(p.id)}>
                                    <Tooltip title="Borrar post">
                                       <DeleteIcon />
                                    </Tooltip>
                                 </IconButton>
                              </TableCell>
                           </TableRow>
                        ))
                     }
                  </TableBody>
               </Table>
            </TableContainer>
         </Grid>

         <Dialog
            open={modal.open}
            onClose={handleCloseModal}
            scroll="body"
         >
            <DialogTitle>{modal.title}</DialogTitle>
            <DialogContent dividers="scroll">
               <DialogContentText>
                  {modal.body}
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleCloseModal}>Close</Button>
            </DialogActions>
         </Dialog>
      </Layout>
   );
};
