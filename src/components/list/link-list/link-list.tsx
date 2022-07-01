import React, { useState } from "react";
import {
    Container,
    Description,
    Expandable,
    ExpandableChild,
    Item,
    ItemContent,
    ItemIcon,
    ItemTitleDefault,
    ItemTitleSmall,
    ToggleButton,
    ToggleButtonIcon,
    ToggleButtonLabel,
} from "./link-list.styles";
import { LinkListItemProps, LinkListProps } from "./types";
import { useSpring } from "react-spring";
import { useResizeDetector } from "react-resize-detector";

export const LinkList = <T,>({
    items,
    maxShown,
    style = "default",
    onItemClick,
    onDefaultClickHandler,
    ...otherProps
}: LinkListProps<T>) => {
    // =============================================================================
    // CONST, STATE, REFS
    // =============================================================================
    const [showMinimised, setShowMinimised] = useState<boolean>(
        maxShown ? maxShown >= items.length : true
    );

    const itemsShown = maxShown ? items.slice(0, maxShown) : items;
    const itemsMinimised = maxShown ? items.slice(maxShown) : [];

    const resizeDetector = useResizeDetector();
    const childRef = resizeDetector.ref;

    // =============================================================================
    // EVENT HANDLERS
    // =============================================================================
    const handleListItemClick = <K extends T>(
        event: React.MouseEvent<HTMLAnchorElement>,
        item: LinkListItemProps<K>
    ) => {
        /**
         * Individual item's onClick will override
         * the onItemClick callback
         */
        if (item.onClick) {
            event.preventDefault();
            item.onClick(event);
        } else if (onItemClick) {
            event.preventDefault();
            onItemClick(item);
        } else if (onDefaultClickHandler) {
            // let user decide if default needs to be prevented
            onDefaultClickHandler(item, event);
        } else {
            // do nothing let normal click behaviour happen
        }
    };

    const handleToggleButtonClick = () => {
        setShowMinimised(!showMinimised);
    };

    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================
    const renderItemContent = (
        index: number,
        title: string,
        description?: string,
        secondaryDescription?: JSX.Element
    ) => {
        const ItemTitle = style === "small" ? ItemTitleSmall : ItemTitleDefault;
        return (
            <>
                <ItemContent>
                    <ItemTitle
                        data-testid={`link-title-${index}`}
                        weight="semibold"
                    >
                        {title}
                    </ItemTitle>
                    {description && (
                        <Description data-testid={`link-description-${index}`}>
                            {description}
                        </Description>
                    )}
                    {secondaryDescription}
                </ItemContent>
                <ItemIcon type="chevron-right" />
            </>
        );
    };

    const renderShownItems = () => {
        return itemsShown.map((item, index) => {
            const {
                title,
                description,
                onClick,
                secondaryDescription,
                ...otherProps
            } = item;
            return (
                <Item
                    key={`list-item-shown-${index}`}
                    data-testid={`list-item-shown-${index}`}
                    onClick={(event) => handleListItemClick(event, item)}
                    {...otherProps}
                >
                    {renderItemContent(
                        index,
                        title,
                        description,
                        secondaryDescription
                    )}
                </Item>
            );
        });
    };

    const renderMinimisedItems = () => {
        return itemsMinimised.map((item, index) => {
            const {
                title,
                description,
                onClick,
                secondaryDescription,
                ...otherProps
            } = item;
            return (
                <Item
                    key={`list-item-minimised-${index}`}
                    data-testid={`list-item-minimised-${index}`}
                    onClick={(event) => handleListItemClick(event, item)}
                    {...otherProps}
                >
                    {renderItemContent(
                        index,
                        title,
                        description,
                        secondaryDescription
                    )}
                </Item>
            );
        });
    };

    const renderToggle = () => (
        <ToggleButton
            type="button"
            onClick={handleToggleButtonClick}
            data-testid="toggle-button"
            showMinimised={showMinimised}
        >
            <ToggleButtonLabel
                weight="semibold"
                data-testid="toggle-button-label"
            >
                {showMinimised ? "View less" : "View more"}
            </ToggleButtonLabel>
            <ToggleButtonIcon type={showMinimised ? "minus" : "plus"} />
        </ToggleButton>
    );

    // React spring animation configuration
    const expandableStyles = useSpring({
        height: showMinimised ? resizeDetector.height : 0,
    });

    return (
        <Container {...otherProps}>
            {renderShownItems()}
            {itemsMinimised.length > 0 && (
                <Expandable
                    style={expandableStyles}
                    data-testid="minimised-content"
                >
                    <ExpandableChild ref={childRef}>
                        {renderMinimisedItems()}
                    </ExpandableChild>
                </Expandable>
            )}
            {itemsMinimised.length > 0 && renderToggle()}
        </Container>
    );
};