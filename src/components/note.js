import React from 'react'
import firebase from '../firebase';

import { Button, Row, Container, Col, Form, Navbar, Table, NavbarBrand, Modal } from 'react-bootstrap';

function Note() {

  const [tasks, setTasks] = React.useState([]);
  const [newTask, setnewTask] = React.useState('');
  const [updateTask, setupdateTask] = React.useState('');

  const [show, setShow] = React.useState(false); // Modal Switcher
  const [modalData, buttonData] = React.useState(''); // Sending data from button to modal

  // Transporting data from Modal to Table
  const [refShare, getShare] = React.useState('');
  const [refPrice, getPrice] = React.useState('');
  const [refDate, getDate] = React.useState('');

  const [refTable, getTable] = React.useState([]);

  React.useEffect(() => {
    console.log('line16 called');
  }); // Updates 'modalData' to latest one

  React.useEffect(() => {
    const fetchData = async () => {

      const db = firebase.firestore();

      db.collection("stocks")
        .onSnapshot(function (data) {
          // console.log(data.docs[0].data())
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

    console.log(id);
  }

  const onUpdate = (id) => {

    const db = firebase.firestore();
    db.collection('tasks').doc(id).set({ name: updateTask });
  }

  // Modal

  const handleShow = (e) => {
    setShow(true);
    // console.log(e.target.id + '     clicked');

    buttonData(e.target.id);

    // Requires another trigger from a different function to update modalData. but by the time new value gets in queue
    // console.log(modalData + 'hello');
  }

  const handleClose = () => {
    setShow(false);

    console.log(refShare + '    ' + refPrice + '   ' + refDate);

    // var arr = [refShare, refPrice, refDate];
    var newrow = [refShare, refPrice, refDate];

  }

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
                  <tr key={spell.refDate}>
                    <td>{spell.refShare}</td>
                    <td>{spell.refPrice}</td>
                    {/* <td>
                      <Button variant="danger" onClick={() => onDelete(spell.refShare)}>{spell.refShare}</Button>
                    </td>

                    <td>
                      <input type="text" className=" " placeholder={spell.refShare} onChange={e => setupdateTask(e.target.value)} placeholder={spell.refShare}></input>

                      <Button className="text-white ml-4" variant="warning" onClick={() => onUpdate(spell.id)}>Update Task</Button>
                    </td> */}
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
          <Modal.Title>ADD to My Stocks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col md={6}>
                <h6>Company Name:</h6>
              </Col>
              <Col md={6}>
                {/* <p>{modalData}</p> */}
                <div>
                  {
                    tasks.map(spell => {
                      return spell.id == modalData ? (
                        <div key={spell.id}>
                          <p>{spell.name}</p>
                        </div>
                      ) : null;
                    })
                  }
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <h6>No. of shares</h6>
              </Col>
              <Col md={6}>
                <input type="text" placeholder="No. of shares" onChange={e => getShare(e.target.value)} />
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <h6>Buy Price</h6>
              </Col>
              <Col md={6}>
                <input type="text" placeholder="Buying Price" onChange={e => getPrice(e.target.value)} />
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <h6>Buy date</h6>
              </Col>
              <Col md={6}>
                <input type="date" onChange={e => getDate(e.target.value)} />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Container>
            <Row>
              <Col md={4}></Col>
              <Col md={4}>
                <Button variant="primary" onClick={handleClose}>
                  ADD
                </Button>
              </Col>
              <Col md={4}></Col>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>

      {/* Modal End */}
    </div>
  )
}

export default Note;
