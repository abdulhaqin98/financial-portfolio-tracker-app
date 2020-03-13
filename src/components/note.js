import React from 'react'
import firebase from '../firebase';

import { Button, Row, Container, Col, Form, Navbar, Table, NavbarBrand, Modal } from 'react-bootstrap';

function Note() {

  const [tasks, setTasks] = React.useState([]);
  const [newTask, setnewTask] = React.useState('');
  const [updateTask, setupdateTask] = React.useState('');

  const [show, setShow] = React.useState(false); // Modal Switcher
  const [modalData, buttonData] = React.useState(''); // Sending data from button to modal

  React.useEffect(() => {
    const fetchData = async () => {

      const db = firebase.firestore();

      db.collection("stocks")
        .onSnapshot(function (data) {
          console.log(data.docs[0].data())
          setTasks(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        });
    };
    fetchData();
  }, []);

  const onCreate = () => {

    const db = firebase.firestore();
    db.collection("tasks").add({ name: newTask });
  };

  function onDelete(id) {

    // const db = firebase.firestore();
    // db.collection('stocks').doc(id).delete();

    console.log(id); // Prints old value in the console. But sends a new one to modal! why is it so?
  }

  const onUpdate = (id) => {

    const db = firebase.firestore();
    db.collection('tasks').doc(id).set({ name: updateTask });
  }

  // Modal

  const handleShow = (e) => {
    setShow(true);

    buttonData(e.target.id);

    console.log(modalData + 'called');
  }

  const handleClose = () => setShow(false);
  
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          Add or Edit note
        </Navbar.Brand>
      </Navbar>

      <br></br>
      <Container>

        <Row>
          <Col>
            <h2>Add new Stock</h2>
            {/* <Form>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Control type="text" value={newTask} onChange={e => setnewTask(e.target.value)} />
              </Form.Group>
              <Button variant="primary" onClick={onCreate}>Create Task</Button>
            </Form> */}

            <hr />

            <Table striped bodered="true" hover variant="dark">
              <thead>
                <tr>
                  <th>Stock Symbol</th>
                  <th>Stock Name</th>
                  <th>No.of Shares</th>
                  <th>Buy Price</th>
                  <th>Current Price</th>
                  <th>Profit/Loss</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(spell => (
                  <tr key={spell.id}>
                    <td>{spell.id}</td>
                    <td>{spell.name}</td>
                    <td>
                      <Button variant="danger" onClick={() => onDelete(spell.id)}>{spell.id}</Button>
                    </td>

                    <td>
                      <input type="text" className=" " placeholder={spell.name} onChange={e => setupdateTask(e.target.value)} placeholder={spell.name}></input>

                      <Button className="text-white ml-4" variant="warning" onClick={() => onUpdate(spell.id)}>Update Task</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>


          </Col>
        </Row>

        <br></br>

        <Row>
          <Col md={6}>

            <Table hover>
              <tbody>
                {tasks.map(stock => (
                  <tr key={stock.id}>
                    <td>
                      <Button variant="warning" id={stock.id} onClick={handleShow}>{stock.symbol}</Button>
                    </td>
                    <td>
                      <p>{stock.name}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

          </Col>
        </Row>
      </Container>

      {/* Modal Start */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                  <p>Hello</p>
                  <p>{modalData}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal End */}
    </div>
  )
}

export default Note;
