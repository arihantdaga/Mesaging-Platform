const { randomUUID } = require('crypto')
const mqtt = require('mqtt')


const clientID = 'MQTTB_PUBLISHER_NODE_'+randomUUID()

const topic = '$share/1/KU/sensor/+/temperature'
const vm = require('./victoriametrics')
const rate = 100
let count = 0

async function main(){
    const client  = mqtt.connect('mqtt://localhost', {clientId: clientID, autoReconnect: true})
    client.on('connect', () => {
        console.log('Connected to MQTT Broker')
        client.subscribe(topic)
    });   
    client.on('error', (err) => {
        console.log(err)
    });
    client.on('message', handleMessage)
}

async function handleMessage(topic, message){
    count++
    const device_id = topic.split('/')[2]
    vm.QueueMessage(device_id, message)
    if (count % rate == 0){
        // console.log(`Received ${count} messages, time: ${Date.now() - start} ms}`)
        start = Date.now()
    }
}

main().then(()=>{
    console.log('Done')
})