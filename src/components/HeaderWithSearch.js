import styled from "styled-components"
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai"
import { useState } from "react"
import { CgSearch } from "react-icons/cg"
import { DebounceInput } from "react-debounce-input"
import api from "../services/api";
import { useNavigate } from "react-router-dom"

export default function HeaderWithSearch() {
    const [showLogout, setShowLogout] = useState(false);
    const [name, setName] = useState("")
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    function searchUsers(e) {
        if (e.target.value.length < 3) {
            setUsers([])
            return
        }
        e.preventDefault();

        setName(e.target.value)

        const body = {
            name: name
        }

        const promise = api.getUserBySearchBar(body)

        promise.then((res) => {
            setUsers(res.data)
        })
        promise.catch((err) => {
            console.log(err.message)
        })

    }

    function openUserPerfil(id) {
        navigate(`/user/${id}`)
    }

    function logout() {
        localStorage.removeItem("token")
        alert("Voce foi deslogado")
        navigate("/")
    }

    return (
        <HeaderContainer>
            <Titulo>linkr</Titulo>
            <SearchBar><DebounceInput minLength={3} debounceTimeout={300} onChange={(e) => (searchUsers(e))} placeholder="Search for people"></DebounceInput>
                <CgSearch></CgSearch>
                <UsersContainer>{users.map((user, index) => <div onClick={() => openUserPerfil(user.id)} key={index}><img src={user.image} alt="userImage"></img><p>{user.username}</p></div>)}</UsersContainer>
            </SearchBar>
            <Profile>
                {!showLogout ?
                    (<AiOutlineDown onClick={() => setShowLogout(!showLogout)} />) : (
                        <>
                            <AiOutlineUp onClick={() => setShowLogout(!showLogout)} />
                            <LogoutContainer>
                                <h1 onClick={() => logout()}>Logout</h1>
                            </LogoutContainer>
                        </>
                    )}
                <img src="https://i.imgflip.com/3t83o2.jpg?a467976" alt="Daenerys" />
            </Profile>

        </HeaderContainer>
    )
}

const LogoutContainer = styled.div`
    position: fixed;
    z-index: 3;
    width: 150px;
    height: 43px;
    right: 0;
    top: 72px;
    background: #171717;
    border-radius: 0px 0px 0px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    h1{
        font-family: 'Lato', sans-serif;
        font-weight: 700;
        font-size: 15px;
        line-height: 18px;
        letter-spacing: 0.05em;
        color: #FFFFFF;
        cursor: pointer;
    }
`

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    position: fixed;
    z-index: 3;
    width: 100vw;
    height: 72px;
    top: 0px;
    background: #151515;
    color: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const Titulo = styled.h1`
    font-family: 'Passion One', cursive;
    font-style: normal;
    font-weight: 700;
    font-size: 49px;
    line-height: 54px;
`

const Profile = styled.div`
    display: flex;
    align-items: center;
    font-size: 25px;
    svg{
        cursor: pointer;
    }
    img{
        width: 53px;
        height: 53px;
        border-radius: 53px;
        margin-left: 15px;
    }

`

const SearchBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
    width: 563px;
    height: auto;
    background-color: #FFFFFF;
    border-radius: 8px 8px 0 0;
    svg{
        cursor: pointer;
        color: #C6C6C6;
        height: 26px;
        width: 26px;
    }
    input{
        margin-top: 10px;
        margin-bottom: 12px;
        width: 510px;
        height: 23px;
        border-style: none;
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        font-family: 'Lato', sans-serif;
    }
    input:focus {
        box-shadow: 0 0 0 0;
        outline: 0;
    }   
`

const UsersContainer = styled.div`
    z-index: 0;
    display: flex;
    flex-direction: column;
    width: 563px;
    position: fixed;
    text-align: center;
    top: 58px;
    height: auto;
    background-color: #E7E7E7;
    border-radius: 0 0 8px 8px;
    div{
        display: flex;
        align-items: center;
        p{
            font-family: 'Lato';
            font-style: normal;
            font-weight: 400;
            font-size: 19px;
            line-height: 23px;
            color: #515151;
    }
    }
    img{
        width: 39px;
        height: 39px;
        border-radius: 39px;
        margin: 14px 12px 16px 17px;
    }
`