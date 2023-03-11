import * as yup from "yup"

export const depositSchema = yup.object().shape({
    depositType: yup.string().required("Выберите вид депозита"),
    currency: yup.string().required(),
    depositNumber: yup.string().required().min(13,"Номер договора должен содержать 13 символов").max(13, "Номер договора должен содержать 13 символов"),
    depositDay: yup.number().required().max(31).min(new Date().getDay()),
    depositMonth: yup.number().required().min(new Date().getMonth()).max(12),
    depositYear: yup.number().required().min(new Date().getFullYear()).max(2050),
    depositDate: yup.date().transform((value, originalValue)=>{
        const {depositDay, depositYear, depositMonth} = originalValue
        if (depositDay && depositYear && depositMonth) {
            const dateString = `${depositYear}-${depositMonth}-${depositDay}`;
            return new Date(dateString);
        }
        return value;
    }),
    depositAmount: yup.number().required("Поле должно содержать только числовые значения").min(0).max(999999, "Значение превышает максимальное допустимое"),
    depositTerm: yup.number().required("Поле должно содержать только числовые значения").min(0),
    depositPercent: yup.number().required("Поле должно содержать только числовые значения").min(0).max(100, "Процент депозита не должен превышать 100%"),
})