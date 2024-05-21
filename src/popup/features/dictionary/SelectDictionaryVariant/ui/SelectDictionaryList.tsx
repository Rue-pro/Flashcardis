import { useStore } from '@nanostores/preact'

import { NoSelectedLanguages } from '@popup/features/language/SelectLanguages'

import { DictionaryCard } from '@popup/entities/dictionary'
import { currentLanguagePageStore } from '@popup/entities/language'

import { Tab, TabPanel, Tabs, TabsList, a11yProps } from '@popup/shared/ui/Tabs'

import { dictionaryStore } from '@shared/entities/dictionary'
import { languageStore } from '@shared/entities/language'

import { SelectDictionaryVariant } from './SelectDictionaryVariant'
import styles from './styles.module.scss'

export const SelectDictionaryList = () => {
  const dictionaries = useStore(dictionaryStore.$dictionaries)
  const languages = useStore(languageStore.$languages)
  const currentPageLanguage = useStore(
    currentLanguagePageStore.$currentPageLanguage,
  )

  return (
    <>
      {languages.length ? (
        <>
          <Tabs defaultValue={currentPageLanguage}>
            <TabsList arrows={true}>
              {languages.map((language) =>
                language.value === 'other' ? null : (
                  <Tab
                    key={language.value}
                    value={language.value}
                    {...a11yProps('language_navigation', language.value)}
                  >
                    {language.label}
                  </Tab>
                ),
              )}
            </TabsList>
            {languages.map((language) => {
              return language.value === 'other' ? null : (
                <TabPanel
                  key={language.value}
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
                                lang={language.value}
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
