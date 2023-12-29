import React from 'react'
import style from './index.scss'
import { User } from './User'
import logo from '@/assets/image/u4858.png'
export default function App() {
    return (
        <div>
            <div className={style.title}>这是一段文字</div>
            <User />
            <img src={logo} alt='图片' style={{width:"80px", height:'80px'}}/>
            <div className={style['image-container']}>
                <div className={style.image}></div>

            </div>
        </div>
    )
}
