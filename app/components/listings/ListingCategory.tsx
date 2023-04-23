'use client'

import { IconType } from "react-icons";

interface ListingCategoryProps {
    label: string;
    description: string;
    icon: IconType;
}

const ListingCategory = ({
    label,
    description,
    icon: Icon
}: ListingCategoryProps) => {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row items-center gap-4">
                <Icon
                    size={28}
                    className="text-neutral-600"
                />
                <div className="flex flex-col">
                    <div className="font-semibold text-lg">
                        {label}
                    </div>
                    <div className="font-light text-neutral-500">
                        {description}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListingCategory;