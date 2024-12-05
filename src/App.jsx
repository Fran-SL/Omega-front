import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './services/authContext';

// Componentes comunes
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Páginas principales
import Home from './pages/Comun/Home';
import About from './pages/Comun/About';
import FAQ from './pages/Comun/Faq';
import NotFoundPage from './pages/Comun/404';

// Páginas de autenticación
import Login from './pages/Usuario/Login';
import Register from './pages/Usuario/Register';
import Solicitud from './pages/Usuario/Solicitud';
import Restablecer from './pages/Usuario/Restablecer';
import Profile from './pages/Usuario/UserProfile';

// Páginas del blog
import Blog from './pages/Comun/Blog';
import ArticleDetail from './pages/Comun/ArticleDetail';

// Administración de blog
import AdminDashboard  from './pages/Admin/AdminDashboard';
import ArticleForm from './pages/Admin/ArticleForm';
import ManageArticles from './pages/Admin/ManageArticles';

// Admin usuarios
import ManageUsers from './pages/Admin/ManageUsers';

// Layout general
function Layout({ children }) {
  const location = useLocation();

  const hideHeaderFooter = [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
  ].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!hideHeaderFooter && <Header />}
      <main className={`flex-grow ${!hideHeaderFooter ? 'pt-20' : ''}`}>
        {children}
      </main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

// Configuración principal de rutas
function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<ArticleDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<Solicitud />} />
            <Route path="/reset-password" element={<Restablecer />} />

            {/* Rutas para usuarios autenticados */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute allowedRoles={[1, 2]}>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Rutas para administradores */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={[2]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute allowedRoles={[2]}>
                  <ManageUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/blog"
              element={
                <ProtectedRoute allowedRoles={[2]}>
                  <ManageArticles />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/blog/new"
              element={
                <ProtectedRoute allowedRoles={[2]}>
                  <ArticleForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/blog/edit/:id"
              element={
                <ProtectedRoute allowedRoles={[2]}>
                  <ArticleForm />
                </ProtectedRoute>
              }
            />

            {/* Ruta 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
