import React from "react";

function Dashboard() {
  return (
    <div className="container-fluid">
      <div className="d-sm-flex justify-content-between align-items-center mb-4">
        <h3 className="text-dark mb-0">Dashboard</h3>
      </div>
      <div className="row">
        <div className="col-12 col-md">
          <div className="card shadow border-left-primary py-2">
            <div className="card-body">
              <div className="row align-items-center no-gutters">
                <div className="col mr-2">
                  <div className="text-uppercase text-primary font-weight-bold text-xs mb-1">
                    <span>Rozklad</span>
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-calendar fa-2x text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md">
          <div className="card shadow border-left-primary py-2">
            <div className="card-body">
              <div className="row align-items-center no-gutters">
                <div className="col mr-2">
                  <div className="text-uppercase text-primary font-weight-bold text-xs mb-1">
                    <span>Format subjects</span>
                  </div>
                  <div className="text-dark font-weight-bold h5 mb-0" />
                </div>
                <div className="col-auto">
                  <i className="fas fa-pen-alt fa-2x text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md">
          <div className="card shadow border-left-primary py-2">
            <div className="card-body">
              <div className="row align-items-center no-gutters">
                <div className="col mr-2">
                  <div className="text-uppercase text-primary font-weight-bold text-xs mb-1">
                    <span>Something else</span>
                  </div>
                  <div className="text-dark font-weight-bold h5 mb-0">
                    <span></span>
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-plus fa-2x text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
