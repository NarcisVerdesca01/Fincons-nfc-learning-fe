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
import { ChangeEvent, SetStateAction, useState } from "react";
import PageLesson from "./component/Lesson/PageLesson";
import PageCoursePresentation from "./component/pageCoursePresentation/PageCoursePresentation";
import SettingsAdmin from "./component/settingsAdmin/SettingsAdmin";
import SettingsTutor from "./component/settingsTutor/SettingTutor";


function App() {
  const [idCourse, setIdCourse] = useState<number | undefined>();

  return (
    <div id="app">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<ProtectedRoutes />}
          >
            <Route
              path="/homePage"
              element={<HomePage />}
            ></Route>
            <Route
              path="/courses"
              element={<Course changeFilterHandler={function (event: ChangeEvent<HTMLInputElement>): void {
                throw new Error("Function not implemented.");
              } } tableData={undefined} setTableData={function (value: any): void {
                throw new Error("Function not implemented.");
              } } filter={undefined} setfilter={function (value: SetStateAction<string | undefined>): void {
                throw new Error("Function not implemented.");
              } } toDisplay={undefined} />}
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
          </Route>
          <Route
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
          ></Route>

          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
