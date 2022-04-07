import { Route, Switch } from "react-router-dom";
import Navbar from "../components/Navbar";
import UserCreate from "../components/UserCreate";
import UserUpdate from "../components/UserUpdate";
import MainPage from "../pages/MainPage";
import NotFoundPage from "../pages/NotFoundPage";

function Routes() {
  return (
    <div>
      <Navbar />
      <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/create" component={UserCreate} />
          <Route exact path='/update/:id' component={UserUpdate} />
          <Route exact={false} path="*" component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default Routes;
