import * as Yup from 'yup';
import { arePeriodicalInputsValid } from '.';
import { BEHAVIORAL } from './constants';

export const yupLoginObj = Yup.object({
        email: Yup.string()
            .email('* Invalid email address')
            .required('* Required'),
        password: Yup.string()
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

export const yupCreateUserObj = Yup.object({
        first_name: Yup.string()
            .required('* Required'),
        second_name: Yup.string()
            .required('* Required'),
        email: Yup.string('* Invalid email address')
            .email()
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

export const yupCreateObjectiveValidationObj = {
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
    baseline: Yup.number(),
    percentage_target: Yup.number().min(0),
    unit_target: Yup.number(),
    measures: Yup.array().of(Yup.object({
        name: Yup.string().required('* Required')
            .test('len', 'Must be less than 50 characters', val => val?.length < 50),
        weight: Yup.number()
    })),
    initiatives: Yup.array().when(['perspective'], {
        is: (perspective) => perspective !== BEHAVIORAL,
        then: Yup.array().of(Yup.object({
            name: Yup.string().required('* Required'),
            role: Yup.number().required('* Required'),
        }))
    }),
    period_targets: Yup.array().of(Yup.object({
        period: Yup.string().required('* Required'),
        target: Yup.number().required('* Required'),
    })).test(
        'Accumulate test',
        'The quarterly targets must add up to target',
        (value, ctx) => {
            return arePeriodicalInputsValid(ctx.parent);
        }
    )
};

export const yupCompanyValidation = Yup.object({
    name: Yup.string().required('* Required'),
    rest_server: Yup.string().required('* Required'),
    grpc_server: Yup.string().required('* Required'),
    email_domain: Yup.string().required('* Required')
});

export const yupEditCompanyValidation = Yup.object({
    name: Yup.string(),
    rest_server: Yup.string(),
    grpc_server: Yup.string(),
    email_domain: Yup.string()
});

export const yupCreateBehavioral = Yup.object({
    name: Yup.string().required(),
    tier_cutoff: Yup.number().required()
});

export const yupAppraise = Yup.object({
    general_comments: Yup.string().required('* Required'),
    improvement_areas: Yup.array().of(Yup.object({
        improvement_area: Yup.string().required('* Required'),
        improvement_activity: Yup.string().required('* Required'),
        timeline: Yup.string().required('* Required')
    })),
});
