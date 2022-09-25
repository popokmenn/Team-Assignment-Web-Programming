/*!

=========================================================
* Black Dashboard React v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";
// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4
} from "variables/charts.js";

function Dashboard(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [bigChartData, setbigChartData] = React.useState("data1");
  const setBgChartData = (name) => {
    setbigChartData(name);
  };

  return (
    <>
      <Modal isOpen={show} toggle={handleClose} backdrop={true}>
        <ModalHeader toggle={show} close={handleClose}>
          Form Nilai Mahasiswa
        </ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <Col md="12">
                <FormGroup>
                  <label>Nama Mahasiswa</label>
                  <Input
                    defaultValue=""
                    type="text"
                    value={''}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <FormGroup>
                  <label>Nilai Quiz</label>
                  <Input
                    defaultValue={0}
                    type="number"
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <label>Nilai Tugas</label>
                  <Input
                    defaultValue={0}
                    type="number"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className="pr-md-1" md="4">
                <FormGroup>
                  <label>Nilai Absensi</label>
                  <Input
                    defaultValue={0}
                    type="number"
                  />
                </FormGroup>
              </Col>
              <Col className="px-md-1" md="4">
                <FormGroup>
                  <label>Nilai Prakter</label>
                  <Input
                    defaultValue={0}
                    type="number"
                  />
                </FormGroup>
              </Col>
              <Col className="pl-md-1" md="4">
                <FormGroup>
                  <label>Nilai UAS</label>
                  <Input defaultValue={0} type="number" />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Col style={{ marginBottom: 20, textAlign: 'end' }}>
            <Button style={{ marginRight: 10 }} color="neutral" type="submit" onClick={() => handleClose()}>
              Close
            </Button>
            <Button color="primary" type="submit">
              Save
            </Button>
          </Col>
        </ModalFooter>
      </Modal>
      <div className="content">
        <Row>
          <Col>
            <Card style={{ height: 500 }}>
              <CardHeader>
                <Row>
                  <Col>
                    <CardTitle tag="h4">Mahasiswa</CardTitle>
                  </Col>
                  <Col style={{ textAlign: 'end' }}>
                    <Button variant="primary" onClick={handleShow}>
                      Add New
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Action</th>
                      <th>Nama</th>
                      <th>Quiz</th>
                      <th>Absensi</th>
                      <th>Tugas</th>
                      <th>Praktek</th>
                      <th>UAS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Button
                          color="link"
                          id="tooltip636901683"
                          title=""
                          type="button"
                        >
                          <i className="tim-icons icon-pencil" />
                        </Button>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip636901683"
                          placement="right"
                        >
                          Edit Task
                        </UncontrolledTooltip>
                        <Button
                          color="link"
                          id="tooltip636901683x"
                          title=""
                          type="button"
                        >
                          <i className="tim-icons icon-trash-simple" />
                        </Button>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip636901683x"
                          placement="right"
                        >
                          Delete Task
                        </UncontrolledTooltip>
                      </td>
                      <td>Naufal Retyan</td>
                      <td>{Math.floor(Math.random() * 10) + 1}</td>
                      <td>{Math.floor(Math.random() * 10) + 1}</td>
                      <td>{Math.floor(Math.random() * 10) + 1}</td>
                      <td>{Math.floor(Math.random() * 10) + 1}</td>
                      <td>{Math.floor(Math.random() * 10) + 1}</td>
                    </tr>
                    <tr>
                      <td>
                        <Button
                          color="link"
                          id="tooltip636901683"
                          title=""
                          type="button"
                        >
                          <i className="tim-icons icon-pencil" />
                        </Button>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip636901683"
                          placement="right"
                        >
                          Edit Task
                        </UncontrolledTooltip>
                        <Button
                          color="link"
                          id="tooltip636901683x"
                          title=""
                          type="button"
                        >
                          <i className="tim-icons icon-trash-simple" />
                        </Button>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip636901683x"
                          placement="right"
                        >
                          Delete Task
                        </UncontrolledTooltip>
                      </td>
                      <td>Aji</td>
                      <td>{Math.floor(Math.random() * 10) + 1}</td>
                      <td>{Math.floor(Math.random() * 10) + 1}</td>
                      <td>{Math.floor(Math.random() * 10) + 1}</td>
                      <td>{Math.floor(Math.random() * 10) + 1}</td>
                      <td>{Math.floor(Math.random() * 10) + 1}</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">Total Shipments</h5>
                    <CardTitle tag="h2">Performance</CardTitle>
                  </Col>
                  <Col sm="6">
                    <ButtonGroup
                      className="btn-group-toggle float-right"
                      data-toggle="buttons"
                    >
                      <Button
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data1"
                        })}
                        color="info"
                        id="0"
                        size="sm"
                        onClick={() => setBgChartData("data1")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Accounts
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-single-02" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="1"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data2"
                        })}
                        onClick={() => setBgChartData("data2")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Purchases
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-gift-2" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="2"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data3"
                        })}
                        onClick={() => setBgChartData("data3")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Sessions
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-tap-02" />
                        </span>
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample1[bigChartData]}
                    options={chartExample1.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Total Shipments</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> 763,215
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample2.data}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Daily Sales</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                  3,500€
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={chartExample3.data}
                    options={chartExample3.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Completed Tasks</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-send text-success" /> 12,100K
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample4.data}
                    options={chartExample4.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
