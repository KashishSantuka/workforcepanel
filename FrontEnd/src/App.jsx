import LoginPage from "./Components/loginPage/Login.jsx";
import "./App.css";
// import { useNavigate } from "react-router-dom";
import Login from "./Components/loginPage/Login";
import SignUp from "./Components/signUp/SignUp";
import DashBoard from "./Components/dashBoard/DashBoard";
import HomePage from "./Components/homePage/HomePage";
import CreateEmploye from "./Components/createEmploye/CreateEmploye";
import EmployeList from "./Components/employeList/EmployeList";
import PrivateRoutes from "./Components/PrivateRoutes.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
  
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/dashBoard" element={<DashBoard />} />
            <Route path="/homePage" element={<HomePage />} />
            <Route path="/createEmploye" element={<CreateEmploye />} />
            <Route path="/employeList" element={<EmployeList />} />
          </Route>
        </Routes>
      </Router>
    
  );
}

// Router.run(routes, Router.HistoryLocation, function (Handler) {
//   React.render(<Handler/>, document.body);
// });

export default App;

