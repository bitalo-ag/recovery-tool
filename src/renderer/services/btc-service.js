/**
 * Created by ihorsavva on 10/11/19.
 */
/**
 * Created by ihorsavva on 9/30/17.
 */
// Bitalo AG javascript add ons for handling Bitcoins and wallets
// All rights reserved1

// var bitcore = window.bitcore
var bitcore = require('bitcore-lib')
var bitcoin = require('bitcoinjs-lib')

var config = require('../config').config

bitcore.Networks.defaultNetwork = config.network == 'testnet' ? bitcore.Networks.testnet : bitcore.Networks.livenet;
var network = config.network == 'testnet' ?  bitcoin.networks.testnet :  bitcoin.networks.bitcoin

module.exports = {
  signHex: function (master_key, params, hex) {

    const pubkeys = params.publicKeys.map((pubkey) => new Buffer(pubkey, 'hex'))
    const p2ms = bitcoin.payments.p2ms({ m: 2, pubkeys, network: network })
    const p2wsh = bitcoin.payments.p2wsh({ redeem: p2ms, network: network })
    const p2sh = bitcoin.payments.p2sh({ redeem: p2wsh, network: network })
    var key = bitcoin.ECPair.fromWIF(bitcore.PrivateKey.fromString(master_key).toWIF())
    var tx = bitcoin.TransactionBuilder.fromTransaction(bitcoin.Transaction.fromHex(hex));
    if (tx.__inputs[0].signatures){
      Object.assign(tx.__inputs[0], {signType: "multisig", hasWitness:true, value: params.utxo.amount.toSatoshi(), signScript: bitcore.Script.buildMultisigOut(params.publicKeys.sort(), 2).toBuffer()})
      var signature = tx.__inputs[0].signatures[0]
      tx.__inputs[0].signatures = [undefined,undefined,undefined]
      params.publicKeys.sort().forEach((pkey, i)=> {
        if(pkey === params.publicKey){
          tx.__inputs[0].signatures[i] = signature
        }else{
          tx.__inputs[0].signatures[i] = undefined
        }
      })
    }
    tx.sign(0, key, p2sh.redeem.output, null, (+params.utxo.amount).toSatoshi(), p2wsh.redeem.output)
    return tx.build().toHex()
  },

}
