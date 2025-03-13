import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import Button from './Buton.jsx';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i);

    const renderPageNumbers = () => {
        const visiblePages = [];
        const showEllipsis = totalPages > 7;

        if (showEllipsis) {
            if (currentPage < 3) {
                // Show first 3, ellipsis, and last
                visiblePages.push(...pages.slice(0, 3), 'ellipsis', totalPages - 1);
            } else if (currentPage > totalPages - 4) {
                // Show first, ellipsis, and last 3
                visiblePages.push(0, 'ellipsis', ...pages.slice(totalPages - 3));
            } else {
                // Show first, ellipsis, current-1, current, current+1, ellipsis, last
                visiblePages.push(
                    0,
                    'ellipsis',
                    currentPage - 1,
                    currentPage,
                    currentPage + 1,
                    'ellipsis',
                    totalPages - 1
                );
            }
        } else {
            visiblePages.push(...pages);
        }

        return visiblePages.map((page, index) => {
            if (page === 'ellipsis') {
                return (
                    <span key={`ellipsis-${index}`} className="px-3 py-2">
                        ...
                    </span>
                );
            }

            return (
                <Button
                    key={page}
                    variant={currentPage === page ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={() => onPageChange(page)}
                >
                    {page + 1}
                </Button>
            );
        });
    };

    return (
        <div className="flex items-center justify-center space-x-2 mt-4">
            <Button
                variant="secondary"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 0}
            >
                <ChevronLeftIcon className="w-4 h-4" />
            </Button>

            {renderPageNumbers()}

            <Button
                variant="secondary"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
            >
                <ChevronRightIcon className="w-4 h-4" />
            </Button>
        </div>
    );
};

export default Pagination;
