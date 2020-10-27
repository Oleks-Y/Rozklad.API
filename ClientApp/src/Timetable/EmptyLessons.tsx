import React, { CSSProperties } from "react";

function EmptyLessons() {
  const cardStyle: CSSProperties = {
    height: "170px",
  };

  return (
    <div className="card shadow border-left-dark py-2" style={cardStyle}>
      <div className="card-body">
        <div className="row align-items-center no-gutters">
          <div className="col mr-2">
            <div className="text-uppercase text-dart font-weight-bold text-xs mb-1" />
            <div className="text-dark font-weight-bold h5 mb-0">
              <span />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmptyLessons;
