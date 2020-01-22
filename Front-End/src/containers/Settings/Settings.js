import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import TabsWrappedLabel from '../../components/Tabs/Tabs';

class Settings extends PureComponent {
    render() {
        let path = this.props.location.pathname;
        return (
            <Fragment>
                <TabsWrappedLabel path={path}/>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
	let stateOptions = {
	};
	return stateOptions
}

Settings = connect(mapStateToProps)(Settings);
export default Settings;
