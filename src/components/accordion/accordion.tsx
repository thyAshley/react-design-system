import React, { useState } from "react";
import {
    Content,
    ExpandCollapseLink,
    Title,
    TitleWrapper,
} from "./accordion.style";
import { AccordionProps } from "./types";

export const AccordionContext = React.createContext(false);

export const Accordion = ({
    children,
    title,
    enableExpandAll = true,
    showTitleInMobile = false,
    className,
}: AccordionProps): JSX.Element => {
    const [expandAll, setExpandAll] = useState<boolean>(true);

    const handleExpandCollapseClick = (event: React.MouseEvent) => {
        event.preventDefault();
        setExpandAll((prevExpandValue) => !prevExpandValue);
    };

    const renderCollapseExpandAll = () => {
        return (
            <ExpandCollapseLink
                data-testid={"accordion-expand-collapse-button"}
                onClick={handleExpandCollapseClick}
                href="" // for accessibility
                weight="semibold"
            >
                {expandAll ? "Hide all" : "Show all"}
            </ExpandCollapseLink>
        );
    };

    return (
        <AccordionContext.Provider value={expandAll}>
            <Content className={className}>
                <TitleWrapper hasTitle={!!title || showTitleInMobile}>
                    {title && (
                        <Title
                            showInMobile={showTitleInMobile}
                            data-testid={"accordion-title"}
                        >
                            {title}
                        </Title>
                    )}
                    {enableExpandAll && renderCollapseExpandAll()}
                </TitleWrapper>
                {children}
            </Content>
        </AccordionContext.Provider>
    );
};
