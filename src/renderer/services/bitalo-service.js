/**
 * Created by ihorsavva on 10/11/19.
 */
/**
 * Created by ihorsavva on 9/30/17.
 */
// Bitalo AG javascript add ons for handling Bitcoins and wallets
// All rights reserved1

// var bitcore = window.bitcore
let CryptoJS = require('crypto-js')
let sha256 = require('crypto-js/sha256')

module.exports = {
  encryptMasterKey: function (master_key, password, salt) {
    return CryptoJS.AES.encrypt(master_key, sha256(password + salt).toString()).toString()
  },

}
