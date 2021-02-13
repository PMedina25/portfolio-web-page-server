/**
 *  Project fields validators
 */
module.exports.validateProject = (
    title,
    description,
    category,
    technologies,
    startDate
) => {
    const errors = {};

    if (title.trim() === '') {
        throw new Error('Project title must not be empty');
    }
    if (description.trim() === '') {
        throw new Error('Project description must not be empty');
    }
    if (category.trim() === '') {
        throw new Error('Project category must not be empty');
    }
    if (typeof technologies === 'undefined' || technologies.length === 0) {
        throw new Error('Project technologies must not be empty or undefined');
    }
    if (startDate.trim() === '') {
        throw new Error('Project start date must not be empty');
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}


/**
 *  Organization fields validators
 */
module.exports.validateOrganization = (
    name,
    description,
    type,
    startDate,
    endDate
) => {
    const errors = {};

    if (name.trim() === '') {
        throw new Error('Organization name must not be empty');
    }
    if (description.trim() === '') {
        throw new Error('Organization description must not be empty');
    }
    if (type.trim() === '') {
        throw new Error('Organization type must not be empty');
    }
    if (startDate.trim() === '') {
        throw new Error('Organization start date must not be empty');
    }
    if (endDate.trim() === '') {
        throw new Error('Organization end date must not be empty');
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

/**
 *  Register validators
 */

module.exports.validateRegisterInput = (
    username,
    password,
    confirmPassword
) => {
    const errors = {};
    if (username.trim() === '') {
        errors.username = 'Username must not be empty';
    }

    if (password === '') {
        errors.password = 'Password must not empty';
    }
    else if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords must match';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}


/**
 *  Login validators
 */
module.exports.validateLoginInput = (username, password) => {
    const errors = {};
    if (username.trim() === '') {
        errors.username = 'Username must not be empty';
    }
    
    if (password.trim() === '') {
        errors.email = 'Password must not be empty';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}