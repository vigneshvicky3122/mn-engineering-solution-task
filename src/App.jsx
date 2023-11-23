import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import Login from "./Components/Login";
import { Provider } from "react-redux";
import store from "./Redux/Store";

function App() {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="*" element={<Navigate to="/home" />} />
            <Route path="home" element={<Home />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
