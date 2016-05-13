import React, { Component } from 'react';
import SearchBar from './components/SearchBar';
import ActiveUser from './components/ActiveUser';
import ToolBar from './components/ToolBar';
import UserList from './components/UserList';
import $ from "jquery";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: [],
            searchedData: [],
            activeUser: null,
            sortDir: true
        };
        this.getData('data.json');
    }

    getData(data) {
        $.getJSON(data, function (dat) {
            this.setState({userData: dat, searchedData: dat, activeUser: dat[0]});
        }.bind(this));
    }

    render() {
        return (
            <div className="container-fluid app">
                <SearchBar onSearchUpdate={searchKey => this.onSearchUpdate(searchKey)}/>
                <ToolBar onNameSort={sortDir => this.onNameSort(sortDir)} onAgeSort={sortDir => this.onAgeSort(sortDir)}
                         sortDir={this.state.sortDir} sortonAgeSort={searchedData => this.setState({searchedData})}/>
                <div className="row">
                    <ActiveUser activeUser={this.state.activeUser}/>
                    <UserList onUserClick={activeUser => this.setState({activeUser:activeUser})}
                              userData={this.state.searchedData}/>
                </div>
            </div>
        );
    }
}
