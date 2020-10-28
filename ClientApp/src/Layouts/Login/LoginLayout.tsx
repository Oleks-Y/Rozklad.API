import React, {CSSProperties} from 'react';
import Form from "./Form";
import dogLoginImage from "../../images/dog-login.jpeg";


function LoginLayout() {
    const imageStyle: CSSProperties = {
        backgroundImage: dogLoginImage
    }
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-9 col-lg-12 col-xl-10">
                    <div className="card shadow-lg o-hidden border-0 my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-flex">
                                    <div className="flex-grow-1 bg-login-image"
                                         style={imageStyle}/>
                                </div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h4 className="text-dark mb-4">Welcome !</h4>
                                        </div>
                                        <Form/>
                                        <div className="text-center"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default LoginLayout;
