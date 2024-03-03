const MainRoutes = {
    path: '/main',
    meta: {
        requiresAuth: true
    },
    redirect: '/main',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
        {
            name: 'Dashboard',
            path: '/',
            component: () => import('@/views/dashboard/index.vue')
        },
        {
            name: 'Search',
            path: '/app/search',
            component: () => import('@/views/search/Search.vue')
        },
        {
            name: 'History',
            path: '/app/history',
            component: () => import('@/views/pages/History.vue')
        },
        {
            name: 'My Account',
            path: '/app/my-account',
            component: () => import('@/views/auth/MyAccount.vue')
        },
        {
            name: 'PlayQuest',
            path: '/app/quest',
            component: () => import('@/views/pages/PlayQuestList.vue')
        },
        {
            name: 'Shadow',
            path: '/ui/shadow',
            component: () => import('@/views/components/Shadow.vue')
        },
        {
            name: 'Icons',
            path: '/icons',
            component: () => import('@/views/pages/Icons.vue')
        },
        {
            name: 'Starter',
            path: '/sample-page',
            component: () => import('@/views/pages/SamplePage.vue')
        },
    ]
};

export default MainRoutes;
