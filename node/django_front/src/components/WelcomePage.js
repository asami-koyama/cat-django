import { css, jsx } from '@emotion/react';
import { Link } from "react-router-dom";
import backgroundImg from '../images/oshi-1.jpg'
import boxImg01 from '../images/oshi-2.png'
import boxImg02 from '../images/oshi-3.png'
import Grid from '@mui/material/Grid';

const WelcomePage = () => {

    const floatLeft = css`float: left;`
    const floatRight = css`float: right;`

    const backgroundImage = css`
        width: 100%;
        background-image: url(${backgroundImg});
        background-size: cover;
    `

    const boxImage = (boxImg) => css`
        background-image: url(${boxImg});
        background-size: cover;
        height :50vh;
        width: 50%;
        margin: 20vh;
        margin: 10vh auto 0vh;
    `

    const boxText = css`
        display: inline-block;
        text-align: center;
        height :50vh;
        line-height :50vh;
        width: 50%;
        margin: 10vh auto 0vh;
        font-size: 200%;
    `

    const locateLeft = css`
        float: left;
    `

    const locateRight = css`
        float: right;
    `

    return(
        <Grid container>
            <div className='min-height-fulldisplay' css={backgroundImage}>
            </div>
            <div>
                <Link to={`/cats`}>
                    <div css={[boxImage(boxImg01),locateLeft]}></div>
                </Link>
                <div css={[boxText,locateRight]}>Adopter</div>
            </div>
            <div>
                <div css={[boxText,locateLeft]}>Supporter</div>
                <Link to={`/cats`}>
                    <div css={[boxImage(boxImg02),locateRight]}></div>
                </Link>
            </div>
        </Grid>
    )
};

export default WelcomePage;