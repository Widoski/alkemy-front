import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Edit from './components/Edit';
import EditPost from './components/EditPost';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/edit" component={Edit} />
          <Route exact path="/edit/:id/" component={EditPost} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
