import DashboardLayout from '../layout/DashboardLayout.vue'
import NotFound from '../pages/NotFoundPage.vue'
import Homepage from 'src/pages/Homepage.vue'
import UserProfile from 'src/pages/UserProfile.vue'
import UsersList from 'src/pages/UsersList.vue'
import MoviesList from 'src/pages/MoviesList.vue'
import TheatersList from 'src/pages/TheatersList.vue'
import MovieForm from 'src/pages/MovieForm.vue'
import ReportsPage from 'src/pages/ReportsPage.vue'
import Login from 'src/pages/Login.vue'
import CreateUserForm from 'src/pages/CreateUserForm.vue'
import CreateMovieForm from 'src/pages/CreateMovieForm.vue'
import CreateTheaterForm from 'src/pages/CreateTheaterForm.vue'

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
        path: 'theaters',
        name: 'Theaters List',
        component: TheatersList
      },
      {
        path: 'movie/:id',
        name: 'Movie',
        component: MovieForm
      },
      {
        path: 'reports',
        name: 'Reports',
        component: ReportsPage
      },
      {
        path: 'createuser',
        name: 'UserForm',
        component: CreateUserForm
      },
      {
        path: 'createmovie',
        name: 'MovieForm',
        component: CreateMovieForm
      },
      {
        path: 'createtheater',
        name: 'TheaterForm',
        component: CreateTheaterForm
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
