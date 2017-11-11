import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { getItem } from '../../actions/items';

import FlatButton from 'material-ui/FlatButton';

import Loader from '../common/loader';

import './GroupItems.sass';


@connect(null, { getItem })
export default class GroupItems extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        };
    };

    onClick = id => {
        this.props.getItem(id)
    };

    render() {

        const enter = {
            from: {
                transform: 'translateY(0)'
            },
            to: {
                transform: 'translateY(100%)'
            }
        };

        const main = (
            <div className="Menu" style={{ overflow: 'hidden' }}>

                    {this.props.items.map((item, i) =>
                        <div key={i}>
                            <p>Date: {item.data.split(', ')[1].split(' ').slice(0, 3).join(' ')}</p>
                        </div>
                    )}

            </div>
        );

        return (
            <div className='GroupItems'>
                    {this.props.loading ? Loader :
                        (this.props.items.length > 0 ? this.props.items.map((item, i) =>
                            <FlatButton
                                key={i}
                                onClick={() => this.onClick(item.id)}
                                children={
                                    <div key={i} className="button">
                                        <div className="wrap"><span>{item.data.split(', ')[1].split(' ').slice(0, 3).join(' ')}</span></div>
                                        <div className="wrap"><span>{item.title}</span></div>
                                        <div className="wrap"><span>{item.subtitle}</span></div>
                                    </div>
                                }
                                fullWidth={true}
                                style={{ display: 'block' }}
                            />

                        ) :
                            <div style={{ textAlign: 'center', padding: 20 }}>No items</div>
                        )
                    }

            </div>
        );
    };
};
