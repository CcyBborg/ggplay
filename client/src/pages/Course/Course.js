import { useMemo } from 'react';
import { withRouter } from 'react-router';
import LazyLoad from 'react-lazyload';
import { connect } from 'react-redux';
import Banner from './components/Banner/Banner';
import PlayerSection from './components/PlayerSection/PlayerSection';
import InfoSection from './components/InfoSection/InfoSection';
import { fetchComments, addComment } from './actions';

function Course({
    history,
    user,
    comments,
    fetchComments,
    addComment
}) {
    const isFullAccessed = useMemo(() => Boolean(user.info?.course), [user.info?.course]);

    return (
        <>
            {!isFullAccessed && (
                <Banner />
            )}
            <LazyLoad height={800} offset={200} once>
                <PlayerSection
                    user={user}
                    history={history}
                    isFullAccessed={isFullAccessed}
                    comments={comments}
                    fetchComments={fetchComments}
                    addComment={addComment} />
            </LazyLoad>
            {!isFullAccessed && (
                <LazyLoad height={1860} offset={500} once >
                    <InfoSection history={history} />
                </LazyLoad>
            )}
        </>
    );
}

export default connect(({ user, comments }) => ({
    user,
    comments
}), {
    fetchComments,
    addComment
})(withRouter(Course));
