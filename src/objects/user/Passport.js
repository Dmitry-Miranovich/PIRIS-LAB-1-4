class Passport {
    constructor({passportSeries, passportID,issuePlace,passportNumber,birthPlace,registrationCity, registrationAddress} = {}) {
        this.passportSeries = passportSeries
        this.passportID = passportID
        this.issuePlace = issuePlace
        this.passportNumber = passportNumber
        this.birthPlace = birthPlace
        this.registrationCity = registrationCity
        this.registrationAddress = registrationAddress
    }
}
export default Passport