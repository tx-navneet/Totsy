import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
