import { useState } from "react"
import api from "../../services/api";
import styled from "styled-components";

export default function AddPost() {
    const [form, setForm] = useState({ "url": "", "description": "" });
    const [isLoading, setIsLoading] = useState(false);

    //Falta o token

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        const promise = api.addPost("token", { ...form });
        promise.then((res) => {
            //Habilitar botões, limpar form, atualizar timeline
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
                <span>timeline</span>
                <div>
                    <img src="https://i.imgflip.com/3t83o2.jpg?a467976" alt="Daenerys"/>
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
    width: 50vw;
    max-width: 611px;
    height: 200px;
    margin: 70px auto;
    padding: 20px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    img{
        width: 53px;
        height: 53px;
        border-radius: 53px;
    }
    div{
        margin-right: 10px;
    }
    span{
        position: absolute;
        top: -70px;
        font-family: 'Oswald', sans-serif;
        font-weight: 700;
        font-size: 43px;
        color: #FFFFFF;
    }
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
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