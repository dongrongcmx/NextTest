
import React, { Component } from "react";
import glamorous from "glamorous";

import { NavInfo } from '../config/defaultInfo'

const LOGO = '/static/images/logo.png'

const Container = glamorous.div({
    width:'100%',
    height:'72px',
    display:'flex',
    justifyItems:'center',
    justifyContent:'space-between'
})

const Logo = glamorous.img({
    width:'146px',
    height:'50px'
})

const NavList = glamorous.ul({

})

const Serch = glamorous.input({
    borderBottom:'1px solid #333',
    width:'80px',
    marginLeft:'20px',
    lineHeight:'30px'
})

const Panle = glamorous.div({
    
})

class Nav extends Component{
    render() {
        return (
             <Container>
                 <Logo src={LOGO} />
                 <NavList></NavList>
                 <Serch className={'search'} placeholder={'Search'}/>
                 <Panle></Panle>
             </Container>
        );
    }
}
 export default Nav