import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import { browserHistory } from 'react-router'
import { Loader } from './loader'
import { AppStore } from './models/app'
import { Routers } from './router'

const routingStore = new RouterStore();
const history = syncHistoryWithStore(browserHistory, routingStore);
const appStore = new AppStore(routingStore)

const loader = new Loader(history, routingStore, appStore, Routers)


// Start
loader.start('#root')
