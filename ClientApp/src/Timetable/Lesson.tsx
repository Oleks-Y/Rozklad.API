import React, { CSSProperties } from "react";
import { LessonWithSubject } from "../models/LessonWithSubject";
export interface LessonProps {
  lesson: LessonWithSubject;
}
function Lesson(props: LessonProps) {
  // Todo add edit feature
  // Todo add scroll to current day
  const cardStyle: CSSProperties = {
    height: "170px",
  };
  const iconStyle: CSSProperties = {
    margin: "21px",
  };
  const color: CSSProperties = {
    color: "rgb(143,165,230)",
  };
  return (
    <div className="card shadow border-left-primary py-0" style={cardStyle}>
      <div className="card-body">
        <span>
          <a
            href={
              props.lesson.type === "Лек"
                ? props.lesson.subject.lessonsZoom[0]?.url
                : ""
            }
          >
            {props.lesson.subject.name}
          </a>
        </span>
        <div className="row align-items-center no-gutters">
          <div className="col mr-2">
            <div className="text-uppercase text-primary font-weight-bold text-xs mb-0">
              <span className="text-capitalize" style={color}>
                {props.lesson.subject.teachers}
              </span>
            </div>
            <div className="text-dark font-weight-bold h5 mb-0">
              <span />
              <i
                className="far fa-copy"
                style={iconStyle}
                onClick={() =>
                  navigator.clipboard
                    .writeText(
                      props.lesson.type === "Лек"
                        ? props.lesson.subject.lessonsZoom[0]?.url
                        : ""
                    )
                    .then(() => alert("Copied!"))
                }
              />
              <i className="far fa-edit" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lesson;
