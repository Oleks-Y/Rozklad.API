import React, {FormEvent} from "react";
import TimetableService from "../services/timrtableService";
import StudentAuthService from "../services/studentAuthService";
import {LessonWithSubject} from "../models/LessonWithSubject";
import Day from "./Day";
import {Button, Form, FormControl, InputGroup, Modal} from "react-bootstrap";
import {SubjectDto} from "../models/Subject";
import {subjectsService} from "../services/subjectsService";

interface TimetableProps {
    loading: boolean;
    timetable: LessonWithSubject[] | null;
    showModal: boolean,
    lessonToChange: LessonWithSubject | null,
    formValue: string | null
}

class Timetable extends React.Component {
    // Todo in table breaks when screen size < xl
    // Todo items for first lesson donit showing 
    constructor(props: any) {
        super(props);
    }

    state: TimetableProps = {
        loading: true,
        timetable: null,
        showModal: false,
        lessonToChange: null,
        formValue: null
    };

    async loadData() {
        const studentId = new StudentAuthService().getStudentID();
        let timetable: LessonWithSubject[] | null = null;
        if (studentId === null) {
            console.error("User not logined");
        }
        try {
            timetable = await TimetableService.getTimeTable(studentId);
        } catch (e) {
            console.error(e);
        }
        return timetable;
    }

    componentDidMount() {
        this.loadData()
            .then((data) =>
                this.setState({
                    loading: false,
                    timetable: data,
                })
            )
            .catch(e => console.error(e));
    }

    handleClose = () => {
        this.setState({
            showModal: false
        })
    }
    handleOpen = () => {
        this.setState({
            showModal: true
        })
    }

    handleChange=(event: any)=> {
        this.setState({formValue: event.target.value});
    }

    showModal = (lesson: LessonWithSubject) => {
        this.setState({
            lessonToChange: lesson
        });
        this.handleOpen()
    }
    onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const link = this.state.formValue
        const lesson = this.state.lessonToChange
        subjectsService.updateSubjectLinks(lesson?.type!, link!, lesson?.subject.id!)
            .then(() => {
                this.setState({formValue: "", lessonToChange: null});
            })
            .catch(e=>alert(e));
        this.handleClose()
        
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            );
        }

        if (!this.state.loading) {
            const firstWeek:
                | LessonWithSubject[]
                | undefined = this.state.timetable?.filter((l) => l.week === 1);
            const secondWeek:
                | LessonWithSubject[]
                | undefined = this.state.timetable?.filter((l) => l.week === 2);
            return (
                <div>
                    <h1>Перший тиждень</h1>
                    <Modal show={this.state.showModal} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Paste Link to Subject</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={this.onSubmit}>
                                <label>
                                    Link
                                    <input type="text" className="input-group" value={this.state.formValue!}
                                           onChange={this.handleChange}/>
                                </label>
                                <Button variant="primary" type="submit">
                                    Send
                                </Button>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <div className="container">
                        <div className="row">
                            <Day
                                key={1}
                                nameOfDay={"Понеділок"}
                                lessons={firstWeek?.filter((l) => l.dayOfWeek === 1)!}
                                editFunc={this.showModal}
                            />
                            <Day
                                key={2}
                                nameOfDay={"Вівторок"}
                                lessons={firstWeek?.filter((l) => l.dayOfWeek === 2)!}
                                editFunc={this.showModal}
                            />
                            <Day
                                key={3}
                                nameOfDay={"Середа"}
                                lessons={firstWeek?.filter((l) => l.dayOfWeek === 3)!}
                                editFunc={this.showModal}
                            />
                            <Day
                                key={4}
                                nameOfDay={"Четвер"}
                                lessons={firstWeek?.filter((l) => l.dayOfWeek === 4)!}
                                editFunc={this.showModal}
                            />
                            <Day
                                key={5}
                                nameOfDay={"П'ятниця"}
                                lessons={firstWeek?.filter((l) => l.dayOfWeek == 5)!}
                                editFunc={this.showModal}
                            />
                            <Day
                                key={6}
                                nameOfDay={"Субота"}
                                lessons={firstWeek?.filter((l) => l.dayOfWeek === 6)!}
                                editFunc={this.showModal}
                            />
                        </div>
                    </div>
                    <h1>Другий тиждень</h1>
                    <div className="container">
                        <div className="row">
                            <Day
                                key={7}
                                nameOfDay={"Понеділок"}
                                lessons={secondWeek?.filter((l) => l.dayOfWeek === 1)!}
                                editFunc={this.showModal}
                            />
                            <Day
                                key={8}
                                nameOfDay={"Вівторок"}
                                lessons={secondWeek?.filter((l) => l.dayOfWeek === 2)!}
                                editFunc={this.showModal}
                            />
                            <Day
                                key={9}
                                nameOfDay={"Середа"}
                                lessons={secondWeek?.filter((l) => l.dayOfWeek === 3)!}
                                editFunc={this.showModal}
                            />
                            <Day
                                key={10}
                                nameOfDay={"Четвер"}
                                lessons={secondWeek?.filter((l) => l.dayOfWeek === 4)!}
                                editFunc={this.showModal}
                            />
                            <Day
                                key={11}
                                nameOfDay={"П'ятниця"}
                                lessons={secondWeek?.filter((l) => l.dayOfWeek == 5)!}
                                editFunc={this.showModal}
                            />
                            <Day
                                key={12}
                                nameOfDay={"Субота"}
                                lessons={secondWeek?.filter((l) => l.dayOfWeek === 6)!}
                                editFunc={this.showModal}
                            />
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Timetable;
