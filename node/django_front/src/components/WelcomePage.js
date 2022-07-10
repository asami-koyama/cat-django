import { css, jsx } from '@emotion/react';
import { Link } from 'react-router-dom';
import backgroundImg from '../images/oshi-1.jpg';
import boxImg01 from '../images/oshi-2.png';
import boxImg02 from '../images/oshi-3.png';
import Grid from '@mui/material/Grid';

const WelcomePage = () => {
    const backgroundImage = css`
        width: 100%;
        background-image: url(${backgroundImg});
        background-size: cover;
    `;

    const boxImage = (boxImg) => css`
        background-image: url(${boxImg});
        background-size: cover;
        height: 50vh;
        width: 100%;
    `;

    const boxText = css`
        display: inline-block;
        height: 50vh;
        width: 100%;
        line-height: 50vh;
        text-align: center;
        font-size: 200%;
    `;

    const mardinDiv = (
        <div
            css={css`
                height: 5vh;
            `}
        ></div>
    );

    return (
        <>
            <div className="min-height-fulldisplay" css={backgroundImage}></div>
            {mardinDiv}
            <Grid
                container
                justifyContent="center"
                rowSpacing={2}
                columnSpacing={2}
            >
                <Grid item xs={12} md={6}>
                    <Link to={`/cats`}>
                        <div css={[boxImage(boxImg01)]}></div>
                    </Link>
                </Grid>
                <Grid item xs={12} md={4}>
                    <div css={[boxText]}>Adopter</div>
                </Grid>
                <Grid item xs={12} md={4}>
                    <div css={[boxText]}>Supporter</div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Link to={`/cats`}>
                        <div css={[boxImage(boxImg02)]}></div>
                    </Link>
                </Grid>
            </Grid>
        </>
    );
};

export default WelcomePage;
