import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import Register from 'layouts/Register'

const indexRoutes = [{
	path: "/", component: Dashboard
}, {
	path: '/register', component: Register
}];

export default indexRoutes;
