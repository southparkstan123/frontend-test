import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SizeProp, IconProp } from '@fortawesome/free-solid-svg-icons';

type LoadingSpinnerProps = {
    size?: SizeProp,
    icon: IconProp,
    spin?: boolean
}

export default function LoadingSpinner(props: LoadingSpinnerProps) {
    return(
        <div className="spinner">
            <div className="align-middle d-flex justify-content-center">
                <FontAwesomeIcon {...props}/> 
            </div>
        </div>
    )
}