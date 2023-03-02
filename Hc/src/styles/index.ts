import styled from "styled-components";

export const Container = styled.div`
background-color: black;
width: 100vw;
height: 100vh;
margin: -8px;
display: flex;
    align-items: center;
    justify-content: space-around;
`


export const Div = styled.div`
display: flex;
flex-direction: column;

`


export const Form = styled.form`
display: flex;
flex-direction: column;
gap: 10px;
`

export const Input = styled.input`
border: 1px solid white;
height: 40px;
border-radius: 40px;

`

export const Select = styled.select `
border: 1px solid red;
height: 40px;
border-radius: 40px;
`

export const Label = styled.label`
color: white;
`


export const ErrorYup = styled.span `
color: white;
`

export const RenderP = styled.p `
color: white;
`


export const Tabel = styled.div`
border: 1px solid white;
    width: 111px;
    color: #0a0a0a;
    background: white;
    border-radius: 8px;
`

export const TabelDad = styled.div`
display: flex;
flex-direction: row;
gap: 20px;
`


export const BtnSubmit = styled.button`
height: 40px;
border-radius: 40px;

`