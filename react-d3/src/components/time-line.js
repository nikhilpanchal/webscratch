import React from 'react';


export default (props) => {
    let x = 30 + props.index*30;
    let translate = `translate(${x})`;


    return <line x1='40' y1='20' x2='40' y2='330' strokeWidth='2' stroke='black' transform={translate}></line>;
};