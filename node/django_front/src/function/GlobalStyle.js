import { Global, css } from '@emotion/react';

const setGlobalStyle = (globalStyle) => {
    return (
        <Global styles={globalStyle} />
    );
}

export default setGlobalStyle;