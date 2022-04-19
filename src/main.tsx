import ReactDOM from 'react-dom'
import './global.less'
import BaseLayout from './Layout'
import '@arco-design/web-react/dist/css/arco.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import BaseContext from './context/BaseContext'
import login from './pages/login'
import 'highlight.js/styles/github.css'

import './pages/my-promise'

console.log('👴2022-04-19 16:31:34 main.tsx line:12', 'sssss')
const App = () => {
	return (
		<BrowserRouter>
			<BaseContext>
				<Switch>
					<Route path={'/login'} component={login} />
					<Route path={'/'} component={BaseLayout}></Route>
				</Switch>
			</BaseContext>
		</BrowserRouter>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
