import { useState, useEffect } from 'react';
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
   Link
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import conf from '../conf';

const styles = {
   grid: {
      display: "grid",
      justifyContent: "center"
   },
   tableHead: {
      fontWeight: "bold",
   }
};

export default function Edit({ history }) {
   const [posts, setPosts] = useState([]);
   const [count, setCount] = useState(0);

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

   const handleEditPost = id => () => {
      history.push(`/posts/edit/${id}`);
   };

   return (
      <Layout>
         <Grid item xs={12} style={styles.grid}>
            <TableContainer component={Paper} style={styles.tableContainer}>
               <Table size="small">
                  <TableHead>
                     <TableRow>
                        <TableCell style={styles.tableHead}>Selecciona post para editar</TableCell>
                        <TableCell>
                           <EditIcon color="secondary" />
                        </TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {
                        posts.map(p => (
                           <TableRow key={p.id} hover>
                              <TableCell><Link component="button" onClick={handleEditPost(p.id)}>{p.title}</Link></TableCell>
                              <TableCell></TableCell>
                           </TableRow>
                        ))
                     }
                  </TableBody>
               </Table>
            </TableContainer>
         </Grid>
      </Layout>
   )
}
