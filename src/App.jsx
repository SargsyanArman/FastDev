import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Content from "./Components/Content/Content";
import SignIn from "./Components/Routes/SignIn/SignIn";
import Home from "./Components/Routes/Home";
import SignUp from "./Components/Routes/SignUp/SignUp";
import MainContent from "./Components/Content/MainContent/MainContent";
import Profile from "./Components/Routes/Profile/Profile";
import AllAuthors from "./Components/Content/MainContent/Authors/AllAuthors";
import CreatePost from "./Components/Routes/CreatePost/CreatePost";
import AllPosts from "./Components/Content/MainContent/BodyMainContent/Posts/AllPosts";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: '/',
          element: <Content />,
          children: [
            { index: true, element: <MainContent /> },
            { path: 'profile/:userProfile', element: <Profile /> },
            { path: 'all-authors', element: <AllAuthors /> },
            { path: 'create-post', element: <CreatePost /> },
            { path: 'all-posts', element: <AllPosts /> },
          ]
        },
        { path: 'signin', element: <SignIn /> },
        { path: 'signup', element: <SignUp /> },
      ]
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
