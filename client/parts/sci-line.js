var r = require('react')
var e = r.DOM
var t = r.PropTypes



module.exports = r.createFactory(r.createClass({
  displayName: 'sci-line',
  propTypes: {
    children: t.string.isRequired,
    extractLetter: t.func,
    extractWord: t.func
  },
  render: function() {
    return e.
    div({ className: 'sciLine'},
      e.div({ className: 'sciLine-letter' }, extractLetter(this.props)),
      e.div({ className: 'sciLine-words' }, this.props.children)
    )
  }
}))



// Helpers

function extractLetter(props) {
  if (props.wordExtract) return weRunner(props.wordExtract)(props.children)[0]
  if (props.letterExtract) return leRunner(props.letterExtract)(props.children)
  return props.children[0]
}

var weRunner = extractorRunner.bind(null, 'word')
var leRunner = extractorRunner.bind(null, 'letter')

function extractorRunner(type, extr) {
  return function(words) {
    var got = extr.apply(null, words)

    if (!got || typeof got !== 'string') {
      console.warn('Custom extractor failed to return result for arguments: ', arguments, extr)
      got = extractorType === 'letter' ? words[0] : words
    }

    return got
  }
}
