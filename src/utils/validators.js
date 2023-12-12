import * as Yup from 'yup';

export const yupLoginObj = Yup.object({
    password: Yup.string()
        .required('* Required'),
    });

export const yupEmailObj = Yup.object({
    email: Yup.string()
        .email('* Invalid email address')
        .required('* Required'),
    });

const getCharacterValidationError = (str) => {
    return `Your password must have at least 1 ${str} character`;
    };

export const yupResetPasswordObj = Yup.object({
    password: Yup.string()
        .required('* Please enter password')
        .min(8, "Password must have at least 8 characters")
        .matches(/[0-9]/, getCharacterValidationError("digit"))
        .matches(/[a-z]/, getCharacterValidationError("lowercase"))
        .matches(/[A-Z]/, getCharacterValidationError("uppercase")),

    confirm_password: Yup.string()
        .required("Please re-type your password")
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
    });

export const yupPasswordRequestObj = Yup.object({
    email: Yup.string()
        .email('* Invalid email address')
        .required('* Required')
    });

export const yupUpdateObjective = Yup.object({
    cost: Yup.number(),
    score: Yup.number(),
    evidence: Yup.string(),
    });

export const yupEditPerspectivesWeightObj = Yup.object({
    financial_weight: Yup.number(),
    customer_weight: Yup.number(),
    internal_processes_weight: Yup.number(),
    learning_growth_weight: Yup.number(),
    behavioral_weight: Yup.number(),
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


export const yupPasswordObj = Yup.object({
    password: Yup.string()
        .required('* Required'),
    new_password: Yup.string()
        .required('* Please enter password')
        .min(8, "Password must have at least 8 characters")
        .matches(/[0-9]/, getCharacterValidationError("digit"))
        .matches(/[a-z]/, getCharacterValidationError("lowercase"))
        .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
    });


export const yupRejectionForm = Yup.object({
    message: Yup.string()
            .required('* Required')
});

export const yupPerspectiveCutoffObj = Yup.object({
    perspective_cutoff: Yup.number()
            .required('* Required')
});

export const yupPerspectiveOrder = Yup.object({
    perspective_order: Yup.string()
            .required('* Required')
});

export const yupCascadeCutoffObj = Yup.object({
    cascade_cutoff: Yup.number()
            .required('* Required')
});

export const yupSelectPeriodObj = Yup.object({
    current_period: Yup.number()
            .required('* Required')
});

export const yupApprovalLevels = Yup.object({
    approval_levels: Yup.number()
            .required('* Required')
});

export const yupReviewPeriodObj = Yup.object({
    review_period: Yup.number()
            .required('* Required')
});

export const yupObjectiveValidationObj = {
    name: Yup.string()
        .required('* Required'),
    perspective: Yup.string()
        .required('* Required'),
    data_type: Yup.string()
        .required('* Required'),
    weight: Yup.number().max(100)
        .min(0),
    target: Yup.number(),
    upper_threshold: Yup.number(),
    lower_threshold: Yup.number(),
    budget: Yup.number(),
    baseline: Yup.number(),
    percentage_target: Yup.number().min(0),
    unit_target: Yup.number(),
    evidence_description: Yup.string()
        .required('* Required')
        .test('len', 'Must be less than 100 characters', val => val?.length < 100)
}
