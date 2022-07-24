import * as Yup from 'yup';


export const yupLoginObj = Yup.object({
    email: Yup.string()
        .email('* Invalid email address')
        .required('* Required'),
    password: Yup.string()
        .required('* Required'),
    });

export const yupMissionFormObj = Yup.object({
    mission: Yup.string()
        .required('* Required'),
    vision: Yup.string()
        .required('* Required'),
    })

export const yupDivisionNamesobj = Yup.object({
    division_name: Yup.string(),
    department_name: Yup.string(),
    section_name: Yup.string()
    })
    