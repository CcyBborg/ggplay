import { useState } from 'react';

function ProfileButton({
    nickname,
    logo,
    onLogout
}) {
    const [isPopover, setIsPopover] = useState(false);

    return (
        <button className='btn btn-link position-relative pl-1 pr-1' onClick={() => setIsPopover(!isPopover)}>
            <span className='font-weight-bold mr-2' style={{
                fontSize: '16px',
                textTransform: 'none'
            }}>
                {nickname}
            </span>
            <img className='mr-2' src={logo} height='24' />
            <i style={{
                fontSize: '12px'
            }} className={isPopover ? 'fas fa-chevron-up' : 'fas fa-chevron-down'}></i>
            {isPopover && (
                <div className='popover p-3'>
                    <button
                        className='btn btn-secondary'
                        onClick={onLogout}>
                        <i className='fas fa-sign-out-alt'></i> Выйти
                    </button>
                </div>
            )}
        </button>
    );
}

export default ProfileButton;
