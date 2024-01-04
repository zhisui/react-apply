import React, { useRef, useState } from 'react'
import style from './index.scss'
import { User } from './User'
import logo from '@/assets/image/u4858.png'
import CustomModal from './CustomModal'
type ChildRef = {
    closeBtn: any
    confirmBtn: any
    denyBtn: any
}
export default function App() {
    const [open, setOpen] = useState(false)
    const modalRef = useRef<ChildRef>(null)

    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }
    const handleConfirm = () => {
        console.log(modalRef.current?.closeBtn,'test')
        modalRef.current?.closeBtn()
    }

    return (
        <div>
            <div className={style.title}>这是一段文字</div>
            <User />
            <button onClick={handleOpen}>打开弹窗</button>
            <button onClick={handleConfirm}>聚焦关闭按钮</button>
            <button onClick={() => {modalRef.current?.confirmBtn()}}>聚焦确定按钮</button>
            <button onClick={() => {modalRef.current?.denyBtn()}}>聚焦取消按钮</button>
            <CustomModal ref={modalRef} open={open} onClose={handleClose} />

            <img src={logo} alt="图片" style={{ width: '80px', height: '80px' }} />
            <div className={style['image-container']}>
                <div className={style.image}></div>
            </div>
        </div>
    )
}
