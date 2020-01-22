export let actionType = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
    SET_TOAST: 'SET_TOAST',
    SET_LINEAR_PROGRESS_BAR: 'SET_LINEAR_PROGRESS_BAR'
};

export function setCurrentUser(value) {
    return {
        type: actionType.SET_CURRENT_USER,
        value
    };
}

export function setToast(value) {
    return {
        type: actionType.SET_TOAST,
        value
    };
}

export function setLinearProgressBar(value) {
    return {
        type: actionType.SET_LINEAR_PROGRESS_BAR,
        value
    };
}