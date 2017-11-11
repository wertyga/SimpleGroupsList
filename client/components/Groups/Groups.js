import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { fetchGroups } from '../../actions/groups.js';


import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';

import ListItem from '../ListItem/ListItem';
import loading from '../common/loader';

import inlineStyles from '../../styles/inlineStyles';
import './Groups.sass';


class Groups extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            selectItem: !localStorage.GroupsSelected ? 0 : localStorage.GroupsSelected
        };
    };

    componentDidMount() {
        this.setState({
            isLoading: true
        });
        this.props.fetchGroups()
            .then(() => {
                this.setState({ isLoading: false });
            })
            .catch(() => this.setState({ isLoading: false }))

    };

    setLocalStorage = () => {
        localStorage.setItem('GroupsSelected', this.state.selectItem)
    };

    onClickListItem = async (id, i) => {
        if(this.state.selectItem == i) {
            await this.setState({ selectItem: 'none' });
        } else {
            await this.setState({ selectItem: i });
        };
        this.setLocalStorage();
    };

    render() {

        const main = (
            <div>
                <MenuItem
                    primaryText="Name"
                    secondaryText="Count"
                    disabled={true}
                    leftIcon={<Checkbox disabled={true}/>}
                />
                <Divider style={{ width: '100%' }}/>
                {this.props.groups.length > 0 ?
                    this.props.groups.map((item, i) =>
                        <ListItem
                            id={item.id}
                            key={i}
                            name={item.name}
                            count={item.count}
                            checked={this.state.selectItem == i}
                            onClick={() => this.onClickListItem(item.id, i)}
                        />
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
    // state => state.item,
    (groups, item) => groups
);

function mapState(state) {
    return {
        groups: GroupProps(state) || [],
        item: state.item
    }
};

export default connect(mapState, { fetchGroups })(Groups);