import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './services/authContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';

import About from './pages/About'; // Asegúrate de tener esta página creada
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/UserProfile';
import ProtectedRoute from './components/ProtectedRoute';

function Layout({ children }) {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="flex flex-col min-h-screen">
      {!hideHeaderFooter && <Header />}
      <main className="flex-grow">{children}</main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Asegúrate que las rutas públicas no estén dentro de un ProtectedRoute */}
            <Route path="/" element={<Home />} />

            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Rutas protegidas */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Ruta de error 404 */}
            <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
