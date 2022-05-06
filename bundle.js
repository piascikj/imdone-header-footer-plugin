'use strict';

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var plugin = {exports: {}};

(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plugin = void 0;
class Plugin {
    constructor(project) {
        this.project = project;
        this.unimplWarning = {};
    }
    destroy() { }
    onBeforeBoardUpdate() {
        this.unimplemented('onBeforeBoardUpdate()');
    }
    onBoardUpdate(lists) {
        this.unimplemented('onBoardUpdate(lists: Array<List>)');
    }
    onTaskUpdate(task) {
        this.unimplemented('onTaskUpdate(task: Task)');
    }
    getCardProperties(task) {
        this.unimplemented('getCardProperties(task: Task)');
        return {};
    }
    getCardActions(task) {
        this.unimplemented('getCardActions(task: Task)');
        return [];
    }
    getBoardActions() {
        this.unimplemented('getBoardActions()');
        return [];
    }
    getSettingsSchema() {
        this.unimplemented('getSettingsSchema()');
        return null;
    }
    getSettings() {
        return null;
    }
    unimplemented(signature) {
        if (this.unimplWarning[signature])
            return;
        console.info(`${this.constructor.name}.${signature} is not implemented.`);
        this.unimplWarning[signature] = true;
    }
}
exports.Plugin = Plugin;
(module).exports = Plugin;
}(plugin, plugin.exports));

var Plugin = /*@__PURE__*/getDefaultExportFromCjs(plugin.exports);

var settings = {};

Object.defineProperty(settings, "__esModule", { value: true });
var Settings_1 = settings.Settings = settings.ArrayProperty = settings.ArrayItems = StringProperty_1 = settings.StringProperty = settings.NumberProperty = settings.BooleanProperty = settings.Property = void 0;
class Property {
    constructor(type) {
        this.type = type;
    }
    setTitle(title) {
        this.title = title;
        return this;
    }
    setDescription(description) {
        this.description = description;
        return this;
    }
}
settings.Property = Property;
class BooleanProperty extends Property {
    constructor() {
        super('boolean');
    }
    setDefault(_default) {
        this.default = _default;
        return this;
    }
    setTitle(title) {
        this.title = title;
        return this;
    }
    setDescription(description) {
        this.description = description;
        return this;
    }
}
settings.BooleanProperty = BooleanProperty;
class NumberProperty extends Property {
    constructor() {
        super('number');
    }
    setMinimum(min) {
        this.minimum = min;
        return this;
    }
    setMaximum(max) {
        this.maximum = max;
        return this;
    }
    setDefault(_default) {
        this.default = _default;
        return this;
    }
    setTitle(title) {
        this.title = title;
        return this;
    }
    setDescription(description) {
        this.description = description;
        return this;
    }
}
settings.NumberProperty = NumberProperty;
class StringProperty extends Property {
    constructor() {
        super('string');
        this.editor = false;
        this.required = false;
    }
    setDefault(_default) {
        this.default = _default;
        return this;
    }
    allowedValues(_enum) {
        this.enum = _enum;
        return this;
    }
    textEditor(enable) {
        this.editor = enable;
        return this;
    }
    setRequired(required) {
        this.required = required;
        return this;
    }
    setTitle(title) {
        this.title = title;
        return this;
    }
    setDescription(description) {
        this.description = description;
        return this;
    }
}
var StringProperty_1 = settings.StringProperty = StringProperty;
class ArrayItems {
    constructor() {
        this.properties = {};
        this.draggable = false;
        this.type = 'object';
        this.type = 'object';
    }
}
settings.ArrayItems = ArrayItems;
class ArrayProperty extends Property {
    constructor() {
        super('array');
        this.items = new ArrayItems();
    }
    itemTitle(title) {
        this.items.title = title;
        return this;
    }
    itemsDraggable(draggable) {
        this.items.draggable = draggable;
        return this;
    }
    addItemProperty(name, property) {
        this.items.properties[name] = property;
        return this;
    }
    setTitle(title) {
        this.title = title;
        return this;
    }
    setDescription(description) {
        this.description = description;
        return this;
    }
}
settings.ArrayProperty = ArrayProperty;
class Settings {
    constructor() {
        this.properties = {};
        this.type = 'object';
    }
    addProperty(name, property) {
        this.properties[name] = property;
        return this;
    }
}
Settings_1 = settings.Settings = Settings;

class HeaderFooterPlugin extends Plugin {
  constructor(project) {
    super(project);
  }

  onTaskUpdate(task) {
    console.log('***HEADER*** : ', this.header);
    console.log('***FOOTER*** : ', this.footer);
    task.interpretedContent =
      task.interpretedContent = `${this.header}${task.interpretedContent}${this.footer}`;
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
      this.settingSchema = new Settings_1()
        .addProperty(
          'header',
          new StringProperty_1().textEditor(true).setTitle('Header markdown')
        )
        .addProperty(
          'footer',
          new StringProperty_1().textEditor(true).setTitle('Footer markdown')
        );
    }
    return this.settingSchema
  }
}

module.exports = HeaderFooterPlugin;
