import styled from "styled-components"
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai"
import { useContext, useEffect, useRef, useState } from "react"
import { CgSearch } from "react-icons/cg"
import { DebounceInput } from "react-debounce-input"
import api from "../services/api";
import { useNavigate } from "react-router-dom"
import AuthContext from "../contexts/AuthContext.js"

export default function HeaderWithSearch() {
    const [showLogout, setShowLogout] = useState(false);
    const [name, setName] = useState("")
    const [users, setUsers] = useState([])
    const navigate = useNavigate()
    const { setToken, setUserAuthData } = useContext(AuthContext);
    const { userAuthData } = useContext(AuthContext)
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    function searchUsers(event) {

        if (event.target.value.length === 0) {
            return setUsers([])
        }

        setName(event.target.value)

        const value = event.target.value

        const body = {
            name: value
        }

        api.getUserBySearchBar(body)
            .then((res) => {
                setUsers(res.data)
            })
            .catch((err) => {
                console.log(err.message)
            })

    }

    function openUserPerfil(id) {
        navigate(`/user/${id}`)
        window.location.reload(true)
        setName("")
    }

    function logout() {
        localStorage.clear()
        setToken(undefined)
        setUserAuthData(undefined)
        alert("Voce foi deslogado")
        navigate("/")
    }

    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setShowLogout(false);
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    return (
        <HeaderContainer>
            <Titulo>linkr</Titulo>
            <SearchBar><DebounceInput minLength={3} debounceTimeout={300} onChange={(e) => {
                searchUsers(e)
            }} value={name} placeholder="Search for people"></DebounceInput>
                <CgSearch></CgSearch>
                <UsersContainer>{users.map((user, index) => <div onClick={() => openUserPerfil(user.id)} key={index}><img src={user.image} alt="userImage"></img><p>{user.username}</p></div>)}</UsersContainer>
            </SearchBar>
            <Profile ref={wrapperRef}>
                {!showLogout ?
                    (<AiOutlineDown onClick={() => setShowLogout(!showLogout)} />) : (
                        <>
                            <AiOutlineUp onClick={() => setShowLogout(!showLogout)} />
                            <LogoutContainer>
                                <h1 onClick={() => logout()}>Logout</h1>
                            </LogoutContainer>
                        </>
                    )}
                <img onClick={() => setShowLogout(!showLogout)} src={userAuthData.img} alt="Daenerys" />
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
        cursor:pointer;
        width: 53px;
        height: 53px;
        border-radius: 53px;
        margin-left: 15px;
        object-fit: cover;
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