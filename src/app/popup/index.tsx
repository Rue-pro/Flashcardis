import { render } from 'preact'
import { StrictMode } from 'preact/compat'

import { Popup } from './Popup'

render(
  <StrictMode>
    <Popup />
  </StrictMode>,
  document.getElementById('flashcardis_extension')!,
)
