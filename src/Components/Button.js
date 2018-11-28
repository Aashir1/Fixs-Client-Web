import React from 'react';

let Button = (props) => {
    return (
        <div>
            <button disabled={props.disabled} className={props.className} onClick={props.onClick}>
                {props.btnText}
            </button>
        </div>
    )
}

export default Button;