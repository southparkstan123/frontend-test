// @flow
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
            <div className="spinner-overlay">
                <div className="spinner">
                    <FontAwesomeIcon size={props.size} icon={props.icon} spin={props.spin}/> 
                </div>
            </div>
            : <div className="spinner">
                <FontAwesomeIcon size={props.size} icon={props.icon} spin={props.spin}/> 
            </div>
    )
}