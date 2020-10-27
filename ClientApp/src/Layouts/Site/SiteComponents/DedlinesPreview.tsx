import React from "react";

function DedlinesPreview() {
  return (
    <div className="row">
      <div className="col-12 col-lg-6 text-left mb-4">
        <div className="card shadow mb-4" />
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="text-primary font-weight-bold m-0">Deadlines</h6>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <div className="row align-items-center no-gutters">
                <div className="col mr-2">
                  <h6 className="mb-0">
                    <strong>Lunch meeting</strong>
                  </h6>
                  <span className="text-xs">10:30 AM</span>
                </div>
                <div className="col-auto">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="formCheck-1"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="formCheck-1"
                    />
                  </div>
                </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row align-items-center no-gutters">
                <div className="col mr-2">
                  <h6 className="mb-0">
                    <strong>Lunch meeting</strong>
                  </h6>
                  <span className="text-xs">11:30 AM</span>
                </div>
                <div className="col-auto">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="formCheck-2"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="formCheck-2"
                    />
                  </div>
                </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row align-items-center no-gutters">
                <div className="col mr-2">
                  <h6 className="mb-0">
                    <strong>Lunch meeting</strong>
                  </h6>
                  <span className="text-xs">12:30 AM</span>
                </div>
                <div className="col-auto">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="formCheck-3"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="formCheck-3"
                    />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DedlinesPreview;
