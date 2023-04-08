import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import userContext from '../context/users/userContext';

const Noteitem = (props) => {
    const context = useContext(noteContext);
    // new code
    const contextOfUser = useContext(userContext);
    const {userName}=contextOfUser;
    // new code ends here

    const { deleteNote} = context;
    const { note, updateNote } = props;

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);

    }
    const handleDeleteNote = () => {
        setShow(false);
        deleteNote(note._id);
        props.showAlert("Deleted Successfully", "success");

    }
    const handleShow = () => setShow(true);

    return (
        <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 my-3">
            <div style={{ border: "2px solid grey" }}>
                <div style={{ marginTop: "2px" }}>
                    <Button variant="default" style={{ border: "none", fontSize: "21px", marginTop: "-8px" }} size="sm">
                        <i className="far fa-edit mx-2" style={{ fontSize: "21px" }} onClick={() => {
                            updateNote(note);
                        }}></i>
                    </Button>



                    <Button variant="default" style={{ border: "none", float: "right", fontSize: "21px", marginTop: "-8px" }} size="sm" onClick={handleShow}>
                        <i className="far fa-trash-alt mx-2"></i>
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete Note</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to delete this note?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                No
                            </Button>
                            <Button variant="primary" onClick={handleDeleteNote}>
                                Yes
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </div>
                <div>
                    <h5 style={{ wordWrap: "break-word", marginLeft: "6px" }}>{note.title}</h5>
                </div>

                <div>
                    <p style={{ wordWrap: "break-word", marginLeft: "6px" }}>{note.description}</p>
                </div>
                <div>
                    <h6>Created By: {userName}</h6>
                    <h6>Date Created: {note.date.slice(0,10)}</h6>
                    <h6>Last Modified: {note.updatedAt===undefined?note.date.slice(0,10):note.updatedAt.slice(0,10)}</h6>
                </div>
            </div>
        </div>
    )
}

export default Noteitem