import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import { Route, withRouter } from 'react-router-dom'
import Sidebar from "./containers/SideBar";
import AppBar from "./containers/AppBar";
import Dashboard from "./views/Dashboard";
import ImageCatalog from "./views/ImageCatalog";
import Instances from './views/Instances';
import Volumes from './views/Volumes';
import Projects from './views/Projects';
import Notifications from './views/Notifications';
import AllAssets from './views/AllAssets';
import dashboard from "material-ui/svg-icons/action/dashboard";

class App extends Component {
  render() {
    const {showWizard} = this.props
    return ( !showWizard ? 
            <div>
              <AppBar />
              <div
                style={{
                  display: "flex",
                  height: "calc(100vh - 56px)",
                }}
              >
                <Sidebar />
                <main
                  style={{
                    background: "#F2F2F2",
                    flexGrow: 1,
                    width: 0,
                    overflowX: "scroll"
                  }}
                >
                  <Route exact path="/" component={Dashboard} />
                  <Route exact path="/image-catalog" component={ImageCatalog} />
                  <Route exact path="/all-assets" component={AllAssets} />
                  <Route exact path="/instances" component={Instances} />
                  <Route exact path="/volumes" component={Volumes} />
                  <Route exact path="/projects" component={Projects} />
                  <Route exact path="/notifications" component={Notifications} />
                </main>
              </div>
            </div>
    : null);
  }
}

function mapStateToProps(store) {
  return {showWizard: store.createInstance.showForm}
}

export default withRouter(connect(mapStateToProps, null)(App));