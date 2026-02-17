import {Card, CardContent, CardHeader, CardTitle} from '../ui/card'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '../ui/tabs'
import {TemplateDetailsCard} from './details'
import {TemplateCard} from './template'
import type {Template} from './types'

export function TemplateTabs({
  template,
  className,
  setActiveTemplate
}: {
  template: Template
  className?: string
  setActiveTemplate: () => void
}) {
  return (
    <Tabs defaultValue="overview" className={className}>
      <Card className="w-full p-6 min-h-[26rem]">
        <TabsList className="grid w-full grid-cols-2 bg-[--rp-c-bg-mute]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <TemplateCard
            template={template}
            setActiveTemplate={setActiveTemplate}
          />
        </TabsContent>
        <TabsContent value="details">
          <TemplateDetailsCard template={template} />
        </TabsContent>
      </Card>
    </Tabs>
  )
}
