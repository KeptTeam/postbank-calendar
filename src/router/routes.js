
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/index') },
      { path: 'create', component: () => import('pages/create-event') }
    ]
  },

  {
    path: '/admin',
    component: () => import('layouts/default'),
    children: [
      { path: 'promotions', component: () => import('pages/admin/promotions') },
      { path: 'promotion/:id?', component: () => import('pages/admin/promotion-edit') }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
