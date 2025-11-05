import './App.css'
import ButtonAppBar from './components/Appbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Communucation from './pages/Communucation'
import Catalog from './pages/Catalog'
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import ProtectedRoute from './pages/ProtectedRoute';
const MY_UID = '8cd2eda5-9c17-466e-be81-7f4423662816';
function App() {

  return (
    <>
      <ButtonAppBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/communucation' element={<Communucation />} />
        <Route path='/catalog' element={<Catalog />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute requireUid={MY_UID}>
          <AdminPanel />
        </ProtectedRoute>} />
      </Routes>
    </>
  );
};

export default App
