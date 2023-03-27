import React, {useState, useEffect} from 'react';
import { Photo } from './Photo';
import '../index.css';

export function PhotoDashBoard(props) {
    return (
        <div class="dashboard-scroll">
            {props.processImages()}
        </div>
    )
}