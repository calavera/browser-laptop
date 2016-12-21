/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict'

const electron = require('electron')
const ipcMain = electron.ipcMain
const messages = require('../js/constants/sync/messages')
const categories = require('../js/constants/sync/proto').categories
// const appActions = require('../js/actions/appActions')

// TODO: move into separate config file
const config = {
  apiVersion: '0',
  serverUrl: 'http://localhost:4000'
}

// TODO: make this configurable
const syncFetchInterval = 5000 // how often to fetch new records in ms
const syncSendInterval = 7000 // how often to send our records in ms

const categoryNames = Object.keys(categories)

const onSyncReady = (e) => {
  console.log('sync is ready!')
  ipcMain.on(messages.RECEIVE_SYNC_RECORDS, (event, categoryName, records) => {
    if (categoryNames.includes(categoryName) || !records || !records.length) {
      return
    }
    // TODO: update appstate
  })
  setTimeout(() => {
    e.sender.send(messages.FETCH_SYNC_RECORDS, categoryNames)
  }, syncFetchInterval)
  setTimeout(() => {
    e.sender.send(messages.SEND_SYNC_RECORDS, 'PREFERENCES', [])
  }, syncSendInterval)
}

module.exports.init = function (seed, deviceId) {
  seed = seed || null
  deviceId = deviceId || null
  ipcMain.on(messages.GET_INIT_DATA, (e) => {
    e.sender.send(messages.GOT_INIT_DATA, seed, deviceId, config)
  })
  ipcMain.on(messages.SAVE_INIT_DATA, (e, seed, deviceId) => {
    console.log('saving', seed, deviceId)
    /*
    if (seed) {
      appActions.saveSyncSeed(seed)
    }
    if (deviceId) {
      appActions.saveSyncDeviceId(seed)
    }
    */
  })
  ipcMain.on(messages.SYNC_READY, onSyncReady)
}
