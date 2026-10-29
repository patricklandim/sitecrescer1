/**
 * Permite que outras seções (ex.: cards de especialidade) pré-selecionem
 * o assunto do formulário de contato antes de rolar até ele.
 */
const EVENT = 'crescer:contact-intent'

export function requestContact(specialty: string) {
  window.dispatchEvent(new CustomEvent<string>(EVENT, { detail: specialty }))
  document.getElementById('contato')?.scrollIntoView()
}

export function onContactIntent(handler: (specialty: string) => void) {
  const listener = (e: Event) => handler((e as CustomEvent<string>).detail)
  window.addEventListener(EVENT, listener)
  return () => window.removeEventListener(EVENT, listener)
}
