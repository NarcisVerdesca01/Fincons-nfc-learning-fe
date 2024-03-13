import { useEffect, useState } from "react";
import CourseModel from "../../models/CourseModel";
import { useNavigate, useParams } from "react-router-dom";
import CourseService from "../../services/CourseService";
import "./PageCourse.css";
import Header from "../header/Header";
import LessonModel from "../../models/LessonModel";
interface Props {
  courseId: number;
  setCourseId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const PageCourse = (props: Props) => {
  const [course, setCourse] = useState<CourseModel>();
  const [lessonList, setLessonList] = useState<LessonModel[]>([]);
  const navigate = useNavigate();
  const { idCourse } = useParams();
  const idCourse_page = parseInt(idCourse!);

  useEffect(() => {
    CourseService.getCourseById(idCourse_page!).then((res) => {
      setCourse(res.data.data);
      console.log(res.data.data);
      console.log(idCourse_page, " idCourse_page");
      props.setCourseId(idCourse_page);
      console.log(
        res.data.data.lessons,
        "sono qui in PageCourse res.data.data.lessons"
      );
      setLessonList(res.data.data.lessons);
    });
  }, [idCourse_page]);

  const gotToPage = (idPage: any) => {
    console.log(idPage, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    navigate("/lesson_page/" + idPage);
    
  };
  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Header />
      <div className={`containerPageCourse`}>
        <div className={`containerTitlePageCourse`}>
          <h1>{course?.name}</h1>
        </div>
        <div className={`containerButtonBack`}>
          <button className={`buttonBack`} onClick={goBack}>
            <i className="bi bi-arrow-left"></i>
          </button>
        </div>
        <div className={`containerContextCourse`}>
          <div className={`imageCardCourse`}>
            <img
              src={course?.backgroundImage}
              alt=""
              className={`imageStyleCourse`}
            />
          </div>
          <div className={`containerTextCourse`}>
            <p className={`textCourse`}>{course?.description}</p>
          </div>
        </div>
        <div className={`containerTitleResources`}>
          <div className={`titleResources`}>
            <h1>Resources</h1>
          </div>
        </div>
        <div className={`containerResources`}>
          {lessonList.map((lessons: any) => (
            <div className={`cardLessonPageCorse`}>
              <button
                className={`buttonLessonCourse`}
                onClick={() => gotToPage(lessons?.lesson.id)}
              >
                {lessons.lesson.title}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default PageCourse;
