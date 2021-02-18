import React, { useState } from 'react'
import {Tab,Nav,Button,Modal} from 'react-bootstrap' // used for Navigating the SideBar
import Contact from './Contact';
import Conversation from './Conversation';
import NewContactModal from './NewContactModal';
import NewConversationModal from './NewConversationModal';

const CONVERSATION_KEY = 'conversation'; // These constants linked to event keys allows us to change tabs 
const CONTACTS_KEY = 'contacts';

function SideBar({id}) {
    const [activeKey,setActiveKey] =useState(CONVERSATION_KEY) // Sets the Default Tab to conversation once the App Loads
    const conversationsOpen = activeKey === CONVERSATION_KEY
    const [modalOpen, setModalOpen] = useState(false)

    function closeModal()
    {

        setModalOpen(false)
    }

    return (
        <div style={{width: '250px'}} className="d-flex flex-column">

            <Tab.Container activeKey={activeKey} onSelect={setActiveKey}> 
                <Nav variant="tabs" className="justify-content-center"> {/*bootstrap CSS to make it easier to identify what tab we are in*/}
                    <Nav.Item>
                        <Nav.Link eventKey={CONVERSATION_KEY}>Conversation</Nav.Link> {/*This Creates the Tabs that will be used for the Applications */} 
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link> 
                    </Nav.Item>
                </Nav>
                <Tab.Content className="border-right overflow-auto flex-grow-1">
                    {/*This Will Hold All the Information , Once we Click on the Tab*/}
                    <Tab.Pane eventKey={CONVERSATION_KEY}>
                        {/*For Determining which content goes into which Tab*/}
                        <Conversation/>
                    </Tab.Pane>
                    <Tab.Pane eventKey={CONTACTS_KEY}>
                        <Contact/>
                    </Tab.Pane>
                </Tab.Content>
                <div className="p-2 border-top border-right small">
                    {/*Obviously Here to Display the Id asccociated with the Account*/}
                    Your ID :<span className="text-muted">{id}</span>
                </div>
                <Button className="rounded-0" onClick={()=> setModalOpen(true)}>
                    {/*Used to Make New Conversation in the Messaging App*/}
                    New{conversationsOpen ? 'Conversation':'Contact'} {/*Changes the Name of the Button based on the Tab Open*/}
                </Button>
            </Tab.Container>
            <Modal show={modalOpen} onHide={closeModal}>
                {/*Aids int the Creation of Either New Conversations or New Contacts*/}
                 {/*Close Modal Gives us the Ability to close our Conversation or Contact Windows*/}
                {conversationsOpen ?
                    <NewConversationModal closeModal={closeModal}/>:
                    <NewContactModal closeModal={closeModal}/>
                }
            </Modal>

        </div>
    )
}

export default SideBar
