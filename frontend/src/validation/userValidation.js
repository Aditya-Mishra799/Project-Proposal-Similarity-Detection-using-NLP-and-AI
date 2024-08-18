import * as yup from 'yup';

const userValidationSchema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .matches(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
        .matches(/(?=.*[0-9])/, 'Password must contain at least one number')
        .matches(/(?=.*[!@#$%^&*])/, 'Password must contain at least one special character')
        .required('Password is required'),
    role: yup.string().when('$isRegistration', {
        is: true, // When it's registration, the role is required
        then: () => yup.string().oneOf(['student', 'teacher', 'admin'], 'Role must be either student, teacher, or admin').required('Role is required'),
        otherwise: () => yup.string().notRequired(), // For login, role is not required
    })
});

export default userValidationSchema;
