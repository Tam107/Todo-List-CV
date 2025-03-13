import React from 'react';
import { classNames } from '../../utils/helpers';

const Card = ({
                  children,
                  className = '',
                  ...props
              }) => {
    return (
        <div
            className={classNames(
                'bg-white shadow rounded-lg p-6',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
