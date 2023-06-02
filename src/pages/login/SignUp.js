import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { Oval } from "react-loader-spinner"

export default function SignUp() {
    const [email, setEmail] = useState()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [picture, setPicture] = useState()
    const [disabled, setDisabled] = useState(false)
    const navigate = useNavigate()

    function register(e) {
        e.preventDefault()
        setDisabled("disabled")
        const obj = { email, password, username, picture }
        axios.post("http://localhost:5000/signup", obj)
            .then(() => {
                alert("Conta registrada com sucesso")
                navigate("/")
            })
            .catch(err => {
                alert(err.response.data)
                setDisabled(false)
            })
    }

    return (
        <Container>
            <Banner>
                <h1>linkr</h1>
                <h2>save, share and discover <br />the best links on the web</h2>
            </Banner>
            <Login>
                <Form onSubmit={register}>
                    <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
                    <input placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />
                    <input placeholder="picture" value={picture} onChange={e => setPicture(e.target.value)} />
                    <button disabled={disabled}>{disabled === false ? "Sign up" : <Oval
                        height={50}
                        width={50}
                        color="#4fa94d"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel='oval-loading'
                        secondaryColor="#4fa94d"
                        strokeWidth={2}
                        strokeWidthSecondary={2}

                    />}</button>
                </Form>
                <Link to={"/"}>Switch back to log in</Link>
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
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #1877F2;
        border-radius: 6px;
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
    @media (max-width:950px){
        justify-content: center;
        align-items: center;
        margin-top: 40px;
        button, input{
            width: 330px;
        }
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
    @media (max-width: 950px){
        width: 100%;    
    }
`

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    @media (max-width: 950px){
        flex-direction: column;
    }
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
    @media (max-width:950px){
        width: 100%;
        height: 180px;
        align-items: center;
        padding-left: 0;
        h1{
            font-size: 76px;
            line-height: 84px;
        }
        h2{
            font-size: 23px;
            line-height: 34px;
        }
    }
`