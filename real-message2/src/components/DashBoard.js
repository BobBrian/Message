import React from 'react'
import SideBar from './SideBar'
import OpenConversation from './OpenConversation'
import { useConversations } from '../context/ConversationsProvider'

function DashBoard({id}) {

    const { selectedCnversation} = useConversations()

    return (
        

        <div className="d-flex" style={{height:'100vh'}}> 
                <SideBar id= {id} />
                {selectedCnversation && <OpenConversation/>}
        </div>
        
    )
}

export default DashBoard