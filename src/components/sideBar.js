import React from 'react'
import { auth } from '../server/firebase'
import { firestore } from '../server/firebase'

export default function SideBar() {
    const person = useRef();
    const channelsRef = firestore.collection('channels');
    const query = channelsRef.orderBy('createdAt').limit(25);
  
  
    const [channels] = useCollectionData(query, { idField: 'id' });
  
    const [formValue, setFormValue] = useState('');
  
    const sendChannel = async (e) => {
      e.preventDefault();
  
      const { uid, photoURL } = auth.currentUser;
  
      await channelsRef.add({ 
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL
      })
  
      setFormValue('');
      person.current.scrollIntoView({ behavior: 'smooth' });
    }
  
    return (<>
      <h3>
        Channels
      </h3>
  
      <form className="channelForm" onSubmit={sendChannel}>
  
        <input className="channelInput" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type Channel" />
  
        <button className="channelButton" type="submit" disabled={!formValue}>Create</button>
  
      </form>
  
      <main className="channelMain">
  
        {channels && channels.map(chnl => <Channel key={chnl.id} channel={chnl} />)}
  
        <span ref={person}></span>
  
      </main>
    </>)
  }
