const rapidApiHost = '';
const rapidApiKey = '';

class AuthenticationManager {
    constructor() {
    }

    init(router) {
        this.router = router;
        const {checkAuthenticated} = this;

        router.beforeEach(async (to, from, next) => {
            const requiresAuth = to.meta.requiresAuth;

            if (requiresAuth) {
                const isAuthenticated = await this.checkAuthenticated(); // Make API call to check session
                if (!isAuthenticated) {
                    next({path: "/login", query: {redirect: to.fullPath}});
                    return;
                }
            }
            next();
        });
    }

    async checkAuthenticated() {
        const token = this.getAuthorizationToken();
        try {
            const response = await fetch('/api/get_session', {
                method: "GET",
                headers: {'Authorization': token, 'X-RapidAPI-Host': rapidApiHost, 'X-RapidAPI-Key': rapidApiKey}
            });
            return response.ok;
        } catch {
            return false;
        }
    }

    async logout() {
        try {
            const response = await fetch('/api/logout', {
                method: 'GET',
                credentials: "include",
                headers: {'X-RapidAPI-Host': rapidApiHost, 'X-RapidAPI-Key': rapidApiKey}
            });
            localStorage.setItem("Authorization", null);
            return response.ok;

        } catch (error) {
            return {ok: false, error: null, failure: 'Failed to send message ', validation: null};
        }
    }

    async signup(form) {
        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {'Content-Type': 'application/json','X-RapidAPI-Host': rapidApiHost, 'X-RapidAPI-Key': rapidApiKey},
                body: JSON.stringify(form)
            });

            if (response.status === 422) {
                return {ok: false, error: 'Invalid email syntax', failure: null, validation: null};
            }
            if (response.status === 201) {
                return {ok: true, error: null, failure: null, validation: null};
            }
            if (response.status === 409) {
                let reply = await response.json();
                return {ok: false, failure: null, validation: null, ...reply};
            }
            return {ok: false, error: null, failure: 'Unexpected error', validation: null};

        } catch (error) {
            return {ok: false, error: null, failure: 'Failed to send message', validation: null};
        }
    }

    async login(form) {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json','X-RapidAPI-Host': rapidApiHost, 'X-RapidAPI-Key': rapidApiKey},
                body: JSON.stringify(form)
            });

            if (response.status === 200) {
                /*
                If possible, set the cookie from the server with the Set-Cookie header and mark it as HttpOnly.
                That way, JavaScript can’t read it (protects against XSS attacks) and it’s sent automatically with every request.
                This example has no back-end so we do this manually
                */
                const token = response.headers.get('Authorization');
                if (token) {// otherwise it was just a pincode request
                    localStorage.setItem("Authorization", token);   // we don't use Cookies so that we don't have to stalk users with the infamous 'Accept All Cookies Disclaimer'
                }
                return {ok: true, error: null, failure: null, validation: null};
            }
            if (response.status === 403) {
                let reply = await response.json();
                return {ok: false, error: reply.message, failure: null, validation: null};
            }

            return {ok: false, error: null, failure: 'Unexpected error', validation: null};
        } catch (error) {
            return {ok: false, error: null, failure: 'Failed to send message ', validation: null};
        }
    }

    getAuthorizationToken() {
        return localStorage.getItem('Authorization');
    }
}

export const authenticationManager = new AuthenticationManager();

