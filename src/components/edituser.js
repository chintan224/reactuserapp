import {useState,useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import axios from 'axios'
import {toast} from "react-toastify";

export default function EditUser(props) {
    const[user, setNewUser] = useState({id:"", name:"", email:"", address:""})

    const params=userParams();
    const history=useHistory();

    const baseURL="http://51.186.13.7:8080/api/user/";

    const getData=async() => {
        const result = await axios.get(baseURL+ params.id);
        console.log("Result is: " + result);

        if(result.status==200) {
            setNewUser(result.data);
            console.log("Added User is:  " + user)
            toast.success("Retrieved data from server successfully")
        } else {
            console.log("catastrophy !!!")
            toast.warning("Retrieved data from server successfully")
        }
    }

    useEffect(() => {
        getData();
    }, [])

    const inputChangeHandler = (e) => {
        setNewUser((user) => ({
            ...user, 
            [e.target.name]: e.target.value
        }))
    }

    const updateUser=(e) => {
        e.preventDefault();
        axios.put(baseURL+ params.id, user)
        .then(resp => history.push("/UserList"))
        .catch(err => console.log("Error: ", err))
    }

    return (
        <div className="container">
            <button className='btn btn-secondary' onClick={history.goBack}>Back</button>
            <h1>
                Update User
            </h1>
            <div className="row">
                <div className="col-md-6 offset-3">
                    <form onSubmit={updateUser} className="form">
                        <label>Name</label>
                        <input type="text" name="name" className="form-control"
                            value={user.name} onChange={inputChangeHandler}/>
                        <label>Email</label>
                        <input type="text" name="email" className="form-control"
                            value={user.email} onChange={inputChangeHandler}/>
                        <label>Address</label>
                        <input type="text" name="address" className="form-control"
                            value={user.address} onChange={inputChangeHandler}/>   
                        <input type="submit" value="submitData"/> 
                    </form>
                </div>
            </div>
        </div>
    )
}