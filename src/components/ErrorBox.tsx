import { type JSX } from 'react';

const ErrorBox = ({errorMessage}: {errorMessage: string}): JSX.Element => {
    return (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded">
            <p className="text-yellow-700">
              {errorMessage || 'An error occurred while fetching books.'}
            </p>
        </div>
    )
};

export default ErrorBox;