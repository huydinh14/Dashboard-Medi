import React from "react";
import { Dna } from "react-loader-spinner";
import "./loading.css";

const Loading = () => {
  return (
    <div className="loading-overlay">
      <div className="sweet-loading">
        <Dna
          visible={true}
          height="70"
          width="70"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    </div>
  );
};

export default Loading;
