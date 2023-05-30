const config = require("../config")
const { listPipelines } = require("../services/pipelines")

const args = process.argv.slice(2)

const pipelineName = args.shift()
const pipelineArguments = Object.create(null)

while (args.length > 0) {
  const next = args.shift()
  const [key, ...values] = next.split("=")
  const value = values.join("=")
  pipelineArguments[key] = value || true
}

const showUsage = () => {
  console.log("npm run pipeline [pipeline name or subcommand] [key=value arguments for pipeline values]")
}

const run = async () => {
  if (!pipelineName) {
    showUsage()
    throw new Error("No pipeline or subcommand")
  }

  const pipelines = listPipelines()

  if (pipelineName === "list" || pipelineName === "ls") {
    console.log(`${pipelines}`)
    return
  }

  const pipeline = pipelines.find(p => p.name.toLowerCase() === pipelineName.toLowerCase())

  if (!pipeline) {
    throw new Error(`No pipeline named ${pipelineName}`)
  }

  await pipeline.execute(pipelineArguments)
  console.log("Successfully ran", pipeline.name, "pipeline")
}

run().then(() => process.exit(0)).catch(e => console.error("ERROR:", e.message) || process.exit(1))
