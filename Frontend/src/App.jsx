import { createBrowserRouter, RouterProvider } from "react-router-dom";


import { AuthProvider } from "../AuthContextStore";
import { ToastContainer } from "react-toastify";


import AddPassengers from "./Components/Pages/AddPasanger";
import { AppLayout } from "./Components/Layout/AppLayout";
import { ErrorPage } from "./Components/Pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      
      { path: "/", element: <AddPassengers /> },
    ],
  },
]);

const App = () => {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          bodyClassName="toastBody"
        />
      </AuthProvider>
    </>
  );
};

export default App;
