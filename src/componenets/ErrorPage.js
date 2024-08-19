import React from "react";
import "../404.css";

export default function ErrorPage({ filteredProducts, msg }) {
  console.log("load1:", msg);
  return (
    <div className="background">
      <div className="transbox">
        {filteredProducts === undefined ? (
          <div>
            <h3>Server down! Please try again later</h3>
          </div>
        ) : (
          <h2 className="text-dark">Oops...Page Not Found!</h2>
        )}
      </div>
    </div>
  );
}
