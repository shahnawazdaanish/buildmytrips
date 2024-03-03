import {
    RotateRectangleIcon,
    MapSearchIcon,
    TornadoIcon,
    UserCircleIcon,
    LayoutDashboardIcon, PacmanIcon, MoodHappyIcon, TypographyIcon, UserPlusIcon
} from 'vue-tabler-icons';

export interface menu {
    header?: string;
    title?: string;
    icon?: any;
    to?: string;
    chip?: string;
    chipColor?: string;
    chipVariant?: string;
    chipIcon?: string;
    children?: menu[];
    disabled?: boolean;
    type?: string;
    subCaption?: string;
}

const sidebarItem: menu[] = [
    { header: 'Home' },
    {
        title: 'Dashboard',
        icon: LayoutDashboardIcon,
        to: '/',
    },
    { header: 'recommendations' },
    {
        title: 'Search',
        icon: MapSearchIcon,
        to: '/app/search'
    },
    {
        title: 'Previous History',
        icon: TornadoIcon,
        to: '/app/history'
    },
    { header: 'profile' },
    {
        title: 'My Account',
        icon: UserCircleIcon,
        to: '/app/my-account'
    },
    {
        title: 'Update Interests',
        icon: RotateRectangleIcon,
        to: '/app/my-interests'
    },
    { header: 'Quest' },
    {
        title: 'Play a Quest',
        icon: PacmanIcon,
        to: '/app/quest'
    },
];

export default sidebarItem;
