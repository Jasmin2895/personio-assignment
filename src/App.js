import logo from './logo.svg';
import {
    Redirect,
    Route,
    Switch,
    BrowserRouter,
} from 'react-router-dom';
import Main from './modules/Main';
import ErrorPage from './modules/ErrorPage';
import './scss/app.scss';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="*" component={ErrorPage} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
