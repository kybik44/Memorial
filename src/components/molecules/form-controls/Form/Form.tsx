import { Box } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import { FC, memo, ReactNode } from "react";
import {
  FormProvider,
  UseFormReturn,
  SubmitErrorHandler,
  SubmitHandler,
} from "react-hook-form";

interface IMuiFormProps {
  methods: UseFormReturn<any>;
  onSubmit: SubmitHandler<any>;
  onInvalid?: SubmitErrorHandler<any>;
  sx?: SxProps<Theme>;
  children: ReactNode;
}

const Form: FC<IMuiFormProps> = memo(
  ({ methods, onSubmit, onInvalid, sx = {}, children, ...props }) => {
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

Form.displayName = "Form";

export default Form;
