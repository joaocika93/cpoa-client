import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
  primary: { main: '#528566', contrastText:'#ffffff' },
  secondary: { main: '#BF360C', contrastText: '#ffffff' },
};
const themeName = 'App CPOA';

export default createMuiTheme({ palette, themeName });