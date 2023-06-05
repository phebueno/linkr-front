import { useState } from "react"
import api from "../services/api";
import styled from "styled-components";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

export default function AddPost() {
    const [form, setForm] = useState({ "url": "", "description": "" });
    const [isLoading, setIsLoading] = useState(false);
    const { token, userAuthData } = useContext(AuthContext);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        const promise = api.addPost(token, { ...form });
        promise.then((res) => {
            window.location.reload(true)
            setIsLoading(false);
        });
        promise.catch(() => {
            setIsLoading(false);
            alert('Houve um erro ao publicar seu link');
        });
    }

    return (
        <>
            <FormContainer>
                <div>
                    <img src={userAuthData.img} alt="userImage" />
                </div>
                <Form onSubmit={handleSubmit}>
                    <h1>What are you doing to share today?</h1>
                    <Input
                        type="text"
                        placeholder="http://..."
                        name="url"
                        onChange={handleChange}
                        value={form.url}
                        disabled={isLoading}
                        required
                    />
                    <Input
                        type="text"
                        placeholder="Awesome article about #javascript"
                        name="description"
                        onChange={handleChange}
                        value={form.description}
                        disabled={isLoading}
                    />
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Publishing..." : "Publish"}
                    </Button>
                </Form>
            </FormContainer>
        </>
    )
}

const FormContainer = styled.div`
    display: flex;
    position: relative;
    padding: 20px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    margin-bottom: 36px;
    img{
        width: 53px;
        height: 53px;
        border-radius: 53px;
        object-fit: cover;
    }
    div{
        margin-right: 15px;
    }
    span{
        position: absolute;
        top: -70px;
        font-family: 'Oswald', sans-serif;
        font-weight: 700;
        font-size: 43px;
        color: #FFFFFF;
    }
    @media (max-width:950px){
        width: 100%;
    }
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    h1{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 300;
        font-size: 20px;
        line-height: 24px;
        color: #707070;
        margin-bottom: 10px;
    }
    input:last-of-type {
        height: 66px;
        margin-bottom: 30px;
    }
`

const Input = styled.input`
    width: 503px;
    height: 30px;
    background: #EFEFEF;
    border-radius: 5px;
    outline: none;
    border: none;
    margin-bottom: 5px;
    padding: 10px;
    width: 100%;
`

const Button = styled.button`
    position: absolute;
    width: 112px;
    height: 31px;
    bottom: 10px;
    right: 23px;
    background: #1877F2;
    border-radius: 5px;
    border: none;
    color: #FFFFFF;
`