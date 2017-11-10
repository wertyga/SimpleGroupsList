import { connect } from 'react-redux';

import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';

import loader from '../common/loader';

import './GroupItems.sass';

class GroupItems extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: this.props.loading
        };
    };

    componentDidUpdate(prevProps, prevState) {
        if(this.props.loading !== prevState.loading) {
            this.setState({ loading: this.props.loading });
        };
    };

    render() {

        const main = (
            <Menu>
                {this.props.items.map((item, i) =>
                    <MenuItem
                        key={i}
                        primaryText={`${item.data.split(', ')[1].split(' ').slice(0, 3).join(' ')} ${item.title}`}
                    />
                )}
            </Menu>
        );

        return (
            <div className="GroupItems">
                {this.state.loading ?
                    loader :
                    (
                        this.props.items.length > 0 ?
                            main :
                            <div>No item for this group</div>
                    )}

            </div>
        );
    };
};

function mapState(state) {
    return {
        items: state.items || []
    };
};

export default connect(mapState)(GroupItems);