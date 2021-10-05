import HomePage from "./screens/HomePage";
import SignUp from "./screens/auth/SignUp";
import Login from "./screens/auth/Login";


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
];
export default routes
