import { NavItem } from "@/types";

export const AdminNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/admin/dashboard',
        icon: 'dashboard',
        isActive: false,
        shortcut: ['d', 'd'],
        items: [] // Empty array as there are no child items for Dashboard
    },


    {
        title: 'blogs',
        url: '/admin/blogs',
        icon: 'blog',
        shortcut: ['b', 'b'],
        isActive: false,
    },

    {
        title: 'careers',
        url: '/admin/careers',
        icon: 'career',
        shortcut: ['c', 'c'],
        isActive: false,
    },

    {
        title: 'team',
        url: '/admin/team',
        icon: 'team',
        shortcut: ['t', 't'],
        isActive: false,
    },


];



export const roleByNavItems = (role: string) => {

    return AdminNavItems

}
