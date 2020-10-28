// @ts-ignore
import React, {useState} from "react";
import Subject from "./Subject";
import {SubjectDto} from "../models/Subject";
import StudentAuthService from "../services/studentAuthService";
import {subjectsService} from "../services/subjectsService";
import {Modal, Button} from "react-bootstrap"
import {Redirect} from "react-router-dom";

interface SubjectsLayoutProps {
    loading: boolean;
    subjects: SubjectDto[] | null,
    subjectsChanged: boolean,
    showModal: boolean,
    subjectsToChoice: SubjectDto[] | null,
    redirect : boolean
}

class SubjectLayout extends React.Component {
    constructor(props: any) {
        super(props);

    }

    state: SubjectsLayoutProps = {
        loading: true,
        subjects: null,
        subjectsChanged: false,
        showModal: false,
        subjectsToChoice: null,
        redirect : false
    }
    subjectIds: string[] = []

    async loadData() {
        const studentId = new StudentAuthService().getStudentID();
        let subjects: SubjectDto[] | null = null;
        if (studentId === null) {
            console.error("User not logined");
        }
        try {
            subjects = await subjectsService.getSubjects(studentId);
        } catch (e) {
            console.error(e)
        }

        return subjects
    }

    async loadChoiceData() {
        const studentId = new StudentAuthService().getStudentID();
        let subjects: SubjectDto[] | null = null;
        if (studentId === null) {
            console.error("User not logined");
        }
        try {
            subjects = await subjectsService.getSubjectsToChoice(studentId);
        } catch (e) {
            console.error(e)
        }

        return subjects
    }

    componentDidMount() {
        this.loadData()
            .then(data => {
                    data?.map(s => this.subjectIds.push(s.id))
                    this.setState({
                        loading: false,
                        subjects: data
                    });

                }
            ).catch(e => console.error(e))
        this.loadChoiceData()
            .then(data => {
                    this.setState({
                        loading: false,
                        subjectsToChoice: data
                    });
                }
            ).catch(e => console.error(e))
    }

    addSubject(subject : SubjectDto) {
        let subjects = this.state.subjects
        if(subjects==null){
            subjects = [subject]
        }
        else {
            subjects?.push(subject)
        }
        this.setState({
           subjects : subjects,
            subjectsToChoice : this.state.subjectsToChoice?.filter(s=>s.id!= subject.id),
            subjectsChanged : true
        });
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
    setRedirect = () => {
        this.setState({
            redirect: true,
        });
    };
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={`/site`} />;
        }
    };
    updateSubjects=()=> {
        const studentId = new StudentAuthService().getStudentID();
        const sublects = this.state.subjects
        try {
            subjectsService.updateSubjects(studentId, sublects?.map(s => s.id) as string[])
                .then(() => this.setRedirect())
                .catch(() => alert("Something went wrong! Try refresh page"))
        }catch (e) {
            console.error(e)
        }
    }

    deleteSubjectFormList = (id: string) => {
        // Todo manipulate only main subjects array a
        // Todo when subject deletes, it must be added to subjectsToChoice
        console.log(this.subjectIds)
        const subject = this.state.subjects?.find(s=>s.id==id)
        this.subjectIds = this.subjectIds.filter(subject_id => subject_id != id)
        console.log("Yeah bitch, this fucking function works and we delete", id)
        this.setState({
            subjects: this.state.subjects?.filter(s => s.id != id),
            subjectsChanged: true,
        })
        this.state.subjectsToChoice?.push(subject!)
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
            console.log(this.state.subjects)
            return (<div className="container">
                <div className="row">
                    {
                        this.state.subjects?.map(s => <Subject subject={s} deleteFunc={this.deleteSubjectFormList}/>)
                    }
                </div>
                {this.renderRedirect()}
                <div className="row">
                    <div className="col offset-8"><a className="btn btn-success btn-icon-split" role="button"><span
                        className="text-white-50 icon"><i className="fas fa-plus"/></span><span
                        className="text-white text" onClick={this.handleOpen}>Add subject</span></a>
                    </div>
                    <Modal show={this.state.showModal} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Select subjects to add</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{this.state.subjectsToChoice?.map(s =>
                            <button type="button" className="btn btn-primary m-1" onClick={()=>this.addSubject(s)}>{s.name}</button>
                        )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    {this.state.subjectsChanged &&
                    <div className="col offset-8"><a className="btn btn-primary btn-icon-split" role="button"><span
                        className="text-white-50 icon"><i className="fas fa-save"/></span><span
                        className="text-white text" onClick={this.updateSubjects}>Save</span></a>
                    </div>}
                </div>
            </div>)
        }
    }

}

export default SubjectLayout;