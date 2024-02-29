import {Link} from 'react-router-dom';

export default function AppNavBar() {
    return(
        <nav className='navbar navbar-inverse'>
            <div className="container-fluid">
                <Link to="/"> My Papa's Bank</Link>
                <span>|</span>
                <Link to="/createUser">Create User</Link>
                <span>|</span>
                <Link to="/userList">List Users</Link>
            </div>
        </nav>
    )
}