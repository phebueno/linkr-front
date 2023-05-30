import styled from "styled-components";
import Header from "../../components/Header";
import AddPost from "./AddPost";

export default function Timeline() {
    return (
        <>
            <Header />
            <Container>
                <AddPost />

            </Container>
        </>
    )
}

const Container = styled.div`
    height: calc(100vh);
    background: #333333;
    padding-top: 150px;
    border: 1px solid red;
`
