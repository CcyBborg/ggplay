import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUserInfo } from './actions';

function AuthWrapper({ fetchUserInfo, children }) {
    useEffect(() => {
        fetchUserInfo();
    }, [fetchUserInfo]);

    return (
        <>
            {children}
        </>
    );
}

export default connect(() => {}, {
    fetchUserInfo
})(AuthWrapper)
