import * as Yup from "yup";
export const initialValues = {
    email: "",
    password: "",
};

export function validationSchema() {
    return Yup.object({
        email: Yup.string().email(true).required(true),
        password: Yup.string().required(true),
    });
}
