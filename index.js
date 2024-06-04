const express = require('express');
const cors = require('cors');
const app = express();
app.use( express.json() ); //middleware que transforma req.body a json.
app.use(cors());

const soap = require('strong-soap').soap;

const sendSoap = (req, res) =>  {

  const { username, password, xmlBase64, url } = req.body;

  const args = {
    "username": username,
    "password": password,
    "xmlBase64": xmlBase64
  };
  
  const options = {};
  soap.createClient(url, options, function(err, client) {
    
    let method = client['SERVICES-FACTURATECH']['SERVICES-FACTURATECHPort']['FtechAction.uploadInvoiceFile'];
  
    method(args, function(err, result,) {
      if(err) {
        console.log(err);
        res.status(500).send('Error al llamar al servicio web: ' + err.message);
      } else {
        // console.log('Result: \n' + JSON.stringify(result));
        res.send(result);
      }
    });
  });
}

const documentStatus = (req, res) =>  {

  const { username, password, transactionId, url } = req.body;

  const args = {
    "username": username,
    "password": password,
    "transaccionID": transactionId
  };
  
  const options = {};
  soap.createClient(url, options, function(err, client) {
    
    let method = client['SERVICES-FACTURATECH']['SERVICES-FACTURATECHPort']['FtechAction.documentStatusFile'];
  
    method(args, function(err, result,) {
      if(err) {
        console.log(err);
        res.status(500).send('Error al llamar al servicio web: ' + err.message);
      } else {
        // console.log('Result: \n' + JSON.stringify(result));
        res.send(result);
      }
    });
  });
}

const cufeFile = (req, res) =>  {

  const { username, password, prefix, folio, url } = req.body;

  const args = {
    "username": username,
    "password": password,
    "prefijo": prefix,
    "folio": folio
  };
  
  const options = {};
  soap.createClient(url, options, function(err, client) {
    
    let method = client['SERVICES-FACTURATECH']['SERVICES-FACTURATECHPort']['FtechAction.getCUFEFile'];
  
    method(args, function(err, result,) {
      if(err) {
        console.log(err);
        res.status(500).send('Error al llamar al servicio web: ' + err.message);
      } else {
        // console.log('Result: \n' + JSON.stringify(result));
        res.send(result);
      }
    });
  });
}

const cufeFileQR = (req, res) =>  {

  const { username, password, prefix, folio, url } = req.body;

  const args = {
    "username": username,
    "password": password,
    "prefijo": prefix,
    "folio": folio
  };
  
  const options = {};
  soap.createClient(url, options, function(err, client) {
    
    let method = client['SERVICES-FACTURATECH']['SERVICES-FACTURATECHPort']['FtechAction.getQRFile'];
  
    method(args, function(err, result,) {
      if(err) {
        console.log(err);
        res.status(500).send('Error al llamar al servicio web: ' + err.message);
      } else {
        // console.log('Result: \n' + JSON.stringify(result));
        res.send(result);
      }
    });
  });
}

const downloadPDF = (req, res) =>  {

  const { username, password, prefix, folio, url } = req.body;

  const args = {
    "username": username,
    "password": password,
    "prefijo": prefix,
    "folio": folio
  };
  
  const options = {};
  soap.createClient(url, options, function(err, client) {
    
    let method = client['SERVICES-FACTURATECH']['SERVICES-FACTURATECHPort']['FtechAction.downloadPDFFile'];
  
    method(args, function(err, result,) {
      if(err) {
        console.log(err);
        res.status(500).send('Error al llamar al servicio web: ' + err.message);
      } else {
        // console.log('Result: \n' + JSON.stringify(result));
        res.send(result);
      }
    });
  });
}

app.post('/manage-soap-invoice', sendSoap);
app.post('/get-cufe', cufeFile);
app.post('/document-status', documentStatus);
app.post('/get-cufeqr', cufeFileQR);
app.post('/get-pdf', downloadPDF);

app.listen(2424, () => {
  console.log('Servidor iniciado en el puerto 2424');
});