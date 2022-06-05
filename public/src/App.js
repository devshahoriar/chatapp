import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AllUser from './Pages/AllUser';
import Chat from './Pages/Chat';
import Login from './Pages/Login';
import Register from './Pages/Register';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/all-people" element={<AllUser/>} />
        <Route path="/" element={<Chat />} />
        <Route path="/*" element={<h1>Error</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
