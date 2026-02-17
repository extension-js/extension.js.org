import {Card, CardContent} from '../ui/card'
import {Table, TableBody, TableCaption, TableCell, TableRow} from '../ui/table'
import type {Template} from './types'

export function TemplateDetailsCard({template}: {template: Template}) {
  const toUpperCase = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1)

  return (
    <Table className="mt-3">
      <TableBody>
        <TableRow key={`${template.name}-context`}>
          <TableCell>Context</TableCell>
          <TableCell className="text-right">
            {template.uiContext ? toUpperCase(template.uiContext[0]) : 'None'}
          </TableCell>
        </TableRow>
        <TableRow key={template.uiFramework}>
          <TableCell>Framework</TableCell>
          <TableCell className="text-right">
            {toUpperCase(template.uiFramework || 'None')}
          </TableCell>
        </TableRow>
        <TableRow key={template.css}>
          <TableCell>CSS</TableCell>
          <TableCell className="text-right">
            {toUpperCase(template.css)}
          </TableCell>
        </TableRow>
        <TableRow key={`${template.name}-${template.hasBackground}`}>
          <TableCell>Background?</TableCell>
          <TableCell className="text-right">
            {template.hasEnv ? 'Yes' : 'No'}
          </TableCell>
        </TableRow>
        <TableRow key={`${template.name}-${template.hasEnv}`}>
          <TableCell>Env Vars?</TableCell>
          <TableCell className="text-right">
            {template.hasEnv ? 'Yes' : 'No'}
          </TableCell>
        </TableRow>
        <TableRow key={`${template.name}-config-files`}>
          <TableCell>Config Files</TableCell>
          {template.configFiles && template.configFiles.length > 0 ? (
            <TableCell>
              <ul>
                {template.configFiles.map((configFile) => (
                  <li key={configFile}>{configFile.toLowerCase()}</li>
                ))}
              </ul>
            </TableCell>
          ) : (
            <TableCell className="text-right">None</TableCell>
          )}
        </TableRow>
      </TableBody>
      <TableCaption className="mt-12">
        {template.name} - Technical Details
      </TableCaption>
    </Table>
  )
}
