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

const HEADER_FOOTER_COMMENT = '<!-- imdone-header-footer -->\n';

class HeaderFooterPlugin extends Plugin {
  constructor(project) {
    super(project);
  }

  onTaskUpdate(task) {
    if (task.interpretedContent.includes(HEADER_FOOTER_COMMENT)) return
    task.interpretedContent =
      task.interpretedContent = `${HEADER_FOOTER_COMMENT}${this.header}${task.interpretedContent}${this.footer}`;
  }

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
