import { useStore } from '@nanostores/preact'
import { useState } from 'preact/hooks'

import { NoSelectedLanguages } from '@features/language/SelectLanguages'
import { DeleteNote } from '@features/note/DeleteNote'
import { EditNote } from '@features/note/EditNote'

import { languageStore } from '@entities/language'
import { INote, NoteCard, noteStore } from '@entities/note'

import { browser } from '@shared/browser'
import { Button } from '@shared/ui/Button'
import { Modal } from '@shared/ui/Modal'
import { Tab, TabPanel, Tabs, TabsList, a11yProps } from '@shared/ui/Tabs'
import { EditIcon } from '@shared/ui/icons/EditIcon'

export const NoteList = () => {
  const languages = useStore(languageStore.$languages)
  const notes = useStore(noteStore.$notes)

  const [editNote, setEditNote] = useState<INote | null>(null)
  const closeEditNoteModal = () => setEditNote(null)

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
                  <ul>
                    {notes.map((note) => {
                      return (
                        <NoteCard
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
                                  setEditNote(note)
                                }}
                              />
                              <DeleteNote
                                lang={language.value}
                                noteId={note.id}
                                noteText={note.text}
                              />
                            </>
                          }
                        />
                      )
                    })}
                  </ul>
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
            lang={'en'}
            note={editNote}
            onCancel={closeEditNoteModal}
            onSubmit={closeEditNoteModal}
          />
        </Modal>
      ) : null}
    </>
  )
}