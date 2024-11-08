import { IconButton } from "@material-ui/core";
import defaultClasses from '../table.module.css';
import { IconButtonPaginationProps } from "../../../../types/table/PaginationProps";

export default function IconButtonPagination(props: IconButtonPaginationProps): React.ReactElement {
    const {Icon, ariaLabel, disabled, onPageChange} = props;
    return (
        <IconButton
            onClick={(page: any) => onPageChange(page)}
            disabled={disabled}
            aria-label={ariaLabel}
            className={defaultClasses.iconButton}
        >
            {Icon}
        </IconButton>
    )
}