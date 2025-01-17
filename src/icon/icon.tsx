import styled from "styled-components";
import { ArrowRightIcon } from "./arrow-right-icon";
import { CrossIcon } from "./cross-icon";
import { InfoIcon } from "./info-icon";
import { PlayIcon } from "./play-icon";
import { SearchIcon } from "./search-icon";
import { IconProps } from "./types";

export const Icon = ({ type, ...props }: IconProps) => {
    switch (type) {
        case "arrow-right":
            return <ArrowRightIcon {...props} />;
        case "info":
            return <InfoIcon {...props} />;
        case "cross":
            return <CrossIcon {...props} />;
        case "play":
            return <PlayIcon {...props} />;
        case "search":
            return <SearchIcon {...props} />;
        default: {
            const baseClassName = `sgds-icon sgds-icon-${type}`;
            const mergedClassName = props.className
                ? `${baseClassName} ${props.className}`
                : baseClassName;

            return <IconSpan {...props} className={mergedClassName} />;
        }
    }
};

// =============================================================================
// STYLING
// =============================================================================
const IconSpan = styled.span`
    font-size: 1rem;
`;
