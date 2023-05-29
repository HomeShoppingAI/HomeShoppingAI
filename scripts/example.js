const config = require("../config")

// const assets = require("../services/assets")
const printful = require("../services/printful")

// assets.createAssetFromPrompt("Hello world!").then(a => console.log(a)).catch(e => console.error(e))

// printful.createProduct(
//   {
//     "sync_product":{
//        "name":"Poster Example",
//        "thumbnail":"https://cdn.discordapp.com/attachments/804499806067752993/935943458433146950/get.png",
//        "is_ignored":true
//     },
//     "sync_variants":[
//        {
//           "variant_id":"5426",
//           "retail_price":"100.00",
//           "is_ignored":true,
//           "sku":"SKU1234",
//           "files":[
//              {
//                 "url":"https://cdn.discordapp.com/attachments/804499806067752993/935943458433146950/get.png"
//              },
//              {
//                 "url":"https://cdn.discordapp.com/attachments/804499806067752993/935943458433146950/get.png"
//              }
//           ],
//           "options":[
//              {
//                 "id":"12\u00d718",
//                 "value":"12\u00d718"
//              },
//              {
//                 "id":"18\u00d724",
//                 "value":"18\u00d724"
//              }
//           ]
//        }
//     ]
//  }
// ).then(a => console.log(a)).catch(e => console.error(e))
printful.listMyProducts().then(a => console.log(a)).catch(e => console.error(e))
// printful.getProductById(305746557).then(a => console.log(JSON.stringify(a, null , 2))).catch(e => console.error(e))
// printful.listProductTemplates().then(a => console.log(a)).catch(e => console.error(e))
