/**
 * Created by ihorsavva on 10/11/19.
 */
/**
 * Created by ihorsavva on 9/30/17.
 */
// Bitalo AG javascript add ons for handling Bitcoins and wallets
// All rights reserved1

// var bitcore = window.bitcore
var bitcore = require('bitcore-lib-dash')
var bitcoin = require('bitcoinjs-lib-dash')

var config = require('../config').config

bitcore.Networks.defaultNetwork = bitcore.Networks.livenet
var network = bitcoin.networks.dash

export default {
  signHex: function (data) {
    var key = bitcoin.ECPair.fromWIF(bitcore.PrivateKey.fromString(data['master_key']).toWIF(), network)
    var tx = bitcoin.TransactionBuilder.fromTransaction(bitcoin.Transaction.fromHex(data['hex']), network);
    data['utxos'].forEach((utxo, i)=>{
      tx.sign(i, key)
    })
    return tx.build().toHex()
  },

}
