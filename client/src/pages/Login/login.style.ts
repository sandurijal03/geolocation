import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #80a5e5;
`

const Box = styled.div`
  width: 400px;
  height: 400px;
  background: #1081e0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`

const Input = styled.input`
  width: 300px;
  height: 60px;
  border-radius: 8px;
  border: none;
  outline: none;
`

const Button = styled.button`
  width: 300px;
  height: 50px;
  border-radius: 8px;
  border: 1px solid #ccc;
`

const Title = styled.div`
  font-size: 28px;
  font-style: italic;
  font-weight: 700;
  color: white;
  padding: 0;
  margin: 0;
`

export { Wrapper, Box, Input, Button, Title }
