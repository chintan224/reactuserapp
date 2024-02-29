import {useState} from 'react'
import {Button, TextField} from '@material-ui/core'

import {Save} from '@material-ui/icons'
import {toast} from 'react-toastify'
import Joi from "joi-browser"
import {useHistory} from "react-router-dom"

import UserService from '../service/userService'

export default function UserForm(props) {
    const [formData, setNewFormData] = useState({
        name: "",
        email: "",
        address: ""
    })

    const [errors, setNewErrors] = useState("")
    const history = useHistory();

    const schema={
        id:"",
        name:Joi.string().required.lable("First Name"),
        email:Joi.string().required(),
        address:Joi.string().required()
    }

    const validateProperty= (event) => {
        const {name, value} = event.target;
        const obj = {[name]:value};
        const subschema = {[name]:schema[name]}
        const result = Join.validate(obj, subschema);
        console.log(result);
        const {error} = result;
        return error ? error.details[0].message : null
    }

    const validate=() => {
        const result = Joi.validate(formData, schema, {abortEarly: false});
        console.log(result);
        if(!result.error) {
            return null
        }
        else {
            const errorData = {};
            for(let item of result.error.details) {
                errorData[item.path[0]] = item.message;
            }
            setNewErrors(errorData);
            return errorData;
        }
    }

    const inputChangeHandler = (event) => {
        const {name, value} = event.target; // accessing name and value of field being changed
        let errorData = {...errors} // taking clone of errors of state using spread operator
        const errorMessage = validateProperty(event); // collecting set of errors
        if(errorMessage) { //if no errors 
            errorData[name] = errorMessage;//  errorData[firstName] = "firstName is required."
        } else {
            delete errorData[name]; // on correcting the value delete existing error data
        }

        let userData= {...formData} // copying current state of formdata
        userData[name]=value; //updating the value of formdata
        setNewFormData(userData); //updating state of formdata
        setNewErrors(errorData); //updating state of errors
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let newuser = {...formData};
        const errors = validate();
        if(!errors) {
            UserService.create(newUser).then(response => {
                history.push("/userList")
            }).catch(error =>{console.log(error);})
            toast.success("User Added Successfully")
        } else {
            console.log("Error creating user: ", errors)
            toast.error("Error Adding User")
        }
    }

    return (
        <div className="container">
            <h3> Add User</h3>
            <div className="row">
                <div className="col-md-6 offset-3">
                    <form className="ui form" onSubmit={(event) =>handleSubmit(event)}>
                        <div className="form-group">
                            <TextField variant="outlined"
                                color="secondary"
                                name="name"
                                label="Firstname"
                                value={FormData.name}
                                autofocus
                                margin="normal"
                                fullWidth
                                onChange={(event) => inputChangeHandler(event)}/>
                                {errors.name && <div className="alert alert-danger">{errors.name}</div>}
                        </div>
                        <div className="form-group">
                            <TextField variant="outlined"
                                color="secondary"
                                name="email"
                                label="Email"
                                value={FormData.email}
                                autofocus
                                margin="normal"
                                fullWidth
                                onChange={(event) => inputChangeHandler(event)} />
                                {errors.email && <div className="alert alert-danger">{errors.email}</div>}
                        </div>
                        <div className="form-group">
                            <TextField variant="outlined"
                                color="secondary"
                                name="address"
                                label="Address"
                                value={FormData.address}
                                autofocus
                                margin="normal"
                                fullWidth
                                onChange={(event) => inputChangeHandler(event)} />
                                {errors.address && <div className="alert alert-danger">{errors.address}</div>}
                        </div>

                        <Button type="submit" startIcon={<Save/>} 
                            variant="contained" color="secondary"
                            style={{fontSize:20}}>Submit
                        </Button>

                    </form>
                </div>
            </div>
        </div>
    )
}