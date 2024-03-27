import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseLessonService from "../../../services/CourseLessonService";
import Course from "../../../models/CourseModel";
import Lesson from "../../../models/LessonModel";
import CourseService from "../../../services/CourseService";
import LessonService from "../../../services/LessonService";
import CourseLessonModel from "../../../models/CourseLessonModel";


const CreateAssociationCourseLesson = () => {
    const [courseLesson, setCourseLesson] = useState<CourseLessonModel | any>();
    const [courseId, setCourseId] = useState<CourseLessonModel | any>();
    const [course, setCourse] = useState<any>();
    const [lesson, setLesson] = useState<any>();
    const navigate = useNavigate();

    useEffect(() => {
        CourseService.getCoursesWithoutLessonsAssociated().then((res1) => {
            setCourse(res1.data);
        })
    }, []);

    useEffect(() => {
        LessonService.getNotAssociatedLessons().then((res2) => {
            setLesson(res2.data);
        })
    }, []);

    const saveCourseLesson = () => {
        console.log(courseId)
        console.log(courseLesson)
        CourseLessonService.createCourseLesson(courseId.course, courseLesson.lesson);
        navigate("/settings_tutor")
        
    }

    const backToSettingsCourseLesson = () => {
        navigate("/settings_tutor")
    }

    return (
        <div>
            <div>
                <h3> Associate Course with Lesson </h3>
                <div>
                    <form>
                        <div className="form-group">
                            <label>Course</label>
                            <select
                                name="course"
                                className="form-select"
                                aria-label="Default select example"
                                onChange={(e) => {
                                    console.log(e.target.value)
                                    setCourseId({
                                        [e.target.name]: e.target.value
                                    });
                                }}
                            >
                                <option selected>Select the Course</option>
                                {course?.map((courses: Course, index: any) => {
                                    return (
                                        <option key={index} value={courses.id}>{courses?.name}</option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Lesson</label>
                            <select
                                name="lesson"
                                className="form-select"
                                aria-label="Default select example"
                                onChange={(e) => {
                                    console.log(e.target.value)
                                    setCourseLesson({
                                        [e.target.name]: e.target.value
                                    });
                                }}
                            >
                                <option selected>Select the Lesson</option>
                                {lesson?.map((lesson: Lesson, index: any) => {
                                    return (
                                        <option key={index} value={lesson?.id}>{lesson?.title}</option>
                                    );
                                })}
                            </select>
                        </div>

                        <button className='btn btn-success' onClick={saveCourseLesson}>add</button>
                        <button className='btn btn-danger' onClick={backToSettingsCourseLesson}>Back</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateAssociationCourseLesson;
