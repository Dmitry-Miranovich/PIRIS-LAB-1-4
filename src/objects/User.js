//todo Что-то связанное с депозитом/кредитом

class User{
    constructor({name, surname, middleName, sex, birthDate=new Date(), passport, extra} = {}) {
        this.name = name
        this.surname = surname
        this.middleName = middleName
        this.sex = sex
        this.birthDate = birthDate
        this.passport = passport
        this.extra = extra
    }
}

export default User