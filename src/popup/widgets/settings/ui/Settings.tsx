import { useState } from 'preact/hooks'

import { SelectDictionaryList } from '@popup/features/dictionary/SelectDictionaryVariant'
import { SelectLanguages } from '@popup/features/language/SelectLanguages'

import { ErrorList } from '@popup/entities/error'

import { browser } from '@popup/shared/browser'
import { Button } from '@popup/shared/ui/Button'
import { Modal } from '@popup/shared/ui/Modal'
import { Tab, TabPanel, Tabs, TabsList, a11yProps } from '@popup/shared/ui/Tabs'
import { SettingsIcon } from '@popup/shared/ui/icons/SettingsIcon'

import { LANGUAGES } from '@shared/entities/language'

export const Settings = () => {
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <>
      <Button
        className="settings_opener"
        variant="secondary"
        startIcon={<SettingsIcon />}
        aria-label={browser.i18n.getMessage('SETTINGS_OPEN')}
        onClick={() => setSettingsOpen(true)}
      />
      <Modal open={settingsOpen} onClose={() => setSettingsOpen(false)}>
        <Tabs defaultValue="languages">
          <TabsList>
            <Tab
              {...a11yProps('settings_navigation', 'languages')}
              value="languages"
            >
              Languages
            </Tab>

            <Tab
              {...a11yProps('settings_navigation', 'dictionaries')}
              value="dictionaries"
            >
              Dictionaries
            </Tab>

            <Tab {...a11yProps('settings_navigation', 'logs')} value="logs">
              Logs
            </Tab>
          </TabsList>

          <TabPanel
            {...a11yProps('settings_navigation', 'languages')}
            value="languages"
          >
            <SelectLanguages languages={LANGUAGES} />
          </TabPanel>

          <TabPanel
            {...a11yProps('settings_navigation', 'dictionaries')}
            value="dictionaries"
          >
            <SelectDictionaryList />
          </TabPanel>

          <TabPanel {...a11yProps('settings_navigation', 'logs')} value="logs">
            <ErrorList />
          </TabPanel>
        </Tabs>
      </Modal>
    </>
  )
}
