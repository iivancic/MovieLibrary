import React, { Component } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import ImagesInputForm from '../Forms/ImagesInputForm'
import classes from '../../../AdminPage/AdminPageStyles/MovieTable.module.css'
import fileApi from '../../../../api/fileApi'

class MovieImages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            inputFormVisibility: false
        }
    }

    clickedCancelHandler = () => {
        this.setState({
            inputFormVisibility: false
        })
    }

    handleInputChange = (event) => {
        this.setState({
            images: event.target.value,
            inputFormVisibility: false
        })
    }

    render() {
        const imagesInfo = this.props.images;
        const backgroundImagesInfo = imagesInfo.filter(image => image.imageTypeId === 1);
        const posterImagesInfo = imagesInfo.filter(image => image.imageTypeId === 2);
        const carouselImagesInfo = imagesInfo.filter(image => image.imageTypeId === 3);

        const posterImages = posterImagesInfo.map(image => {
            return (
                <img alt='' style={{ padding: "1%", float: "left", maxHeight: "100%" }} src={fileApi.imageRoute(image.fileDataId)} key={image.fileDataId} />
            )
        });
        const backgroundImages = backgroundImagesInfo.map(image => {
            return (
                <img alt='' style={{ padding: "1%", float: "left", maxHeight: "100%" }} src={fileApi.imageRoute(image.fileDataId)} key={image.fileDataId} />
            )
        });
        const carouselImages = carouselImagesInfo.map(image => {
            return (
                <img alt='' style={{ padding: "1%", float: "left", maxHeight: "100%" }} src={fileApi.imageRoute(image.fileDataId)} key={image.fileDataId} />
            )
        });

        const newImage =
            <div style={{ float: "right", height: "100%", width: "10%", verticalAlign: "middle", alignItems: "center", display: "flex", justifyContent: "center" }}>
                <FaPlusCircle className={classes.FaPlusCircle} onClick={() => this.setState({ inputFormVisibility: true })} />
            </div>

        return (
            <div style={{ height: "1050px" }}>
                Poster images:
                <div style={{ backgroundColor: "white", margin: "1%", height: "15%", borderRadius: "1%" }}>
                    {newImage}
                    {posterImages}
                </div>
                Background images:
                <div style={{ backgroundColor: "white", margin: "1%", height: "15%", borderRadius: "1%" }}>
                    {backgroundImages}
                    {newImage}
                </div>
                Carousel images:
                <div style={{ backgroundColor: "white", margin: "1%", height: "15%", borderRadius: "1%" }}>
                    {carouselImages}
                    {newImage}
                </div>

                <ImagesInputForm
                    formVisibility={this.state.inputFormVisibility}
                    clickedCancel={this.clickedCancelHandler}
                    handleInputChange={this.handleInputChange}
                />
            </div>
        )
    }
}
export default MovieImages;