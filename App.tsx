import { Routes } from './src/routes/HomeTabStack';
import { ThemeProvider } from 'styled-components';
import theme from './src/theme';
import { DataProvider } from "./src/context/DataContext";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <DataProvider>
        <Routes/>
      </DataProvider>
    </ThemeProvider>
  );
}

