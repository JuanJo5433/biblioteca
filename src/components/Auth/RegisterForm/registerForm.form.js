import * as Yup from "yup"

export function initialValues() {
    return {
        name: "",
        lastName: "",
        email: "",
        password:"",
    }
}
export function validationSchema() {
    return Yup.object({
        name: Yup.string().required(true),
        lastName: Yup.string().required(true),
        email: Yup.string().email(true).required(true),
        password: Yup.string().required(true),


    })

    
}