import { createContext } from 'react';

interface contextProps {

  isMenuOpen: boolean;

  toggleSlideMenu : () => void;
}

export const UiContext = createContext({} as contextProps);