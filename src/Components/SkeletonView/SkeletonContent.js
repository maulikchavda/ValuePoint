import Skeleton from "react-loading-skeleton";
import React from "react";

const SkeletonContent = () => {
  return (
    <div>
      <div>
        <Skeleton height={200} className="mt-3" />
      </div>
      <div>
        <div className="row mt-3">
          {Array(20)
            .fill()
            .map((index) => {
              return (
                <div className="col-md-3">
                  <div
                    className="card rounded mt-3"
                    key={index}
                    style={{ width: "300px", margin: "auto" }}
                  >
                    <Skeleton height={200} />
                    <h4 className="card-title text-center rounded mt-2">
                      <Skeleton height={36} width={`80%`} />
                    </h4>
                    <h4 className="card-title text-center rounded mt-1">
                      <Skeleton height={36} width={`70%`} />
                    </h4>
                    <div className="card-metrics text-center mt-3 pb-3 rounded">
                      <Skeleton width={`60%`} height={36} />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default SkeletonContent;
