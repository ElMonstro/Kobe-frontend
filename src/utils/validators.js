import * as Yup from 'yup';

export const yupLoginObj = Yup.object({
    email: Yup.string()
        .email('* Invalid email address')
        .required('* Required'),
    password: Yup.string()
        .required('* Required'),
    });

    export const yupScoreCardObj = Yup.object({
        'quarter 1': Yup.number(),
        'quarter 2': Yup.number(),
        'quarter 3': Yup.number(),
        'quarter 4': Yup.number(),
        'biannual 1': Yup.number(),
        'biannual 2': Yup.number(),
        'budget': Yup.number(),
        'measure-name-1': Yup.number()
            .required(),
        'measure-weight-1': Yup.number()
            .required(),
        'measure-name-2': Yup.number(),
        'measure-weight-2': Yup.number(),
        'measure-name-3': Yup.number(),
        'measure-weight-3': Yup.number(),
        'measure-name-4': Yup.number(),
        'measure-weight-4': Yup.number(),
        'measure-name-5': Yup.number(),
        'measure-weight-5': Yup.number(),
        'measure-name-6': Yup.number(),
        'measure-weight-6': Yup.number(),
        'initiative-name-1': Yup.string()
            .required(),
        'initiative-weight-1': Yup.number()
            .required(),
        'cascade-role-1': Yup.number()
        .required(),
        'initiative-name-2': Yup.string(),
        'initiative-weight-2': Yup.number(),
        'cascade-role-2': Yup.number(),
        'initiative-name-3': Yup.string(),
        'initiative-weight-3': Yup.number(),
        'cascade-role-3': Yup.number(),
        'initiative-name-4': Yup.string(),
        'initiative-weight-4': Yup.number(),
        'cascade-role-4': Yup.number(),
        'initiative-name-5': Yup.string(),
        'initiative-weight-5': Yup.number(),
        'cascade-role-5': Yup.number(),
        'initiative-name-6': Yup.string(),
        'initiative-weight-6': Yup.number(),
        'cascade-role-6': Yup.number(),
        'initiative-name-7': Yup.string(),
        'initiative-weight-7': Yup.number(),
        'cascade-role-7': Yup.number(),
        'name': Yup.string()
            .required(),
        'perspective': Yup.string()
            .required(),
        'upper_threshold': Yup.number(),
        'lower_threshold': Yup.number(),
        });

export const yupMissionFormObj = Yup.object({
    mission: Yup.string()
        .required('* Required'),
    vision: Yup.string()
        .required('* Required'),
    name: Yup.string()
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
        .typeError('you must specify a number')
        .min(0, 'Min value 0.')
        .max(120, 'Max value 100.'),
    });


export const yupPerspectiveCutoffObj = Yup.object({
    perspective_cutoff: Yup.number()
            .required('* Required')
});


export const yupCascadeCutoffObj = Yup.object({
    cascade_cutoff: Yup.number()
            .required('* Required')
});


export const yupReviewPeriodObj = Yup.object({
    review_period: Yup.number()
            .required('* Required')
});
