
import ReactDOM from "react-dom/client";
import App from "./App";
// import registerServiceWorker from "./registerServiceWorker";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as History from 'history';
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from "redux";
// import { reducer as formReducer } from 'redux-form';
import thunk from "redux-thunk";
import "./App.scss";
import rootReducerObj from './modules';
// import "./utility/axios";
const history = History.createBrowserHistory()
// history.push("/about-us")
// import { createTheme, ThemeProvider } from "@material-ui/core/styles";

//
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#ffffff", // This is an orange looking color
//       "font-family": "Work Sans, sans-serif"
//     },
//     secondary: {
//       main: "#ffcc80" //Another orange-ish color
//     }
//   },
//   primary: 'purple',
//   secondary: 'green',
//   error: 'red',
//   // fontFamily: font // as an aside, highly recommend importing roboto font for Material UI projects! Looks really nice
// });




const rootReducer = combineReducers({
  ...rootReducerObj,
  // auth: authReducer,
  // dashboard: dashboardReducer,
  // users: userReducer,
  // doctorsList: doctors_list,
  // payment: paymentReducer,

  // form: formReducer

});


declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers:any = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as typeof compose || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (


  <Provider store={store}>
    {/* <AuthProvider> */}

      <App history={history}  />
    {/* </AuthProvider> */}
  </Provider>

);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(app)
// registerServiceWorker();
