import React from 'react'
import { Home, Address } from "./components"
import { Routes, Route } from "react-router-dom";
import { Box, Grommet } from "grommet";
import { useThemeMode } from "../src/hooks/themeSwitcherHook";
import { theme, darkTheme } from "./theme";

const AllRoutes = () => {
  const themeMode = useThemeMode();
  return (
    <div className='max-w-8xl mx-auto'>
      <Grommet
        theme={themeMode === "light" ? theme : darkTheme}
        themeMode={themeMode}
        full
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/address/:id" element={<Address />} />
        </Routes>
      </Grommet>
    </div>
  )
}

export default AllRoutes
