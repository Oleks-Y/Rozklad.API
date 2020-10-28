import React from "react";
import Navbar from "./SiteComponents/Navbar";
import Dashboard from "./SiteComponents/Dashboard";
import Footer from "./SiteComponents/Footer";
import DedlinesPreview from "./SiteComponents/DedlinesPreview";
import {Switch, Route, Redirect, BrowserRouter} from "react-router-dom";
import Timetable from "../../Timetable/Timetable";
import NotFound from "../../NotFound";
import SubjectsLayout from "../../Subjects/SubjectsLayout"

function Site() {
    return (
        <div>
            <div>
                <Navbar/>
            </div>
            <div id="wrapper">
                <div className="d-flex flex-column" id="content-wrapper">
                    <div id="content">
                            <Switch>
                                <Route path="/site/home">
                                    <Dashboard/>
                                    <DedlinesPreview/>
                                </Route>
                                <Route path="/site/timetable">
                                    <Timetable/>
                                </Route>
                                <Route path="/site/subjects">
                                    <SubjectsLayout/>
                                </Route>
                                <Route path="/site">
                                    <Redirect to="/site/home"/>
                                </Route>

                                <Route>
                                    <NotFound/>
                                </Route>
                            </Switch>
                        <Footer/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Site;
