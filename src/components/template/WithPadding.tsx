import React from 'react'
import { WithPaddingProps } from '../../types/template/TemplateProps';

function WithPadding(props: WithPaddingProps): React.ReactElement {
    const { children, p = "0.5rem", style } = props;

    return (
        <div
            style={{ padding: p, ...(style ? style : {}) }}
        >
            {children}
        </div>
    )
}

export default WithPadding
