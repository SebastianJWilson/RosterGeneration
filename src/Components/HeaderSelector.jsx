import { useState } from "react";
import { DropdownMenu, Button } from "@radix-ui/themes";

const HeaderSelector = ({icon, tableRows, setHeader }) => {

    const [name, setName] = useState(tableRows[0])

    const updateName = (index) => {
        setName(tableRows[index])
        setHeader(index)
    }

    return (
        <>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Button variant="soft">
                        {icon}
                        {name}
                        <DropdownMenu.TriggerIcon />
                    </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    {tableRows.map((rows, index) => {
                        return <DropdownMenu.Item key={index} onClick={() => updateName(index)}>{rows}</DropdownMenu.Item>
                    })}
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </>
    )
}

export default HeaderSelector;