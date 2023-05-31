import styled from "styled-components";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Post({ postData }) {
    const [metadata, setMetadata] = useState({});

    useEffect(() => {
        const promise = api.getMetadata(postData.post.url)
        promise.then(response => {
            const metadata = (response.data);
            setMetadata(metadata);
            console.log((response.data));
        })
        promise.catch(error => {
            console.error('Erro ao obter os metadados da URL:', error);
        });
    }, [])

    return (
        <>
            <PostContainer>
                <div>
                    <img src={postData.image} alt={postData.username} />
                </div>
                <Main>
                    <h1>{postData.username}</h1>
                    <p>{postData.post.description}</p>
                    <MetadataUrl>
                        <div>
                            <h1>{metadata.title}</h1>
                            <p>{metadata.description}</p>
                            <h2>{metadata.url}</h2>
                        </div>
                        <div>
                            <IMAGE src={metadata.images[0]} alt={metadata.title}/>
                        </div>
                    </MetadataUrl>
                </Main>

            </PostContainer>
        </>
    )
}

const IMAGE = styled.img`
    height: 100%;
    width: 100%;
    border-radius: 0px 12px 13px 0px;
    object-fit: cover;
`

const MetadataUrl = styled.div`
    height: 155px;
    width: 100%;
    border: 1px solid #4D4D4D;
    border-radius: 11px;
    display: flex;
    div:first-child{
        display: flex;
        flex-direction: column;
        width: 66%;
        padding: 15px;
        h1{
            font-size: 16px;
            line-height: 19px;
            color: #CECECE;
        }
        p{
            font-size: 11px;
            line-height: 13px;
            color: #9B9595;
        }
        h2{
            font-size: 11px;
            line-height: 13px;
            color: #CECECE;
        }
    }
    div:last-child{
        width: 33%;
        padding: 0;
        margin: 0;
        img{

        }
    }
`

const PostContainer = styled.div`
    display: flex;
    position: relative;
    padding: 20px;
    background: #171717;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    margin-bottom: 15px;
    font-family: 'Lato';
    font-weight: 400;
    font-size: 19px;
    color: #FFFFFF;
    div:first-child{
        img{
            width: 53px;
            height: 53px;
            border-radius: 53px;
            object-fit: cover;
        }
    }
    div{
        margin-right: 15px;
    }
    h1{
        margin-bottom: 10px;
    }
    p{
        font-size: 17px;
        line-height: 20px;
        color: #B7B7B7;
        margin-bottom: 10px;
    }
`

const Main = styled.div`
    width: 90%;
`