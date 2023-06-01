import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"

export default function SignIn() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    function login(e) {
        e.preventDefault()
        const obj = { email, password }
        axios.post("http://localhost:5000/signin", obj)
            .then(() => navigate("/timeline"))
            .catch(err => alert(err.response.data))
    }

    return (
        <Container>
            <Banner>
                <h1>linkr</h1>
                <h2>save, share and discover <br />the best links on the web</h2>
            </Banner>
            <Login>
                <Form onSubmit={login}>
                    <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
                    <button>Log In</button>
                </Form>
                <Link to={"/sign-up"}>First time? Create an account!</Link>
            </Login>
        </Container>
    )
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
    input{
        width: 430px;
        height: 65px;
        margin-bottom: 10px;
        padding-left: 2%;
        border-radius: 6px;
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 27px;
        line-height: 40px;
        color: #9F9F9F;
    }
    button{
        width: 430px;
        height: 65px;
        background-color: #1877F2;
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 27px;
        line-height: 40px;
        color: #FFFFFF;
        outline: 0;
        border: 0;
        cursor: pointer;
    }
`

const Login = styled.div`
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    a{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 24px;
        text-decoration-line: underline;
        color: #FFFFFF;
        margin-top: 10px;
    }
`

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
`

const Banner = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 140px;
    background-color: #000000;
    h1{
        font-family: 'Passion One';
        font-style: normal;
        font-weight: 700;
        font-size: 106px;
        line-height: 117px;
        letter-spacing: 0.05em;
        color: #FFFFFF;
    }
    h2{
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 43px;
        line-height: 64px;
        color: #FFFFFF;
    }
`