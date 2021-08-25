
import './App.css';
import Navigation from "./components/Navigation";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import User from "./routes/User";
import Postpag from "./routes/Postpag";
import Jobpag from "./routes/Jobpag";
import Marketpag from "./routes/Marketpag";
import Policy from "./routes/Policy";
import Privacy from "./routes/Privacy";
import { useSelector } from 'react-redux';
import { RootState } from './store/types';

const userSelector = ({user} : RootState) => user;

const Admin = () => {
  const user = useSelector(userSelector)
  return !(user?._id) ? <Login /> : (
    <>
      {(user && user.level > 5) ? <>
        <Navigation />
        <Switch>       
          <Route path="/admin/" exact={true} component={Home} />  
          <Route path="/admin/user" exact={true} component={User} />     
          <Route path="/admin/postpag" exact={true} component={Postpag} /> 
          <Route path="/admin/jobpag" exact={true} component={Jobpag} />   
          <Route path="/admin/marketpag" exact={true} component={Marketpag} />      
          <Redirect to="/admin/" />
        </Switch>
    </> : null}
    </>
  );
}

function App(){
  return (
    <>
    <BrowserRouter>
    <Switch>
      <Route path="/policy" exact={true} component={Policy} />
      <Route path="/privacy" exact={true} component={Privacy} />
      <Route path="/admin" component={Admin} />
    </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
