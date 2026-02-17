import {Check, Copy} from 'lucide-react'
import React, {useState} from 'react'
import {Button} from '../../components/ui/button'
import {Card, CardContent} from '../../components/ui/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '../../components/ui/tabs'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../../components/ui/tooltip'

interface TabsCommandLineProps {
  command: {
    npm: string
    pnpm: string
    yarn: string
  }
}

export function TabsCommandLine({command}: TabsCommandLineProps) {
  const [selectedTab, setSelectedTab] = useState<'npm' | 'pnpm' | 'yarn'>('npm')
  const [copiedTab, setCopiedTab] = useState<string | null>(null)

  const getCommand = (packageManager: 'npm' | 'pnpm' | 'yarn'): string => {
    switch (packageManager) {
      case 'npm':
        return `npx ${command.npm}`
      case 'pnpm':
        return `pnpm dlx ${command.pnpm}`
      case 'yarn':
        return `yarn dlx ${command.yarn}`
      default:
        return `npx ${command.npm}`
    }
  }

  const copyToClipboard = (text: string, tab: string) => {
    navigator.clipboard.writeText(text)
    setCopiedTab(tab)
    setTimeout(() => setCopiedTab(null), 2000)
  }

  const tabs = [
    {
      key: 'npm',
      label: 'npm',
      iconUrl:
        'https://github.com/user-attachments/assets/135f149f-ce5e-4ce2-9fee-3eb529b5481a'
    },
    {
      key: 'pnpm',
      label: 'pnpm',
      iconUrl:
        'https://github.com/user-attachments/assets/42ed278a-12da-4816-b7e3-da867144fc62'
    },
    {
      key: 'yarn',
      label: 'Yarn',
      iconUrl:
        'https://github.com/user-attachments/assets/461cee19-7d40-4d25-b70e-42501cf5fc0f'
    }
  ]

  return (
    <Card className="max-w-4xl w-full m-auto p-4">
      <Tabs
        value={selectedTab}
        onValueChange={(value) =>
          setSelectedTab(value as 'npm' | 'pnpm' | 'yarn')
        }
        className="w-full"
      >
        <TabsList className="w-full justify-start space-x-4 mb-4">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.key}
              value={tab.key}
              className="bg-[var(--rp-c-bg-mute)]"
            >
              <img
                src={tab.iconUrl || 'https://placekitten.com/32/32'}
                alt={`The package manager ${tab.label} icon`}
                width="16"
                className="mr-2"
              />
              <span>{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.key} value={tab.key}>
            <div className="relative">
              <pre className="rounded-md px-4 pb-4 pr-16 overflow-x-auto text-left">
                <code>{getCommand(tab.key as 'npm' | 'pnpm' | 'yarn')}</code>
              </pre>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute -top-2 right-2"
                      onClick={() =>
                        copyToClipboard(
                          getCommand(tab.key as 'npm' | 'pnpm' | 'yarn'),
                          tab.key
                        )
                      }
                    >
                      {copiedTab === tab.key ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {copiedTab === tab.key ? 'Copied!' : 'Copy to clipboard'}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  )
}
