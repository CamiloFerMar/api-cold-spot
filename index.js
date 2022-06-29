const { app } = require('./src/app')
const debug = require('debug')('app:main');

app.listen(app.get('port'), () => {
    debug(`Server listen port ${app.get('port')}`)
});
