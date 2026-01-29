import { type JSX } from 'react';

const ErrorBox = (): JSX.Element => {
    return (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded">
            <p className="text-yellow-700">
              'An error occurred while fetching books.'
            </p>
        </div>
    )
};

export default ErrorBox;