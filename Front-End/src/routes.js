// @material-ui/icons
import { Dashboard, Person, Security, Home, GroupAdd, Settings, FeedbackSharp, AccountBalanceSharp, EqualizerSharp, MonetizationOnSharp, HowToReg, CalendarToday, Details, NotificationImportant, ChatBubble } from "@material-ui/icons";

// components
import Overview from './containers/Overview/Overview';
import AdminDashboard from './containers/Dashboard/Dashboard';
import SubscriptionPrice from './containers/SubscriptionPrice/SubscriptionPrice';
import Profile from './containers/Profile/Profile';
import SettingsContainer from './containers/Settings/Settings';
import ClientRegistration from './components/Registeration/ClientRegistration';
import Client from './components/Grid/Client';
import ClientDetail from './components/Details/ClientDetail';
import HostelerRegistration from './components/Registeration/HostelerRegistration';
import Hosteler from './components/Grid/Hosteler';
import hostelerDetail from './components/Details/HostelerDetail';
import Calendar from './components/Calendar/Calendar';
import SocialFeed from './components/SocialFeed/SocialFeed';
import Chat from './components/Chat/Chat';
import RentersUsers from './components/RentersUser/RentersUser';
import PageNotFound from './components/PageNotFound/PageNotFound';
// routes
const dashboardRoutes = [
    {
        path: "/overview",
        name: "Overview",
        icon: Home,
        component: Overview,
        layout: "/admin"
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: Dashboard,
        component: AdminDashboard,
        layout: "/admin"
    },
    {
        path: '',
        name: "Management",
        icon: EqualizerSharp,
        layout: "/admin",
        children: [{
            path: "/users",
            name: "Users",
            icon: GroupAdd,
            component: RentersUsers,
            layout: "/management"
        },
        {
            path: "/clients/clientRegistration",
            name: "Client Registration",
            icon: HowToReg,
            component: ClientRegistration,
            layout: "/management"
        },
        {
            path: "/clients",
            name: "Clients",
            icon: GroupAdd,
            component: Client,
            layout: "/management"
        },
        {
            path: "/clients/clientDetail",
            name: "Client Detail",
            icon: Details,
            component: ClientDetail,
            layout: "/management"
        },
        {
            path: "/hostelers/hostelerRegistration",
            name: "Hosteler Registration",
            icon: HowToReg,
            component: HostelerRegistration,
            layout: "/management"
        },
        {
            path: "/hostelers",
            name: "Hostelers",
            icon: GroupAdd,
            component: Hosteler,
            layout: "/management"
        },
        {
            path: "/hostelers/hostelerDetail",
            name: "Hosteler Detail",
            icon: Details,
            component: hostelerDetail,
            layout: "/management"
        }]
    },
    {
        path: "/profile",
        name: "Profile",
        icon: Person,
        component: Profile,
        layout: "/admin"
    },
    {
        path: '',
        name: "Settings",
        icon: Settings,
        layout: "/admin",
        children: [{
            path: "/settings/general",
            name: "General Settings",
            icon: Settings,
            component: SettingsContainer,
            layout: "/settings"
        },
        {
            path: "/settings/notification",
            name: "Notification Settings",
            icon: NotificationImportant,
            component: SettingsContainer,
            layout: "/settings"
        },
        {
            path: "/settings/subscription",
            name: "Subscription Settings",
            icon: AccountBalanceSharp,
            component: SettingsContainer,
            layout: "/settings"
        },
        {
            path: "/settings/security",
            name: "Security Settings",
            icon: Security,
            component: SettingsContainer,
            layout: "/settings"
        }]
    },
    {
        path: "/calendar",
        name: "Calendar",
        icon: CalendarToday,
        component: Calendar,
        layout: "/admin"
    },
    {
        path: "/socialFeed",
        name: "Social Feed",
        icon: FeedbackSharp,
        component: SocialFeed,
        layout: "/admin"
    },
    {
        path: "/subscription",
        name: "Subscription Price",
        icon: MonetizationOnSharp,
        component: SubscriptionPrice,
        layout: "/admin"
    },
    {
        path: "/chat",
        name: "Chat",
        icon: ChatBubble,
        component: Chat,
        layout: "/admin"
    },
    {
        path: "/pageNotFound",
        name: "PageNotFound",
        component: PageNotFound,
        layout: "/admin"
    }
];

export default dashboardRoutes;

