import { useStore } from '@nanostores/preact'

import { NoSelectedLanguages } from '@popup/features/language/SelectLanguages'

import { DictionaryCard } from '@popup/entities/dictionary'

import { Tab, TabPanel, Tabs, TabsList, a11yProps } from '@popup/shared/ui/Tabs'

import { dictionaryStore } from '@shared/entities/dictionary'
import { languageStore } from '@shared/entities/language'

import { SelectDictionaryVariant } from './SelectDictionaryVariant'
import styles from './styles.module.scss'

export const SelectDictionaryList = () => {
  const dictionaries = useStore(dictionaryStore.$dictionaries)
  const languages = useStore(languageStore.$languages)

  return (
    <>
      {languages.length ? (
        <>
          <Tabs>
            <TabsList arrows={true}>
              {languages.map((language) => (
                <Tab
                  value={language.value}
                  {...a11yProps('language_navigation', language.value)}
                >
                  {language.label}
                </Tab>
              ))}
            </TabsList>
            {languages.map((language) => {
              return (
                <TabPanel
                  {...a11yProps('language_navigation', language.value)}
                  value={language.value}
                >
                  <ul className={styles.dictionaries}>
                    {dictionaries[language.value].dictionaries.map(
                      (dictionary) => {
                        if ('variants' in dictionary) {
                          return (
                            <li>
                              <SelectDictionaryVariant
                                key={dictionary.id}
                                dictionary={dictionary}
                              />
                            </li>
                          )
                        } else {
                          return (
                            <DictionaryCard
                              key={dictionary.id}
                              url={dictionary.url}
                              name={dictionary.name}
                            />
                          )
                        }
                      },
                    )}
                  </ul>
                </TabPanel>
              )
            })}
          </Tabs>
        </>
      ) : (
        <NoSelectedLanguages />
      )}
    </>
  )
}
