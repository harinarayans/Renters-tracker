import React, { PureComponent } from 'react';
import { user } from '../../redux/actions/httpRequest';
import { Table } from 'antd';
import Paper from '@material-ui/core/Paper';
import 'antd/dist/antd.css';

class RentersAntTable extends PureComponent {

    onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    }

    componentDidMount(){
        //this.props.dispatch(this.props.actionName.request({}));
    }

    render() {
        return (
            <Paper>
                <Table
                    rowKey="uid"
                    responsive
                    columns={this.columns}
                    dataSource={[]}
                    onChange={this.onChange}
                />
            </Paper>
        )
    }
}

export default RentersAntTable
