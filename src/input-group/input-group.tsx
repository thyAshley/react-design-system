import React from "react";
import { AddOnContainer, Container, MainInput } from "./input-group.style";
import { CustomAddon, InputGroupProps, LabelAddon, ListAddon } from "./types";
import { InputGroupListAddon } from "./input-group-list-addon";

const Component = <T, V>(
    { addon, error, ...otherProps }: InputGroupProps<T, V>,
    ref: React.Ref<HTMLInputElement>
) => {
    const renderNoAddons = () => (
        <Container
            disabled={otherProps.disabled}
            $error={error}
            $readOnly={otherProps.type === "readonly"}
            data-testid={otherProps["data-testid"]}
        >
            <MainInput ref={ref} data-testid="input" {...otherProps} />
        </Container>
    );

    if (addon) {
        const { type = "label", position = "left" } = addon;

        switch (type) {
            case "list": {
                const listAddon = addon.attributes as ListAddon<T, V>;
                if (listAddon.options && listAddon.options.length > 0) {
                    return (
                        <InputGroupListAddon
                            addon={addon}
                            error={error}
                            {...otherProps}
                        />
                    );
                } else {
                    return renderNoAddons();
                }
            }
            case "custom": {
                const customAddon = addon.attributes as CustomAddon;
                if (customAddon.children) {
                    return (
                        <Container
                            $error={error}
                            disabled={otherProps.disabled}
                            $readOnly={otherProps.type === "readonly"}
                            data-testid={otherProps["data-testid"]}
                            $position={position}
                        >
                            <AddOnContainer
                                data-testid="addon"
                                disabled={otherProps.disabled}
                                $readOnly={otherProps.type === "readonly"}
                            >
                                {customAddon.children}
                            </AddOnContainer>
                            <MainInput
                                {...otherProps}
                                $position={position}
                                $readOnly={otherProps.type === "readonly"}
                                data-testid="input"
                            />
                        </Container>
                    );
                } else {
                    return renderNoAddons();
                }
            }
            default: {
                const labelAddon = addon.attributes as LabelAddon;
                if (labelAddon.value) {
                    return (
                        <Container
                            disabled={otherProps.disabled}
                            $error={error}
                            $readOnly={otherProps.type === "readonly"}
                            data-testid={otherProps["data-testid"]}
                            $position={position}
                        >
                            <AddOnContainer
                                data-testid="addon"
                                disabled={otherProps.disabled}
                                $readOnly={otherProps.type === "readonly"}
                            >
                                {labelAddon.value}
                            </AddOnContainer>
                            <MainInput
                                {...otherProps}
                                $position={position}
                                $readOnly={otherProps.type === "readonly"}
                                data-testid="input"
                            />
                        </Container>
                    );
                } else {
                    return renderNoAddons();
                }
            }
        }
    } else {
        return renderNoAddons();
    }
};

export const InputGroup = React.forwardRef(Component);
