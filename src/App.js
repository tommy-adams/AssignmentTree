import React from "react";
import Routes from "./routes";
import { Provider } from "react-redux";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import store from "./store";

function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </MuiPickersUtilsProvider>
  );
}

export default App;
