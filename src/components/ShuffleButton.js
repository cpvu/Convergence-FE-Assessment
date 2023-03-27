import React from "react";
import "../index.css"

export function ShuffleButton(props) {
    return (
        <div>
            <button class="shuffleBtn" onClick={() => {props.shufflePhotos(props.keys); window.location.reload();}}>Shuffle!</button>
        </div>
    )
}