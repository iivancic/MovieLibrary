import React, { Component } from 'react';
import axios from '../../../../axios-orders';
import classes from '../../AdminPageStyles/MovieTable.module.css';
import { FaEdit, FaTrashAlt, FaPlusCircle, FaSearch } from 'react-icons/fa';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import Pagination from '../Pagination/Pagination'
import FileInfoInputForm from '../Forms/FileInfoInputForm';
import Modal from '../Modals/Modal'

class FileInfoTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileInfo: [],
            tableParameters: {
                pageNumber: 1,
                pageSize: 25,
                orderBy: '',
                searchTerm: '',
                orderDirection: true
            },
            totalNumberOfRecords: null,
            inputFormVisibility: false,
            newFileInfo: {
                fileDataId: null,
                fileName: '',
                fileExtension: null,
                size: '',
            },
            editForm: {
                formVisibility: false,
                editFileInfo: {
                    fileDataId: null,
                    fileName: '',
                    fileExtension: null,
                    size: '',
                }
            },
            willBeDeleted: null,
            modalVisibility: false
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        axios.get('api/FileInfo', { params: this.state.tableParameters }).then(
            response => {
                this.setState({ fileInfo: response.data.items });
                this.setState({ totalNumberOfRecords: response.data.totalRecords })
            },
            error => {
                //When notification alerts are implemented(toast) trigger error toast.
                console.log(error);
            }
        );
    }

    postDataHandler = () => {
        var componentRef = this;
        const data = { newFileInfo: this.state.newFileInfo };
        axios.post('api/FileInfo', data.newFileInfo).then(function (response) {
            console.log(response);
            componentRef.setState({ newFileInfo: null })
            componentRef.getData();
        }).catch(function (error) {
            console.log(error);
        });
    }

    putDataHandler = () => {
        var componentRef = this;
        const data = { editFileInfo: this.state.editForm.editFileInfo };

        axios.put('api/FileInfo/' + data.editFileInfo.fileInfoId, data.editFileInfo).then(function (response) {
            console.log(response);
            componentRef.setState({
                editForm: {
                    formVisibility: false,
                    editFileInfo: {
                        fileDataId: null,
                        fileName: '',
                        fileExtension: null,
                        size: '',
                    }
                }
            });
            componentRef.getData();
        }).catch(function (error) {
            console.log(error);
        });
    }

    deleteDataHandler = (entityId) => {
        var componentRef = this;

        axios.delete('api/FileInfo/' + entityId).then(function (response) {
            console.log(response);
            componentRef.getData();
        }).catch(function (error) {
            console.log(error);
        });

        this.hideModalHandler();
    }

    hideModalHandler = () => {
        this.setState({ inputFormVisibility: false });
    }

    orderByPropAscending = (prop) => {
        this.setState(prevState => ({
            tableParameters: {
                ...prevState.tableParameters,
                orderBy: prop.Id,
                orderDirection: true
            }
        }), () => {
            this.getData();
        });
    }

    orderByPropDescending = (prop) => {
        this.setState(prevState => ({
            tableParameters: {
                ...prevState.tableParameters,
                orderBy: prop.Id,
                orderDirection: false
            }
        }), () => {
            this.getData();
        });
    }

    hideEditModalHandler = () => {
        this.setState(prevState => ({
            editForm: {
                ...prevState.editForm,
                formVisibility: false
            }
        }))
    }

    onChangeHandler = (event) => {
        var searchTerm = event.target.value;
        this.setState(prevState => ({
            tableParameters: {
                ...prevState.tableParameters,
                pageNumber: 1,
                searchTerm: searchTerm
            }
        }))
    }

    selectPageSizeHandler = (event) => {
        var pageSizeTarget = event.target.value;
        this.setState(prevState => ({
            tableParameters: {
                ...prevState.tableParameters,
                pageSize: Number(pageSizeTarget),
                pageNumber: 1
            }
        }), () => {
            this.getData();
        });
    }

    pageChangeHandler = (pageNumber) => {
        this.setState(prevState => ({
            tableParameters: {
                ...prevState.tableParameters,
                pageNumber: pageNumber
            }
        }), () => {
            this.getData();
        });
    }

    handleInputChange = (propertyName, event) => {
        const fileInfo = this.state.newFileInfo;
        fileInfo[propertyName] = event.target.value;
        if (propertyName === 'fileDataId' || propertyName === 'size') {
            fileInfo[propertyName] = parseInt(fileInfo[propertyName])
        }
        this.setState({ newFileInfo: fileInfo })
    }

    handleEditInputChange = (propertyName, event) => {
        const fileInfo = this.state.editForm.editFileInfo;
        fileInfo[propertyName] = event.target.value;
        if (propertyName === 'fileDataId' || propertyName === 'size') {
            fileInfo[propertyName] = parseInt(fileInfo[propertyName])
        }
        this.setState(prevState => ({
            editForm: {
                ...prevState.editForm,
                editFileInfo: fileInfo
            }
        }))
    }

    keyDownHandlerSearch = (event) => {
        if (event.key === 'Enter') {
            this.getData();
        }
    }
    render() {
        const fileInfo = this.state.fileInfo.map(fileInfo => {
            return (
                <tr key={fileInfo.fileInfoId}>
                    <td>{fileInfo.fileInfoId}</td>
                    <td>{fileInfo.fileDataID} </td>
                    <td>{fileInfo.fileName}</td>
                    <td>{fileInfo.fileExtension}</td>
                    <td>{fileInfo.size}</td>
                    <td style={{ display: "flex" }}>
                        <FaEdit className={classes.FaEdit} onClick={() =>
                            this.setState({
                                editForm: {
                                    formVisibility: true,
                                    editFileInfo: fileInfo
                                }
                            })
                        } />
                        <FaTrashAlt className={classes.FaTrashAlt} onClick={() => {
                            this.setState({ modalVisibility: true, willBeDeleted: fileInfo.fileInfoId })
                        }} />
                    </td>
                </tr>
            )
        });
        return (
            <div>
                <table className={classes.MovieTable}>
                    <tbody>
                        <tr>
                            <td colSpan={6} style={{ width: "100%", verticalAlign: "middle" }} >
                                <div style={{ float: "left", display: "flex", width: "50%", margin: "1%", alignContent: "center" }}>
                                    Number of records per page:
                                        <select
                                        style={{ marginLeft: "1%" }}
                                        placeholder={this.state.tableParameters.pageSize}
                                        value={this.state.tableParameters.pageSize}
                                        onChange={this.selectPageSizeHandler}
                                        label="React Select"
                                    >
                                        <option value={25}>25</option>
                                        <option value={50}>50</option>
                                        <option value={75}>75</option>
                                        <option value={100}>100</option>

                                    </select>
                                </div>

                                <div style={{ float: "right", margin: "0.4rem", alignContent: "center" }}>
                                    <input
                                        value={this.state.tableParameters.searchTerm}
                                        required
                                        type="text"
                                        placeholder="Search"
                                        onChange={this.onChangeHandler}
                                        onKeyDown={this.keyDownHandlerSearch}
                                    />
                                    <FaSearch className={classes.FaSearch} onClick={this.getData} />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>Id <TiArrowSortedDown onClick={() => this.orderByPropDescending({ Id: 'FileInfoId' })} className={classes.TiArrowSortedDown} /> <TiArrowSortedUp className={classes.TiArrowSortedUp} onClick={() => this.orderByPropAscending({ Id: 'FileInfoId' })} /></th>
                            <th>FileDataId <TiArrowSortedDown onClick={() => this.orderByPropDescending({ Id: 'FileDataId' })} className={classes.TiArrowSortedDown} /> <TiArrowSortedUp className={classes.TiArrowSortedUp} onClick={() => this.orderByPropAscending({ Id: 'FileDataId' })} /></th>
                            <th>FileName <TiArrowSortedDown onClick={() => this.orderByPropDescending({ Id: 'FileName' })} className={classes.TiArrowSortedDown} /> <TiArrowSortedUp className={classes.TiArrowSortedUp} onClick={() => this.orderByPropAscending({ Id: 'FileName' })} /></th>
                            <th>FileExtension <TiArrowSortedDown onClick={() => this.orderByPropDescending({ Id: 'FileExtension' })} className={classes.TiArrowSortedDown} /> <TiArrowSortedUp className={classes.TiArrowSortedUp} onClick={() => this.orderByPropAscending({ Id: 'FileExtension' })} /></th>
                            <th>Size <TiArrowSortedDown onClick={() => this.orderByPropDescending({ Id: 'Size' })} className={classes.TiArrowSortedDown} /> <TiArrowSortedUp className={classes.TiArrowSortedUp} onClick={() => this.orderByPropAscending({ Id: 'Size' })} /></th>
                            <th />
                        </tr>
                        {fileInfo}
                        <tr>
                            <td colSpan={6} style={{ width: "100%", verticalAlign: "middle" }} >
                                <FaPlusCircle className={classes.FaPlusCircle} onClick={() => this.setState({ inputFormVisibility: true })} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={6} style={{ width: "100%", verticalAlign: "middle" }} >
                                <div style={{ float: "right", margin: "0.4rem", alignContent: "center" }}>
                                    <Pagination
                                        showPagination={this.state.paginationVisibility}
                                        totalNumberOfItems={this.state.totalNumberOfRecords}
                                        itemsPerPage={this.state.tableParameters.pageSize}
                                        currentPage={this.state.tableParameters.pageNumber}
                                        onClickHandler={this.pageChangeHandler}
                                    />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <FileInfoInputForm
                    formVisibility={this.state.inputFormVisibility}
                    postDataHandler={this.postDataHandler}
                    data={this.state.fileInfo}
                    clickedCancel={this.hideModalHandler}
                    handleInputChange={this.handleInputChange}
                />

                <FileInfoInputForm
                    formVisibility={this.state.editForm.formVisibility}
                    postDataHandler={this.putDataHandler}
                    data={this.state.editForm.editFileInfo}
                    clickedCancel={this.hideEditModalHandler}
                    handleInputChange={this.handleEditInputChange}
                />

                <Modal
                    modalVisibility={this.state.modalVisibility}
                    clickedCancel={() => this.setState({ modalVisibility: false })}
                    clickedContinue={() => {
                        this.deleteDataHandler(this.state.willBeDeleted)
                        this.setState({ modalVisibility: false })
                    }}
                />
            </div >
        )
    }
}

export default FileInfoTable;