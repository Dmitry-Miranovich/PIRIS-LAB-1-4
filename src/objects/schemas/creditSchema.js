import * as yup from "yup"

export const creditSchema = yup.object().shape({
    creditType: yup.string().required("Выберите вид депозита"),
    currency: yup.string().required(),
    creditNumber: yup.string().required().min(13,"Номер договора должен содержать 13 символов").max(13, "Номер договора должен содержать 13 символов"),
    creditDay: yup.number().required().max(31).min(new Date().getDay()),
    creditMonth: yup.number().required().min(new Date().getMonth()).max(12),
    creditYear: yup.number().required().min(new Date().getFullYear()).max(2050),
    creditAmount: yup.number().required("Поле должно содержать только числовые значения").min(0).max(999999, "Значение превышает максимальное допустимое"),
    creditTerm: yup.number().required("Поле должно содержать только числовые значения").min(0),
    creditPercent: yup.number().required("Поле должно содержать только числовые значения").min(0).max(100, "Процент депозита не должен превышать 100%"),
})