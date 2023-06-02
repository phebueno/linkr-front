import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { TbTrashFilled } from "react-icons/tb";

Modal.setAppElement("#root");

export default function DeletePostModal({postId}) {
  const [isOpen, setIsOpen] = useState(false);

  function deletePost(postId){
    alert(`Deletando post de id ${postId}...`)
    setIsOpen(false);
  }

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <TrashBtn onClick={toggleModal}/>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        className="_"
        overlayClassName="_"
        contentElement={(props, children) => (
          <ModalStyle {...props}>{children}</ModalStyle>
        )}
        overlayElement={(props, contentElement) => (
          <OverlayStyle {...props}>{contentElement}</OverlayStyle>
        )}
      >
        <p>Are you sure you want to delete this post?</p>
        <div>
          <CancelBtn onClick={toggleModal}>No, go back</CancelBtn>
          <ConfirmBtn onClick={()=>deletePost(postId)}>Yes, delete it</ConfirmBtn>
        </div>
      </Modal>
    </>
  );
}

const OverlayStyle = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3500;
  background: rgba(255, 255, 255, 0.9);
`;

const TrashBtn = styled(TbTrashFilled)`
cursor: pointer;`

const CancelBtn = styled.button`
  background: #ffffff;
  color: #1877f2;
`;

const ConfirmBtn = styled.button`
  background: #1877f2;
  color: #ffffff;
`;

const ModalStyle = styled.div`
  width: 597px;
  height: 262px;
  background: #333333;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  border-radius: 50px;
  :focus{
    outline: none;
  }
  p {
    max-width: 380px;
    font-family: "Lato", sans-serif;
    font-weight: 700;
    font-size: 34px;
    line-height: 41px;
    text-align: center;
    color: #ffffff;
  }
  div {
    display: flex;
    gap: 27px;
  }
  button {
    width: 134px;
    height: 37px;
    border: none;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: "Lato", sans-serif;
    font-weight: 700;
    font-size: 18px;
  }
`;
