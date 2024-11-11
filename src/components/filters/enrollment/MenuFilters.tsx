import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { type MenuFiltersProps } from '../../../types/table/ContentFiltersProps';

export default function MenuFilters(props: MenuFiltersProps) {
    const { anchorEl, setAnchorEl, addSearchableHeaders, options } = props;

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                {options?.map((option: any, i: number) =>
                    <MenuItem key={i} onClick={() => { addSearchableHeaders(option); setAnchorEl(null) }}>{option.header}</MenuItem>
                )}
            </Menu>
        </>
    );
}
