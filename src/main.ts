import './style.css'
import { durations, dates } from './facts'


function fill(container: HTMLElement, type: keyof HTMLElementTagNameMap, entries: string[]) {
  entries.forEach(d => {
    const el = document.createElement(type)
    el.innerText = d
    container.appendChild(el)
  })
}


const durationsEl = document.querySelector<HTMLUListElement>('#durations')!
fill(durationsEl, 'li', durations)

const datesEl = document.querySelector<HTMLUListElement>('#dates')!
fill(datesEl, 'li', dates)