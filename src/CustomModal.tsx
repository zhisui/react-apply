import React, { Ref, useEffect, useImperativeHandle, useRef } from 'react'
import style from './modal.scss'

type Props = {
    open: boolean
    onClose: () => void
}
type ChildRef = {
    closeBtn:  () => void,
    confirmBtn: any,
    denyBtn: any,
}

const CustomModal = (props: Props, ref: Ref<ChildRef>) => {
    const closeRef = useRef<HTMLButtonElement>(null)
    const confirmRef = useRef(null)
    const denyRef = useRef(null)


    useImperativeHandle(
      ref,
      () => {
        return  {
            closeBtn: () => {alert('focus closeBtn')},
            confirmBtn: () => {alert('focus confirmBtn')},
            denyBtn: () => {alert('focus denyBtn')}
        }
      },
    )

    if(!props.open) return null
    return (
        <div  className={style.container}>
            <button onClick={props.onClose} ref={closeRef} className={style.close}>&times;</button>
            <h1>标题</h1>
            <div>
                <button ref={confirmRef} >确认</button>
                <button ref={denyRef}>取消</button>
            </div>
        </div>
    )
}

export default React.forwardRef(CustomModal)
