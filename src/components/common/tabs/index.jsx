import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export default function Tabs({ tabHedings, tabValue, setTabValue }) {
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="tabs" centered>
            {tabHedings?.map((heading) => {
              return (
                <Tab
                  label={heading?.name}
                  value={heading?.value}
                  key={heading.value}
                />
              );
            })}
          </TabList>
        </Box>
      </TabContext>
    </Box>
  );
}
