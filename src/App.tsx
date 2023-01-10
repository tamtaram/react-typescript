import React, { useState, useEffect } from 'react';
import './App.css';
 import NameChangeForm from './Components/NameChangeForm'

interface IAdress {
  city: string,
  state: string,
  country: string,
  postcode: number,
  street: {
    number: number,
    name: string
  }
}

interface IDob {
  age: number
}

interface IUserInfo {
  gender: string,
  email: string,
  name: {
    first: string,
    last: string,
  },
  location: {
    city: string,
  state: string,
  country: string,
  postcode: number,
  street: {
    number: number,
    name: string
  }
  },
  dob: {
    age: number,
  }
}

function App() {
  const [userData, setUserData] = useState<IUserInfo>();
  const [userName, setUserName] = useState<string>();
  const [userAddress, setUserAddress] = useState<IAdress>();
  const [userDob, setUserDob] = useState<IDob>();
  const [newFirstName, setNewFirstName] = useState<string>("");
  const [newLastName, setNewLastName] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("https://randomuser.me/api/");
      const data = await response.json();
      setUserData(data.results[0]);
    }
    getData();
  }, []);

  useEffect(() => {
    setUserName(`${userData?.name.first} ${userData?.name.last}` )
    setUserAddress(userData?.location)
    setUserDob(userData?.dob)
  }
    , [userData])

  const getAddress = () => `${userAddress?.street.name} ${userAddress?.street.number} 
   ${userAddress?.postcode} ${userAddress?.city}
  ${userAddress?.state}
  ${userAddress?.country}`

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setUserName(event.target[0].value);
    event.target[0].value = "";
  }

  return (
    <div className="App">
      <ul>
        <li>Name: {userName}</li>
        <li>Address: {getAddress()} </li>
        <li>Age: {userDob?.age}</li>
      </ul>
      <NameChangeForm changeName={handleSubmit} />
    </div>
  );
}

export default App;