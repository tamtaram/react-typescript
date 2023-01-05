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
    setUserDob(userData?.results[0].dob)

  }, [userData])

  /*

  */
  
  return (
    <div className="App">
      <ul>
        <li>{userData?.results[0].gender}</li> 
        <li>{userName?.first}</li>

<li>{userAddress?.country} </li>
<li>{userDob?.age}</li> 
     </ul>
    </div>
  );
}

export default App;

