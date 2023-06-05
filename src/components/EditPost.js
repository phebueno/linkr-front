import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useContext } from "react";
import styled from "styled-components";
import AuthContext from "../contexts/AuthContext.js";
import useForm from "../hooks/useForm.js";
import api from "../services/api.js";

export default function EditPost({ postData, updatePostData, setEditMode }) {
  const { form, handleForm } = useForm({
    description: postData.post.description,
  });
  const { token } = useContext(AuthContext);
  const inputRef = useRef(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function submitForm(e) {
    setDisabled(true);
    e.preventDefault();
    api
      .editPostById(token, form, postData.post.id)
      .then((res) => {
        console.log("OK!");
        updatePostData();
        setEditMode(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Não foi possível salvar suas alterações");
        setDisabled(false);
      });
  }

  function detectEscape(event) {
    if (event.key === "Escape") setEditMode(false);
    if(event.key ==="Enter" && !event.shiftKey) submitForm(event);
    event.target.style.height = `${event.target.scrollHeight}px`; 
  }

  return (
    <form onSubmit={submitForm}>
      <EditInput
        ref={inputRef}
        onKeyDown={detectEscape}
        name="description"
        value={form.description}
        onChange={handleForm}
        disabled={disabled}

        required
      />
    </form>
  );
}

const EditInput = styled.textarea`
width:100%;
padding: 5px 10px;
font-family: 'Lato';
font-style: normal;
font-weight: 400;
font-size: 14px;
color: #4C4C4C;
border-radius: 7px;
overflow:hidden;
&:disabled{
    color:#aaa9a9;
}
`;


