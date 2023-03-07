import React from "react";
import Skeleton from "react-loading-skeleton";

export default function TableSkeletonLoader() {
  return (
    <>
      <Skeleton count={7} height={70} style={{ marginBottom: ".5rem" }} />
    </>
  );
}
