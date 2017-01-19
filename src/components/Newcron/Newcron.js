import React, { Component, PropTypes } from 'react';
import update from 'react-addons-update';
import cron from 'node-cron'
import {
  Panel,
  Button,
  Col,
  PageHeader,
  ControlLabel,
  FormControl,
  HelpBlock,
  FormGroup,
  Checkbox,
  Form,
  Radio,
  InputGroup,
  Glyphicon } from 'react-bootstrap';

  import FormControlFeedback from 'react-bootstrap/lib/FormControlFeedback';
  import FormControlStatic from 'react-bootstrap/lib/FormControlStatic';
  import InputGroupAddon from 'react-bootstrap/lib/InputGroupAddon';
  import Alert from 'react-bootstrap/lib/Alert';

  const title = 'New Notification';

  class Newcron extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url: '',
      interval: '15',
      codes: {
        '200': false,
        '300': false,
        '400': false,
        '500': false
      },
      email: '',
      error: {
        visible: false,
        description: ''
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isURL = this.isURL.bind(this);
    this.isEmail = this.isEmail.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.isURL(this.state.url) &&
      this.isEmail(this.state.email) &&
      this.checkedAnyStatus()){
      var newState = update(this.state, {
        error: { visible:  {$set: false },
                  description: {$set: ''}
                }
      });
      this.setState(newState);
      this.setupNewCron();
    } else {
      var newState = update(this.state, {
        error: { visible:  {$set: true },
                  description: {$set: 'Invalid URL or Email or missing checked statuses'}
                }
      });
      this.setState(newState);
    }
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleCodeSelect(e){
    var newState = update(this.state, {
      codes: { [e.target.name]: {$set: e.target.checked } }
    });
    this.setState(newState);
  }

  checkedAnyStatus(){
    const state = this.state.codes;
    var ret = false;
    for (const key of Object.keys(state)) {
      const val = state[key];
      if(val)
        ret = true;
    }
    return ret;
  }

  setupNewCron(){
    var task = cron.schedule('1 * * * * *', function() {
      console.log('immediately started');
    }, false);

    task.start();
  }

  isURL(url) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(url);
  }

  isEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  render(){
    return (
      <div>
        <div className="row">
          <div className="col-lg-12">
            <PageHeader>New Notification</PageHeader>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <Alert bsStyle="danger" style={{display: this.state.error.visible ? 'block' : 'none'}}>
              {this.state.error.description}
            </Alert>
            <Panel header={<span>General information</span>} >
            <div className="row">
              <div className="col-lg-6">
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup
                    controlId="url">
                    <ControlLabel>URL to test</ControlLabel>
                    <FormControl
                      name="url"
                      type="text"
                      value={this.state.url}
                      onChange={this.handleChange.bind(this)}
                    />
                    <FormControlFeedback />
                    <HelpBlock>www.myapi.com/me</HelpBlock>
                  </FormGroup>

                  <FormGroup controlId="interval">
                    <ControlLabel>Time interval</ControlLabel>
                    <FormControl
                      name="interval"
                      onChange={this.handleChange.bind(this)}
                      componentClass="select"
                      placeholder="select"
                      value={this.state.interval}>
                      <option value="15">15 min</option>
                      <option value="60">60 min</option>
                      <option value="360">6h</option>
                      <option value="720">12h</option>
                      <option value="1440">24h</option>
                    </FormControl>
                  </FormGroup>

                  <FormGroup
                    controlId="email">
                    <ControlLabel>Email to notify</ControlLabel>
                    <FormControl
                      type="text"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange.bind(this)}
                    />
                    <FormControlFeedback />
                    <HelpBlock>foo@bar.cl</HelpBlock>
                  </FormGroup>

                  <FormGroup
                    name="codes">
                    <ControlLabel>Statuses to notify</ControlLabel>
                    <Col>
                      <Checkbox inline
                        name="200"
                        onChange={this.handleCodeSelect.bind(this)}>
                        2xx (others than 200)
                      </Checkbox>
                      {' '}
                      <Checkbox inline
                        name="300"
                        onChange={this.handleCodeSelect.bind(this)}>
                        3xx
                      </Checkbox>
                      {' '}
                      <Checkbox inline
                        name="400"
                        onChange={this.handleCodeSelect.bind(this)}>
                        4xx
                      </Checkbox>
                      {' '}
                      <Checkbox inline
                        name="500"
                        onChange={this.handleCodeSelect.bind(this)}>
                        5xx
                      </Checkbox>
                    </Col>
                  </FormGroup>
                  <Button  type="submit" bsStyle="primary">Create</Button>
                </Form>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
}

Newcron.contextTypes = { setTitle: PropTypes.func.isRequired };

export default Newcron;
