/*****************************************************************************************************************
#  Octoble : Onechat Webview BLE API v1.0
#  by chavee@nexpie.io
#
******************************************************************************************************************/

/*****************************************************************************************************************
#  EventEmitter
******************************************************************************************************************/

let EventEmitter = function(){
    this.eventhandlers_once = {};
    this.eventhandlers_eternal = {};
}

EventEmitter.prototype.on = function(eventName, listener) {
    if (!this.eventhandlers_eternal[eventName]) {
        this.eventhandlers_eternal[eventName] = [];
    }
    for (let k in this.eventhandlers_eternal[eventName]) {
        if (listener == this.eventhandlers_eternal[eventName][k]) {
            return;
        }
    }
    this.eventhandlers_eternal[eventName].push(listener);
},

EventEmitter.prototype.once = function(eventName, listener) {
    if (!this.eventhandlers_once[eventName]) {
        this.eventhandlers_once[eventName] = [];
    }
    this.eventhandlers_once[eventName].push(listener);
},

EventEmitter.prototype.emit = function(eventName, param1, param2, param3) {
    if (this.eventhandlers_eternal[eventName]) {
        for (let handler of this.eventhandlers_eternal[eventName]) {
            handler(param1, param2, param3);
        }
    }

    if (this.eventhandlers_once[eventName]) {
        for (let handler of this.eventhandlers_once[eventName]) {
            handler(param1, param2, param3);
        }
        delete this.eventhandlers_once[eventName];
    }
},

EventEmitter.prototype.off = function(eventName, listener) {
    for (let k in this.eventhandlers_eternal[eventName]) {
        if (listener == this.eventhandlers_eternal[eventName][k]) {
            this.eventhandlers_eternal[eventName].splice(k, 1);
            k--;
        }
    }
}

EventEmitter.prototype.removeAllListeners = function(eventName) {
    delete this.eventhandlers_eternal[eventName];
}

let emitter = new EventEmitter();


/*****************************************************************************************************************
#  OneChat BLE Device Handler
******************************************************************************************************************/

let DeviceHandler = function(info, option) {
    this.uuid = info.uuid;
    this.info = info;
    this.option = option;
}

DeviceHandler.prototype = new EventEmitter();

DeviceHandler.prototype.getInfo = function() {
    return this.info;
}

DeviceHandler.prototype.connect = function() {
    alert('Not yet supported');
}

DeviceHandler.prototype.disconnect = function() {
    let that = this;
    let uuid = this.uuid.toUpperCase();

    return new Promise(function(resolve, reject) {
        let waiting = true;
        let cb = function(op_data) {
            emitter.off('disconnect_bluetooth_by_uuid', cb);
            if (waiting && op_data && op_data.device_uuid == uuid) {
                resolve({code:200, result:'disconnected'});
            }
        }

        emitter.on('disconnect_bluetooth_by_uuid', cb);
        OneChat_disconnectBluetoothByUUID(that.uuid);
    });
}

DeviceHandler.prototype.getService = function(servuuid) {
    let that = this;
    let uuid = this.uuid.toUpperCase();

    return new Promise(function(resolve, reject) {
        let waiting = true;

        let cb = function(serv_data) {
            if (waiting && serv_data && serv_data.device_uuid == uuid) {
                emitter.off('get_service', cb);
                waiting = false;
                resolve(serv_data.data);
            }
        }
        setTimeout(function() {
            emitter.off('get_service', cb);
            waiting = false;
            reject({code:408, result:'Timeout'});
        }, that.option.write_timeout);

        emitter.on('get_service', cb);
        OneChat_getPrimaryService(uuid);
    });
}

DeviceHandler.prototype.writeServiceCharacteristic = function(servuuid, charuuid, value, datatype) {
    let that = this;
    let uuid = this.uuid.toUpperCase();

    return new Promise(function(resolve, reject) {
        let waiting = true;

        let cb = function(op_data) {
            emitter.off('write_characteristic_by_uuid', cb);
            if (waiting && op_data && op_data.device_uuid == uuid) {
                waiting = false;
                resolve({code:200, result:'OK'});
            }
        }
        setTimeout(function() {
            waiting = false;
            emitter.off('write_characteristic_by_uuid', cb);
            reject({code:408, result:'Timeout'});
        }, that.option.write_timeout);

        emitter.on('write_characteristic_by_uuid', cb);
        OneChat_writeCharacteristicByUUID(uuid, servuuid.toUpperCase(), charuuid.toUpperCase(), value, datatype);
    });
}

DeviceHandler.prototype.getCharacteristic = function(servuuid) {
    let that = this;
    let uuid = this.uuid.toUpperCase();

    return new Promise(function(resolve, reject) {
        let waiting = true;

        let cb = function(charData) {
            emitter.off('get_characteristic', cb);
            if (waiting && charData && charData.device_uuid == uuid) {
                waiting = false;
                resolve(charData.data);
            }
        }
        setTimeout(function() {
            waiting = false;
            emitter.off('get_characteristic', cb);
            reject({code:408, result:'get_characteristic Timeout'});
        }, that.option.read_timeout);

        emitter.on('get_characteristic', cb);
        OneChat_getCharacteristic(servuuid);
    });
}

DeviceHandler.prototype.readCharacteristic = function(charuuid) {
    let that = this;
    let uuid = this.uuid.toUpperCase();

    return new Promise((resolve, reject) => {
        debug.log('1', 'debug test');
        resolve('test');
    });
    // return new Promise(function(resolve, reject) {
    //     let waiting = true;

    //     alert(2);
    //     let cb = function(readData) {
    //         if (waiting && readData){ //  && readData.device_uuid == uuid) {
    //             emitter.off('read_characteristic', cb);
    //             waiting = false;
    //             resolve(readData.data);
    //         }
    //     }
    //     alert('test', charuuid);
    //     setTimeout(function() {
    //         waiting = false;
    //         emitter.off('read_characteristic', cb);
    //         reject({code:408, result:'read_characteristic Timeout'});
    //     }, that.option.read_timeout);

    //     alert(3);
    //     emitter.on('read_characteristic', cb);
    //     OneChat_readCharacteristic(charuuid);
    // });
}

DeviceHandler.prototype.readCharacteristicByUUID = function(servuuid, charuuid) {
    let that = this;
    let uuid = this.uuid.toUpperCase();

    return new Promise(function(resolve, reject) {
        let waiting = true;

        let cb = function(readData) {
            if (waiting && readData && readData.device_uuid == uuid) {
                emitter.off('read_characteristic_by_uuid_V2', cb);
                waiting = false;
                resolve(readData.data);
            }
        }
        setTimeout(function() {
            waiting = false;
            emitter.off('read_characteristic_by_uuid_V2', cb);
            reject({code:408, result:'read_characteristic_by_uuid_V2 Timeout'});
        }, that.option.read_timeout);

        emitter.on('read_characteristic_by_uuid_V2', cb);
        OneChat_readCharacteristicByUUID(uuid, servuuid, charuuid);
    });
}

/*****************************************************************************************************************
#  OneChat BLE Library
******************************************************************************************************************/

let Octoble = function(option = {}) {
    this.scan_filter = {};
    this.scan_timeout = option.scan_timeout || 15000;
    this.read_timeout = option.read_timeout || 10000;
    this.write_timeout = option.write_timeout || 10000;

    this.is_scanning = false;
}

Octoble.prototype = new EventEmitter();

Octoble.prototype.startScan = function(option = {}) {
    let that = this;
    this.is_scanning = true;
    
    let callback = function(device_data) {
        Octoble.prototype.emit('discover', device_data);
    }

    this.scan_filter = option.filter || null;
    emitter.removeAllListeners('return_once_device');
    emitter.on('return_once_device', function(device_data) {
        if (device_data && device_data.data) {
            let d = device_data.data;
            let info = {
                uuid : d.uuid,
                name : d.bluetooth_name,
                state : d.state,
                manufacturer_data : d.manufacturer_data_hexa,
                rssi : d.rssi
            }

            if (that.scan_filter) {
                for (let key in that.scan_filter) {
                    if (info[key] != that.scan_filter[key]) {
                        info = null;
                        break;
                    }
                }
            }

            if (info && that.is_scanning) {
                let scan_timeout = that.scan_timeout;
                let read_timeout = that.read_timeout;
                let write_timeout = that.write_timeout;

                Octoble.prototype.emit('discover', new DeviceHandler(info, {
                    scan_timeout: scan_timeout,
                    read_timeout: read_timeout,
                    write_timeout: write_timeout
                }));
            }
        }
    });

    emitter.once('stop_scan_bluetooth', () => {
        that.is_scanning = false;
        emitter.off('return_once_device', callback);
    });
    
    OneChat_scanDevice(option.timeout || that.scan_timeout);
}

Octoble.prototype.stopScan = function(option = {}) {
    this.is_scanning = false;
    OneChat_stopScanDevice();
}

Octoble.prototype.getDevice = function(option = {}) {
    let that = this;
    that.scan_filter = option.filter || null;

    return new Promise((resolve, reject) => {
        emitter.on('return_once_device', function(device_data) {
            if (device_data && device_data.data) {
                let d = device_data.data;
                let info = {
                    uuid : d.uuid,
                    name : d.bluetooth_name,
                    state : d.state,
                    manufacturer_data : d.manufacturer_data_hexa,
                    rssi : d.rssi
                }

                if (that.scan_filter) {
                    for (let key in that.scan_filter) {
                        if (info[key] != that.scan_filter[key]) {
                            info = null;
                            break;
                        }
                    }
                }

                if (info) {
                    let scan_timeout = that.scan_timeout;
                    let read_timeout = that.read_timeout;
                    let write_timeout = that.write_timeout;

                    let found_device = new DeviceHandler(info, {
                        scan_timeout: scan_timeout,
                        read_timeout: read_timeout,
                        write_timeout: write_timeout
                    });
                    resolve(found_device);
                }
            }
        });

        OneChat_scanDevice(option.timeout || that.scan_timeout);
    });

}

/* native BLE event */
emitter.on('start_scan_bluetooth', () => {
    Octoble.prototype.emit('scanStart');
});

emitter.on('stop_scan_bluetooth', () => {
    Octoble.prototype.emit('scanStop');
});

window.addEventListener('oneChatBluetoothCallBackData', (e) => {
    let type = e.detail.type;
    let data;
    try {
        data = JSON.parse(e.detail.data);
    }
    catch(e) {
        data = {};
    }
    emitter.emit(type, data);
});
