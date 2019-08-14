import React from "react";

const PhotoDisplay = props => {
    return (
        <div className="photo-container">
            <img src={props.url} />
        </div>
    )
};

export default PhotoDisplay;