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
    });

export const yupDivisionNamesObj = Yup.object({
    division_name: Yup.string(),
    department_name: Yup.string(),
    section_name: Yup.string()
    });

export const yupThresholdObj = Yup.object({
    upper_threshold: Yup.number()
        .required('* Required')
        .typeError('you must specify a number')
        .min(0, 'Min value 0.')
        .max(100, 'Max value 100.'),

    lower_threshold: Yup.number()
        .required('* Required')
        .required('* Required')
        .typeError('you must specify a number')
        .min(0, 'Min value 0.')
        .max(100, 'Max value 100.'),
    });


export const yupPerspectiveCutoffObj = Yup.object({
    perspective_cutoff: Yup.number()
            .required('* Required')
});
    