import Plugin from 'imdone-api'
import { Settings, StringProperty } from 'imdone-api/lib/settings'

export default class HeaderFooterPlugin extends Plugin {
  constructor(project) {
    super(project)
  }

  onTaskUpdate(task) {
    task.interpretedContent =
      task.interpretedContent = `${this.header}${task.interpretedContent}${this.footer}`
  }

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
