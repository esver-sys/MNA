export interface RouteItem {
  name: string;
  path: string;
  icon?: string | null;
  children?: RouteItem[];
  meta?: {
    title: string;
    auth?: boolean;
  };
}