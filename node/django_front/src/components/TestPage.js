import { css, jsx } from '@emotion/react';


const TestPage = () => {

    const backgroundImage = css`
        width: 80%;
        background-color: #fddeab;
    `

    return(
        <div className='min-height-fulldisplay' css={backgroundImage}>
        </div>
    )
};

export default TestPage;