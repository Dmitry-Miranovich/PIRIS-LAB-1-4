import * as yup from "yup"

export const schema = yup.object().shape({
    firstName: yup.string().required("Имя является обязательным полем")
        .matches(/^[A-Za-zА-Яа-я]+$/, "Имя должно содержать только буквы"),
    lastName: yup.string().required("Фамилия является обязательным полем")
        .matches(/^[A-Za-zА-Яа-я]+$/, "Отчество должно содержать только буквы"),
    middleName: yup.string().required("Отчество является обязательным полем")
        .matches(/^[A-Za-zА-Яа-я]+$/, "Отчество должно содержать только буквы"),
    sex: yup.string().required("required"),
    birthDay: yup.number().required().min(1).max(31),
    birthMonth: yup.number().required().min(1).max(12),
    birthYear: yup.number().required().min(1900).max(new Date().getFullYear()).required(),
    birthDate: yup.date().transform((value, originalValue)=>{
        const {birthDay, birthYear, birthMonth} = originalValue
        if (birthDay && birthMonth && birthYear) {
            const dateString = `${birthYear}-${birthMonth}-${birthDay}`;
            return new Date(dateString);
        }
        return value;
    }),
    passportSeries: yup.string().required(),
    passportID: yup.string().required().max(7),
    issuePlace: yup.string().required("Место выдачи является обязательным полем").matches(/^[A-Za-zА-Яа-я\s]+$/
    , "Должныы присутствовать только буквы"),
    passportNumber: yup.string().required().max(14),
    birthPlace: yup.string().required().matches(/^[A-Za-zА-Яа-я\s]+$/),
    registrationDay:yup.number().required().min(1).max(31),
    registrationMonth:yup.number().required().min(1).max(12),
    registrationYear:yup.number().required().min(1900).max(new Date().getFullYear()).required(),
    registrationDate: yup.date().transform((value, originalValue)=>{
       const {registrationDay, registrationMonth, registrationYear} = originalValue
       if(registrationDay && registrationMonth && registrationYear){
           const dateString = `${registrationYear}-${registrationMonth}-${registrationDay}`;
           return new Date(dateString);
       }
       return value;
    }),
    registrationCity: yup.string().required(),
    registrationAddress: yup.string().required(),
    homePhone: yup.string(),
    mobilePhone: yup.string(),
    email: yup.string(),
    workPlace: yup.string(),
    workPost: yup.string(),
    city: yup.string().required(),
    address: yup.string().required(),
    maritalStatus: yup.string().required(),
    citizenship: yup.string().required(),
    disability: yup.string().required(),
    retiree: yup.string().required(),
    monthlyValue: yup.string(),
    conscripted: yup.string().required()
})