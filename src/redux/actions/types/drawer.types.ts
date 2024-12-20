export interface DrawerContent {
  title?: string;
  identifier?: `drawer-${string}`;
}

export interface DrawerState {
  isOpen: boolean;
  content: DrawerContent;
}
