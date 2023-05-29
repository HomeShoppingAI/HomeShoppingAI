const path = require("path")
const Dirent = require("./dirent")
const actions = require("../pipelines/actions")

const pipelineDir = path.join(__dirname, "..", "pipelines")
const pipelineDirent = new Dirent(pipelineDir, "pipelines", true)

const contextPrototype = {
  assert: function(key) {
    if (!(key in this)) {
      throw new Error(`Required value missing for "${key}"`)
    }

    return this[key]
  },
  assertNumber: function(key) {
    if (!(key in this)) {
      throw new Error(`Required value missing for "${key}"`)
    }

    const value = parseInt(this[key])

    if (isNaN(value)) {
      throw new Error(`Invalid number "${this[key]}" for "${key}"`)
    }

    return value
  },
  assertFlag: function(key) {
    const value = this[key]?.toLowerCase ? this[key].toLowerCase() : this[key]

    switch (value) {
      case true:
      case "true":
      case "yes":
      case "y":
      case "1":
        return true
      case undefined:
      case false:
      case "false":
      case "no":
      case "n":
      case "0":
        return false
      default:
        throw new Error(`Invalid flag value "${this[key]}" for key "${key}"`)
    }
  }
}

class Pipeline {
  constructor(fileName, data) {
    const assert = (key) => {
      const value = data[key]

      if (!value) {
        throw new Error(`Pipeline ${fileName} is missing value for "${key}"`)
      }

      return value
    }

    this.name = assert("name")
    this.description = assert("description")
    this.actionNames = assert("actions")

    this.actions = this.actionNames.map(n => {
      const action = actions[n]

      if (!action) {
        throw Error(`${this.name} pipeline has invalid action named: ${n}`)
      }

      return action
    })
  }

  toString() {
    return `${this.name} Pipeline: ${this.description} (${this.actionNames.join(", ")})`
  }

  async execute(contextData) {
    const context = Object.create(contextPrototype)
    Object.assign(context, contextData)

    // Execute actions sequentially, if one returns a new context, pass it to the next action
    // Otherwise pass the same context to the next one
    await this.actions.reduce(async (ctxPromise, action) => {
      const ctx = await ctxPromise
      const changedContext = await action(ctx)
      return changedContext || ctx
    }, context)
  }
}

const listPipelines = () => {
  return pipelineDirent
    .list()
    .filter(f => f.extension === ".json")
    .map(f => {
      try {
        const data = f.json()
        return new Pipeline(f.name, data)
      } catch (error) {
        console.error(error.message)
        return null
      }
    })
    .filter(p => !!p)
}

module.exports = {
  listPipelines,
  Pipeline,
}
