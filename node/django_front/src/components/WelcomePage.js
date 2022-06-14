import React from 'react';
import { Link } from "react-router-dom";
import Blackcat from '../images/black-cat.png';
import BlackcatHug from '../images/black-cat-hug.png';
// import { css, cx } from '@emotion/css'

class WelcomePage extends React.Component{s

    lets_go_cats(){
        <Link to={`/cats`}>ホームに戻る</Link>
    }

    render(){
        return(
            <div className='height-max'>
                <Link to={`/cats`}>
                    <div className='bg-yellow left-welcompage-buttun-box' onClick={()=>{this.lets_go_cats()}}>
                        <img src={BlackcatHug}  alt="image" className='black-cat'/>
                    </div>
                </Link>
                <Link to={`/cats`}>
                    <div className='bg-blue right-welcompage-buttun-box' onClick={()=>{this.lets_go_cats()}}>
                        <img src={Blackcat} alt='image' className='black-cat'></img>
                    </div>
                </Link>
            </div>
        )
    }
}
export default WelcomePage;