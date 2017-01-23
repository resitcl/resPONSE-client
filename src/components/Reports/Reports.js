
import {
  Panel, PageHeader, Col, FormGroup, Checkbox,
} from 'react-bootstrap';
import React, { Component, PropTypes  } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import $ from 'jquery';
var reports = [], crons = [];
var URL = "http://192.168.99.100:8001";



function reportActionsFormatter(cell, row) {
  return (
    <button className='btn btn-danger'>
      <span className="glyphicon glyphicon-trash"></span> Delete
    </button>
  );
}

function codesFormatter(cell, row) {
  if (typeof cell !== 'undefined' && cell !== null)
  return (
    <FormGroup>
      <Col>
        <Checkbox readOnly checked={cell} inline>
          2xx
        </Checkbox>
        {' '}
        <Checkbox readOnly checked={cell} inline>
          300
        </Checkbox>
        {' '}
        <Checkbox readOnly checked={cell} inline>
          400
        </Checkbox>
        {' '}
        <Checkbox readOnly checked={cell}>
          500
        </Checkbox>
      </Col>
    </FormGroup>
  )
  else return (
    <div></div>
  )
}

class Reports extends Component {

  constructor(props) {
    super(props);
    this.state = {data: {}};
    this.cronActionsFormatter = this.cronActionsFormatter.bind(this);
    this.loadCrons = this.loadCrons.bind(this);
    this.loadReports = this.loadReports.bind(this);
    this.deleteCron = this.deleteCron.bind(this);
  }

  deleteCron(cell){
    console.log(cell);/*
    $.ajax({
      url: URL + "/cron/" + cell._id,
      dataType: 'json',
      crossDomain: true,
      type: 'DELETE',
      cache: false,
      success: function(data) {
        this.loadCrons();
      }.bind(this),
      error: function(xhr, status, err) {
        console.log("url", status, err.toString());
      }.bind(this)
    });*/
  }

  loadCrons(){
    $.ajax({
      url: URL + "/cron",
      dataType: 'json',
      crossDomain: true,
      cache: false,
      success: function(data) {
        crons = data;
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log("url", status, err.toString());
      }.bind(this)
    });
  }

  loadReports(){
    $.ajax({
      url: URL + "/report",
      dataType: 'json',
      crossDomain: true,
      cache: false,
      success: function(data) {
        reports = data;
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log("url", status, err.toString());
      }.bind(this)
    });
  }

  cronActionsFormatter(cell, row) {
    return (
      <button className='btn btn-danger'>
        <span onClick={() => this.deleteCron(cell)} className="glyphicon glyphicon-trash"></span> Delete
      </button>
    );
  }

  componentDidMount(){
    console.log("fetching");
    this.loadReports();
    this.loadCrons();
  }

  render(){
    return(
      <div>
        <div className="row">
          <div className="col-lg-12">
            <PageHeader>Reports</PageHeader>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <Panel header={<span>
              <i className="fa fa-bar-chart-o fa-fw" /> Last Reports
            </span>}>
              <div className="row">
                <div className="col-lg-12">
                  <BootstrapTable data={reports} pagination >
                    <TableHeaderColumn width='180' dataField="_id" isKey={true} dataAlign="center" dataSort={true}>ID</TableHeaderColumn>
                    <TableHeaderColumn width='180' filter={ { type: 'TextFilter', delay: 1000 } } dataField="url" dataSort={true}>URL</TableHeaderColumn>
                    <TableHeaderColumn width='300' dataField="info" >Info</TableHeaderColumn>
                    <TableHeaderColumn width='150' filter={ { type: 'TextFilter', delay: 1000 } } dataField="statusCode" >Status Code</TableHeaderColumn>
                    <TableHeaderColumn width='150' dataField='action' dataFormat={ reportActionsFormatter } export={ false }>Actions</TableHeaderColumn>
                  </BootstrapTable>
                </div>
              </div>
            </Panel>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <PageHeader>Crons</PageHeader>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <Panel header={<span>
              <i className="fa fa-bar-chart-o fa-fw" /> Last Reports
            </span>}>
              <div className="row">
                <div className="col-lg-12">
                  <BootstrapTable data={crons} pagination >
                    <TableHeaderColumn width='180' dataField="_id" isKey={true} dataAlign="center" dataSort={true}>ID</TableHeaderColumn>
                    <TableHeaderColumn width='180' filter={ { type: 'TextFilter', delay: 1000 } } dataField="url" dataSort={true}>URL</TableHeaderColumn>
                    <TableHeaderColumn width='50' dataField="interval" >Interval</TableHeaderColumn>
                    <TableHeaderColumn width='150' dataField="codes" dataFormat={ codesFormatter }>Status Code</TableHeaderColumn>
                    <TableHeaderColumn width='150' dataField='action' dataFormat={ this.cronActionsFormatter } export={ false }>Actions</TableHeaderColumn>
                  </BootstrapTable>
                </div>
              </div>
            </Panel>
          </div>
        </div>
      </div>

    )
  }
}

export default Reports;
