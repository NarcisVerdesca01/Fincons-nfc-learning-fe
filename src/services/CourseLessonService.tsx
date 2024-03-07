import axios from "axios";
import Cookies from "js-cookie";
import Course from "../models/CourseModel";
import Lesson from "../models/LessonModel";

const COURSE_LESSON_API_BASE_URL =
    "http://localhost:8080/nfc-learning";
const VERSION_URI = COURSE_LESSON_API_BASE_URL + "/v1";
const COURSE_LESSON_URI = VERSION_URI + "/course-lesson";
const GET_ALL_URI = COURSE_LESSON_URI + "/list";
const GET_BY_ID = COURSE_LESSON_URI + "/find-by-id";
const CREATE_COURSE_LESSON = COURSE_LESSON_URI + "/add";
const UPDATE_COURSE_LESSON = COURSE_LESSON_URI + "/update";
const DELETE_COURSE_LESSON = COURSE_LESSON_URI + "/delete";

const token = Cookies.get("jwt-token");
const config = {
    headers: { Authorization: `Bearer ${token}` },
};

const CourseLessonService = {

    getCourseLessons() {
        return axios.get(GET_ALL_URI, config);
    },

    createCourseLesson(
        courseId:  any,
        lessonId: any
        
        ) {
            console.log(courseId, "service")
            console.log(lessonId)
        return axios.post(
            CREATE_COURSE_LESSON,
            {
                course: {
                    id: courseId
                },
                lesson: {
                    id: lessonId
                },
            },
            config
        );
    },
}

export default CourseLessonService;