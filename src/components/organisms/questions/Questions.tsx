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
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const schema = useMemo(
    () =>
      yup.object({
        name: yup.string().required(),
        phone: yup
          .string()
          .matches(phoneRegExp, "Phone number is not valid")
          .required(),
      }),
    []
  );

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const methods = useForm<IForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  // const name = useWatch({ control: methods.control, name: 'name' });

  const onSubmit = (data: IForm) => {
    console.log(data);
  };

  return (
    <Box sx={styles.container}>
      {isSmallScreen && (
        <Box
          component="img"
          sx={styles.image}
          alt="Arrows"
          src={questionsMobile}
          mb="20px"
        />
      )}
      <Container maxWidth="xl" sx={styles.content}>
        <Text variant={isSmallScreen ? "h2" : "h1"} sx={styles.title}>
          Если у вас остались вопросы, мы с радостью ответим на них
        </Text>
        <Text variant="subtitle2" sx={styles.subtitle}>
          Оставьте заявку, чтобы получить БЕСПЛАТНУЮ консультацию
        </Text>
        <Form methods={methods} onSubmit={onSubmit} sx={styles.form}>
          <Grid container rowGap={3} columnGap={6} sx={styles.gridContainer}>
            <Grid item sx={styles.item}>
              <MuiInput
                name="name"
                label="Ваше имя"
                placeholder="Ваше имя"
                sx={styles.input}
              />
            </Grid>
            <Grid item sx={styles.item}>
              <MuiInput
                name="phone"
                label="Ваш номер телефона"
                placeholder="+375 (____) ___ - __ - ___"
                sx={styles.input}
              />
            </Grid>
            <Grid item sx={styles.item}>
              <Button sx={styles.button}>Оставить заявку</Button>
            </Grid>
          </Grid>
        </Form>
      </Container>
    </Box>
  );
};

export default Questions;
