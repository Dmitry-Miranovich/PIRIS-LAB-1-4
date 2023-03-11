import * as yup from "yup"

export const creditCardSchema = yup.object().shape({
    number: yup.string().required().max(16).min(16).matches(/^[0-9]+$/),
    owner: yup.string().required().matches(/[A-Z]/, "Заглавные буквы только"),
    code: yup.string().required().max(3).matches(/^[0-9]+$/),
    month: yup.number().required().max(12).min(1),
    year: yup.number().required().min(23).max(99),
    password: yup.number().required()
})