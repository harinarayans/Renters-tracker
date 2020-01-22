import { connect } from 'react-redux';
import RentersAntTable from '../AntTable/AntTableBase';

class RentersUsers extends RentersAntTable {

    columns = [
        { key: 'firstName', title: 'First Name', dataIndex: 'firstName', type: 'string', width: 150, sorter: true, filters: true },
        { key: 'lastName', title: 'Last title', dataIndex: 'lastName', type: 'string', width: 150, sorter: true, filters: true },
        { key: 'email', title: 'Email', dataIndex: 'email', type: 'string', width: 150, sorter: true, filters: true },
        { key: 'isActive', title: 'Active', dataIndex: 'isActive', type: 'bool', width: 100, sorter: true, filters: true },
        { key: 'createdAt', title: 'Created At', dataIndex: 'createdAt', type: 'date', width: 180, sorter: true, filters: true },
        { key: 'createdBy', title: 'Created By', dataIndex: 'createdBy', type: 'date', width: 180, sorter: true, filters: true },
        { key: 'updatedAt', title: 'Updated At', dataIndex: 'updatedAt', type: 'date', width: 180, sorter: true, filters: true },
        { key: 'updatedBy', title: 'Updated By', dataIndex: 'updatedBy', type: 'date', width: 180, sorter: true, filters: true }
    ]
}

RentersUsers.defaultProps = {
    actionName: 'user',
    defaultSort: 'createdAt'
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(RentersUsers);