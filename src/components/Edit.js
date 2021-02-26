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
import Paginate from '../paginate';

const styles = {
   grid: {
      display: "grid",
      justifyContent: "center"
   },
   tableHead: {
      fontWeight: "bold",
   },
   tableContainer: {
      margin: 10
   }
};

export default function Edit({ history }) {
   const [posts, setPosts] = useState([]);
   const [count, setCount] = useState(0);

   const limit = 20;
   let offset = 0;

   useEffect(() => {
      fetchPosts(1);
   }, []);

   const fetchPosts = (page) => {
      if (page === 1) {
         offset = 0;
      } else {
         offset = limit * (page - 1);
      }
      axios.get(`${conf.API_URL}/posts?_start=${offset}&_limit=${limit}`)
         .then(res => {
            setPosts(res.data);
            setCount(res.headers["x-total-count"]);
         })
         .catch(err => console.log(err));
   }

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
               <Paginate count={count} limit={limit} fetchRegisters={fetchPosts} />
            </TableContainer>
         </Grid>
      </Layout>
   )
}
