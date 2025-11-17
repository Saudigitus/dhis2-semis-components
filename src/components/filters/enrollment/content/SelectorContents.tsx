import { Button } from '@dhis2/ui';
import FilterComponents from '../../fields/FilterComponents';
import { type SelectorContentsProps } from '../../../../types/table/ContentFiltersProps';
import { createStyles, makeStyles } from '@mui/styles';
import type { Theme } from '@mui/material/styles';
import { TranslationState } from '../../../../schemas/translationsSchema';
import { useRecoilValue } from 'recoil';

const getStyles = makeStyles((theme: Theme) =>
    createStyles({
        buttonsContainer: {
            paddingTop: 8
        },
        buttonContainer: {
            paddingRight: 8,
            display: 'inline-block'
        }
    })
);


function SelectorContents(props: SelectorContentsProps) {
    const { onClose, disabledReset, closeFilterSelector, colum, onQuerySubmit, disabled: disabledUpdate, value, filled } = props;
    const classes = getStyles()
    const i18n = useRecoilValue(TranslationState) as any

    const handleKeyDown = (event: any) => {
        if (event.key === "Enter" && !(disabledUpdate || !value?.replace(/\s/g, '').length)) {
            event.preventDefault();
            onQuerySubmit();
        }
    };

    const onUpdate = () => {
        closeFilterSelector(true)
        onQuerySubmit()
    }

    return (
        <form onKeyDown={handleKeyDown}>
            <FilterComponents
                type={colum.valueType}
                column={colum}
                options={colum.options}
                {...props}
            />
            <div
                className={classes.buttonsContainer}
            >
                <div
                    className={classes.buttonContainer}
                >
                    <Button
                        primary
                        onClick={onUpdate}
                        disabled={disabledUpdate || !value}
                    >
                        {i18n.t('Update')}
                    </Button>
                </div>
                <div
                    className={classes.buttonContainer}
                >
                    <Button
                        dataTest="list-view-filter-cancel-button"
                        secondary
                        onClick={onClose}
                        disabled={disabledReset || !filled}

                    >
                        {i18n.t('Restore')}
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default SelectorContents
