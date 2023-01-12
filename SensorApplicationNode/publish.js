const { randomUUID } = require('crypto')
const mqtt = require('mqtt')


const clientID = 'MQTTB_PUBLISHER_NODE_'+randomUUID()

const topic = 'KU/sensor/temperature'
const rate = 100
let count = 0
let deviceIds;
let device_prefix = "AA"
function loadDevices(){
    deviceIds = []
    for(let i = 0; i < rate; i++){
        deviceIds.push(device_prefix + '-' +i)
    }
}

async function main(){
    loadDevices();
    const client  = mqtt.connect('mqtt://test.mosquitto.org', {clientId: clientID, autoReconnect: true})
    client.on('connect', () => {
        console.log('Connected to MQTT Broker')
    });   
    client.on('error', (err) => {
        console.log(err)
    });

    
    setInterval(() => {
        for(let i = 0;i < rate; i++){
            const message = count++
            const topic = `KU/sensor/${deviceIds[i]}/temperature`
            client.publish(topic, message.toString())    
        }
    }, 1000)
}


main().then(()=>{
    console.log('Done')
})