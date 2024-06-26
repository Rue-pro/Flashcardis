import { useStore } from '@nanostores/preact'
import { useState } from 'preact/hooks'

import { NoSelectedLanguages } from '@popup/features/language/SelectLanguages'
import { DeleteNote } from '@popup/features/note/DeleteNote'
import { EditNote } from '@popup/features/note/EditNote'
import {
  $ankiPort,
  FillFlashcardForm,
  FillFlashcardFormNotAvailable,
} from '@popup/features/note/FillFlashcardForm'

import { currentLanguagePageStore } from '@popup/entities/language'
import { NoNotes, NoteCard } from '@popup/entities/note'

import { browser } from '@popup/shared/browser'
import { Button } from '@popup/shared/ui/Button'
import { Modal } from '@popup/shared/ui/Modal'
import { Tab, TabPanel, Tabs, TabsList, a11yProps } from '@popup/shared/ui/Tabs'
import { EditIcon } from '@popup/shared/ui/icons/EditIcon'

import { TLanguageCode, languageStore } from '@shared/entities/language'
import { INote, noteStore } from '@shared/entities/note'

import styles from './styles.module.scss'

export const NoteList = () => {
  const ankiPort = useStore($ankiPort)
  const languages = useStore(languageStore.$languages)
  const notes = useStore(noteStore.$notes)
  const currentPageLanguage = useStore(
    currentLanguagePageStore.$currentPageLanguage,
  )

  const [editNote, setEditNote] = useState<{
    lang: TLanguageCode
    note: INote
  } | null>(null)
  const closeEditNoteModal = () => setEditNote(null)

  return (
    <div className={styles.container}>
      {!ankiPort && <FillFlashcardFormNotAvailable />}
      {languages.length ? (
        <>
          <Tabs defaultValue={currentPageLanguage}>
            <TabsList arrows={true}>
              {languages.map((language) => (
                <Tab
                  key={language.value}
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
                  key={language.value}
                  {...a11yProps('language_navigation', language.value)}
                  value={language.value}
                >
                  {notes[language.value].length ? (
                    <ul>
                      {notes[language.value].map((note) => {
                        return (
                          <NoteCard
                            key={note.id}
                            note={note}
                            actions={
                              <>
                                <Button
                                  variant="secondary"
                                  startIcon={<EditIcon />}
                                  aria-label={browser.i18n.getMessage(
                                    'EDIT_NOTE_OPEN',
                                    note.text,
                                  )}
                                  onClick={() => {
                                    setEditNote({ lang: language.value, note })
                                  }}
                                />
                                <DeleteNote
                                  lang={language.value}
                                  noteId={note.id}
                                  noteText={note.text}
                                />
                                <FillFlashcardForm note={note} />
                              </>
                            }
                          />
                        )
                      })}
                    </ul>
                  ) : (
                    <NoNotes />
                  )}
                </TabPanel>
              )
            })}
          </Tabs>
        </>
      ) : (
        <NoSelectedLanguages />
      )}
      {editNote ? (
        <Modal open={true} onClose={closeEditNoteModal}>
          <EditNote
            lang={editNote.lang}
            note={editNote.note}
            onCancel={closeEditNoteModal}
          />
        </Modal>
      ) : null}
    </div>
  )
}
