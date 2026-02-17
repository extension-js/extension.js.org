import {Button} from '@components/ui/button'
import {Toggle} from '@components/ui/toggle'
import {Badge} from '../ui/badge'
import {CardDescription, CardTitle} from '../ui/card'
import type {Template} from './types'

export function GetToggle({
  setActiveTemplate
}: {
  setActiveTemplate: () => void
}) {
  return (
    <Toggle aria-label="Select Template" onClick={setActiveTemplate}>
      <Button variant={'outline'}>
        Select<span className="ml-2">🧩</span>
      </Button>
    </Toggle>
  )
}

export function TemplateCard({
  template,
  setActiveTemplate
}: {
  template: Template
  setActiveTemplate: () => void
}) {
  return (
    <section className="grid gap-6 overflow-hidden">
      <img
        src={'https://placehold.co/280x180'}
        alt="Prototype screenshot"
        className="max-w-full"
      />
      <header className="grid w-full items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle>{template.name}</CardTitle>
          <CardDescription>{template.description}</CardDescription>
        </div>
      </header>
      <div className="grid grid-cols-2 items-center gap-4 text-sm text-muted-foreground mt-8">
        <div>
          <Badge variant="outline">
            {template.uiContext || 'manifest.json'}
          </Badge>
          <Button variant="link" onClick={setActiveTemplate}>
            Select
          </Button>
        </div>
      </div>
    </section>
  )
}
