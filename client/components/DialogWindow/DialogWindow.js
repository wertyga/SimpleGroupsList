import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

import Loading from '../common/loader';

import './DialogWindow.sass';

export default class DialogWindow extends React.Component {
    render() {

        const main = (
            <div className="dialog-content">
                <p>{this.props.item.subtitle}</p>
                <p><span>Name: </span>{this.props.item.name}</p>
                <p><span>Date: </span>{this.props.item.date}</p>
                <p><span>Description: </span>{this.props.item.description}</p>
            </div>
        );

        return (
            <Dialog
                className="DialogWindow"
                title={this.props.item.title}
                actions={<RaisedButton label="Close" onClick={this.props.closeDialog}/>}
                modal={false}
                open={this.props.openDialog}
                onRequestClose={this.props.closeDialog}
            >

                {this.props.loading ? Loading : main}

            </Dialog>
        );
    };
};