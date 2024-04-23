import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard/main';
import ProtectedRoute from "./components/ProtectedRoute";
import Transactions from './pages/transactions';



const App = () =>{
  return (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element= {<Register />}/>
      <Route path="/" element= {<Home/>}/>
      <Route path="/Dashboard/main" element = {<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
      <Route path="/transactions" element = {<ProtectedRoute><Transactions/></ProtectedRoute>}/>
    </Routes>
  </Router>
  );
};

export default App;
