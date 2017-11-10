import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';

import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import './ListItem.sass';

class TableSelf extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open:false
        };
    };

    onClick = e => {
        this.setState({
            open: !this.state.open
        });
        this.props.openListItem(this.props.id)
    };

    render() {
        return (
            <div className="listItem" onClick={this.onClick}>
                <MenuItem
                    primaryText={this.props.name}
                    leftIcon={
                        <Checkbox
                            checked={this.props.checkGroup}
                        />
                    }
                    secondaryText={this.props.count}
                />
            </div>
        );
    };
};

export default TableSelf;