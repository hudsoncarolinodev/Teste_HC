import {
  Container,
  Div,
  Form,
  Input,
  Select,
  Label,
  ErrorYup,
  RenderP,
  Tabel,
  TabelDad,
  BtnSubmit
} from "./Styles/index";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";

const schema = yup.object().shape({
  nome: yup.string().required("Campo obrigatório"),
  email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
  telefone: yup.string().required("Campo obrigatório"),
  area: yup
    .string()
    .oneOf(["Desenvolvimento Web", "Desenvolvimento Mobile"], "Área inválida")
    .required("Campo obrigatório"),
  valor: yup.string().required("Campo obrigatório"),
});

function App() {
  const [formData, setFormData] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showContactButton, setShowContactButton] = useState(false);

  function onSubmit(data) {
    setFormData(data);
    localStorage.setItem("formData", JSON.stringify(data));
    const valor = parseInt(data.valor);
    let showContactButton = false;
    if (valor >= 4500 && valor <= 5000) {
      showContactButton = true;
    } else if (valor >= 8000 && valor <= 15000) {
      showContactButton = true;
    }
    setShowContactButton(showContactButton);
    setShowResults(true);
  }

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("formData"));
    if (storedData) {
      localStorage.setItem("formData", JSON.stringify(storedData));
    }
  }, []);

  const reset = () => {
    localStorage.removeItem("formData");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: JSON.parse(localStorage.getItem("formData")) || {},
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
            <Input
              {...register("telefone")}
              defaultValue={formData?.telefone}
            />
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

            <BtnSubmit type="submit">Enviar</BtnSubmit>

            {showResults && (
              <>
                <div>
                  <RenderP>
                    Olá {formData.nome}, aqui está seu orçamento {formData.area}{" "}
                    no valor de {formData.valor}
                  </RenderP>
                  
                  <button
                    onClick={() => {
                      setShowResults(false);
                      reset();
                    }}
                  >
                    Refazer orçamento
                  </button>
                </div>
                <TabelDad>
                  <Tabel>{formData.area}</Tabel>
                  <Tabel>{formData.valor}</Tabel> 
                  <Tabel>Desenvolvimento simples</Tabel>{" "}
                  <Tabel>
                    {" "}
                    {showContactButton ? (
                      <button style={{borderRadius: '8px'}}>Entre em contato</button>
                    ) : (
                      <button>Solicitar orçamento</button>
                    )}
                  </Tabel>
                </TabelDad>
              </>
            )}
          </Form>
        </Div>
      </Container>
    </>
  );
}
export default App;
