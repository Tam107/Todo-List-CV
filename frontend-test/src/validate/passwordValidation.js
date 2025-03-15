export const validatePassword = (password, confirmPassword) =>{
    if (password !== confirmPassword) {
        return "Passwords don't match";
    }

    if(password.length < 6){
        return "Passwords must be at least 6 characters";
    }

    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    // if (!passwordRegex.test(password)) {
    //     return "Password must include at least one uppercase letter, one lowercase letter, and one number";
    // }

    return null;
}