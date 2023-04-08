import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import { FaPlusCircle } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const AddNote = (props) => {

    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        setShow(false);
        props.showAlert("Added note Successfully", "success");
    };
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };


    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);

    }

    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="dark" size="lg" onClick={handleShow}>
                <b>Add Note </b><FaPlusCircle/>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='my-3'>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={5} required placeholder="Title should be atleast 5 characters" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required placeholder="Description should be atleast 5 characters" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tag" className="form-label">Tag</label>
                            <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={5} required placeholder='Tag' />
                        </div>
                        {/* <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button> */}
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>
                        Add Note
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* <div className='container my-3'>
            <h2>Add a Note</h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={5} required placeholder="Title should be atleast 5 characters"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required placeholder="Description should be atleast 5 characters"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={5} required placeholder='Tag'/>
                </div>
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div> */}
        </>
    );
};

export default AddNote;
