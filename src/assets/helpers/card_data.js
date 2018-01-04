import React from 'react';

import back from '../images/card_back.png';
import images from './card_images';


export default images.map(front =>({front,back,flipped: false}))