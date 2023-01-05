import React, { useState, useEffect} from 'react';
import './App.css';

interface IName {
  first: string,
  last: string,
}

interface IAdress {
  city: string,
  state: string,
  country: string,
  postcode: number,
  street: IStreet
}

interface IStreet {
  number: number,
  name: string
}

interface IDob {
  age: number
}

interface IUserInfo {
  gender: string,
  email: string,
  name: IName,
  location: IAdress,
  dob: IDob
}

interface IResults {
  results: IUserInfo[]
}

function App() {
  const [userData, setUserData] = useState<IResults>();
  const [userName, setUserName] = useState<IName>();
  const [userAddress, setUserAddress] = useState<IAdress>();
  const [userDob, setUserDob] = useState<IDob>();
  const [newFirstName,setNewFirstName] = useState<string>("");
  const [newLastName,setNewLastName] = useState<string>("");



  useEffect(() => {
    const getData = async () => {
      const response = await fetch("https://randomuser.me/api/");
      const results = await response.json();
      setUserData(results);
    }
    getData();
  }, []);

  useEffect(() => {
    setUserName(userData?.results[0].name)
    setUserAddress(userData?.results[0].location)
    setUserDob(userData?.results[0].dob)}
  , [userData])

  const getName = () => `${userName?.first} ${userName?.last}`;
  const getAddress = () => `${userAddress?.street.name} ${userAddress?.street.number} 
   ${userAddress?.postcode} ${userAddress?.city}
  ${userAddress?.state}
  ${userAddress?.country}` 

  const handleSubmit = () => {
    setUserName({first: newFirstName ? newFirstName : "", last: newLastName ? newLastName : ""});
  }

  return (
    <div className="App">
      <ul>
        <li>Name: {getName()}</li>
        <li>Address: {getAddress()} </li>
        <li>Age: {userDob?.age}</li> 
        <li>Gender: {userData?.results[0].gender}</li> 
     </ul>
     <form onSubmit={handleSubmit}>
      <label>
        First name:
      <input type="text" id="firstname" name="user_name" value={newFirstName}
          onChange={(e) => setNewFirstName(e.target.value)}
 /></label><br />
 <label>Last name: 
 <input type="text" id="lastname" name="user_name" value={newLastName}
          onChange={(e) => setNewLastName(e.target.value)}
 /></label><br />
      <button type="submit">Change name</button>
     </form>
    </div>
  );
}

export default App;

