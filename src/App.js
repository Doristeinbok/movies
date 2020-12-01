import { BrowserRouter, Route, Switch } from 'react-router-dom';


import './App.css';
import Home from './pages/home/index.jsx';
// import People from './pages/actors/index.jsx'
// import MoivieNav from './components/Navbar/index.jsx'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <div>
          {/* <div className="navi">
            <MoivieNav />
          </div> */}
          <Route path={'/'} exact={true}>
            <div className="homePageWrapper">
              <Home />
            </div>
          </Route >
          {/* <Route path={'/actors'}>
            <div className="actorsWrapper">
              <People />
            </div>
          </Route> */}
        </div>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
