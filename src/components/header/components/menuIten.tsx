import { Help, MenuItem } from "@dhis2/ui"
import { OptionProps } from "../../../types/header/headerTypes";
import "../globalStyle.css"
import SvgIcon from '@mui/material/SvgIcon';

const MenuItemContainer = ({ options, setSelected, onToggle, onSelectOption }:
    {
        options: OptionProps[], setSelected: (selected: OptionProps) => void,
        onToggle: () => void, onSelectOption: () => void
    }) => {

    if (options.length === 0) {
        return <Help className="customDhis2Helper">
            No items found
        </Help>
    }

    const onSelect = (option: OptionProps) => {
        setSelected(option)
        onSelectOption()
        onToggle()
    }

    function AmpStoriesIcon() {
        return (
            <SvgIcon>
                <path d="M17 7h2v10h-2V7zm-3 2h2v6h-2V9zm-3-4h2v14h-2V5z" />
            </SvgIcon>
        );
    }

    return (
        <>
            {
                options.map((option) => (
                    < MenuItem onClick={() => onSelect(option)} icon={option.icon ? <AmpStoriesIcon /> : null} key={option.value} label={option.label} />
                ))
            }
        </>
    )
}

export default MenuItemContainer