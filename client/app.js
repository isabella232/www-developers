var React = require('react')
var { fromJS } = require('immutable')
var routesData = require('./data-routes')
var locals = fromJS(require('./data-locals.yaml'))
var { ELEM } = require('./utils')
var banner = require('./parts/banner')
var serviceCard = require('./parts/service-card')
var sciLine = require('./parts/sci-line')
var paramsEl = require('./parts/params')
var toc = require('./parts/toc')
var examplesEl = require('./parts/examples')

var r = React
var e = r.DOM
var t = r.PropTypes
var F = r.createFactory



module.exports = r.createClass({
  displayName: 'app',
  getInitialState: function() {
    return {
      version: '2',
      routesData: routesData,
      locales: locals,
      apiTestToken: '3827s05s6203mxh58sj25f01mlauej',
      apiTestDeviceId: 'a6e29co10284',
      currentSection: 'HTTP API'
    }
  },
  render: function() {
    return e.
    div({ className: 'app' },
      banner(null),
      renderServiceCards(this.state),
      sectionHead({ className: '', title: this.state.currentSection }),
      toc({ routes: this.state.routesData }),
      renderRoutes(this.state)
    )
  }
})

function renderServiceCards(state) {
  var services = state.locales.get('services')
  return e.section({ className: 'serviceCards' },
    services.map(function(service) {
      return serviceCard({ badge: service.get('badge'), head: sciLine(null, service.get('name')) },
        service.get('summary'))
    }).toJS()
  )
}

var sectionHead = ELEM('section-head', 'section', function(props){
  return e.h1({}, props.title)
})

function renderRoutes(state) {
  return e.
  div({ className: 'routes' },
    state.routesData
    .filter(isVersion(state.version))
    .map( route => Route({ key: route.id, route: route }) )
    .toJS()
  )
}










/* Route component
   Render the view of one route.
*/
var Route = F(React.createClass({
  displayName: 'route',
  propTypes: {
    route: t.object.isRequired
  },
  render: function() {
    var route = this.props.route
    return e.
    section({ className: 'route' },
      headEl({ route: route }),
      paramsEl({ route: route }),
      examplesEl({ route: route })
    )
  }
}))




var headEl = ELEM('route-head',  function(props){
  return [
    e.a({ id: props.route.get('id'), href: `#${props.route.get('id')}` },
      e.h1(null, props.route.get('path') + ' ' + props.route.get('method'))
    ),
    e.p(null, props.route.getIn(['meta', 'summary']))
  ]
})




function isVersion(n) {
  return function(route) {
    return String(route.get('version')) === n
  }
}
