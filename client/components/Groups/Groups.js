import { connect } from 'react-redux';

import { fetchGroups } from '../../actions/groups.js';

import Loading from 'material-ui/CircularProgress';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import { List } from 'material-ui/List';
import Menu from 'material-ui/Menu';

import ListItem from '../TableRow/TableRow';
import loading from '../common/loader';

import inlineStyles from '../../styles/inlineStyles';
import './Groups.sass';


class Groups extends React.Component {
    constructor(props) {
        super(props);

        const initialState = {};
        const arr = this.props.groups.forEach(item => initialState[item.id] = false) || [];

        this.initialState = initialState;

        this.state = {
            isLoading: false,
            checkGroup: this.initialState
        };
    };
    
    componentDidMount() {
        this.setState({
            isLoading: true
        });
        this.props.fetchGroups()
            .then(() => this.setState({ isLoading: false }))
            .catch(() => this.setState({ isLoading: false }))
    };

    openListItem = id => {
        this.setState({
            checkGroup: {
                ...this.initialState,
                [id]: true
            }
        });

        this.props.openListItem(id);
    };
    
    render() {
        
        const main = (
            <Menu>
                    {this.props.groups.length > 0 ? this.props.groups.map((item, i) =>
                        <ListItem
                            id={item.id}
                            key={i}
                            name={item.name}
                            count={item.count + ''}
                            openListItem={this.openListItem}
                            checkGroup={this.state.checkGroup[item.id]}
                        />
                    ) :
                        <div style={{
                            marginTop: 20
                        }}>
                            No groups available
                        </div>
                    }

            </Menu>
        );

        
        return (
            <div className="Groups">
                {this.state.isLoading ? loading : main}
            </div>
        );
    };
};

function mapState(state) {
    return {
        groups: state.groups || []
    }
};

export default connect(mapState, { fetchGroups })(Groups);