
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/index') },
      { path: 'event/:id?', component: () => import('pages/edit-event'), props: true }
    ]
  },

  {
    path: '/admin',
    component: () => import('layouts/default'),
    children: [
      { path: 'promotions', component: () => import('pages/admin/promotions') },
      { path: 'promotion/:id?', component: () => import('pages/admin/promotion-edit'), props: true }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
