"use client";

import React from "react";
import Box, { BoxProps } from "@mui/material/Box";
import {
  usePinInput,
  UsePinInputOptions,
} from "@/registry/new-york/blocks/field-pin-input/hooks/usePinInput";

export type FieldPinInputProps = {
  children: Array<React.ReactElement>;
} & Omit<BoxProps, "children"> &
  Omit<UsePinInputOptions, "pinLength">;

export const FieldPinInput = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<FieldPinInputProps>
>(function FieldPinInput(props, ref) {
  const { children, onChange, onBlur, ...other } = props;
  const { pins } = usePinInput({ ...props, pinLength: children.length });

  return (
    <Box
      ref={ref}
      {...other}
      sx={{
        display: "flex",
        gap: "0.5rem",
        "& input": {
          textAlign: "center",
          caretColor: "transparent",
        },
        "& .Mui-focused": {
          outline: "1px solid",
          background: "transparent",
        },
      }}
    >
      {pins.map((getInputProps, index) => {
        const inputElement = children[index];
        return (
          <React.Fragment key={index}>
            {React.cloneElement(inputElement, {
              // @ts-ignore
              inputProps: getInputProps({
                // @ts-ignore
                ...inputElement.props.inputProps,
              }),
            })}
          </React.Fragment>
        );
      })}
    </Box>
  );
});
