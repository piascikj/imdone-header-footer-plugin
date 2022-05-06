import Plugin from 'imdone-api'
import { Settings, StringProperty } from 'imdone-api/lib/settings'

export default class HeaderFooterPlugin extends Plugin {
  constructor(project) {
    super(project)
  }

  onTaskUpdate(task) {
    console.log('***HEADER*** : ', this.header)
    console.log('***FOOTER*** : ', this.footer)
    task.interpretedContent =
      task.interpretedContent = `${this.header}${task.interpretedContent}${this.footer}`
  }

  // getCardProperties(task) {
  //   const { source, line, totals } = task
  //   return {
  //     date: new Date().toDateString(),
  //     time: new Date().toLocaleTimeString(),
  //     timestamp: new Date().toISOString(),
  //     sourceLink: source && `[${source.path}:${line}](${source.path}:${line})`,
  //   }
  // }

  // getBoardActions() {
  //   const project = this.project
  //   return [
  //     {
  //       name: 'Filter for urgent cards',
  //       action: () => {
  //         project.setFilter('allTags = urgent')
  //       },
  //     },
  //     {
  //       name: 'Add a card in TODO',
  //       action: () => {
  //         project.newCard({ list: 'TODO' })
  //       },
  //     },
  //     {
  //       name: 'Test snackBar',
  //       action: () => {
  //         project.snackBar({ message: 'Testing snackBar' })
  //       },
  //     },
  //     {
  //       name: 'Test toast',
  //       action: () => {
  //         project.toast({ message: 'Testing toast' })
  //       },
  //     },
  //   ]
  // }

  // getCardActions(task) {
  //   return [
  //     ...this.getTagActions(task),
  //     ...this.getMetaActions(task),
  //     {
  //       action: () => {
  //         console.log('**task.desc**:', task.desc)
  //         this.project.copyToClipboard(
  //           task.desc.rawMarkdown,
  //           'Markdown copied to clipboard!'
  //         )
  //       },
  //       icon: 'markdown',
  //       pack: 'fab',
  //       title: 'Copy markdown',
  //     },
  //     {
  //       action: () => {
  //         this.project.copyToClipboard(
  //           task.desc.html,
  //           'HTML copied to clipboard!'
  //         )
  //       },
  //       icon: 'copy',
  //       pack: 'fas',
  //       title: 'Copy html',
  //     },
  //   ]
  // }

  // getMetaActions(task) {
  //   return this.getMeta()
  //     .filter(
  //       ({ key, value }) =>
  //         !(task.allMeta[key] && task.allMeta[key].includes(value))
  //     )
  //     .map(({ key, value }) => {
  //       return {
  //         action: () => {
  //           this.project.addMetadata(task, key, value)
  //         },
  //         icon: 'table',
  //         pack: 'fas',
  //         title: `Add metadata ${key} = ${value}`,
  //       }
  //     })
  // }

  // getTagActions(task) {
  //   return this.getTags()
  //     .filter(({ name }) => !task.allTags.includes(name))
  //     .map(({ name }) => {
  //       return {
  //         action: () => {
  //           this.project.addTag(task, name)
  //         },
  //         icon: 'tag',
  //         pack: 'fas',
  //         title: `Add ${name} tag`,
  //       }
  //     })
  // }

  // getTags() {
  //   return this.getSettings().tags || []
  // }

  // getMeta() {
  //   return this.getSettings().meta || []
  // }

  get header() {
    return this.getSettings().header || ''
  }

  get footer() {
    return this.getSettings().footer || ''
  }

  getSettingsSchema() {
    if (!this.settingSchema) {
      this.settingSchema = new Settings()
        .addProperty(
          'header',
          new StringProperty().textEditor(true).setTitle('Header markdown')
        )
        .addProperty(
          'footer',
          new StringProperty().textEditor(true).setTitle('Footer markdown')
        )
    }
    return this.settingSchema
  }
}
