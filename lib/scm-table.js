const Table = require('cli-table2')
const RSVP = require('rsvp')
const CoreObject = require('core-object')
const moment = require('moment')
// instantiate
module.exports = CoreObject.extend({
  init: function (plugin, revisions) {
    this._super(plugin, revisions)

    this._plugin = plugin
    this.revisions = revisions
  },
  display: function (/* revisions */) {
  //  console.log("this ==>", _this);
    var table = this._createTable()
    this._tableRows(table)

    console.log(table.toString())
    return RSVP.resolve()
  },

  _isWide: function () {
    return process.stdout.columns >= 98
  },

  _tableHeader: function () {
    var head = ['RevisionKey', 'Commit Date']

    if (this._isWide()) {
      head.push('Deploy time')
    }
    return head
  },
  _createTable: function () {
    var head = this._tableHeader()

    return new Table({
      head: head,
      colWidths: [19, 30]
    })
  },

  _tableRows: function (table) {
    this.revisions.forEach(function (revision) {
      let data = revision
    // console.log(revision.revisionDate, 'revision')
      let row = [
        ((revision.active) ? '> ' : '  ') + data.revisionKey,
        moment(revision.revisionDate).format('YYYY/MM/DD HH:mm:ss')
      ]

      table.push(row)
    })
  }
})