import DashboardLayout from '../layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

// Admin pages
import Homepage from 'src/pages/Homepage.vue'
import UserProfile from 'src/pages/UserProfile.vue'
import UsersList from 'src/pages/UsersList.vue'
import MoviesList from 'src/pages/MoviesList.vue'
import Icons from 'src/pages/Icons.vue'
import Maps from 'src/pages/Maps.vue'
import Notifications from 'src/pages/Notifications.vue'
import Upgrade from 'src/pages/Upgrade.vue'
import Login from 'src/pages/login.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/homepage',
    children: [
      {
        path: 'homepage',
        name: 'Homepage',
        component: Homepage
      },
      {
        path: 'user/:id',
        name: 'User',
        component: UserProfile,
        props: true
      },
      {
        path: 'users',
        name: 'Users List',
        component: UsersList
      },
      {
        path: 'movies',
        name: 'Movies List',
        component: MoviesList
      },
      {
        path: 'icons',
        name: 'Icons',
        component: Icons
      },
      {
        path: 'maps',
        name: 'Maps',
        component: Maps
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
      },
      {
        path: 'upgrade',
        name: 'Upgrade to PRO',
        component: Upgrade
      }
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
