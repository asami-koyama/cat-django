import React from 'react';
import { Link } from "react-router-dom";
import Blackcat from '../images/black-cat.png';
import BlackcatHug from '../images/black-cat-hug.png';

class WelcomePage extends React.Component{
    lets_go_cats(){
        <Link to={`/cats`}>ホームに戻る</Link>
    }

    render(){
        return(
            <div className='height-max'>
                <Link to={`/cats`}>
                    <div className='bg-yellow left-welcompage-buttun-box min-height-fulldisplay' onClick={()=>{this.lets_go_cats()}}>
                    </div>
                </Link>
                <Link to={`/test`}>
                    <div className='bg-blue right-welcompage-buttun-box min-height-fulldisplay' onClick={()=>{this.lets_go_cats()}}>
                    </div>
                </Link>
            </div>
        )
    }
}
export default WelcomePage;