import React from 'react';

export default props=> {

    const {flip, card:{front,back,flipped}}= props;
    return(
        <div className='card'>
            <div className='front'>
                <img src={front} />
            </div>
            <div onClick={flip} className={`back ${flipped? 'flipped':''}`}>
                <img src={back} />
            </div>
        </div>
    )
}