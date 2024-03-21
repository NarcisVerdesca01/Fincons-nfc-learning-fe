import Header from "../header/Header";
import "./SettingsTutor.css";
import ButtonCreateAssociationCourseLesson from "./buttonSettingsTutor/ButtonCreateAssocationCourseLesson";
import ButtonQuizResults from "./buttonSettingsTutor/ButtonQuizResults";
import ButtonCreateAssociationQuizLesson from "./buttonSettingsTutor/ButtonCreateAssocationQuizLesson";
import ButtonCreateAssociationQuizQuestion from "./buttonSettingsTutor/ButtonCreateAssocationQuizQuestion";
import ButtonCreateQuiz from "./buttonSettingsTutor/ButtonCreateQuiz";
import ButtonCreateAssociationQuestionAnswer from "./buttonSettingsTutor/ButtonCreateAssocationQuestionAnswer";
import ButtonCreateQuestion from "./buttonSettingsTutor/ButtonCreateQuestion";
import ButtonCreateAnswer from "./buttonSettingsTutor/ButtonCreateAnswer";

const SettingsTutor = () => {
    return (
        <>
            <Header />
            <div className={`containerSettingsTutor`}>
                <div>
                    <h1>Settings </h1>
                </div>
                <div className={`sectionContainer`}>
                    <div className={`containerOptions`}>
                        <p>Create section</p>
                        <div className={`optionSettings`}>
                            <p className={`descriptionOptionSettings`}>Create Quiz</p>
                            <ButtonCreateQuiz />
                        </div>
                        <div className={`optionSettings`}>
                            <p className={`descriptionOptionSettings`}>Create Question</p>
                            <ButtonCreateQuestion />
                        </div>
                        <div className={`optionSettings`}>
                            <p className={`descriptionOptionSettings`}>Create Answer</p>
                            <ButtonCreateAnswer />
                        </div>
                    </div>
                    <div className={`containerOptions`}>
                        <p>Associate section</p>
                        <div className={`optionSettings`}>
                            <p className={`descriptionOptionSettings`}>Associate Course to Lesson</p>
                            <ButtonCreateAssociationCourseLesson />
                        </div>
                        <div className={`optionSettings`}>
                            <p className={`descriptionOptionSettings`}>Associate Quiz to Lesson</p>
                            <ButtonCreateAssociationQuizLesson />
                        </div>

                        <div className={`optionSettings`}>
                            <p className={`descriptionOptionSettings`}>Associate Quiz to Question</p>
                            <ButtonCreateAssociationQuizQuestion />
                        </div>

                        <div className={`optionSettings`}>
                            <p className={`descriptionOptionSettings`}>Associate Question to Answer</p>
                            <ButtonCreateAssociationQuestionAnswer />
                        </div>
                    </div>
                    <div className={`containerOptions`}>
                        <p>View section</p>
                        <div className={`optionSettings`}>
                            <p className={`descriptionOptionSettings`}>View Result Quiz</p>
                            <ButtonQuizResults />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default SettingsTutor;