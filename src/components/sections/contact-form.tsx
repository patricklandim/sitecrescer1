import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { CheckCircle2, Info, Loader2 } from 'lucide-react'
import { site, whatsappLink } from '@/config/site'
import { specialties } from '@/config/specialties'
import { onContactIntent } from '@/lib/contact-intent'
import { cn } from '@/lib/utils'
import { Button, ButtonArrow } from '@/components/ui/button'

type Status = 'idle' | 'sending' | 'sent' | 'error'
type Errors = Partial<Record<'name' | 'phone' | 'email' | 'consent', string>>

/**
 * Canal de envio, em ordem de preferência:
 * 1. Serviço de formulário (`site.formEndpoint`, ex.: Formspree)
 * 2. WhatsApp com a mensagem preenchida (`site.contact.whatsapp`)
 * Sem nenhum dos dois, o envio fica desativado e o formulário avisa isso claramente.
 */
const channel: 'endpoint' | 'whatsapp' | null = site.formEndpoint ? 'endpoint' : site.contact.whatsapp ? 'whatsapp' : null

const NOT_SURE = 'Ainda não sei / quero orientação'

function formatPhone(value: string) {
  const d = value.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d.length ? `(${d}` : ''
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const [interest, setInterest] = useState(NOT_SURE)
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')

  useEffect(
    () =>
      onContactIntent((specialty) => {
        setInterest(specialty)
        nameRef.current?.focus({ preventScroll: true })
      }),
    [],
  )

  function validate(data: FormData): Errors {
    const e: Errors = {}
    if (String(data.get('name') ?? '').trim().length < 3) e.name = 'Informe seu nome.'
    if (String(data.get('phone') ?? '').replace(/\D/g, '').length < 10) e.phone = 'Informe um telefone com DDD.'
    const email = String(data.get('email') ?? '').trim()
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Confira o e-mail informado.'
    if (!data.get('consent')) e.consent = 'É preciso autorizar o contato para continuar.'
    return e
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!channel) return
    const data = new FormData(event.currentTarget)
    const found = validate(data)
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }

    const payload = {
      nome: String(data.get('name')).trim(),
      telefone: String(data.get('phone')),
      email: String(data.get('email') ?? '').trim(),
      interesse: String(data.get('interest')),
      mensagem: String(data.get('message') ?? '').trim(),
    }

    if (channel === 'whatsapp') {
      const text = [
        `Olá! Meu nome é ${payload.nome}.`,
        `Tenho interesse em: ${payload.interesse}.`,
        payload.mensagem && `Mensagem: ${payload.mensagem}`,
        `Telefone: ${payload.telefone}`,
        payload.email && `E-mail: ${payload.email}`,
      ]
        .filter(Boolean)
        .join('\n')
      window.open(whatsappLink(text)!, '_blank', 'noopener,noreferrer')
      setStatus('sent')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(site.formEndpoint!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
      formRef.current?.reset()
      setPhone('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-[2rem] bg-cream-50 p-8 sm:p-10">
        <CheckCircle2 className="size-10 text-brand-500" aria-hidden />
        <h3 className="text-2xl font-semibold tracking-tight text-brand-900">
          {channel === 'whatsapp' ? 'Sua mensagem está pronta no WhatsApp.' : 'Mensagem enviada!'}
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          {channel === 'whatsapp'
            ? 'Abrimos uma conversa com a clínica com os dados preenchidos. Basta confirmar o envio por lá.'
            : 'Recebemos o seu contato. A equipe da Clínica Crescer retornará pelos dados informados.'}
        </p>
        <Button variant="outline" size="sm" onClick={() => setStatus('idle')}>
          Enviar outra mensagem
        </Button>
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      aria-describedby={!channel ? 'form-unavailable' : undefined}
      className="rounded-[2rem] bg-cream-50 p-6 shadow-[0_30px_80px_-40px_rgb(13_34_25/0.6)] sm:p-10"
    >
      <h3 className="text-2xl font-semibold tracking-tight text-brand-900">Envie uma mensagem</h3>
      <p className="mt-2 text-muted-foreground">Campos com * são obrigatórios.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field label="Seu nome *" error={errors.name} className="sm:col-span-2">
          {(props) => <input ref={nameRef} name="name" autoComplete="name" required {...props} />}
        </Field>
        <Field label="Telefone / WhatsApp *" error={errors.phone}>
          {(props) => (
            <input
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="(00) 00000-0000"
              required
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              {...props}
            />
          )}
        </Field>
        <Field label="E-mail" error={errors.email}>
          {(props) => <input name="email" type="email" autoComplete="email" placeholder="voce@email.com" {...props} />}
        </Field>
        <Field label="Especialidade de interesse" className="sm:col-span-2">
          {(props) => (
            <select name="interest" value={interest} onChange={(e) => setInterest(e.target.value)} {...props}>
              <option>{NOT_SURE}</option>
              {specialties.map((s) => (
                <option key={s.slug}>{s.name}</option>
              ))}
            </select>
          )}
        </Field>
        <Field label="Mensagem" className="sm:col-span-2">
          {(props) => (
            <textarea
              name="message"
              rows={4}
              placeholder="Conte um pouco sobre a criança e o que você gostaria de saber."
              {...props}
              className={cn(props.className, 'h-auto resize-y py-3')}
            />
          )}
        </Field>
      </div>

      <div className="mt-6">
        <label className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
          <input
            type="checkbox"
            name="consent"
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? 'consent-error' : undefined}
            className="mt-0.5 size-5 shrink-0 rounded accent-brand-600"
          />
          Autorizo a Clínica Crescer a usar estes dados apenas para responder ao meu contato.
        </label>
        {errors.consent && (
          <p id="consent-error" className="mt-2 text-sm font-medium text-coral-deep">
            {errors.consent}
          </p>
        )}
      </div>

      {!channel && (
        <p id="form-unavailable" className="mt-6 flex gap-3 rounded-2xl bg-sun-soft p-4 text-sm leading-relaxed text-sun-deep">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
          O envio de mensagens será ativado assim que os canais oficiais de atendimento da clínica forem configurados.
        </p>
      )}
      {status === 'error' && (
        <p role="alert" className="mt-6 rounded-2xl bg-coral-soft p-4 text-sm text-coral-deep">
          Não foi possível enviar agora. Tente novamente em instantes.
        </p>
      )}

      <Button type="submit" size="lg" disabled={!channel || status === 'sending'} className="mt-8 w-full justify-between pr-2.5 sm:w-auto">
        {status === 'sending' ? (
          <>
            Enviando… <Loader2 className="size-5 animate-spin" aria-hidden />
          </>
        ) : (
          <>
            {channel === 'whatsapp' ? 'Continuar no WhatsApp' : 'Enviar mensagem'}
            <ButtonArrow />
          </>
        )}
      </Button>
    </form>
  )
}

type FieldProps = {
  label: string
  error?: string
  className?: string
  children: (props: {
    id: string
    className: string
    'aria-invalid'?: boolean
    'aria-describedby'?: string
  }) => ReactNode
}

function Field({ label, error, className, children }: FieldProps) {
  const id = useId()
  const errorId = `${id}-error`
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-sm font-semibold text-brand-900">
        {label}
      </label>
      {children({
        id,
        className: cn(
          'h-12 w-full rounded-2xl border bg-cream-100 px-4 text-base text-brand-900 transition-colors placeholder:text-brand-900/40 focus:border-brand-500 focus:bg-cream-50 focus:outline-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/20',
          error ? 'border-coral-deep' : 'border-border',
        ),
        'aria-invalid': error ? true : undefined,
        'aria-describedby': error ? errorId : undefined,
      })}
      {error && (
        <p id={errorId} className="text-sm font-medium text-coral-deep">
          {error}
        </p>
      )}
    </div>
  )
}
