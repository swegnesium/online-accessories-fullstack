// Import npm packages
import { Routes, Route } from 'react-router-dom';

// Import pages 
import Home from './pages/Home';
import ProductsMenu from './pages/product/ProductsMenu';
import NotFound from './pages/NotFound';
import AboutPage from './pages/AboutPage';
import SupportPage from './pages/SupportPage';
import AddProduct from './pages/product/AddProduct';
import EditProduct from './pages/product/EditProduct';
import ProductDetails from './pages/product/ProductDetails';

// AUTH PAGES
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/auth/Dashboard';
import DeletePanel from './pages/auth/admin/DeletePanel';

// Import components
import Layout from './components/layout/Layout';
import AuthPrivateRoutes from './components/layout/AuthPrivateRoutes';
import { CartProvider } from './contexts/CartContext';


function App(params) {
  return (
    // Wrapping 
    <CartProvider>
      <Routes>
        {/* MAIN LAYOUT WRAPPER & ROUTED CHILDREN */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* AUTH PAGES */}
          <Route path='register' element={<Register/>} />
          <Route path='login' element={<Login/>} />

          {/* Private Auth Routes */}
          <Route element={<AuthPrivateRoutes/>}>
            <Route path='dashboard' element={<Dashboard/>} />
            <Route path='dashboard/delete' element={<DeletePanel/>} />
          </Route>

          {/* PRODUCTS ROUTES */}
          <Route path="store">
            <Route path='products' element={<ProductsMenu />} />
            <Route path="product">
              <Route path=":id" element={<ProductDetails/>} />
              <Route element={<AuthPrivateRoutes/>}>
                <Route path="add" element={<AddProduct/>}/>
                <Route path="edit/:id" element={<EditProduct/>}/>
              </Route>
            </Route>

          </Route>

          {/* OTHER PAGES */}
          <Route path='about' element={<AboutPage />} />
          <Route path='support' element={<SupportPage />} />

          {/* ERROR PAGES */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

    </CartProvider>





  );
}

export default App;