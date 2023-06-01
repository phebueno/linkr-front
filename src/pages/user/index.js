import styled from "styled-components";
import HeaderWithSearch from "../../components/HeaderWithSearch";
import { useParams } from "react-router-dom"
import UserPost from "../../components/UserPost";

export default function UserPage() {

    const { id } = useParams()

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
        <PageContainer>
            <HeaderWithSearch />
            <Title><img src="https://i.imgflip.com/3t83o2.jpg?a467976" alt="Daenerys" />Juvenal Juvêncio's posts</Title>
            <Container>
                {postsData.map(postData => (
                    <UserPost postData={postData} key={postData.post.id} />
                ))}
            </Container>
        </PageContainer>
    )
}

const Container = styled.div`
    height: calc(100vh);
    width: 50vw;
    max-width: 611px;
    margin: 0px auto;
`

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Title = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 135px;
    margin-bottom: 41px;
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    font-size: 43px;
    color: #FFFFFF;
    img{
        width: 53px;
        height: 53px;
        border-radius: 53px;
        object-fit: cover;
        margin-right: 18px;
    }
`