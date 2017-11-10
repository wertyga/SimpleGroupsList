import { connect } from 'react-redux';
import { createSelector } from 'reselect';

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
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';

import ListItem from '../TableRow/TableRow';
import loading from '../common/loader';

import inlineStyles from '../../styles/inlineStyles';
import './Groups.sass';


class Groups extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            selectItem: 0
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

    selectListItem = i => {
        return this.state.selectItem === i;
    };

    onClickListItem = (id, i) => {
        this.setState({ selectItem: i });

        this.props.openListItem(id);
    };
    
    render() {
        
        const main = (
            <div>
                <MenuItem
                    primaryText="Name"
                    secondaryText="Count"
                    // style={{ color: inlineStyles.fontColorFade }}
                    disabled={true}
                    leftIcon={<Checkbox disabled={true}/>}
                />
                <Divider style={{ width: '100%' }}/>
                {this.props.groups.length > 0 ?
                    this.props.groups.map((item, i) =>
                        <div key={i} className="listItem">
                            <MenuItem
                                primaryText={item.name}
                                secondaryText={item.count +''}
                                leftIcon={<Checkbox checked={this.state.selectItem === i}/>}
                                onClick={(e) => this.onClickListItem(item.id, i)}
                            />
                            <Divider />
                           
                        </div>
                    ) : <div className="no-groups">No groups find</div>
                }
            </div>
        );

        
        return (
            <div className="Groups">
                {this.state.isLoading ? loading : main}
            </div>
        );
    };
};

const GroupProps = createSelector(
    state => state.groups,
    groups => groups
);

function mapState(state) {
    return {
        groups: GroupProps(state) || []
    }
};

export default connect(mapState, { fetchGroups })(Groups);