import * as z from "zod"

const password = z.string().min(10, "Ingrese mínimo 10 caracteres.").max(100)

export const Signup = z.object({
  name: z.string(),
  email: z.string().email("El email es inválido."),
  photo: z.string(),
  password,
})

export const Login = z.object({
  email: z.string().email("El email es inválido."),
  password: z.string(),
})

export const ForgotPassword = z.object({
  email: z.string().email("El email es inválido."),
})

export const ResetPassword = z
  .object({
    password: password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // set the path of the error
  })

export const ChangePassword = z.object({
  currentPassword: z.string(),
  newPassword: password,
})
