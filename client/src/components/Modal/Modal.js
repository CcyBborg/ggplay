import { useEffect, useRef, useCallback } from 'react';

function Modal({
    title,
    children,
    size,
    marginTop,
    onBack,
    onClose
}) {
    useEffect(() => {
        document.body.style.overflowY = 'hidden';

        return () => {
            document.body.style.overflowY = 'auto';
        };
    }, []);

    const containerRef = useRef(null);

    const handleContainerClose = useCallback(event => {
        if (containerRef.current === event.target) {
            onClose();
        }
    }, [containerRef]);

    return (
        <div className='modal-container' ref={containerRef} onClick={handleContainerClose}>
            <div className={`modal position-absolute ${size === 'sm' ? 'modal-sm' : (size === 'xs' ? 'modal-xs' : '')}`}>
                <header className='modal-header d-flex justify-content-center align-items-center'>
                    {onBack && (
                        <button className='modal__btn-back' onClick={onBack}>
                            <i className='fas fa-arrow-left'></i>
                        </button>
                    )}
                    <h4 className='m-0 h6 text-center'>{title}</h4>
                    {onClose && (
                        <button className='btn-close' onClick={onClose}>
                            <i className='fas fa-times'></i>
                        </button>
                    )}
                </header>
                <div className='modal-body'>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;
