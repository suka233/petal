import { getCrossPlatformAppDataFolder } from './util';

const path = require('path');

export const PROCESS = window.process;

export const PROCESS_ENV = window.process.env;

export const SIYUAN_DATA_PATH = window.siyuan.config.system.dataDir;

export const PLUGIN_FOLDER = 'plugins';

export const VERSION = 'v0.3.13';

export const VERSION_URL = 'https://gitee.com/zuoez02/siyuan-plugin-system/raw/main/VERSION';

export const SCRIPT_URL = 'https://gitee.com/zuoez02/siyuan-plugin-system/raw/main/main.js';

export const PLUGIN_SYS_ABS_PATH = path.join(getCrossPlatformAppDataFolder(), '.siyuan', 'plugin.js');

export const config = () => ({ token: window.siyuan.config.api.token });

export const TYPES = {
    StorageManager: "StorageManager",
    PluginSystem: "PluginSystem",
    SystemManager: 'PluginSystemLocalManager',
    PluginLoader: 'PluginLoader',
    PluginFileManager: 'PluginFileManager',
    EventBus: 'EventBus',
    Shortcut: 'Shortcut',
    CommandManager: 'CommandManager',
    Store: 'Store',
};
