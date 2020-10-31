// @ts-ignore
import React, {CSSProperties} from "react";
import {SubjectDto} from "../models/Subject";

interface SubjectProps {
    subject: SubjectDto
    deleteFunc : Function
}

function Subject(props: SubjectProps) {
    
    const cardStyle : CSSProperties = {
        height : "300px"
    }
    const buttomStyle : CSSProperties = {
        float: "right"
    }
    return (
        <div className="col-12 col-md-6" >
            <div className="card shadow mb-4" style={cardStyle}>
                <div className="card-header py-3">
                    <h6 className="text-primary m-0 font-weight-bold">{props.subject.name}</h6>
                    <a className="btn btn-danger btn-circle align-self-end" role="button" style={buttomStyle} onClick={(e)=>props.deleteFunc(props.subject.id)}>
                        <i className="fas fa-trash text-white"/>
                    </a>
                </div>
                <div className="card-body d-none d-sm-block">
                    <p className="m-0 text-dark">Teachers :{props.subject.teachers} &nbsp;</p>
                    <p className="m-0 text-primary">Lections : {props.subject.lessonsZoom.map(l=>l.url).join("\n")}&nbsp;</p>
                    <p className="m-0 text-primary">Prattics :{props.subject.labsZoom.map(l=>l.url).join("\n")}&nbsp;</p>
                    
                </div>
            </div>
        </div>
    )
}

export default Subject