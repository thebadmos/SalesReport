import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from './components/Footer';
import Header from './components/Header';
import Sales from './components/Sales';
import Question from './components/Question';

function App() {
  return (
    <div>
        <Router>
      <Header />
      <Switch>
      <Route exact path="/" component={Question} />
        <Route exact path="/table" component={Sales} />
       
           </Switch>
      <Footer />
    </Router>
      
    </div>
  );
}

export default App;
