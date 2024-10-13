import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Content from "./Components/Content/Content";
import SignIn from "./Components/Routes/SignIn/SignIn";
import Home from "./Components/Routes/Home";
import SignUp from "./Components/Routes/SignUp/SignUp";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        { index: true, element: <Content /> },
        { path: 'signin', element: <SignIn /> },
        { path: 'signup', element: <SignUp /> },
      ]
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
};

export default App;
