import HomePage from "./screens/HomePage";
import SignUp from "./screens/auth/SignUp";
import Login from "./screens/auth/Login";
import Post from "./screens/Post";

const routes = [
  {
    title: 'HomePage',
    path: '/',
    isPrivate: false,
    component: (props) => <HomePage {...props} />,
  },
  {
    title: "Signup",
    path: "/signup",
    isPrivate: false,
    component: (props) => <SignUp {...props} />,
  },
  {
    title: "Login",
    path: "/login",
    isPrivate: false,
    component: (props) => <Login {...props} />,
  },
  {
    title: "Post",
    path: "/post/:id",
    isPrivate: false,
    component: (props) => <Post {...props} />,
  },
];
export default routes
