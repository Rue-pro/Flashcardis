export const a11yProps = (tabName: string, index: number | string) => ({
  id: `${tabName}-tab-${index}`,
  'aria-controls': `${tabName}-tabpanel-${index}`,
  'aria-labelledby': `${tabName}-tab-${index}`,
})
