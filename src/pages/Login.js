import React, { useState } from 'react'
import styled from 'styled-components'
import { FaFacebookF, FaGoogle, FaTwitter } from 'react-icons/fa'
import { MdOutlineMail, MdLockOutline } from 'react-icons/md'
import axios from 'axios'
import { Link } from 'react-router-dom'
import product1 from '../assets/product1.jpg'
import { backend_url } from '../utils/constants'
import { useHistory } from 'react-router-dom'
import Loading from '../components/Loading'
function Login() {
    const history = useHistory()
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const [loading,setLoading] = useState(false)

    const { email, password } = user


    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const [loginSuccess,setLoginSuccess] = useState(true)

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        axios.post(backend_url + 'user/login', user).then(res => {
            const { success, token } = res.data
            setLoginSuccess(success)
            if (success) {
                localStorage.setItem("token", token)
                localStorage.setItem("userId",res.data.user._id)
                history.push('/');
                setLoading(false)
            }
        })
    }
    if (loading) {
        return <Loading/>
    }
    return (
        <Wrapper className='section'>
            <div className='left'>
                <img src={product1} alt={"product1"}></img>
            </div>
            <div className='right'>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className='form-item'>
                        <MdOutlineMail />
                        <input type="text" name="email" placeholder='Email' value={email} onChange={onChange}></input>
                    </div>
                    <div className='form-item'>
                        <MdLockOutline />
                        <input type="password" name="password" placeholder='Password' value={password} onChange={onChange}></input>
                    </div>
                    <button>Sign In</button>
                </form>
                <p>Don’t have an account? <Link to='/signup' >Sign Up</Link></p>
                {!loginSuccess && <p style={{color:"red",marginTop:"1rem"}}>Invalid credentials!</p>}
                {/* <div className='social-login'>
                    <p>Sign In via socials</p>
                    <div>
                        <span style={{ marginRight: '1rem' }}>
                            <FaFacebookF />
                        </span>
                        <span style={{ marginRight: '1rem' }}>
                            <FaGoogle />
                        </span>
                        <span>
                            <FaTwitter />
                        </span>

                    </div>
                </div> */}
            </div>
        </Wrapper>
    )
}

export default Login

const Wrapper = styled.div`
    padding-top:3rem;
    display:grid;
    grid-template-columns:1fr;
    gap:2rem;
    .left{
        display:none;
        img{
            height:400px;
            width:500px;
            border-radius:1rem;
        }
    }

    .right{
        width:332px;
        margin:0 auto;
        h1{
            margin-bottom:1rem;
            text-align:center;
        }
        form{
            margin-bottom:1rem;
            input{
                width:80%;
                padding-left:3rem;
            }
            button{
                width:332px;
                padding:1rem;
            }
        }
        .social-login{
            margin-top:2rem;
            p{
                font-size:1rem;
                margin-bottom:1rem;
            }
            div{
                display:flex;
                justify-content:space-between;
                width:332px;
                svg{
                    background-color:#f5f5f5;
                    padding:1rem 2.3rem;
                    border-radius:0.5rem;
                    font-size:1.5rem;
                    cursor:pointer;
                }
            }
        }
    }

    @media screen and (min-width:992px){
        grid-template-columns:1fr 1fr;
        .left{
            display:block;
        }
    }
`