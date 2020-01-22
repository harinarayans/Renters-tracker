import Routes from '../routes';

let util = {
    baseUrl: window.location.origin.indexOf('localhost') > -1 ? "http://localhost:5000/api/" : `${window.location.origin}${window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'))}/api/`,
    toastVariant: {
        success: 'success',
        error: 'error',
        info: 'info'
    },
    routes: {
        login:"/",
        overview: "/overview",
        dashboard: "/dashboard",
        clientRegistration: "/clients/clientRegistration",
        clients: "/clients",
        clientDetail: "/clients/clientDetail",
        hostelerRegistration: "/hostelers/hostelerRegistration",
        hostelers: "/hostelers",
        hostelerDetail: "/hostelers/hostelerDetail",
        profile: "/profile",
        generalSettings: "/settings/general",
        notificationSettings: "/settings/notification",
        subscriptionSettings: "/settings/subscription",
        securitySettings: "/settings/security",
        calendar: "/calendar",
        socialFeed: "/socialFeed",
        subscription: "/subscription",
        chat: "/chat",
        pageNotFound: "/pageNotFound"
    },
    fieldType: {
        TextField: "TextField",
        SelectField: "SelectField",
        Button:"Button"
    },
    greetMessage: function () {
        let date = new Date();
        let hrs = date.getHours();
        let greet;
        if (hrs < 12)
            greet = 'Good Morning, ';
        else if (hrs >= 12 && hrs <= 17)
            greet = 'Good Afternoon, ';
        else if (hrs >= 17 && hrs <= 24)
            greet = 'Good Evening, ';
        return greet;
    },

    generateRoutes: () => {
        let routes = [];
        Routes.forEach((element) => {
            if (element.component) {
                routes.push(element);
            } else if (element.children) {
                element.children.forEach((e) => {
                    routes.push(e);
                })
            }
        })
        return routes;
    },

    //Get current logged in user info
    getLoggedUser() {
        return this.user;
    },

    //Set current logged in user info
    setLoggedUser(user) {
        this.user = user;
    },
}

export default util;