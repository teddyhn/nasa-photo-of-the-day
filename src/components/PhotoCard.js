import React, { useEffect, useState } from "react";
import PhotoDisplay from "./PhotoDisplay";
import PhotoTitle from "./PhotoTitle";
import PhotoExplanation from "./PhotoExplanation";
import PhotoDate from "./PhotoDate";
import logo from "./NASA-logo.png";

import axios from "axios";

export default function PhotoCard() {
    const [photo, setPhoto] = useState([]);

    useEffect(() => {
        axios
            .get('https://api.nasa.gov/planetary/apod?api_key=BEiebB1rIgKUfvqiaOqLHvCJr4hbvgrh7zzKzlae', {
                params: {}
            })
            .then(response => {
                const photo = response.data;
                console.log(photo);
                setPhoto(photo);
            })
    }, []);

    return (
        <div className="card">
            <div className="header">
                <img className="logo" src={logo}/>
                <h1>Photo of the Day</h1>
            </div>
            <div className="body">
                <PhotoDisplay url={photo.url} />
                <div className="text">
                    <PhotoTitle title={photo.title} />
                    <PhotoExplanation explanation={photo.explanation} />
                </div>
                <PhotoDate date={photo.date} />
            </div>
        </div>
    );
}