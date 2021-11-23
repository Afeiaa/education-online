import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },
    {
        path: '/404',
        component: () =>
            import ('@/views/404'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        name: 'Dashboard',
        hidden: true,
        children: [{
            path: 'dashboard',
            component: () =>
                import ('@/views/dashboard/index')
        }]
    },

    // 讲师管理
    {
        path: '/teacher',
        component: Layout,
        redirect: '/teacher/table',
        name: '讲师管理',
        meta: { title: '讲师管理', icon: 'example' },
        children: [{
                path: 'table',
                name: '讲师列表',
                component: () =>
                    import ('@/views/edu/teacher/list'),
                meta: { title: '讲师列表', icon: 'table' }
            },
            {
                path: 'save',
                name: '添加讲师',
                component: () =>
                    import ('@/views/edu/teacher/save'),
                meta: { title: '添加讲师', icon: 'tree' }
            },
            {
                path: 'edit/:id',
                name: '编辑讲师',
                component: () =>
                    import ('@/views/edu/teacher/save'),
                meta: { title: '编辑讲师', icon: 'tree' },
                hidden: true
            }
        ]
    },

    // 课程分类管理
    {
        path: '/subject',
        component: Layout,
        redirect: '/subject/list',
        name: 'Subject',
        meta: { title: '课程分类管理', icon: 'nested' },
        children: [{
                path: 'list',
                name: 'EduSubjectList',
                component: () =>
                    import ('@/views/edu/subject/list'),
                meta: { title: '课程分类列表' }
            },
            {
                path: 'import',
                name: 'EduSubjectImport',
                component: () =>
                    import ('@/views/edu/subject/import'),
                meta: { title: '导入课程分类' }
            }
        ]
    },

    // 课程管理
    {
        path: '/course',
        component: Layout,
        redirect: '/course/list',
        name: 'Course',
        meta: { title: '课程管理', icon: 'form' },
        children: [{
                path: 'list',
                name: 'EduCourseList',
                component: () =>
                    import ('@/views/edu/course/list'),
                meta: { title: '课程列表' }
            },
            {
                path: 'info',
                name: 'EduCourseInfo',
                component: () =>
                    import ('@/views/edu/course/info'),
                meta: { title: '发布课程' }
            },
            {
                path: 'info/:id',
                name: 'EduCourseInfoEdit',
                component: () =>
                    import ('@/views/edu/course/info'),
                meta: { title: '编辑课程基本信息', noCache: true },
                hidden: true
            },
            {
                path: 'chapter/:id',
                name: 'EduCourseChapterEdit',
                component: () =>
                    import ('@/views/edu/course/chapter'),
                meta: { title: '编辑课程大纲', noCache: true },
                hidden: true
            },
            {
                path: 'publish/:id',
                name: 'EduCoursePublishEdit',
                component: () =>
                    import ('@/views/edu/course/publish'),
                meta: { title: '发布课程', noCache: true },
                hidden: true
            }
        ]
    },

    // 统计裂变
    {
        path: '/sta',
        component: Layout,
        redirect: '/sta/create',
        name: '统计分析',
        meta: { title: '统计分析', icon: 'example' },
        children: [
          {
            path: 'create',
            name: '生成数据',
            component: () => import('@/views/sta/create'),
            meta: { title: '生成数据', icon: 'table' }
          },
          {
            path: 'show',
            name: '图表显示',
            component: () => import('@/views/sta/show'),
            meta: { title: '图表显示', icon: 'tree' }
          }
        ]
      },

    {
        path: '/example',
        component: Layout,
        redirect: '/example/table',
        name: 'Example',
        meta: { title: 'Example', icon: 'form' },
        children: [{
                path: 'table',
                name: 'Table',
                component: () =>
                    import ('@/views/table/index'),
                meta: { title: 'Table', icon: 'table' }
            },
            {
                path: 'tree',
                name: 'Tree',
                component: () =>
                    import ('@/views/tree/index'),
                meta: { title: 'Tree', icon: 'tree' }
            }
        ]
    },

    {
        path: '/form',
        component: Layout,
        children: [{
            path: 'index',
            name: 'Form',
            component: () =>
                import ('@/views/form/index'),
            meta: { title: 'Form', icon: 'form' }
        }]
    },

    {
        path: '/nested',
        component: Layout,
        redirect: '/nested/menu1',
        name: 'Nested',
        meta: {
            title: 'Nested',
            icon: 'nested'
        },
        children: [{
                path: 'menu1',
                component: () =>
                    import ('@/views/nested/menu1/index'), // Parent router-view
                name: 'Menu1',
                meta: { title: 'Menu1' },
                children: [{
                        path: 'menu1-1',
                        component: () =>
                            import ('@/views/nested/menu1/menu1-1'),
                        name: 'Menu1-1',
                        meta: { title: 'Menu1-1' }
                    },
                    {
                        path: 'menu1-2',
                        component: () =>
                            import ('@/views/nested/menu1/menu1-2'),
                        name: 'Menu1-2',
                        meta: { title: 'Menu1-2' },
                        children: [{
                                path: 'menu1-2-1',
                                component: () =>
                                    import ('@/views/nested/menu1/menu1-2/menu1-2-1'),
                                name: 'Menu1-2-1',
                                meta: { title: 'Menu1-2-1' }
                            },
                            {
                                path: 'menu1-2-2',
                                component: () =>
                                    import ('@/views/nested/menu1/menu1-2/menu1-2-2'),
                                name: 'Menu1-2-2',
                                meta: { title: 'Menu1-2-2' }
                            }
                        ]
                    },
                    {
                        path: 'menu1-3',
                        component: () =>
                            import ('@/views/nested/menu1/menu1-3'),
                        name: 'Menu1-3',
                        meta: { title: 'Menu1-3' }
                    }
                ]
            },
            {
                path: 'menu2',
                component: () =>
                    import ('@/views/nested/menu2/index'),
                meta: { title: 'menu2' }
            }
        ]
    },

    {
        path: 'external-link',
        component: Layout,
        children: [{
            path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
            meta: { title: 'External Link', icon: 'link' }
        }]
    },

    { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})