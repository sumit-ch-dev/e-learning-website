import "./App.css";
import {Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
// import { CssBaseline } from "@mui/material";
import theme from "./theme";
import Home from "./page/home/Home";
import Header from "./components/Header/Header";
import SignIn from "./page/login/Login";
import SignUp from "./page/signup/SignUp";
import Courses from "./page/courses/Courses";
import CreateCoursePage from "./page/courseCreation/CreateCoursePage";
import { CssBaseline } from "@mui/material";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux";
import store from "./store/store";
// import Footer from "./components/Footer/Footer";
// import CoursePage from "./page/CoursePage/CoursePage";
// // import SignIn from "./components/SignIn/SignIn";
import StudentDashboard from './components/Dashboard/StudentDashboard'
import InstructorDashboard from "./components/Dashboard/InstructorDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import DefaultDashboard from "./components/Dashboard/DefaultDashboard";
import Dashboard from "./components/Dashboard/Dashboard";
// import Routes from './routes'
// import AuthProvider from "./provider/authProvider";


function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
           <Route path="/login" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/courses" element={<Courses />} />
            {/* <Route path="/create-course" element={<CreateCoursePage />} /> */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/default-dashboard" element={<DefaultDashboard />}/>
      </Route>
    </Routes>
    </Provider>
      </ThemeProvider >
    <ToastContainer />
    </div >
  );
}

export default App;
