import React, { useState, useEffect } from 'react';

function NameChangeForm({changeName} : {changeName: (event: any) => void}) {  
    const [newFirstName, setNewFirstName] = useState<string>("");
    
    //const handleSubmit = (event: any): void => {
      //event.preventDefault();
     // newFirstName ? newFirstName : "";
    //}
  
    return (
        <form onSubmit={changeName}>
          <label>
            Change name:
            <input type="text" id="firstname" name="user_name" value={newFirstName}
              onChange={(e) => setNewFirstName(e.target.value)}
            /></label><br />
          <button type="submit">Change name</button>
        </form>
    );
  }

  export default NameChangeForm;