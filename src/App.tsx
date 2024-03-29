import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Login from "./component/login/Login";
import Register from "./component/register/Register";
import HomePage from "./component/homePage/HomePage";
import ProtectedRoutes from "./services/ProtectedRoutes";
import Course from "./component/courses/Course";
import PageCourse from "./component/pageCourse/PageCourse";
import PageDedicatedCourse from "./component/pageDedicatedCourse/PageDedicatedCourse";
import { useState } from "react";
import PageLesson from "./component/pageLesson/PageLesson";
import PageCoursePresentation from "./component/pageCoursePresentation/PageCoursePresentation";
import SettingsAdmin from "./component/settingsAdmin/SettingsAdmin";
import SettingsTutor from "./component/settingsTutor/SettingsTutor";
import QuizPage from "./component/quizPage/QuizPage";
import LoginRegister from "./component/loginRegister/LoginRegister";
import Spinner from "./component/spinner/Spinner";
import Profile from "./component/profile/Profile";


function App() {
  const [idCourse, setIdCourse] = useState<number | undefined>();
  const [idQuiz, setIdQuiz] = useState<number | undefined>();
  return (
    <div id="app">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<ProtectedRoutes />}
          >
            <Route
              path="/home"
              element={<HomePage />}
            ></Route>
            <Route
              path="/spinner"
              element={<Spinner />}
            ></Route>
            <Route
              path="/courses"
              element={<Course />}
            ></Route>
            <Route
              path="/course_page/:idCourse"
              element={<PageCourse courseId={idCourse!} setCourseId={setIdCourse} />}
            ></Route>
            <Route
              path="/course_page_presentation/:idCourse"
              element={<PageCoursePresentation />}
            ></Route>
            <Route
              path="/lesson_page/:idPage"
              element={<PageLesson idCourse={idCourse!} />}
            ></Route>
            <Route
              path="/quiz_page/:idQuiz"
              element={<QuizPage quizId={idQuiz!} setQuizId={setIdQuiz}/>}
            ></Route>
            <Route
              path="/page_dedicated_courses"
              element={<PageDedicatedCourse />}
            ></Route>
            <Route
              path="/settings_admin"
              element={<SettingsAdmin />}
            ></Route>
            <Route
              path="/settings_tutor"
              element={<SettingsTutor />}
            ></Route>
            <Route
              path="/login_register"
              element={<LoginRegister />}
            ></Route>
            <Route
              path="/profile"
              element={<Profile />}
            ></Route>
            
            
          </Route>
          <Route
              path="/authentication"
              element={<LoginRegister />}
            ></Route>
          {/*<Route
            path="/authentication"
            element={
              <Login
              />
            }
          ></Route>
          <Route
            path="/"
            element={
              <Login
              />
            }
          ></Route>*/}

          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
