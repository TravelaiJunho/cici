import * as React from 'react';

export const navRef = React.createRef();

export const navigate = (name, params) => {
    navRef.current.navigate(name, params);
}