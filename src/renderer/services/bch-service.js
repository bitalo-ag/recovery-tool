/**
 * Created by ihorsavva on 10/11/19.
 */
/**
 * Created by ihorsavva on 9/30/17.
 */
// Bitalo AG javascript add ons for handling Bitcoins and wallets
// All rights reserved1

// var bitcore = window.bitcore
var bitcore = require('bitcore-lib-cash')


bitcore.Networks.defaultNetwork = bitcore.Networks.livenet


export default {
  signHex: function (data) {
    data['utxos'].forEach((utxo, i) => {
      if (utxo['public_keys'][0] !== data['public_key']) {
        utxo['public_key'] = utxo['public_keys'][0]
      } else {
        utxo['public_key'] = utxo['public_keys'][1]
      }
      utxo['public_keys'] = utxo['public_keys'].map(key => {
        return new bitcore.PublicKey.fromString(key)
      })
      utxo['txId'] = utxo['txid']
      utxo['outputIndex'] = utxo['vout']
      utxo['script'] = new bitcore.Script(new bitcore.Address(utxo['address'])).toHex(),
      utxo['satoshis'] = bitcore.Unit.fromBTC(+utxo['amount']).satoshis
    })
    var transction = new bitcore.Transaction(data['hex'], data)
    transction.sign(data.master_key)
    return transction.toString()
  },

}
