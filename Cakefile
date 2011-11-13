{spawn} = require 'child_process'
path = require 'path'
fs = require 'fs'

CS_SRC = path.join __dirname, 'webnull.coffee'
JS_EXE = path.join __dirname, 'webnull.js'

die = (message) ->
    console.error "ERROR: #{message}"
    process.exit 1

compile = (callback) ->
  coffee = spawn 'coffee', ['-c', CS_SRC]
  coffee.stderr.on 'data', (data) -> console.error data.toString()
  coffee.stdout.on 'data', (data) -> console.info data.toString()
  coffee.on 'exit', (code) -> callback?() if code is 0

addShebang = (script) ->
  fs.writeFileSync script, "#!/usr/bin/env node\n#{fs.readFileSync script}"

task 'build', 'Build JavaScript executable', ->
  invoke 'validate'
  compile -> addShebang JS_EXE

task 'validate', 'Validate package.json', ->
  try
    JSON.parse fs.readFileSync('package.json')
  catch error
    die "package.json: invalid JSON: #{error.message}"


