import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function LoadingSpinner() {
    return(
        <div className="spinner">
            <div className="align-middle d-flex justify-content-center">
                <FontAwesomeIcon icon={faSpinner} size="6x" spin={true}/> 
            </div>
        </div>
    )
}