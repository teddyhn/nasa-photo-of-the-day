import React from "react";

const PhotoDisplay = props => {
    return (
        <div className="photo-container" onClick={props.onClick}>
            <img src={props.url} />
        </div>
    )
};

export default PhotoDisplay;