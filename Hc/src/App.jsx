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
  BtnSubmit,
  RenderPP
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
  const [desenvolvimento, setDesenvolvimento] = useState("");

  function onSubmit(data) {
    setFormData(data);
    localStorage.setItem("formData", JSON.stringify(data));
    const valor = parseInt(data.valor);
    let showContactButton = false;
    let result = "";

    if (data.area === "Desenvolvimento Web") {
      if (valor >= 1000 && valor <= 2000) {
        result = "Web site simples";
      } else if (valor >= 2000 && valor <= 3500) {
        result = "Web site Intermediário";
      } else if (valor >= 3500 && valor <= 4500) {
        result = "Web site Avançado";
      }
    } else if (data.area === "Desenvolvimento Mobile") {
      if (valor >= 5000 && valor <= 8000) {
        result = "Aplicativo simples";
      } else if (valor >= 8000 && valor <= 10000) {
        result = "Aplicativo Intermediário";
      } else if (valor >= 10000 && valor <= 15000) {
        result = "Aplicativo Avançado";
      }
    }

    if (valor >= 4500 && valor <= 5000) {
      showContactButton = true;
    } else if (valor >= 8000 && valor <= 15000) {
      showContactButton = true;
    }
    setShowContactButton(showContactButton);
    setShowResults(true);
    setDesenvolvimento(result);
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
                  <Tabel>
                    <RenderPP> {formData.area} </RenderPP>{" "}
                    <RenderPP>{formData.valor}</RenderPP>{" "}
                    <RenderPP>{desenvolvimento} </RenderPP>
                  </Tabel>

                  
                    {" "}
                    {showContactButton ? (
                      <button style={{ borderRadius: "8px" }}>
                        Entre em contato
                      </button>
                    ) : (
                      <button>Solicitar orçamento</button>
                    )}
                  
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
