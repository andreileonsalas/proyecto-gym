import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/form-control"
import { Input } from "@chakra-ui/input"
import { Text } from "@chakra-ui/layout"
import { forwardRef, PropsWithoutRef } from "react"
import { useField } from "react-final-form"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, outerProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse: props.type === "number" ? Number : undefined,
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    // Hay que quitar size porque da problema de compatibilidad de tipos
    const { size, ...extraProps } = props

    const hasError = touched && normalizedError

    return (
      <FormControl {...outerProps}>
        <FormLabel>
          {label}
          {hasError && (
            <Text as="span" ml="2px" fontSize="sm" fontWeight="normal" color="red.500">
              {" "}
              - {normalizedError}
            </Text>
          )}
        </FormLabel>
        <Input
          {...input}
          disabled={submitting}
          {...extraProps}
          ref={ref}
          borderColor={hasError ? "red.500" : "gray.200"}
        />
      </FormControl>
    )
  }
)

export default LabeledTextField
