class Plugin{onload(){}onunload(){}}const apiGenerate=()=>({addToolbarLeft:()=>{console.log("add toolbar left")},addToolbarRight:()=>{console.log("add toolbar right")}});class BaseComponent{}const modules={Plugin,BaseComponent},SIYUAN_DATA_PATH=window.siyuan.config.system.dataDir,PLUGIN_FOLDER="plugins",fs=window.require("fs"),path=window.require("path"),MANIFEST="manifest.json",SCRIPT="main.js",scanPlugins=async n=>new Promise((o,t)=>{fs.readdir(n,(e,s)=>{if(e){t(e);return}o(s.map(i=>path.resolve(n,i)))})}),getFileContent=async n=>new Promise((o,t)=>{fs.readFile(n,(e,s)=>{if(e){t(e);return}return o(s.toString("utf8"))})}),getManifest=async n=>{const o=await getFileContent(n);try{return JSON.parse(o)}catch(t){console.error("loading manifest: "+n,t)}},getScript=async n=>await getFileContent(n),getAllPlugins=async()=>{const n=await scanPlugins(path.join(SIYUAN_DATA_PATH,PLUGIN_FOLDER));if(!n||!n.length){console.info("No plugin found in "+path.join(SIYUAN_DATA_PATH,PLUGIN_FOLDER));return}const o=[];for(const t of n){console.log("Loading plugin: "+t);const[e,s]=await Promise.all([getManifest(path.join(t,MANIFEST)),getScript(path.join(t,SCRIPT))]);o.push({...e,script:s})}return o};let components;class PluginLoader{constructor(){this.plugins=new Map}async loadAllLocalPlugins(){const n=await getAllPlugins();if(n)for(const o of n)await this.loadPlugin(o)}async loadPlugin(plugin){components||this.generateRequiredModules();const exports={},module={exports};function run(script,name){return eval("(function anonymous(require,module,exports){".concat(script,`
})
//# sourceURL=`).concat(name,`
`))}const __require=n=>{if(components[n])return components[n];throw new Error(`module ${n} not found`)},pluginName=plugin.name;run(plugin.script,plugin.name)(__require,module,exports);let pluginConstructor;if(!(pluginConstructor=(module.exports||exports).default||module.exports))throw new Error(`Failed to load plugin ${pluginName}. No exports detected.`);const plug=new pluginConstructor;if(!(plug instanceof Plugin))throw new Error(`Failed to load plugin ${pluginName}`);plug.onload(),this.plugins.set(pluginName,plug)}async unloadPlugin(n){const o=this.plugins.get(n);o&&(await o.onunload(),this.plugins.delete(n))}generateRequiredModules(){components={siyuan:{...modules,...apiGenerate()}}}}class PluginSystem{constructor(){this.pluginLoader=new PluginLoader}init(){this.pluginLoader.loadAllLocalPlugins()}}console.log("Siyuan Plugin System loading...");new PluginSystem().init();
