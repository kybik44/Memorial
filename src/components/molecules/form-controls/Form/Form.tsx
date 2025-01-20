import { Box } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import { FC, memo, ReactNode } from "react";
import {
  FormProvider,
  useForm,
  SubmitErrorHandler,
  SubmitHandler,
} from "react-hook-form";

interface IMuiFormProps {
  defaultValues?: Record<string, any>;
  onSubmit: SubmitHandler<any>;
  onInvalid?: SubmitErrorHandler<any>;
  sx?: SxProps<Theme>;
  children: ReactNode;
}

const Form: FC<IMuiFormProps> = memo(
  ({
    defaultValues,
    onSubmit,
    onInvalid = () => {},
    sx = {},
    children,
    ...props
  }) => {
    const methods = useForm({ defaultValues });
    const { handleSubmit } = methods;

    return (
      <FormProvider {...methods}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          sx={sx}
          noValidate
          {...props}
        >
          {children}
        </Box>
      </FormProvider>
    );
  }
);

export default Form;
