import React, { useState } from "react";
import "../index.css";

export function Photo(props) {
    const [loaded, setLoaded] = useState(false);

    function handleLoad() {
        setTimeout(() =>{
            setLoaded(true);
        }, 700);
    }
    return (
        <div className={`photo-content ${loaded ? "loaded" : ""}`}>
            <img
                src={props.value}
                alt={props.alt}
                onLoad={handleLoad}>
            </img>
            <div class="text-prop">{props.alt}</div>
        </div>
    )
}
