export default function reducer(state, { type, payload }) {
    switch (type) {
        case "SIGNIN_USER":
            return {
                ...state,
                isAuth: payload.isAuth,
                currentUser: payload.currentUser
            };
        default:
            return state;
    }
}
