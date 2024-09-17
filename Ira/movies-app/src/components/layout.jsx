import React from 'react';
import Footer from './footer'; 




function Layout(props) {    
    return (        
        <div className="wrapper">
	    {props.children}
        <Footer/>
	</div>               
    );	    

}




export default Layout;