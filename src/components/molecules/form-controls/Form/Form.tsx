import { Box } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import { FC, memo, ReactNode } from "react";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";

interface IMuiFormProps {
  methods: UseFormReturn<any, object>;
  onSubmit: SubmitHandler<any>;
  onInvalid?: SubmitErrorHandler<any>;
  sx?: SxProps<Theme>;
  children: ReactNode;
}

const defaultProps = {
  onInvalid: () => {},
};

const Form: FC<IMuiFormProps> = ({
  methods,
  onSubmit,
  onInvalid = defaultProps.onInvalid,
  sx = {},
  children,
  ...props
}) => {
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
};

export default memo(Form);
