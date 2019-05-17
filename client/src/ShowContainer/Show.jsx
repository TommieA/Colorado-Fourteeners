import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

export class showContainer extends Component {
	constructor() {
		super();
		this.state = {
			activeMarker: {},
		};
	}
}	