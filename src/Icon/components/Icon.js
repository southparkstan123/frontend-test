// @flow
import React, { Fragment } from 'react';

type IconProps = {
    isAppListIcon: boolean,
    urlLinks: {
        small: string,
        large: string
    },
    alt?: string,
    index: number
}

const classOfAvatar = (index: number, isAppListIcon: boolean): string => {
    let output = '';
    if(isAppListIcon){
        output += 'app-list-icon '

        if(index % 2 !== 0){
            output += 'icon-rounded '
        } else {
            output += 'icon-rounded-circle '
        }
    } else {
        output += 'icon-rounded'
    }
    return output;
}

export default function Icon(props: IconProps) {
    return (
        <Fragment>
            <img className={`${classOfAvatar(props.index, props.isAppListIcon)} sm icon`} src={props.urlLinks.small} alt={props.alt}></img>
            <img className={`${classOfAvatar(props.index, props.isAppListIcon)} lg icon`} src={props.urlLinks.large} alt={props.alt}></img>
        </Fragment>
    )
}