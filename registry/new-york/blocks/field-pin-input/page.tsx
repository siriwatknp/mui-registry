import { FieldPinInput } from "@/registry/new-york/blocks/field-pin-input/components/field-pin-input";
import FilledInput from "@mui/material/FilledInput";

export function FieldPinInputPage() {
  return (
    <FieldPinInput>
      <FilledInput disableUnderline hiddenLabel />
      <FilledInput disableUnderline hiddenLabel />
      <FilledInput disableUnderline hiddenLabel />
      <FilledInput disableUnderline hiddenLabel />
    </FieldPinInput>
  );
}
