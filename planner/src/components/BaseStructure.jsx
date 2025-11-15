import React from "react";
import Sidebar from "./Sidebar";

const BaseStructure = ({ children }) => {
    return(
        <div className="section">
            <Sidebar />
            <div className="section-body">
                <div className="section-content">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default BaseStructure