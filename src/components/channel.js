import React from 'react';
import { auth } from '../server/firebase'

export default function Channel(props) {
    const { text, uid } = props.channel;
  
    const channelClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  
    return (<>
      <div className={`channel ${channelClass}`}>
        <p># {text}</p>
      </div>
    </>)
}

export { Channel };
