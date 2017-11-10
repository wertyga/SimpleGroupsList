import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { getItemsGroup } from '../../actions/items';

import Loader from 'material-ui/CircularProgress';

import Groups from '../Groups/Groups';
import GroupItems from '../GroupItems/GroupItems';
import ModalItem from '../ModalItem/ModalItem';

import './MainPage.sass';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class MainPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openListItems: false,
            checkGroup: false,
            listItemsLoading: false,
            globalError: this.props.globalError
        };
    };

    componentDidUpdate(prevProps, prevState) {
        if(this.props.globalError !== prevProps.globalError) {
            this.setState({
                globalError: this.props.globalError
            })
        }
    };

    openListItem = (id) => {
        this.setState({ listItemsLoading: true });
        this.props.getItemsGroup(id)
            .then(() => this.setState({ listItemsLoading: false }))
            .catch(() => this.setState({ listItemsLoading: false }))
    };

    render() {
        return (
            <MuiThemeProvider>
                <div className="MainPage">
                    <h2>Item collection list</h2>
                    {this.state.globalError && <div className="error">{this.state.globalError}</div>}
                    <div className="content">
                        <Groups
                            openListItem={this.openListItem}
                            checkGroup={this.state.checkGroup}
                        />
                        <GroupItems
                            open={this.state.openListItems}
                            loading={this.state.listItemsLoading}
                        />
                    </div>

                    {this.state.openModal && <ModalItem />}
                </div>
            </MuiThemeProvider>
        );
    }
};


function mapState(state) {
    return {
        globalError: state.globalError
    }
};

export default connect(mapState, { getItemsGroup })(MainPage);