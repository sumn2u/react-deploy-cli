const gitRepoInfo = require('git-repo-info')
const RSVP = require('rsvp')

const generate = () => {
  let info = gitRepoInfo()

  if (info === null || info.root === null) {
    return RSVP.reject('Could not find git repository')
  }

  let sha = info.sha.slice(0, 7)

  if (!sha) {
    return RSVP.reject('Could not build revision with commit hash `' + sha + '`')
  }

  return RSVP.resolve({
    revisionKey: sha,
    timestamp: new Date().toISOString()
  })
}
module.exports = generate