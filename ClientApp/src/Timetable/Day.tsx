import React, { CSSProperties } from "react";
import { LessonWithSubject } from "../models/LessonWithSubject";
import Lesson from "./Lesson";
import EmptyLessons from "./EmptyLessons";
export interface DayProps {
  nameOfDay: string;
  lessons: LessonWithSubject[];
}

function Day(props: DayProps) {
  const columnStyle: CSSProperties = {
    height: "1000px",
  };
  const lessonsSorted: Array<LessonWithSubject> = [];
  props.lessons.map((l) => {
    switch (l.timeStart) {
      case "8:30":
        lessonsSorted[0] = l;
        break;
      case "10:25":
        lessonsSorted[1] = l;
        break;
      case "12:20":
        lessonsSorted[2] = l;
        break;
      case "14:15":
        lessonsSorted[3] = l;
        break;
      case "16:10":
        lessonsSorted[4] = l;
        break;
    }
  });
  const items: any = [];
  for (let i = 0; i < lessonsSorted.length; i++) {
    if (lessonsSorted[i] === undefined)
      items.splice(i, 0, <EmptyLessons key={0} />);
    else
      items.splice(
        i,
        0,
        <Lesson key={lessonsSorted[i].id} lesson={lessonsSorted[i]} />
      );
  }
  while (items.length < 5) items.push(<EmptyLessons />);
  const cardStyle: CSSProperties = {
    height: "170px",
  };
  return (
    <div className="col-12 col-md" style={columnStyle}>
      <h1>{props.nameOfDay}</h1>
      {items.map((l: any) => l)}
    </div>
  );
}

export default Day;
