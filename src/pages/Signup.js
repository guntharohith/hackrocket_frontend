import React, { useState } from 'react'
import styled from 'styled-components'
import { AiOutlineMobile } from 'react-icons/ai'
import { MdOutlineMail, MdLockOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'
import axios from 'axios'
import product1 from '../assets/product1.jpg'
import { backend_url } from '../utils/constants'
import { useHistory } from 'react-router-dom'
function Signup() {
    const history = useHistory()
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        email: '',
        password: ''
    })
    const { firstName, lastName, mobileNumber, email, password } = user

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(backend_url + 'user/signup', user).then((res) => history.push('/login') )
    }
    return (
        <Wrapper className='section'>
            <div className='left'>
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className='name'>
                        <div className='form-item'>
                            <input type='text' name='firstName' placeholder='First name' value={firstName} onChange={onChange}></input>
                        </div>
                        <div className='form-item'>
                            <input type='text' name='lastName' placeholder='Last name' value={lastName} onChange={onChange}></input>
                        </div>
                    </div>
                    <div className='form-item'>
                        <AiOutlineMobile />
                        <input className="icon-input" type="text" name="mobileNumber" placeholder='Mobile number' value={mobileNumber} onChange={onChange}></input>
                    </div>
                    <div className='form-item'>
                        <MdOutlineMail />
                        <input className="icon-input" type="email" name="email" placeholder='Email address' value={email} onChange={onChange}></input>
                    </div>
                    <div className='form-item'>
                        <MdLockOutline />
                        <input className="icon-input" type="password" name="password" placeholder='Password' value={password} onChange={onChange}></input>
                    </div>
                    <div className='checkbox'>
                        <input type="checkbox"></input>
                        <label>Subscribe to our newsletter</label>
                    </div>
                    <button type='submit'>Sign In</button>
                </form>
                <p>Already have an account? <Link to='/login' >Log In</Link></p>
            </div>
            <div className='right'>
                <img src={product1} alt={"product1"}></img>
            </div>
        </Wrapper>
    )
}

export default Signup

const Wrapper = styled.div`
    display:grid;
    align-items:center;
    grid-template-columns:1fr;
    gap:2rem;       
    padding-top:3rem;
    .right{
        display:none;
        img{
            height:400px;
            width:500px;
            border-radius:1rem;
        }
    }
    .left{
        width:332px;
        margin:0 auto;
        h1{
            margin-bottom:1rem;
            text-align:center;
        }
        p{
            text-align:center;
        }
        form{
            margin-bottom:1rem;
            input{
                width:80%;
            }
            .name{
                display:grid;
                grid-template-columns:1fr 1fr;
                column-gap:1rem;
                input{
                    width:124px;
                }
            }
            .icon-input{
                padding-left:3rem;
            }
            button{
                width:332px;
                padding:1rem;
            }
            .checkbox{
                input{
                    width:1rem;
                }
            }
        }
    }
    @media screen and (min-width:992px){
        grid-template-columns:1fr 1fr;
        .right{
            display:block;
        }
    }
`