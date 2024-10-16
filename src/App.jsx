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
import Post from "./Components/Routes/Post/Post";
import Followers from "./Components/Routes/Profile/Followers";
import CreateQuestion from "./Components/Routes/CreateQuestion/CreateQuestion";
import AllQuestions from "./Components/Content/MainContent/Questions/AllQuestions";
import Question from "./Components/Routes/Question/Question";
import NotificationsPage from "./Components/Routes/Notifications/Notifications";

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
            { path: 'posts/:post', element: <Post /> },
            { path: 'profile/:userProfile/followers', element: <Followers /> },
            { path: 'create-question', element: <CreateQuestion /> },
            { path: 'all-questions', element: <AllQuestions /> },
            { path: 'question/:questionId', element: <Question /> },
            { path: 'notifications', element: <NotificationsPage /> },

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
