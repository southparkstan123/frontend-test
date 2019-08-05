import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SizeProp, IconProp } from '@fortawesome/free-solid-svg-icons';

type LoadingSpinnerProps = {
    size?: SizeProp,
    icon: IconProp,
    spin?: boolean,
    isfullscreen?: boolean
}

export default function LoadingSpinner(props: LoadingSpinnerProps) {
    return(
        (props.isfullscreen === true) ?
            <div className="spinner">
                <div className="align-middle d-flex justify-content-center">
                    <FontAwesomeIcon size={props.size} icon={props.icon} spin={props.spin}/> 
                </div>
            </div>
            : <div className="my-5 d-flex justify-content-center">
                <FontAwesomeIcon size={props.size} icon={props.icon} spin={props.spin}/> 
            </div>
    )
}