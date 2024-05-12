
export const validateLoginForm = (values) => {
    const errors = {};

    if (!values.email) {
        errors.email = "Email is required!";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) {
        errors.email = "Invalid email format!";
    }

    if (!values.password) {
        errors.password = "Password is required!";
    } else if (values.password.length < 4) {
        errors.password = "Password must be at least 4 characters long!";
    }
    return errors;
};
export const validateUserForm = (values) => {
    const errors = {};

    if (!values.firstname) {
        errors.firstname = "First name is required!";
    } else if (values.firstname.length < 2) {
        errors.firstname = "First name must be at least 2 characters long!";
    }

    if (!values.email) {
        errors.email = "Email is required!";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) {
        errors.email = "Invalid email format!";
    }

    if (!values.password) {
        errors.password = "Password is required!";
    } else if (values.password.length < 4) {
        errors.password = "Password must be at least 4 characters long!";
    }

    if (!values.mobile) {
        errors.mobile = "Mobile number is required!";
    } else if (!/^\d{10}$/.test(values.mobile)) {
        errors.mobile = "Mobile number must be exactly 10 digits!";
    }

    return errors;
};
export const validateDoctorForm = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = "Last name is required!";
    } else if (values.name.length < 2) {
        errors.name = "Last name must be at least 2 characters long!";
    }

    if (!values.email) {
        errors.email = "Email is required!";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) {
        errors.email = "Invalid email format!";
    }

    if (!values.password) {
        errors.password = "Password is required!";
    } else if (values.password.length < 4) {
        errors.password = "Password must be at least 4 characters long!";
    }

    if (!values.mobile) {
        errors.mobile = "Mobile number is required!";
    } else if (!/^\d{10}$/.test(values.mobile)) {
        errors.mobile = "Mobile number must be exactly 10 digits!";
    }

    return errors;
};
export const validateAdminForm = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = "Last name is required!";
    } else if (values.name.length < 2) {
        errors.name = "Last name must be at least 2 characters long!";
    }

    if (!values.email) {
        errors.email = "Email is required!";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) {
        errors.email = "Invalid email format!";
    }

    if (!values.password) {
        errors.password = "Password is required!";
    } else if (values.password.length < 4) {
        errors.password = "Password must be at least 4 characters long!";
    }

    return errors;
};
