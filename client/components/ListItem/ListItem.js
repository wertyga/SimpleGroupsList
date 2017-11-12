import Media from 'react-responsive';

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
                            {this.props.checked && <GroupItems onClick={this.props.onClickToGetItem} loading={this.props.loadItems} items={this.props.items}/>}
                        </div>
                    </div>
                </Media>
            </div>
        );
    }
};

export default ListItem

