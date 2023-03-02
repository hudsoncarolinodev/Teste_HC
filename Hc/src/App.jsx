import { Container, Div, Form, Input, Select, Label, ErrorYup, RenderP } from "./Styles"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState, useEffect } from "react"


const schema = yup.object().shape({
  nome: yup.string().required("Campo obrigatório"),
  email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
  telefone: yup.string().required("Campo obrigatório"),
  area: yup.string().oneOf(["Desenvolvimento Web", "Desenvolvimento Mobile"], "Área inválida").required("Campo obrigatório"),
  valor: yup.string().required("Campo obrigatório")
})


function App() {
  const [formData, setFormData] = useState(null);
  const [showResults, setShowResults] = useState(false);

  function onSubmit(data) {
    setFormData(data);
    localStorage.setItem("formData", JSON.stringify(data));
    setShowResults(true);
  }

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("formData"));
    if (storedData) {
      localStorage.setItem("formData", JSON.stringify(storedData));
    }
  }, []);

  

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: JSON.parse(localStorage.getItem("formData")) || {}
  });

  return (
    <>
      <Container>
        <Div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Label>Nome completo:</Label>
            <Input {...register("nome")} defaultValue={formData?.nome} />
            {errors.nome && <ErrorYup>{errors.nome.message}</ErrorYup>}
  
            <Label>E-mail:</Label>
            <Input {...register("email")} defaultValue={formData?.email} />
            {errors.email && <ErrorYup>{errors.email.message}</ErrorYup>}
  
            <Label>Telefone:</Label>
            <Input {...register("telefone")} defaultValue={formData?.telefone} />
            {errors.telefone && <ErrorYup>{errors.telefone.message}</ErrorYup>}
  
            <Select {...register("area")} defaultValue={formData?.area}>
              <option>Selecione</option>
              <option>Desenvolvimento Web</option>
              <option>Desenvolvimento Mobile</option>
            </Select>
            {errors.area && <ErrorYup>{errors.area.message}</ErrorYup>}
            <Label>Valor que deseja investir:</Label>
            <Input {...register("valor")} defaultValue={formData?.valor} />
            {errors.valor && <ErrorYup>{errors.valor.message}</ErrorYup>}
  
            <button type="submit">Enviar</button>
          </Form>
          {showResults && (
            <div>
              <RenderP>Olá {formData.nome}, aqui está seu orçamento {formData.area} no valor de {formData.valor}</RenderP>
              <button onClick={() => setShowResults(false)}>Refazer orçamento</button>
            </div>
          )}
        </Div>
      </Container>
    </>
  )
}
export default App
