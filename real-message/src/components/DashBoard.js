import React from 'react'
import OpenConversation from './OpenConversation'
import SideBar from './SideBar'

function DashBoard({id}) {
    return (

        <div className="d-flex" style={{height:'100vh'}}> 
                <SideBar id= {id} />
                <OpenConversation/>
        </div>
        
    )
}

export default DashBoard
