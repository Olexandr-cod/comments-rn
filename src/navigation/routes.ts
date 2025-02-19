
export const DASHBOARD_ROUTES = {
    HOME_SCREEN: 'Home_Screen',
} as const;

export type valueof<T> = T[keyof T];

export type RootDashboard = valueof<typeof DASHBOARD_ROUTES>;

export type RootRoutes = RootDashboard;

export type AllRoutes = RootRoutes;
