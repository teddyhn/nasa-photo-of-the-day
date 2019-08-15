import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import PhotoDisplay from "./PhotoDisplay";
import PhotoTitle from "./PhotoTitle";
import PhotoExplanation from "./PhotoExplanation";
import logo from "./NASA-logo.png";

import axios from "axios";

export default function PhotoCard() {
    const [photo, setPhoto] = useState([]);
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        axios
            .get(`https://api.nasa.gov/planetary/apod?api_key=BEiebB1rIgKUfvqiaOqLHvCJr4hbvgrh7zzKzlae&date=${currentDate}`, {
                params: {}
            })
            .then(response => {
                const photo = response.data;
                setPhoto(photo);
                const currentDate = response.data.date;
                setCurrentDate(currentDate);
            })
    }, [currentDate]);

    const datesArrayCreator = (date) => {
        let datesArray = [];
      
        for (let i = 1; i <= 4; i++) {
            let heldDate = date.slice(0, 8);
                
            let appendDate = date.slice(8);
            appendDate = parseInt(appendDate) - 1;
            
            let newDate = heldDate.concat(appendDate);
            datesArray.unshift(newDate);
        
            date = newDate;
        }
        
        return datesArray;
    }

    console.log(datesArrayCreator(currentDate));

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
                <DropdownButton 
                    title={photo.date}
                    drop="up"
                >
                    {datesArrayCreator(currentDate).map(date => {
                        return (
                            <Dropdown.Item
                            onSelect={() => setCurrentDate(date)}
                            >
                                {date}
                            </Dropdown.Item>
                        )
                    })}
                </DropdownButton>
            </div>
        </div>
    );
}