import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Container,
  Grid,
  Theme,
  useMediaQuery,
} from "@mui/material";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import styles from "./styles";
import questionsMobile from "/assets/img/questionsMobile.png";
import Text from "/components/atoms/text/Text";
import Form from "/components/molecules/form-controls/Form/Form";
import MuiInput from "/components/molecules/form-controls/input/Input";

interface IForm {
  name: string;
  phone: string;
}

const Questions = () => {
  const belarusPhoneRegExp = /^\+375(29|33|44)\d{7}$/;
  const russianPhoneRegExp = /^\+7\d{10}$/;

  const schema = useMemo(
    () =>
      yup.object({
        name: yup
          .string()
          .required("Имя обязательно")
          .min(2, "Имя должно содержать минимум 2 символа")
          .matches(/^[а-яА-Яa-zA-Z\s]*$/, "Имя может содержать только буквы"),
        phone: yup
          .string()
          .required("Номер телефона обязателен")
          .matches(
            new RegExp(
              `${belarusPhoneRegExp.source}|${russianPhoneRegExp.source}`
            ),
            "Введите корректный номер телефона в формате +375(29|33|44)XXXXXXX или +7XXXXXXXXXX"
          ),
      }),
    []
  );

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const methods = useForm<IForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  const onSubmit = async (data: IForm) => {
    try {
      console.log("Form data:", data);
      // Здесь будет отправка данных на сервер
      methods.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const onError = (errors: any) => {
    console.error("Form errors:", errors);
  };

  return (
    <Box sx={styles.container}>
      {isSmallScreen && (
        <Box
          component="img"
          sx={styles.image}
          alt="Questions Background"
          src={questionsMobile}
          mb={2}
        />
      )}
      <Container maxWidth="xl" sx={styles.content}>
        <Text variant={isSmallScreen ? "h2" : "h1"} sx={styles.title}>
          Если у вас остались вопросы, мы с радостью ответим на них
        </Text>
        <Text variant="subtitle2" sx={styles.subtitle}>
          Оставьте заявку, чтобы получить БЕСПЛАТНУЮ консультацию
        </Text>
        <Form
          methods={methods}
          onSubmit={onSubmit}
          onInvalid={onError}
          sx={styles.form}
        >
          <Grid container rowGap={3} columnGap={6} sx={styles.gridContainer}>
            <Grid item sx={styles.item}>
              <MuiInput
                name="name"
                label="Ваше имя"
                placeholder="Иван"
                sx={styles.input}
              />
            </Grid>
            <Grid item sx={styles.item}>
              <MuiInput
                name="phone"
                label="Ваш номер телефона"
                placeholder="+375 29 XXX-XX-XX"
                sx={styles.input}
              />
            </Grid>
            <Grid item sx={styles.item}>
              <Button
                type="submit"
                sx={styles.button}
                disabled={!methods.formState.isValid}
              >
                Оставить заявку
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Container>
    </Box>
  );
};

export default Questions;
