import { useMemo } from 'react';
import LazyLoad from 'react-lazyload';
import { connect } from 'react-redux';
import Banner from './components/Banner/Banner';
import PlayerSection from './components/PlayerSection/PlayerSection';
import InfoSection from './components/InfoSection/InfoSection';
import { withRouter } from 'react-router';

function Course({
    history,
    user,
}) {
    const isFullAccessed = useMemo(() => Boolean(user.info?.course), [user.info?.course]);

    return (
        <>
            {!isFullAccessed && (
                <Banner />
            )}
            <LazyLoad height={800} once >
                <PlayerSection history={history} isFullAccessed={isFullAccessed} />
            </LazyLoad>
            {!isFullAccessed && (
                <LazyLoad height={1860} offset={1860} once >
                    <InfoSection history={history} />
                </LazyLoad>
            )}
        </>
    );
}

export default connect(({ user }) => ({
    user
}), {
})(withRouter(Course));
