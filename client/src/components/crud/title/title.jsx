import React from 'react'
import s from './title.module.css'


export default function Title(){
    return (
        <div className={s.grid}> 
            <div className={s.letra}> Id </div>
            <div className={s.letra}> Name </div>
            <div className={s.letra}> Price </div>
            <div className={s.letra}> Category </div>
            <div className={s.letra}> Action </div>
        </div>
    )
}