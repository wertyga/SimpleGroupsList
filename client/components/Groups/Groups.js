import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Media from 'react-responsive';

import { fetchGroups } from '../../actions/groups.js';
import { getItemsGroup } from '../../actions/items.js';
import { getItem } from '../../actions/items.js';


import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';

import ListItem from '../ListItem/ListItem';
import GroupItems from '../GroupItems/GroupItems';
import loading from '../common/loader';
import DialogWindow from '../DialogWindow/DialogWindow';

import './Groups.sass';


class Groups extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            loadItems: false,
            selectItem: localStorage.GroupsSelected && localStorage.GroupsSelected,
            openDialog: false,
            dialogLoading: false
        };
    };

    componentDidMount() {
        this.setState({
            isLoading: true
        });
        this.props.fetchGroups()
            .then(() => {
                if(!this.state.selectItem ) {
                    this.setState({ selectItem: this.props.groups[0].id });
                    this.setLocalStorage();
                };
                this.setState({ isLoading: false });
                this.fetchItems(this.state.selectItem);

            }).then(() => this.heightEqual())
            .catch(() => this.setState({ isLoading: false }));

        window.addEventListener('resize', this.heightEqual);

    };

    setLocalStorage = () => {
        localStorage.setItem('GroupsSelected', this.state.selectItem)
    };

    onClickListItem = async (id, i) => {
        if(this.state.selectItem === id) {
            await this.setState({ selectItem: 'none' });
        } else {
            await this.setState({ selectItem: id });
            this.fetchItems(id)
        };
        this.setLocalStorage();
    };

    fetchItems = (id) => {
        this.setState({ loadItems: true });
        this.props.getItemsGroup(id)
            .then(() => this.setState({ loadItems: false }))
            .catch(() => this.setState({ loadItems: false }))
    };

    heightEqual = () => {
        if(window.innerWidth > 1000) {
            const [groupsMain, largeScreen] = [this.refs.groupsMain, this.refs.largeScreen];

            largeScreen.style.height = groupsMain.offsetHeight + 'px'
        }
    };

    closeDialog = () => {
        this.setState({
            openDialog: false
        });
    };

    openDialog = () => {
        this.setState({
            openDialog: true
        });
    };

    onClickToGetItem = id => {
        this.setState({ dialogLoading: true, openDialog: true });
        this.props.getItem(id)
            .then(() => this.setState({ dialogLoading: false }))
            .catch(() => this.setState({ dialogLoading: false, openDialog: false }))
    };

    render() {

        const main = (
            <div className="group-wrapper">
                <div className="groups-main" ref="groupsMain">
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
                                items={this.props.items || []}
                                key={i}
                                name={item.name}
                                count={item.count}
                                checked={this.state.selectItem === item.id}
                                onClick={() => this.onClickListItem(item.id, i)}
                                loadItems={this.state.loadItems}
                                onClickToGetItem={this.onClickToGetItem}
                            />
                        ) : <div className="no-groups">No groups find</div>
                    }
                </div>

                    <Media minWidth={1001}>
                        <div className="largeScreen" ref="largeScreen">
                            {this.state.selectItem !== 'none' &&  <GroupItems onClick={this.onClickToGetItem} loading={this.state.loadItems} items={this.props.items}/>}
                        </div>
                    </Media>

                <DialogWindow
                    item={this.props.item}
                    openDialog={this.state.openDialog}
                    closeDialog={this.closeDialog}
                    loading={this.state.dialogLoading}
                />

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
const ItemsProps = createSelector(
    state => state.items,
    (items) => items
);
const ItemProps = createSelector(
    state => state.item,
    (item) => item
);

function mapState(state) {
    return {
        groups: GroupProps(state) || [],
        item: ItemProps(state),
        items: ItemsProps(state)
    }
};

export default connect(mapState, { fetchGroups, getItemsGroup, getItem })(Groups);