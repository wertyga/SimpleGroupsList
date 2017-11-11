import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Media from 'react-responsive';

import { getItemsGroup } from '../../actions/items';

import FlipMove from 'react-flip-move';

import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';

import GroupItems from '../GroupItems/GroupItems';

import './ListItem.sass';

class ListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false
        };
    };

    // componentDidUpdate(prevProps, prevState) {
    //     if(this.props.checked !== prevProps.checked && this.props.checked) {
    //         this.fetchItems();
    //     }
    // };
    //
    // componentDidMount() {
    //     if(this.props.checked) {
    //         this.fetchItems();
    //     }
    //
    // };

    fetchItems = () => {
        this.setState({ loading: true });
        this.props.getItemsGroup(this.props.id)
            .then(() => this.setState({ loading: false }))
            .catch(() => this.setState({ loading: false }))
    };

    render() {
        return (
            <div className="ListItem">
                <MenuItem
                    primaryText={this.props.name}
                    secondaryText={this.props.count +''}
                    leftIcon={<Checkbox checked={this.props.checked}/>}
                    onClick={this.props.onClick}
                    style={{
                        fontSize: 13
                    }}
                />
                {!this.props.checked && <Divider />}
                <Media maxWidth={1000}>
                    <div className='lists'>
                        <div className={this.props.checked ? 'listWrapper open' : 'listWrapper'}>
                            {this.props.checked && <GroupItems loading={this.props.loadItems} items={this.props.items}/>}
                        </div>
                    </div>
                </Media>
            </div>
        );
    }
};

// const Selector = createSelector(
//     state => state.items,
//     items => items
// );
//
// function mapState(state) {
//     return {
//         items: Selector(state)
//     }
// };

export default ListItem

