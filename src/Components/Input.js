import React from 'react';

let Input = (props) => {
    return (
        <input {...props}  required={true} placeholder={props.placeholder} className={props.className} type={props.type} value={props.value} onChange={props.onChange} name={props.name} />
    )
}


export default Input;