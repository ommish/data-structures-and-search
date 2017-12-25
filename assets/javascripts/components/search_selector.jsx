import React from 'react';
import { Link } from 'react-router-dom';
import dictionary from '../../dictionary.txt';

class SearchSelector extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    }

    this.handleSelection = this.handleSelection.bind((this);
  }

  handleSelection(e) {
    this.props.history.push(`/${e.target.value}`);
  }


  render() {
    return (
      <section>
      <h2>Select a method for searching the dictionary!</h2>
      <ul onClick={this.handleSelection}>
        <li><Link to="/binary">Array Binary Search</Link></li>
      </ul>
      </section>
    );
  }
}

export default SearchSelector;


// PDFParser = require("pdf2json");
//
//     let pdfParser = new PDFParser();
//
//     pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
//     pdfParser.on("pdfParser_dataReady", pdfData => {
//         fs.writeFile("./pdf2json/test/F1040EZ.json", JSON.stringify(pdfData));
//     });
//
//     pdfParser.loadPDF("./pdf2json/test/pdf/fd/form/F1040EZ.pdf");


// handleImage(e) {
//   const reader = new FileReader();
//   const file = e.target.files[0];
//   let newImage = merge({}, this.state.image);
//   reader.onloadend = () => {
//     newImage = {imageUrl: reader.result, imageFile: file};
//     this.setState({image: newImage});
//     this.uploadImage();
//   };
//   if (file) {
//     reader.readAsDataURL(file);
//   }
// }
//
// uploadImage() {
//   const file = this.state.image.imageFile;
//   const photoData = new FormData();
//   if (file) {
//     photoData.append("photo[image]", file);
//     this.props.createPhoto(photoData).then((res) => {
//       this.appendPhotoToNote(res.photo.imageUrl);
//     });
//   }
// }
