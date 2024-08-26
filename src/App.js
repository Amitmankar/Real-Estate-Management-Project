
import './App.css';
import AboutUs from './Aboutus';
import AdminDashboard from './admindashboard';
import AgentDashboard from './agentdashboard';
import Homepage from './Homepage';
import Login from './login';
import Signup from './signup';
import PropertiesPage from './Properties';
import TransactionTable from './Transactions';
import ClientDetails from './Clientdetails';
import { BrowserRouter, Route,Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/agent" element={<AgentDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/client-details" element={<ClientDetails />} />
        <Route path="/transactions" element={<TransactionTable />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
