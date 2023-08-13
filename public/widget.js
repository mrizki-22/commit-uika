var myWidget = window.cloudinary.createUploadWidget(
  {
    cloudName: "da6c2irvo",
    uploadPreset: "commit",
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      console.log("Done! Here is the image info: ", result.info);
    }
  }
);
document.getElementById("upload_widget").addEventListener(
  "click",
  function () {
    myWidget.open();
  },
  false
);
