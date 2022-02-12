import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonHome = () => {
  return (
    <div>
      <div>
        <Skeleton height={500} className="mt-4" />
      </div>
    </div>
  );
};

export default SkeletonHome;
