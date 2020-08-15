import React from 'react'
import s from './home.module.css'
import Heading from '../Heading/crud_heading.jsx'
import Title from '../title/title.jsx'
import Product from '../product/product.jsx'
import Update from '../crud_update_product/CrudUpdateProduct.jsx'
import {Route} from 'react-router-dom';

export default function Home(){
    return (
        <div className={s.component}> 
            <Route exact path="/" component={Heading}/> 
            <Route exact path="/" component={Title}/>
            <Route exact path="/" component={Product}/>
            
        </div>
    )
}