
    function checkuserAgent () {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        // alert(userAgent)
        if (/windows phone/i.test(userAgent)) {
          return "windows_phone";
        }
        if (/android/i.test(userAgent)) {
          return "android";
        }
        if (/iPad|iPhone|iPod|Macintosh/.test(userAgent) && !window.MSStream) {
          // alert("ios")
          return "ios";
        }
        return "unknown";
      }
  
      // function helloandroid(say) {
      //   try {
      //     if (checkuserAgent() == 'ios') {
            
      //     } else if (checkuserAgent() == 'android') {
      //       OneChat_scanDevice.postMessage(say)
      //     }
      //   } catch(error) {
      //     alert('helloandroid ' + error)
      //   }
      // }
  
      function OneChat_connectServiceByManufacturerData(manufacturer_data, service_uuid) {
        try {
          if (checkuserAgent() == 'ios') {
            webkit.messageHandlers.OneChat_connectServiceByManufacturerData.postMessage({manufacturer_data: manufacturer_data, service_uuid: service_uuid});
          } else if (checkuserAgent() == 'android') {
            JavaScriptInterface.OneChat_connectServiceByManufacturerData(JSON.stringify({manufacturer_data: manufacturer_data, service_uuid: service_uuid}));
          }
        } catch(error) {
          alert('connectServiceByUUID ' + error)
        }
      }
      function OneChat_readCharacteristicByManufacturerData(manufacturer_data, service_uuid, characteristic_uuid) {
        try {
          if (checkuserAgent() == 'ios') {
            webkit.messageHandlers.OneChat_readCharacteristicByManufacturerData.postMessage({manufacturer_data: manufacturer_data, service_uuid: service_uuid, characteristic_uuid: characteristic_uuid});
          } else if (checkuserAgent() == 'android') {
            JavaScriptInterface.OneChat_readCharacteristicByManufacturerData(JSON.stringify({manufacturer_data: manufacturer_data, service_uuid: service_uuid, characteristic_uuid: characteristic_uuid}));
          }
        } catch(error) {
          alert('connectServiceByUUID ' + error)
        }
      }
  
      function OneChat_writeCharacteristicByManufacturerData(manufacturer_data, service_uuid, characteristic_uuid, data, data_type) {
        try {
          if (checkuserAgent() == 'ios') {
            webkit.messageHandlers.OneChat_writeCharacteristicByManufacturerData.postMessage({manufacturer_data: manufacturer_data, service_uuid: service_uuid, characteristic_uuid: characteristic_uuid, data: data, data_type: data_type});
          } else if (checkuserAgent() == 'android') {
            JavaScriptInterface.OneChat_writeCharacteristicByManufacturerData(JSON.stringify({manufacturer_data: manufacturer_data, service_uuid: service_uuid, characteristic_uuid: characteristic_uuid, data: data, data_type: data_type}));
          } 
        } catch(error) {
          alert('connectServiceByUUID ' + error)
        }
      }
  
      function OneChat_connectServiceByUUID(device_uuid, service_uuid) {
        try {
          if (checkuserAgent() == 'ios') {
            webkit.messageHandlers.OneChat_connectServiceByUUID.postMessage({device_uuid: device_uuid, service_uuid: service_uuid});
          } else if (checkuserAgent() == 'android') {
            JavaScriptInterface.OneChat_connectServiceByUUID(JSON.stringify({device_uuid: device_uuid, service_uuid: service_uuid}));
          }
        } catch(error) {
          alert('connectServiceByUUID ' + error)
        }
      }
  
      function OneChat_disconnectBluetoothAll() {
        try {
          if (checkuserAgent() == 'ios') {
            webkit.messageHandlers.OneChat_disconnectBluetoothAll.postMessage('disconnect');
          } else if (checkuserAgent() == 'android') {
            JavaScriptInterface.OneChat_disconnectBluetoothAll('disconnect');
          }
        } catch(error) {
          alert('disconnectBluetoothAll ' + error)
        }
      }
  
      function OneChat_disconnectBluetoothByUUID(uuid_device) {
        try {
          if (checkuserAgent() == 'ios') {
            webkit.messageHandlers.OneChat_disconnectBluetoothByUUID.postMessage(uuid_device);
          } else if (checkuserAgent() == 'android') {
            JavaScriptInterface.OneChat_disconnectBluetoothByUUID(uuid_device);
          }
        } catch(error) {
          alert('disconnectBluetoothByUUID ' + error)
        }
      }
  
      function OneChat_scanDevice(time_scan) {
        try {
          if (checkuserAgent() == 'ios') {
            webkit.messageHandlers.OneChat_scanDevice.postMessage(time_scan);
          } else if (checkuserAgent() == 'android') {
            JavaScriptInterface.OneChat_scanDevice(time_scan);
          }
        } catch(error) {
          alert('scanDevice ' + error)
        }
      }
  
      function OneChat_stopScanDevice() {
        try {
          if (checkuserAgent() == 'ios') {
            webkit.messageHandlers.OneChat_stopScanDevice.postMessage('disconnect');
          } else if (checkuserAgent() == 'android') {
            JavaScriptInterface.OneChat_stopScanDevice('disconnect');
          }
        } catch(error) {
          alert('stopScanDevice ' + error)
        }
      }
  
    
      function OneChat_getPrimaryService(device_uuid) {
        try {
          if (checkuserAgent() == 'ios') {
            webkit.messageHandlers.OneChat_getPrimaryService.postMessage(device_uuid);
          } else if (checkuserAgent() == 'android') {
            JavaScriptInterface.OneChat_getPrimaryService(device_uuid);
          }
        } catch(error) {
          alert('getPrimaryService ' + error)
        }
      }
  
      function OneChat_getCharacteristic(service_uuid) {
        try {
          if (checkuserAgent() == 'ios') {
            webkit.messageHandlers.OneChat_getCharacteristic.postMessage(service_uuid);
          } else if (checkuserAgent() == 'android') {
            JavaScriptInterface.OneChat_getCharacteristic(service_uuid);
          }
        } catch(error) {
          alert('getCharacteristic ' + error)
        }
      }
      function OneChat_readCharacteristic(uuid_characteristic_read) {
        try {
          if (checkuserAgent() == 'ios') {
            webkit.messageHandlers.OneChat_readCharacteristic.postMessage(uuid_characteristic_read);
          } else if (checkuserAgent() == 'android') {
            JavaScriptInterface.OneChat_readCharacteristic(uuid_characteristic_read);
          }
        } catch(error) {
          alert('readCharacteristic ' + error)
        }
      }
      function OneChat_readCharacteristicByUUID(device_uuid, service_uuid, characteristic_uuid) {
        try {
          if (checkuserAgent() == 'ios') {
            webkit.messageHandlers.OneChat_readCharacteristicByUUID.postMessage({device_uuid: device_uuid, service_uuid: service_uuid, characteristic_uuid: characteristic_uuid});
          } else if (checkuserAgent() == 'android') {
            JavaScriptInterface.OneChat_readCharacteristicByUUID(JSON.stringify({device_uuid: device_uuid, service_uuid: service_uuid, characteristic_uuid: characteristic_uuid}));
          }
        } catch(error) {
          alert('readCharacteristicByUUID ' + error)
        }
      }
      function OneChat_writeCharacteristic(uuid_characteristic_write, data, data_type) {
        try {
          if (checkuserAgent() == 'ios') {
            webkit.messageHandlers.OneChat_writeCharacteristic.postMessage({uuid: uuid_characteristic_write, data: data, data_type: data_type});
          } else if (checkuserAgent() == 'android') {
            // JavaScriptInterface.OneChat_writeCharacteristic('{"uuid": "' + uuid_characteristic_write + '", "data": "' + data +'" , "data_type": "' + data_type + '""}');
            // JavaScriptInterface.OneChat_writeCharacteristic(uuid_characteristic_write, data, data_type);
            JavaScriptInterface.OneChat_writeCharacteristic(JSON.stringify({uuid: uuid_characteristic_write, data: data, data_type: data_type}));
            // JavaScriptInterface.OneChat_writeCharacteristic('hello')
          }
        } catch(error) {
          alert('writeCharacteristic ' + error)
        }
      }
      function OneChat_writeCharacteristicByUUID(device_uuid, service_uuid, characteristic_uuid, data, data_type) {
        try {
          if (checkuserAgent() == 'ios') {
            webkit.messageHandlers.OneChat_writeCharacteristicByUUID.postMessage({device_uuid: device_uuid, service_uuid: service_uuid, characteristic_uuid: characteristic_uuid, data: data, data_type: data_type});
          } else if (checkuserAgent() == 'android') {
            JavaScriptInterface.OneChat_writeCharacteristicByUUID(JSON.stringify({device_uuid: device_uuid, service_uuid: service_uuid, characteristic_uuid: characteristic_uuid, data: data, data_type: data_type}));
          }
        } catch(error) {
          alert('writeCharacteristicByUUID ' + error)
        }
      }
  
      function oneChatCallBackQRScanner(qrcode){
        const event = new CustomEvent('oneChatCallBackQRScanner', { detail: { qrcode } });
        window.dispatchEvent(event)
      }
      function oneChatBluetoothCallBackData(type, data) {
        if (type.includes('char')) {
          alert('characteristic');
          alert(data); 
        }
        const events = new CustomEvent('oneChatBluetoothCallBackData', { detail: { type, data } });
        window.dispatchEvent(events)
      }
  