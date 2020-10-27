import React from "react";
import TimetableService from "../services/timrtableService";
import StudentAuthService from "../services/studentAuthService";
import { LessonWithSubject } from "../models/LessonWithSubject";
import Day from "./Day";
interface TimetableProps {
  loading: boolean;
  timetable: LessonWithSubject[] | null;
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
        .catch(e=>console.error(e));
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
          <div className="container">
            <div className="row">
              <Day
                key={1}
                nameOfDay={"Понеділок"}
                lessons={firstWeek?.filter((l) => l.dayOfWeek === 1)!}
              />
              <Day
                key={2}
                nameOfDay={"Вівторок"}
                lessons={firstWeek?.filter((l) => l.dayOfWeek === 2)!}
              />
              <Day
                key={3}
                nameOfDay={"Середа"}
                lessons={firstWeek?.filter((l) => l.dayOfWeek === 3)!}
              />
              <Day
                key={4}
                nameOfDay={"Четвер"}
                lessons={firstWeek?.filter((l) => l.dayOfWeek === 4)!}
              />
              <Day
                key={5}
                nameOfDay={"П'ятниця"}
                lessons={firstWeek?.filter((l) => l.dayOfWeek == 5)!}
              />
              <Day
                key={6}
                nameOfDay={"Субота"}
                lessons={firstWeek?.filter((l) => l.dayOfWeek === 6)!}
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
              />
              <Day
                key={8}
                nameOfDay={"Вівторок"}
                lessons={secondWeek?.filter((l) => l.dayOfWeek === 2)!}
              />
              <Day
                key={9}
                nameOfDay={"Середа"}
                lessons={secondWeek?.filter((l) => l.dayOfWeek === 3)!}
              />
              <Day
                key={10}
                nameOfDay={"Четвер"}
                lessons={secondWeek?.filter((l) => l.dayOfWeek === 4)!}
              />
              <Day
                key={11}
                nameOfDay={"П'ятниця"}
                lessons={secondWeek?.filter((l) => l.dayOfWeek == 5)!}
              />
              <Day
                key={12}
                nameOfDay={"Субота"}
                lessons={secondWeek?.filter((l) => l.dayOfWeek === 6)!}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}
export default Timetable;
