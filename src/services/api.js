import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

function createConfig(token) {
    return { headers: { Authorization: `Bearer ${token}` } };
}

//Criar as requisições HTTP para o nosso back
function getPosts(token) {
    const config = createConfig(token);
    const promise = axios.get(`${BASE_URL}/posts`, config);
    return promise;
}

function addPost(token, body) {
    const config = createConfig(token);
    const promise = axios.post(`${BASE_URL}/new-post`, body, config);
    return promise;
}

function getMetadata(url) {
    const promise = axios.get(`https://jsonlink.io/api/extract?url=${url}`);
    return promise;
}

function likePost(token, postId) {
    const config = createConfig(token);
    const promise = axios.post(`${BASE_URL}/like/${postId}`, null, config);
    return promise;
}

function dislikePost(token, postId) {
    const config = createConfig(token);
    const promise = axios.delete(`${BASE_URL}/dislike/${postId}`, config);
    return promise;
}

function getTrending() {
    const promise = axios.get(`${BASE_URL}/trendingtags`)
    return promise;
}

function getHashtagPosts(token, hashtagName) {
    const config = createConfig(token);
    const promise = axios.get(`${BASE_URL}/hashtag/${hashtagName}`, config)
    return promise;
}

function getUserBySearchBar(body, token) {
    const config = createConfig(token);
    const promise = axios.post(`${BASE_URL}/search`, body, config)
    return promise;
}

function getPostsByUserId(token, userId) {
    const config = createConfig(token);
    const promise = axios.get(`${BASE_URL}/user/${userId}`, config)
    return promise
}

function deletePostById(token, postId) {
    const config = createConfig(token);
    const promise = axios.delete(`${BASE_URL}/delete/${postId}`, config)
    return promise
}

function editPostById(token, body, postId) {
    const config = createConfig(token);
    const promise = axios.patch(`${BASE_URL}/update/${postId}`, body, config)
    return promise
}

function followUser(token, body) {
    const config = createConfig(token)
    const promise = axios.post(`${BASE_URL}/follow`, body, config)
    return promise
}

function unfollowUser(token, body) {
    const config = createConfig(token)
    const promise = axios.post(`${BASE_URL}/unfollow`, body, config)
    return promise
}

function followers(token) {
    const config = createConfig(token)
    const promise = axios.get(`${BASE_URL}/followers`, config)
    return promise
}

const api = {
    getPosts,
    addPost,
    getMetadata,
    likePost,
    dislikePost,
    getTrending,
    getHashtagPosts,
    getUserBySearchBar,
    getPostsByUserId,
    deletePostById,
    editPostById,
    followUser,
    unfollowUser,
    followers
}

export default api;