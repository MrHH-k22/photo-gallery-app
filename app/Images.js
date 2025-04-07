// Initial image array
const imageArray = [
  { url: require("../assets/images/image1.jpg") },
  { url: require("../assets/images/image2.jpg") },
  { url: require("../assets/images/image3.jpg") },
  { url: require("../assets/images/image4.jpg") },
  { url: require("../assets/images/image5.jpg") },
  { url: require("../assets/images/image6.jpg") },
  { url: require("../assets/images/image7.jpg") },
  { url: require("../assets/images/image8.jpg") },
  { url: require("../assets/images/image9.jpg") },
  { url: require("../assets/images/image10.jpg") },
  { url: require("../assets/images/image11.jpg") },
  { url: require("../assets/images/image12.jpg") },
  { url: require("../assets/images/image13.jpg") },
  { url: require("../assets/images/image14.jpg") },
  { url: require("../assets/images/image15.jpg") },
  { url: require("../assets/images/image16.jpg") },
  { url: require("../assets/images/image17.jpg") },
];

// Create an object that includes both the array and methods to manipulate it
const Images = [...imageArray];

// Add method to add new images
Images.addImage = function (image) {
  this.push(image);
};

export default Images;
