export function validateEmailAddress(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

export function validateName(name: string): boolean {
    const nameRegex = /^[a-zA-Z\s'-]+$/;
    return name.trim().length >= 2 && nameRegex.test(name);
}