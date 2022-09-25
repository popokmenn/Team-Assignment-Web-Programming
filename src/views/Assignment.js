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
import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import NotificationAlert from "react-notification-alert";

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
import { _getMahasiswa } from "service/mahasiswa";
import { _createMahasiswa } from "service/mahasiswa";
import { _updateMahasiswa } from "service/mahasiswa";
import { _notify } from "util/notify";
import Lottie from "react-lottie";
import * as animationData from '../assets/lottie/loading.json'
import { _deleteMahasiswa } from "service/mahasiswa";

function Dashboard(props) {
  const notificationAlertRef = React.useRef(null);
  const [show, setShow] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [dataGrid, setDataGrid] = useState(undefined)
  const defaultDataItem = { id: undefined, nama_mahasiswa: '', quiz: 0, uas: 0, praktek: 0, absensi: 0, tugas: 0 }
  const [dataItem, setDataItem] = useState(defaultDataItem)
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false)
    setDataItem(defaultDataItem)
    setIsLoading(true)
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const [bigChartData, setbigChartData] = React.useState("data1");
  const setBgChartData = (name) => {
    setbigChartData(name);
  };

  useEffect(() => {
    if (isLoading === true) {
      getDataGrid()
    }
  });

  useEffect(() => {
    if (isLoading === true) {
      getDataGrid()
    }
  }, [isLoading]);

  const getDataGrid = async () => {
    const response = await _getMahasiswa()
    if (response.status === 200) {
      setDataGrid(response.data.data)
      setIsLoading(false)
      console.log('Success Get Data')
    }
  }

  const onClickEdit = (dataItem) => {
    setDataItem(dataItem)
    handleShow()
  }

  const onClickDelete = (dataItem) => {
    setDataItem(dataItem)
    setIsDelete(true)
  }

  const onChangeInput = (field, value) => {
    const newDataItem = {
      ...dataItem,
      [field]: value
    }
    setDataItem(newDataItem)
  }

  const onSubmit = async () => {
    setIsLoading(true)
    let res
    if (dataItem.id === undefined) {
      res = await _createMahasiswa(dataItem)
    } else {
      res = await _updateMahasiswa(dataItem)
    }
    let options
    if (res.status === 201 || res.status === 200) {
      options = _notify('Success Upload', dataItem.nama_mahasiswa, 'success')
    } else {
      options = _notify('Error', '', 'danger')
    }
    handleClose()
    setDataItem(defaultDataItem)
    notificationAlertRef.current.notificationAlert(options)
  }

  const onSubmitDelete = async () => {
    setIsLoading(true)
    const res = await _deleteMahasiswa(dataItem)
    let options
    if (res.status === 201 || res.status === 200 || res.status === 204) {
      options = _notify('Success Delete', dataItem.nama_mahasiswa, 'success')
    } else {
      options = _notify('Error', '', 'danger')
    }
    setDataItem(defaultDataItem)
    setIsDelete(false)
    setIsLoading(false)
    notificationAlertRef.current.notificationAlert(options)
  }

  return (
    <>
      <Modal isOpen={show} toggle={handleClose} backdrop={true}>
        <ModalHeader>
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
                    value={dataItem.nama_mahasiswa}
                    onChange={(i) => onChangeInput('nama_mahasiswa', i.target.value)}
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
                    value={dataItem.quiz}
                    onChange={(i) => onChangeInput('quiz', i.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <label>Nilai Tugas</label>
                  <Input
                    defaultValue={0}
                    type="number"
                    value={dataItem.tugas}
                    onChange={(i) => onChangeInput('tugas', i.target.value)}
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
                    value={dataItem.absensi}
                    onChange={(i) => onChangeInput('absensi', i.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col className="px-md-1" md="4">
                <FormGroup>
                  <label>Nilai Praktek</label>
                  <Input
                    defaultValue={0}
                    type="number"
                    value={dataItem.praktek}
                    onChange={(i) => onChangeInput('praktek', i.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col className="pl-md-1" md="4">
                <FormGroup>
                  <label>Nilai UAS</label>
                  <Input
                    defaultValue={0}
                    type="number"
                    value={dataItem.uas}
                    onChange={(i) => onChangeInput('uas', i.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Col style={{ marginBottom: 20, textAlign: 'end' }}>
            <Button
              style={{ marginRight: 10 }}
              color="neutral" type="submit"
              onClick={() => handleClose()}>
              Close
            </Button>
            <Button
              color="primary"
              type="submit"
              onClick={() => onSubmit()}>
              Save
            </Button>
          </Col>
        </ModalFooter>
      </Modal>
      <Modal isOpen={isDelete} toggle={() => setIsDelete(false)} backdrop={true}>
        <ModalBody>
          Are you sure delete {dataItem.nama_mahasiswa}?
        </ModalBody>
        <ModalFooter>
          <Col style={{ marginBottom: 20, textAlign: 'end' }}>
            <Button
              style={{ marginRight: 10 }}
              color="neutral" type="submit"
              onClick={() => onSubmitDelete()}>
              Delete
            </Button>
            <Button
              color="danger"
              type="submit"
              onClick={() => setIsDelete(false)}>
              Cancel
            </Button>
          </Col>
        </ModalFooter>
      </Modal>
      <Modal isOpen={isLoading} backdrop='static' backdropClassName="modal-backdrop">
        <ModalBody>
          <Lottie
            options={defaultOptions}
            height={400}
            width={400}
            isStopped={!isLoading}
          />
        </ModalBody>
      </Modal>
      {isLoading && (
        <div style={{ backgroundColor: 'rgba(0,0,0,0.5)', height: '100%', width: '100%', position: 'absolute', zIndex: 999 }}></div>
      )}
      <div className="content">
        <div className="react-notification-alert-container">
          <NotificationAlert ref={notificationAlertRef} />
        </div>
        <Row>
          <Col>
            <Card style={{ height: 500 }}>
              <CardHeader>
                <Row>
                  <Col>
                    <CardTitle tag="h4">Mahasiswa</CardTitle>
                  </Col>
                  <Col style={{ textAlign: 'end' }}>
                    <Button color="primary" onClick={handleShow}>
                      Add New
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody style={{ overflow: 'scroll' }}>
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
                      <th>Rata-rata</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataGrid && dataGrid.sort(({ id: a }, { id: b }) => b - a).map(i => (
                      <tr key={i.id}>
                        <td>
                          <Button
                            color="link"
                            title=""
                            type="button"
                            onClick={() => onClickEdit(i)}
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <Button
                            color="link"
                            title=""
                            type="button"
                            onClick={() => onClickDelete(i)}
                          >
                            <i className="tim-icons icon-trash-simple" />
                          </Button>
                        </td>
                        <td>{i.nama_mahasiswa}</td>
                        <td>{i.quiz}</td>
                        <td>{i.absensi}</td>
                        <td>{i.tugas}</td>
                        <td>{i.praktek}</td>
                        <td>{i.uas}</td>
                        <td>{(i.uas + i.praktek + i.tugas + i.absensi + i.quiz)/5}</td>
                      </tr>
                    ))}
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
