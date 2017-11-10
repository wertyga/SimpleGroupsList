import Loading from 'material-ui/CircularProgress';

export default (
    <div className="loading" style={{ position: 'absolute', height: '100%', top: 0, left: 0, width: '100%' }}>
        <Loading />
        <p>Loading...</p>
    </div>
);
