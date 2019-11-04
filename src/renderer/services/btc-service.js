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


bitcore.Networks.defaultNetwork = bitcore.Networks.livenet
var network = bitcoin.networks.bitcoin

export default {
  signHex: function (dataFromFile) {
    var data = JSON.parse(JSON.stringify(dataFromFile))
    var key = bitcoin.ECPair.fromWIF(bitcore.PrivateKey.fromString(data['master_key']).toWIF())
    var tx = bitcoin.TransactionBuilder.fromTransaction(bitcoin.Transaction.fromHex(data['hex']));
    data['utxos'].forEach((utxo, i)=>{
      const pubkeys = utxo['public_keys'].sort().map((pubkey) => new Buffer(pubkey, 'hex'))
      const p2ms = bitcoin.payments.p2ms({ m: 2, pubkeys, network: network })
      const p2wsh = bitcoin.payments.p2wsh({ redeem: p2ms, network: network })
      const p2sh = bitcoin.payments.p2sh({ redeem: p2wsh, network: network })
      if (tx.__inputs[i].signatures){
        Object.assign(tx.__inputs[i], {signType: "multisig", hasWitness:true, value: bitcore.Unit.fromBTC(utxo.amount).satoshis, signScript: bitcore.Script.buildMultisigOut(utxo['public_keys'].sort(), 2).toBuffer()})
        var signature = tx.__inputs[i].signatures[0]
        tx.__inputs[i].signatures = [undefined,undefined]
        utxo['public_keys'].sort().forEach((pkey, j)=> {
          if(pkey === data['public_key']){
            tx.__inputs[i].signatures[j] = undefined
          }else{
            tx.__inputs[i].signatures[j] = signature
          }
        })
      }
      tx.sign(i, key, p2sh.redeem.output, null, bitcore.Unit.fromBTC(+utxo['amount']).satoshis, p2wsh.redeem.output)
    })
    return tx.build().toHex()
  },

}
