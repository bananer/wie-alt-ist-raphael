import './style.css'
import { durations } from './durations'

const durationsEl = document.querySelector<HTMLDivElement>('#durations')!

durations.forEach(d => {
  const el = document.createElement("li")
  el.innerText = d
  durationsEl.appendChild(el)
})
