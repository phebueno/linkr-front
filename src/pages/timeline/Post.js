import styled from "styled-components";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export default function Post({ postData }) {
    const [metadata, setMetadata] = useState({});
    const [liked, setLiked] = useState(postData.post.liked);

    useEffect(() => {
        const promise = api.getMetadata(postData.post.url)
        promise.then(response => {
            const metadata = (response.data);
            setMetadata(metadata);
        })
        promise.catch(error => {
            console.error('Erro ao obter os metadados da URL:', error);
        });
    }, []);

    const handleLike = async () => {
        try {
            if (liked) {
                await api.dislikePost("token", postData.post.id);
            } else {
                await api.likePost("token", postData.post.id);
            }
            setLiked(!liked);
        } catch (error) {
            console.error("Erro ao curtir ou descurtir o post:", error);
        }
    };

    return (
        <>
            {metadata.title &&
                <PostContainer>
                    <div>
                        <img src={postData.image} alt={postData.username} />
                        <LikeContainer onClick={handleLike}>
                            {postData.post.liked ? <LikeIcon /> : <NoLikeIcon />}
                            <p>{postData.post.likes} likes</p>
                        </LikeContainer>
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
                                {metadata.images && metadata.images.length > 0 && (
                                    <IMAGE src={metadata.images[0]} alt={metadata.title} />
                                )}
                            </div>
                        </MetadataUrl>
                    </Main>
                </PostContainer>
            }
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
    }
`

export const LikeIcon = styled(AiFillHeart)`
    color: red;
`;

export const NoLikeIcon = styled(AiOutlineHeart)`
    color: white;
`;

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

const LikeContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 15px;
    p{
        font-size: 11px;
    }
    img{
        width: 53px;
        height: 53px;
        border-radius: 53px;
        object-fit: cover;
    }
`

const Main = styled.div`
    width: 90%;
`