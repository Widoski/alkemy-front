import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Snackbar, ThemeProvider } from '@material-ui/core';
import AppContext from './appContext';
import MuiAlert from '@material-ui/lab/Alert';
import theme from './theme';
import Home from './components/Home';
import Edit from './components/Edit';
import EditPost from './components/EditPost';
import CreatePost from './components/CreatePost';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App() {
  const [snackbar, setSnackbar] = useState({
    open: false,
    status: "",
    message: ""
  });

  const handleSnackbar = (status, message) => {
    setSnackbar({
      open: true,
      status,
      message
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      open: false,
      status: "",
      message: ""
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider
        value={{
          handleSnackbar
        }}
      >
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/posts/create" component={CreatePost} />
            <Route exact path="/posts/edit" component={Edit} />
            <Route exact path="/posts/edit/:id" component={EditPost} />
          </Switch>
        </Router>
        {
          snackbar.status === "success" ? (
            <Snackbar
              open={snackbar.open}
              onClose={handleCloseSnackbar}
              autoHideDuration={6000}
            >
              <Alert severity="success">{snackbar.message}</Alert>
            </Snackbar>
          ) : (
              snackbar.status === "error" ? (
                <Snackbar
                  open={snackbar.open}
                  onClose={handleCloseSnackbar}
                  autoHideDuration={6000}
                >
                  <Alert severity="error">{snackbar.message}</Alert>
                </Snackbar>
              ) : null
            )
        }
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;
