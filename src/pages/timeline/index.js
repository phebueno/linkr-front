import styled from "styled-components";
import AddPost from "./AddPost";
import Post from "./Post";
import HeaderWithSearch from "../../components/HeaderWithSearch";

export default function Timeline() {

    //teste
    //Fazer a requisição e armazenar em postsData
    const postsData = [
        {
            "username": "michael",
            "image": "https://labdicasjornalismo.com/images/noticias/2291/2291_14122019034747.jpg",
            "post":
            {
                "id": 1,
                "url": "https://www.devmedia.com.br/usando-os-operadores-like-in-e-between-no-oracle/24687",
                "description": "Muito bom!! #like",
                "createdAt": "2023-05-30T00:46:48.713093",
                "likes": 12,
                "liked": false
            },
        },
        {
            "username": "daenerys",
            "image": "https://labdicasjornalismo.com/images/noticias/2291/2291_14122019034747.jpg",
            "post": {
                "id": 2,
                "url": "https://www.devmedia.com.br/usando-os-operadores-like-in-e-between-no-oracle/24687",
                "description": "Muito bom!! #like",
                "createdAt": "2023-05-30T00:46:48.713093",
                "likes": 15,
                "liked": true
            },
        }
    ]

    return (
        <>
            <HeaderWithSearch/>
            <Container>
                <AddPost />
                {postsData.map(postData => (
                    <Post postData={postData} key={postData.post.id}/>
                ))}
            </Container>
        </>
    )
}

const Container = styled.div`
    height: calc(100vh);
    padding-top: 210px;
    width: 50vw;
    max-width: 611px;
    margin: 0px auto;
`
