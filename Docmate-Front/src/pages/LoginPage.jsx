import {Link, Navigate} from "react-router-dom";
import {useContext, useState} from "react";
import axios from "axios";
import {UserContext} from "../UserContext";//../UserContext.jsx
export default function LoginPage(){
    //We need to add some state for our input
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);

    async function handleLoginSubmit(ev) {
      ev.preventDefault();
      try{
        const data=await axios.post('/login', {email,password});
        setUser(data);
        alert('Login successful');
        //After Login successful we will redirect to new page

        setRedirect(true);
      }
      catch(e){
        alert('Login failed');
      }
    }
    //Re-direct to the home page
    if (redirect) {
        return <Navigate to={'/'} />
    }

    
    return(
        <div className="mt-4 grow flex items-center justify-around">
            {/*mt-4->mergin top-4 */}
            <div className="mb-64">
                {/*mb-64->Margin botton of 64*/}
                <h1 className="text-4xl text-center mb-4">Login</h1>
                {/* mb-4->Margin Button of 4 */}
                <form className="max-w-md mx-auto broder" onSubmit={handleLoginSubmit}>
                    {/*max-w-md->Maximum-Width-Medium 
                       mx-auto->Margin*/}
                       <input type="email"
                              placeholder="your@email.com"
                              value={email}
                              onChange={ev => setEmail(ev.target.value)} />
                        <input type="password"
                               placeholder="password"
                               value={password}
                               onChange={ev => setPassword(ev.target.value)}/>
                        <button className="primary">Login</button>
                        {/* If Don't have an account yet, We have Create a link to open Register Form*/}
                        <div className="text-center py-2 text-gray-500">
                            Don't have an account yet? 
                            <Link className="" to={'/register'}>
                                Register now
                            </Link>
                        </div>
                    </form>
            </div>
        </div>
    )
}