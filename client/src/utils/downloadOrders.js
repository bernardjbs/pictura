const JSZip = require("jszip");
const FileSaver = require('file-saver');

function toDataURL(src, callback, outputFormat) {
  var img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = function () {
    var canvas = document.createElement('CANVAS');
    var ctx = canvas.getContext('2d');
    var dataURL;
    canvas.height = this.naturalHeight;
    canvas.width = this.naturalWidth;
    ctx.drawImage(this, 0, 0);
    dataURL = canvas.toDataURL(outputFormat);
    callback(dataURL);
  };
  img.src = src;
  if (img.complete || img.complete === undefined) {
    img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    img.src = src;
  }
}

const downloadOrders = (orderDetails) => {
  const zip = new JSZip()
  const orderTxt = 
  `
  Order Number: ${orderDetails.orderNumber}
  Customer: ${orderDetails.user.firstname} ${orderDetails.user.lastname}
  Order Date: ${orderDetails.createdAt}
  `;
  
  zip.file("Order-Details.txt", orderTxt);

  const img = zip.folder(orderDetails.orderNumber);
 
    orderDetails.pictureOrders.forEach(pictureOrder => {
      toDataURL(pictureOrder.cloud_url, function (dataUrl) {
        img.file(pictureOrder.filename, dataUrl.split(',')[1], { base64: true });
      })
    });

    // Set timeout to allow promise to precede file saving
    setTimeout(() => {
    zip.generateAsync({ type: "blob" }).then(function (content) {
      FileSaver.saveAs(content, orderDetails.orderNumber);
    });
    
    }, 100);
    setTimeout(() => {
      window.location.assign('/orders')
      }, 1000);
}

export default downloadOrders;
