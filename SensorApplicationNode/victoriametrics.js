const Influx = require('influx');
const buffer = Array(1000)
let index = 0
const influx = new Influx.InfluxDB({
    host: 'localhost',
    port: 8428,
    database: 'sensors_db',
    schema: [
        {
            measurement: 'sensors',
            fields: {
                temperature: Influx.FieldType.FLOAT
            },
            tags: [
                'device_id'
            ]
        }
    ]
})


function QueueMessage(device_id, temperature) {
    if (index == buffer.length) {
        bufferCopy = buffer.slice()
        index = 0
        console.log("Writing to VictoriaMetrics")
        influx.writePoints(bufferCopy.map(point => {
            return {
                measurement: 'sensors',
                tags: { device_id: point.device_id },
                fields: { temperature: point.temperature },
            }
        })).catch(err => {
            console.error(`Error saving data to InfluxDB! ${err.stack}`)
        })
    }
    buffer[index++] = { device_id, temperature }
}

module.exports = {QueueMessage}