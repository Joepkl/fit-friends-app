import type Route from "@/constants/Route";

export default interface MenuItem {
  name: string;
  link: Route;
  icon: string;
  activeIcon: string;
}
