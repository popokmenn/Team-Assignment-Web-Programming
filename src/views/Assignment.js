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
import { Bar } from "react-chartjs-2";
import NotificationAlert from "react-notification-alert";
import {
  Button,
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
import {
  chartExample3,
} from "variables/charts.js";
import { _getMahasiswa } from "service/mahasiswa";
import { _createMahasiswa } from "service/mahasiswa";
import { _updateMahasiswa } from "service/mahasiswa";
import { _notify } from "util/notify";
import Lottie from "react-lottie";
import * as animationData from '../assets/lottie/loading.json'
import { _deleteMahasiswa } from "service/mahasiswa";
import { barChart } from "util/bar-chart-data";

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
      setDataGrid(response.data.data.map(i => {
        return { ...i, average: (i.uas + i.praktek + i.tugas + i.absensi + i.quiz) / 5 }
      }))
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
    setIsLoading(true)
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

  const grade = (avg) => {
    if (avg <= 65)
      return 'D'
    else if (avg <= 75)
      return 'C'
    else if (avg <= 85)
      return 'B'
    else if (avg <= 100)
      return 'A'
  }

  const showBackdrop = isLoading || isDelete || show

  return (
    <>
      <Modal isOpen={show} toggle={handleClose} backdrop={true} style={{ marginTop: -100 }}>
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
      {showBackdrop && (
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
                      <th>Grade</th>
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
                        <td>{i.average}</td>
                        <td>{grade(i.average)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {dataGrid && (
          <>
            <Row>
              <Col xs="12">
                <Card className="card-chart">
                  <CardHeader>
                    <h5 className="card-category">Average</h5>
                  </CardHeader>
                  <CardBody>
                    <div className="chart-area">
                      <Bar
                        data={(e) => barChart.data('Average', 'average', dataGrid, '#E80F88', e)}
                        options={chartExample3.options}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col xs="6">
                <Card className="card-chart">
                  <CardHeader>
                    <h5 className="card-category">Praktek</h5>
                  </CardHeader>
                  <CardBody>
                    <div className="chart-area">
                      <Bar
                        data={(e) => barChart.data('Praktek', 'praktek', dataGrid, '#1f8ef1', e)}
                        options={chartExample3.options}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col xs="6">
                <Card className="card-chart">
                  <CardHeader>
                    <h5 className="card-category">Tugas</h5>
                  </CardHeader>
                  <CardBody>
                    <div className="chart-area">
                      <Bar
                        data={(e) => barChart.data('Tugas', 'tugas', dataGrid, '#A7D2CB', e)}
                        options={chartExample3.options}
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
                    <h5 className="card-category">Absensi</h5>
                  </CardHeader>
                  <CardBody>
                    <div className="chart-area">
                      <Bar
                        data={e => barChart.data('Absensi', 'absensi', dataGrid, '#F2D388', e)}
                        options={chartExample3.options}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="4">
                <Card className="card-chart">
                  <CardHeader>
                    <h5 className="card-category">Quiz</h5>
                  </CardHeader>
                  <CardBody>
                    <div className="chart-area">
                      <Bar
                        data={e => barChart.data('Quiz', 'quiz', dataGrid, '#874C62', e)}
                        options={chartExample3.options}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="4">
                <Card className="card-chart">
                  <CardHeader>
                    <h5 className="card-category">UAS</h5>
                  </CardHeader>
                  <CardBody>
                    <div className="chart-area">
                      <Bar
                        data={e => barChart.data('UAS', 'uas', dataGrid, '#C98474', e)}
                        options={chartExample3.options}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </div>
    </>
  );
}

export default Dashboard;
