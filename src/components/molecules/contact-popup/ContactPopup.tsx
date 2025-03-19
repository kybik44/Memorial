import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Theme,
  useMediaQuery,
} from "@mui/material";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Text from "/components/atoms/text/Text";
import Form from "/components/molecules/form-controls/Form/Form";
import MuiInput from "/components/molecules/form-controls/input/Input";

interface ContactPopupProps {
  open: boolean;
  onClose: () => void;
  productTitle?: string;
  currentPage?: string;
}

interface IContactForm {
  name: string;
  phone: string;
  email: string;
  comment?: string;
}

const ContactPopup: React.FC<ContactPopupProps> = ({
  open,
  onClose,
  productTitle,
  currentPage,
}) => {
  const schema = useMemo(
    () =>
      yup.object().shape({
        name: yup
          .string()
          .required("Имя обязательно")
          .min(2, "Имя должно содержать минимум 2 символа")
          .max(50, "Имя должно содержать максимум 50 символов"),
        phone: yup
          .string()
          .required("Телефон обязателен")
          .matches(
            /^(\+375|80)(29|25|44|33)(\d{7})$/,
            "Введите корректный номер телефона"
          ),
        email: yup
          .string()
          .email("Введите корректный email")
          .required("Email обязателен"),
        comment: yup.string(),
      }),
    []
  );

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const methods = useForm<IContactForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      comment: "",
    },
  });

  const onSubmit = async (data: IContactForm) => {
    try {
      const formData = {
        ...data,
        productTitle,
        currentPage,
      };
      console.log("Form data:", formData);
      // Здесь будет отправка данных на сервер
      methods.reset();
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          bgcolor: "background.paper",
          p: { xs: 2, md: 4 },
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "text.primary",
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent sx={{ p: 0, mt: 2 }}>
        <Text
          variant={isSmallScreen ? "h3" : "h2"}
          sx={{
            textAlign: "center",
            mb: 3,
            color: "text.primary",
          }}
          animated
          animationType="highlight"
        >
          Связаться с нами
        </Text>

        <Text
          variant="subtitle2"
          sx={{
            textAlign: "center",
            mb: 4,
            color: "text.secondary",
          }}
          animated
          animationType="fadeIn"
        >
          Оставьте заявку, и мы свяжемся с вами в ближайшее время
        </Text>

        <Form methods={methods} onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <MuiInput
                name="name"
                label="Ваше имя"
                placeholder="Иван"
                fullWidth
                style={{ boxShadow: "none" }}
              />
            </Grid>
            <Grid item xs={12}>
              <MuiInput
                name="phone"
                label="Ваш номер телефона"
                placeholder="+375 29 XXX-XX-XX"
                fullWidth
                style={{ boxShadow: "none" }}
              />
            </Grid>
            <Grid item xs={12}>
              <MuiInput
                name="email"
                label="Ваш email"
                placeholder="example@mail.com"
                fullWidth
                style={{ boxShadow: "none" }}
              />
            </Grid>
            <Grid item xs={12}>
              <MuiInput
                name="comment"
                label="Комментарий"
                placeholder="Ваш комментарий"
                multiline
                rows={4}
                fullWidth
                style={{ boxShadow: "none" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                disabled={!methods.formState.isValid}
                sx={{
                  py: 2,
                  bgcolor: "primary.main",
                  color: "common.white",
                  boxShadow: "none",
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                  "&:disabled": {
                    bgcolor: "action.disabledBackground",
                    color: "action.disabled",
                  },
                }}
              >
                Отправить
              </Button>
            </Grid>
          </Grid>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactPopup;
