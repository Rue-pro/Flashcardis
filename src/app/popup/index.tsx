import { render } from 'preact'
import { StrictMode } from 'preact/compat'

import { Popup } from './Popup'
import './styles.scss'

render(
  <StrictMode>
    <Popup />
  </StrictMode>,
  document.getElementById('flashcardis_extension')!,
)
