import React from 'react';

let Button = (props) => {
    return (
        <div>
            <button style={props.style} disabled={props.disabled} className={props.className} onClick={props.onClick}>
                {props.btnText}
            </button>
        </div>
    )
}

export default Button;